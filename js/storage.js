/* ==========================================================================
   FRIDGEFLOW - REACTIVE STORAGE & KITCHEN STATE MANAGER
   Seamless state synchronization across pages, auto-seed and reactive dispatch
   ========================================================================== */

class FridgeStorageManager {
  constructor() {
    this.STORAGE_KEYS = {
      PANTRY: 'ff_pantry_items_v2',
      MEAL_PLAN: 'ff_weekly_meal_plan_v3',
      PLANNER_CONFIG: 'ff_planner_config_v3',
      CART_CHECKED: 'ff_cart_checked_items_v3',
      CART_EXCLUDED: 'ff_cart_excluded_items_v3',
      CUSTOM_RECIPES: 'ff_custom_recipes_v3',
      CUSTOM_PRICES: 'ff_custom_prices_ars_v1',
      FAVORITES: 'ff_favorites_v2',
      HISTORY: 'ff_cooking_history_v2',
      METRICS: 'ff_impact_metrics_v2',
      SETTINGS: 'ff_user_settings_v2'
    };

    this.initDefaults();
    this.syncRecipesCatalog();
  }

  initDefaults() {
    // Seed default pantry if completely empty
    if (!localStorage.getItem(this.STORAGE_KEYS.PANTRY)) {
      this.loadPreset('gourmet', false);
    }

    // Default Planner Settings (5 days, 120g protein/day, Lunch + Dinner)
    if (!localStorage.getItem(this.STORAGE_KEYS.PLANNER_CONFIG)) {
      const initialConfig = {
        daysCount: 5,
        proteinTarget: 120,
        includeBreakfast: false
      };
      this.save(this.STORAGE_KEYS.PLANNER_CONFIG, initialConfig);
    }

    // Default impact metrics
    if (!localStorage.getItem(this.STORAGE_KEYS.METRICS)) {
      const initialMetrics = {
        co2SavedKg: 18.4,
        moneySavedEur: 142.80,
        mealsRescued: 23,
        streakDays: 14
      };
      this.save(this.STORAGE_KEYS.METRICS, initialMetrics);
    }
  }

  // --- Core Persistence Helpers ---
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('fridgeflow:statechange', { detail: { key, data } }));

      // Auto-sync state changes to Cloud Firestore
      if (window.firebaseDB && typeof window.firebaseDB.syncAppState === 'function') {
        const stateKeyEntry = Object.entries(this.STORAGE_KEYS).find(([name, val]) => val === key);
        if (stateKeyEntry) {
          window.firebaseDB.syncAppState(stateKeyEntry[0].toLowerCase(), data);
        }
      }
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
    }
  }

  // --- Planner Config & Target Protein Methods ---
  getPlannerConfig() {
    const raw = this.get(this.STORAGE_KEYS.PLANNER_CONFIG, {
      daysPerWeek: 5,
      weeksCount: 1,
      daysCount: 5,
      proteinTarget: 120,
      includeBreakfast: false
    });

    const daysPerWeek = raw.daysPerWeek || (raw.daysCount && raw.daysCount <= 7 ? raw.daysCount : 5);
    const weeksCount = raw.weeksCount || 1;
    const daysCount = daysPerWeek * weeksCount;

    return {
      daysPerWeek,
      weeksCount,
      daysCount,
      proteinTarget: raw.proteinTarget || 120,
      includeBreakfast: !!raw.includeBreakfast
    };
  }

  savePlannerConfig(config) {
    if (config.daysPerWeek && config.weeksCount) {
      config.daysCount = config.daysPerWeek * config.weeksCount;
    }
    this.save(this.STORAGE_KEYS.PLANNER_CONFIG, config);
  }

  // --- Custom AI Recipes Management ---
  getCustomRecipes() {
    return this.get(this.STORAGE_KEYS.CUSTOM_RECIPES, []);
  }

  saveCustomRecipe(recipe) {
    const customList = this.getCustomRecipes();
    const existingIdx = customList.findIndex(r => r.id === recipe.id);
    if (existingIdx !== -1) {
      customList[existingIdx] = recipe;
    } else {
      customList.unshift(recipe);
    }
    this.save(this.STORAGE_KEYS.CUSTOM_RECIPES, customList);
    this.syncRecipesCatalog();

    // Persist immediately to Cloud Firestore
    if (window.firebaseDB && typeof window.firebaseDB.saveRecipe === 'function') {
      window.firebaseDB.saveRecipe(recipe);
    }
  }

  deleteCustomRecipe(recipeId) {
    let customList = this.getCustomRecipes();
    customList = customList.filter(r => r.id !== recipeId);
    this.save(this.STORAGE_KEYS.CUSTOM_RECIPES, customList);
    this.syncRecipesCatalog();

    // Delete in Cloud Firestore
    if (window.firebaseDB && typeof window.firebaseDB.deleteRecipe === 'function') {
      window.firebaseDB.deleteRecipe(recipeId);
    }
  }

  syncRecipesCatalog() {
    if (typeof window === 'undefined' || !window.FridgeData) return;
    const customList = this.getCustomRecipes();
    
    // Base static recipes
    if (!window._masterStaticRecipes) {
      window._masterStaticRecipes = Array.isArray(window.FridgeData.recipes) ? [...window.FridgeData.recipes] : [];
    }
    
    // Deduplicate by ID: custom recipes have priority
    const recipeMap = new Map();
    customList.forEach(r => recipeMap.set(r.id, r));
    window._masterStaticRecipes.forEach(r => {
      if (!recipeMap.has(r.id)) {
        recipeMap.set(r.id, r);
      }
    });

    window.FridgeData.recipes = Array.from(recipeMap.values());
  }

  // --- Pantry Inventory Management ---
  getPantry() {
    return this.get(this.STORAGE_KEYS.PANTRY, []);
  }

  addPantryItem(itemData) {
    const pantry = this.getPantry();
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(now.getDate() + (itemData.daysToExpiry || 7));

    const newItem = {
      instanceId: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      id: itemData.id,
      name: itemData.name || this.getIngredientName(itemData.id),
      category: itemData.category || this.getIngredientCategory(itemData.id),
      qty: itemData.qty || 1,
      unit: itemData.unit || 'uds',
      location: itemData.location || 'fridge', // fridge | pantry | freezer
      addedAt: now.toISOString(),
      expiresAt: expiryDate.toISOString(),
      daysToExpiry: itemData.daysToExpiry || 7
    };

    pantry.push(newItem);
    this.save(this.STORAGE_KEYS.PANTRY, pantry);
    return newItem;
  }

  removePantryItem(instanceId) {
    let pantry = this.getPantry();
    pantry = pantry.filter(item => item.instanceId !== instanceId && item.id !== instanceId);
    this.save(this.STORAGE_KEYS.PANTRY, pantry);
  }

  updatePantryItem(instanceId, updates) {
    const pantry = this.getPantry();
    const idx = pantry.findIndex(item => item.instanceId === instanceId || item.id === instanceId);
    if (idx !== -1) {
      pantry[idx] = { ...pantry[idx], ...updates };
      this.save(this.STORAGE_KEYS.PANTRY, pantry);
      return pantry[idx];
    }
    return null;
  }

  loadPreset(presetKey, triggerNotify = true) {
    if (!window.FridgeData || !window.FridgeData.presets[presetKey]) return;
    const preset = window.FridgeData.presets[presetKey];
    const items = preset.items.map(p => {
      const now = new Date();
      const expiry = new Date();
      expiry.setDate(now.getDate() + p.daysToExpiry);
      return {
        instanceId: 'preset_' + p.id + '_' + Math.random().toString(36).substr(2, 5),
        id: p.id,
        name: this.getIngredientName(p.id),
        category: this.getIngredientCategory(p.id),
        qty: p.qty,
        unit: p.unit,
        location: p.location,
        addedAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
        daysToExpiry: p.daysToExpiry
      };
    });

    this.save(this.STORAGE_KEYS.PANTRY, items);
    if (triggerNotify && typeof window.showToast === 'function') {
      window.showToast(`✨ Cargada plantilla: ${preset.name}`, 'emerald');
    }
  }

  clearPantry() {
    this.save(this.STORAGE_KEYS.PANTRY, []);
  }

  // --- Meal Planner Methods ---
  getMealPlan() {
    let plan = this.get(this.STORAGE_KEYS.MEAL_PLAN);
    if (!plan || Object.keys(plan).length === 0) {
      const config = this.getPlannerConfig();
      plan = this.generateProteinPlan(config.daysCount, config.proteinTarget, config.includeBreakfast);
    }
    return plan;
  }

  setMealSlot(dayKey, slot, recipeId) {
    const plan = this.getMealPlan();
    if (!plan[dayKey]) plan[dayKey] = {};
    plan[dayKey][slot] = recipeId;
    this.save(this.STORAGE_KEYS.MEAL_PLAN, plan);
  }

  clearMealSlot(dayKey, slot) {
    const plan = this.getMealPlan();
    if (plan[dayKey]) {
      plan[dayKey][slot] = null;
      this.save(this.STORAGE_KEYS.MEAL_PLAN, plan);
    }
  }

  saveMealPlan(plan) {
    this.save(this.STORAGE_KEYS.MEAL_PLAN, plan);
  }

  // --- High-Protein Intelligent Menu Generator ---
  generateProteinPlan(daysCount = 5, proteinTarget = 120, includeBreakfast = false) {
    const recipes = (window.FridgeData && window.FridgeData.recipes) ? window.FridgeData.recipes : [];
    if (recipes.length === 0) return {};

    const lunchPool = recipes.filter(r => r.category === 'almuerzo' || r.category === 'cena');
    const dinnerPool = recipes.filter(r => r.category === 'cena' || r.category === 'almuerzo');
    const breakfastPool = recipes.filter(r => r.category === 'desayuno' || r.category === 'snack');

    // Sort by protein descending for high-protein pairings
    const sortedLunches = [...lunchPool].sort((a, b) => (b.protein || 0) - (a.protein || 0));
    const sortedDinners = [...dinnerPool].sort((a, b) => (b.protein || 0) - (a.protein || 0));
    const sortedBreakfasts = [...breakfastPool].sort((a, b) => (b.protein || 0) - (a.protein || 0));

    const newPlan = {};

    for (let i = 1; i <= daysCount; i++) {
      const dayKey = `day_${i}`;
      newPlan[dayKey] = {};

      let bRecipe = null;
      let bProt = 0;
      if (includeBreakfast && sortedBreakfasts.length > 0) {
        bRecipe = sortedBreakfasts[(i - 1) % sortedBreakfasts.length];
        bProt = bRecipe.protein || 0;
        newPlan[dayKey].breakfast = bRecipe.id;
      }

      // Remaining protein needed from Lunch + Dinner
      const neededFromMeals = Math.max(0, proteinTarget - bProt);

      // Select lunch and dinner that satisfy or get as close as possible to the target
      let bestLunch = sortedLunches[(i - 1) % sortedLunches.length];
      let bestDinner = sortedDinners[i % sortedDinners.length];
      let bestDiff = 999;

      // Try permutations to find diverse optimal high-protein pairing
      for (let lIdx = 0; lIdx < Math.min(12, sortedLunches.length); lIdx++) {
        const lCandidate = sortedLunches[(i - 1 + lIdx) % sortedLunches.length];
        for (let dIdx = 0; dIdx < Math.min(12, sortedDinners.length); dIdx++) {
          const dCandidate = sortedDinners[(i + dIdx) % sortedDinners.length];
          if (lCandidate.id === dCandidate.id) continue;

          const totalP = (lCandidate.protein || 0) + (dCandidate.protein || 0);
          if (totalP >= neededFromMeals) {
            bestLunch = lCandidate;
            bestDinner = dCandidate;
            bestDiff = totalP - neededFromMeals;
            break;
          }
        }
        if (bestDiff < 20 && bestLunch && bestDinner) break;
      }

      newPlan[dayKey].lunch = bestLunch ? bestLunch.id : sortedLunches[0].id;
      newPlan[dayKey].dinner = bestDinner ? bestDinner.id : sortedDinners[1].id;
    }

    this.save(this.STORAGE_KEYS.MEAL_PLAN, newPlan);
    return newPlan;
  }

  // --- Favorites Management ---
  getFavorites() {
    return this.get(this.STORAGE_KEYS.FAVORITES, []);
  }

  isFavorite(recipeId) {
    const favs = this.getFavorites();
    return favs.includes(recipeId);
  }

  toggleFavorite(recipeId) {
    let favs = this.getFavorites();
    if (favs.includes(recipeId)) {
      favs = favs.filter(id => id !== recipeId);
    } else {
      favs.push(recipeId);
    }
    this.save(this.STORAGE_KEYS.FAVORITES, favs);
    return favs.includes(recipeId);
  }

  // --- Meal Plan Helper: Duplicate / Batch Copy ---
  duplicateMeal(sourceDayKey, slot, targetDayKey, targetSlot = null) {
    const plan = this.getMealPlan();
    if (!plan[sourceDayKey] || !plan[sourceDayKey][slot]) return false;
    const recipeId = plan[sourceDayKey][slot];
    if (!plan[targetDayKey]) plan[targetDayKey] = {};
    plan[targetDayKey][targetSlot || slot] = recipeId;
    this.saveMealPlan(plan);
    return true;
  }

  // --- Consolidated Smart Shopping Cart Methods ---
  getCartCheckedMap() {
    return this.get(this.STORAGE_KEYS.CART_CHECKED, {});
  }

  setCartItemChecked(itemKey, isChecked) {
    const map = this.getCartCheckedMap();
    map[itemKey] = !!isChecked;
    this.save(this.STORAGE_KEYS.CART_CHECKED, map);
  }

  clearCartChecks() {
    this.save(this.STORAGE_KEYS.CART_CHECKED, {});
  }

  getCartExcludedMap() {
    return this.get(this.STORAGE_KEYS.CART_EXCLUDED, {});
  }

  setCartItemExcluded(itemKey, isExcluded) {
    const map = this.getCartExcludedMap();
    map[itemKey] = !!isExcluded;
    this.save(this.STORAGE_KEYS.CART_EXCLUDED, map);
  }

  isCartItemExcluded(itemKey) {
    const map = this.getCartExcludedMap();
    return !!map[itemKey];
  }

  getConsolidatedCart() {
    const plan = this.getMealPlan();
    const recipes = (window.FridgeData && window.FridgeData.recipes) ? window.FridgeData.recipes : [];
    const ingredientsCatalog = (window.FridgeData && window.FridgeData.ingredients) ? window.FridgeData.ingredients : [];
    const checkedMap = this.getCartCheckedMap();
    const excludedMap = this.getCartExcludedMap();

    const consolidatedMap = new Map();

    Object.entries(plan).forEach(([dayKey, dayMeals]) => {
      Object.entries(dayMeals).forEach(([slot, recipeId]) => {
        if (!recipeId) return;
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe || !recipe.ingredients) return;

        recipe.ingredients.forEach(ing => {
          const ingMeta = ingredientsCatalog.find(i => i.id === ing.id) || {
            name: ing.name,
            category: 'condiments',
            emoji: '🛒',
            estimatedPrice: 2500,
            unit: ing.unit || 'uds'
          };

          const key = ing.id || ing.name.toLowerCase().trim();
          const numericAmount = parseFloat(ing.amount) || 1;
          const currentPrice = this.getIngredientPrice(key);

          if (!consolidatedMap.has(key)) {
            consolidatedMap.set(key, {
              id: key,
              name: ingMeta.name || ing.name,
              category: ingMeta.category || 'despensa',
              emoji: ingMeta.emoji || '🛒',
              totalAmount: numericAmount,
              unit: ing.unit || ingMeta.unit || 'uds',
              estimatedPrice: currentPrice,
              usedInRecipes: [recipe.title],
              isChecked: !!checkedMap[key],
              isExcluded: !!excludedMap[key]
            });
          } else {
            const entry = consolidatedMap.get(key);
            entry.totalAmount += numericAmount;
            if (!entry.usedInRecipes.includes(recipe.title)) {
              entry.usedInRecipes.push(recipe.title);
            }
          }
        });
      });
    });

    const items = Array.from(consolidatedMap.values());
    const activeItems = items.filter(i => !i.isExcluded);

    // Calculate total price and active total in ARS
    const estimatedTotal = items.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
    const activeEstimatedTotal = activeItems.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
    const checkedCount = items.filter(i => i.isChecked).length;
    const excludedCount = items.filter(i => i.isExcluded).length;
    const pendingCount = items.filter(i => !i.isChecked && !i.isExcluded).length;

    // Group by category
    const categories = {
      proteins: { title: '🥩 Carnicería, Pescados & Proteínas', items: [] },
      dairy: { title: '🧀 Lácteos & Huevos', items: [] },
      vegetables: { title: '🥬 Frutería & Verduras Frescas', items: [] },
      grains: { title: '🌾 Cereales, Pastas & Panadería', items: [] },
      condiments: { title: '🫒 Despensa, Aceites & Especias', items: [] }
    };

    items.forEach(item => {
      const cat = categories[item.category] ? item.category : 'condiments';
      categories[cat].items.push(item);
    });

    const config = this.getPlannerConfig();
    const totalMeals = config.daysCount * (config.includeBreakfast ? 3 : 2);
    const dailyAverage = config.daysCount > 0 ? Math.round(activeEstimatedTotal / config.daysCount) : 0;
    const mealAverage = totalMeals > 0 ? Math.round(activeEstimatedTotal / totalMeals) : 0;

    return {
      items,
      activeItems,
      categories,
      totalCount: items.length,
      activeCount: activeItems.length,
      checkedCount,
      excludedCount,
      pendingCount,
      estimatedTotal: Math.round(estimatedTotal),
      activeEstimatedTotal: Math.round(activeEstimatedTotal),
      dailyAverage,
      mealAverage,
      currency: 'ARS',
      currencySymbol: '$',
      weeksCount: config.weeksCount,
      daysPerWeek: config.daysPerWeek,
      daysCount: config.daysCount,
      totalMeals
    };
  }

  // --- Missing Ingredients / Smart Shopping List Calculation ---
  getShoppingList() {
    const plan = this.getMealPlan();
    const pantry = this.getPantry();
    const pantryIds = new Set(pantry.map(item => item.id));
    const needed = new Map();

    Object.values(plan).forEach(day => {
      Object.values(day).forEach(recipeId => {
        if (!recipeId) return;
        const recipe = window.FridgeData.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        recipe.ingredients.forEach(ing => {
          if (!pantryIds.has(ing.id)) {
            if (needed.has(ing.id)) {
              needed.get(ing.id).count += 1;
            } else {
              needed.set(ing.id, {
                id: ing.id,
                name: ing.name,
                unit: ing.unit,
                count: 1,
                category: this.getIngredientCategory(ing.id),
                estimatedPrice: this.getIngredientPrice(ing.id)
              });
            }
          }
        });
      });
    });

    return Array.from(needed.values());
  }

  // --- Cooking Completion & Impact Ledger ---
  recordCompletedMeal(recipeId) {
    const recipe = window.FridgeData.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Deduct available ingredients from pantry
    const pantry = this.getPantry();
    recipe.ingredients.forEach(ing => {
      const itemIdx = pantry.findIndex(p => p.id === ing.id);
      if (itemIdx !== -1) {
        // Decrease quantity or remove if low
        pantry.splice(itemIdx, 1);
      }
    });
    this.save(this.STORAGE_KEYS.PANTRY, pantry);

    // Update cumulative impact metrics
    const metrics = this.get(this.STORAGE_KEYS.METRICS, {
      co2SavedKg: 0,
      moneySavedEur: 0,
      mealsRescued: 0,
      streakDays: 1
    });

    metrics.co2SavedKg = +(metrics.co2SavedKg + (recipe.co2Saved || 1.5)).toFixed(1);
    metrics.moneySavedEur = +(metrics.moneySavedEur + (recipe.moneySaved || 10.0)).toFixed(2);
    metrics.mealsRescued += 1;
    this.save(this.STORAGE_KEYS.METRICS, metrics);

    // Add to history
    const history = this.get(this.STORAGE_KEYS.HISTORY, []);
    history.unshift({
      recipeId: recipe.id,
      title: recipe.title,
      date: new Date().toISOString(),
      co2Saved: recipe.co2Saved,
      moneySaved: recipe.moneySaved
    });
    this.save(this.STORAGE_KEYS.HISTORY, history.slice(0, 50));
  }

  // --- Utility Lookups ---
  getIngredientName(id) {
    const ing = window.FridgeData ? window.FridgeData.ingredients.find(i => i.id === id) : null;
    return ing ? ing.name : id.replace(/_/g, ' ');
  }

  getIngredientCategory(id) {
    const ing = window.FridgeData ? window.FridgeData.ingredients.find(i => i.id === id) : null;
    return ing ? ing.category : 'otros';
  }

  // --- Custom ARS Prices & Insumos Management ---
  getCustomPrices() {
    return this.get(this.STORAGE_KEYS.CUSTOM_PRICES, {});
  }

  saveCustomPrices(pricesMap) {
    this.save(this.STORAGE_KEYS.CUSTOM_PRICES, pricesMap);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('fridgeflow:priceschange', { detail: pricesMap }));
    }
  }

  setIngredientPrice(id, price) {
    const prices = this.getCustomPrices();
    const cleanPrice = Math.max(0, Math.round(Number(price) || 0));
    prices[id] = cleanPrice;
    this.saveCustomPrices(prices);
    return cleanPrice;
  }

  removeCustomIngredientPrice(id) {
    const prices = this.getCustomPrices();
    delete prices[id];
    this.saveCustomPrices(prices);
  }

  resetAllPricesToDefault() {
    this.saveCustomPrices({});
  }

  adjustPricesByPercentage(percent) {
    const multiplier = 1 + (Number(percent) / 100);
    const prices = this.getCustomPrices();
    const catalog = (window.FridgeData && window.FridgeData.ingredients) ? window.FridgeData.ingredients : [];
    
    catalog.forEach(ing => {
      const currentPrice = this.getIngredientPrice(ing.id);
      prices[ing.id] = Math.max(0, Math.round(currentPrice * multiplier));
    });
    
    this.saveCustomPrices(prices);
    return prices;
  }

  isIngredientCustomPrice(id) {
    const custom = this.getCustomPrices();
    return !!(custom && custom[id] !== undefined && custom[id] !== null && custom[id] !== '');
  }

  getDefaultIngredientPrice(id) {
    const ing = window.FridgeData ? window.FridgeData.ingredients.find(i => i.id === id) : null;
    return ing ? (ing.estimatedPriceARS || ing.estimatedPrice || 2500) : 2500;
  }

  getIngredientPrice(id) {
    const custom = this.getCustomPrices();
    if (custom && custom[id] !== undefined && custom[id] !== null && custom[id] !== '') {
      return parseFloat(custom[id]) || 0;
    }
    const ing = window.FridgeData ? window.FridgeData.ingredients.find(i => i.id === id) : null;
    if (ing) {
      return ing.estimatedPriceARS || ing.estimatedPrice || 2500;
    }
    return 2500;
  }

  // --- Local Backup & Migration Engine ---
  exportBackupData() {
    const backup = {
      app: 'FridgeFlow',
      version: '3.5',
      exportedAt: new Date().toISOString(),
      data: {}
    };

    Object.entries(this.STORAGE_KEYS).forEach(([name, key]) => {
      backup.data[name] = this.get(key, null);
    });

    return JSON.stringify(backup, null, 2);
  }

  importBackupData(jsonString) {
    try {
      const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (!parsed || !parsed.data) {
        throw new Error('Formato de copia de seguridad no válido');
      }

      Object.entries(this.STORAGE_KEYS).forEach(([name, key]) => {
        if (parsed.data[name] !== undefined && parsed.data[name] !== null) {
          this.save(key, parsed.data[name]);
        }
      });

      this.syncRecipesCatalog();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('fridgeflow:statechange', { detail: { action: 'backup_imported' } }));
        window.dispatchEvent(new CustomEvent('fridgeflow:priceschange', { detail: this.getCustomPrices() }));
      }
      return { success: true, message: 'Copia de seguridad restaurada correctamente' };
    } catch (e) {
      console.error('Error importing backup:', e);
      return { success: false, error: e.message };
    }
  }
}

// Attach globally
const fridgeStore = new FridgeStorageManager();
if (typeof window !== 'undefined') {
  window.fridgeStore = fridgeStore;
}
