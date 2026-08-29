/* ==========================================================================
   FRIDGEFLOW - RECIPE MATCHER, CATALOG & AI CREATOR CONTROLLER
   Dynamic Match Algorithm, Multi-Filter Engine & AI Recipe Generation Flow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRecipesPage();

  // Listen for storage changes
  window.addEventListener('fridgeflow:statechange', () => {
    renderRecipes();
  });
});

let currentCategoryFilter = 'all';
let currentDietFilter = 'all';
let currentSort = 'protein'; // protein | match | time | calories
let currentSearchQuery = '';
let tempGeneratedRecipe = null;

function initRecipesPage() {
  if (fridgeStore && fridgeStore.syncRecipesCatalog) {
    fridgeStore.syncRecipesCatalog();
  }
  renderRecipes();
  initFilters();
  checkUrlParams();
}

function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const highlightId = params.get('highlight');
  if (highlightId) {
    setTimeout(() => {
      openRecipeModal(highlightId);
    }, 200);
  }

  const filterIngredientsStr = params.get('filterIngredients') || params.get('filterIngredient');
  if (filterIngredientsStr) {
    const ids = filterIngredientsStr.split(',').map(s => s.trim().toLowerCase());
    window.activeIngredientFilters = ids;
    window.showToast(`🎯 Filtrando recetas con: ${ids.join(', ')}`, 'emerald');
    renderRecipes();
  }
}

function initFilters() {
  // Live search input
  const searchInput = document.getElementById('recipes-live-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      renderRecipes();
    });
  }

  // Category buttons
  const catBtns = document.querySelectorAll('.recipe-cat-filter');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-ghost');
      });
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-ghost');
      currentCategoryFilter = btn.dataset.cat;
      renderRecipes();
      if (window.soundFX) window.soundFX.playClick();
    });
  });

  // Dietary tags
  const dietBtns = document.querySelectorAll('.recipe-diet-filter');
  dietBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dietBtns.forEach(b => {
        b.classList.remove('active', 'badge-emerald');
        b.classList.add('badge-muted');
      });
      btn.classList.add('active', 'badge-emerald');
      btn.classList.remove('badge-muted');
      currentDietFilter = btn.dataset.diet;
      renderRecipes();
      if (window.soundFX) window.soundFX.playClick();
    });
  });

  // Sort select
  const sortSelect = document.getElementById('recipes-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderRecipes();
      if (window.soundFX) window.soundFX.playClick();
    });
  }
}

// 1. Calculate Match Score against Current Pantry
function calculateRecipeMatch(recipe, pantry) {
  const pantryIds = new Set((pantry || []).map(i => i.id));
  let totalRequired = 0;
  let matchedCount = 0;
  const missing = [];
  const substituted = [];

  if (recipe.ingredients && recipe.ingredients.length > 0) {
    recipe.ingredients.forEach(ing => {
      if (ing.isOptional) return;
      totalRequired++;

      if (pantryIds.has(ing.id)) {
        matchedCount++;
      } else {
        missing.push(ing.name);
      }
    });
  }

  const percentage = totalRequired > 0 ? Math.min(100, Math.round((matchedCount / totalRequired) * 100)) : 100;
  return { percentage, missing, substituted, totalRequired };
}

window.toggleRecipeFav = function(recipeId) {
  const isFav = fridgeStore.toggleFavorite(recipeId);
  if (window.soundFX) window.soundFX.playClick();
  if (window.showToast) {
    window.showToast(isFav ? '❤️ Receta añadida a tus favoritas' : '🤍 Receta quitada de favoritas', 'emerald');
  }
  renderRecipes();
};

// 2. Render Recipes Grid
function renderRecipes() {
  const container = document.getElementById('recipes-grid-container');
  if (!container || !window.FridgeData) return;

  const pantry = fridgeStore.getPantry();
  let list = window.FridgeData.recipes.map(recipe => {
    const match = calculateRecipeMatch(recipe, pantry);
    return { ...recipe, matchScore: match.percentage, missing: match.missing, substituted: match.substituted };
  });

  // Filter Live Search
  if (currentSearchQuery) {
    list = list.filter(r => {
      const titleMatch = r.title.toLowerCase().includes(currentSearchQuery);
      const subMatch = (r.subtitle || '').toLowerCase().includes(currentSearchQuery);
      const descMatch = (r.description || '').toLowerCase().includes(currentSearchQuery);
      const tagMatch = r.tags && r.tags.some(t => t.toLowerCase().includes(currentSearchQuery));
      const ingMatch = r.ingredients && r.ingredients.some(i => i.name.toLowerCase().includes(currentSearchQuery) || (i.id && i.id.toLowerCase().includes(currentSearchQuery)));
      return titleMatch || subMatch || descMatch || tagMatch || ingMatch;
    });
  }

  // Filter Category
  if (currentCategoryFilter !== 'all') {
    if (currentCategoryFilter === 'custom') {
      list = list.filter(r => r.isCustom === true);
    } else {
      list = list.filter(r => r.category === currentCategoryFilter);
    }
  }

  // Filter Diet / Quick Filters
  if (currentDietFilter !== 'all') {
    if (currentDietFilter === 'favoritas') {
      list = list.filter(r => fridgeStore.isFavorite(r.id));
    } else if (currentDietFilter === 'Express') {
      list = list.filter(r => ((r.prepTime || 10) + (r.cookTime || 10)) <= 20);
    } else if (currentDietFilter === 'UltraProtein') {
      list = list.filter(r => (r.protein || 0) >= 40);
    } else if (currentDietFilter === 'Rico en Proteína') {
      list = list.filter(r => (r.protein || 0) >= 30);
    } else if (currentDietFilter === 'Creada con IA') {
      list = list.filter(r => r.isCustom === true || (r.tags && r.tags.some(t => t.includes('IA'))));
    } else {
      list = list.filter(r => r.tags && r.tags.some(t => t.toLowerCase() === currentDietFilter.toLowerCase()));
    }
  }

  // Filter Specific Ingredients (Alchemy Pot / URL param)
  if (window.activeIngredientFilters && window.activeIngredientFilters.length > 0) {
    list = list.filter(r => {
      return window.activeIngredientFilters.some(ingId => 
        r.ingredients && r.ingredients.some(ri => ri.id.toLowerCase().includes(ingId) || ingId.includes(ri.id.toLowerCase()))
      );
    });
  }

  // Sorting
  if (currentSort === 'protein') {
    list.sort((a, b) => (b.protein || 0) - (a.protein || 0));
  } else if (currentSort === 'match') {
    list.sort((a, b) => b.matchScore - a.matchScore);
  } else if (currentSort === 'time') {
    list.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
  } else if (currentSort === 'calories') {
    list.sort((a, b) => a.calories - b.calories);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-glass-card); border-radius: var(--radius-lg);">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🍳</div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No encontramos recetas con estos filtros</h3>
        <p style="font-size: 0.9rem; margin-bottom: 1.25rem;">Prueba seleccionando otra categoría o crea una receta nueva con IA.</p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button onclick="resetFilters()" class="btn btn-secondary btn-sm">✨ Mostrar Todas</button>
          <button onclick="openAICreatorModal()" class="btn btn-primary btn-sm">🤖 Crear Receta con IA</button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(recipe => {
    const isFav = fridgeStore.isFavorite(recipe.id);
    return `
      <div class="glass-panel glass-panel-interactive glow-card" style="display: flex; flex-direction: column; overflow: hidden; padding: 0; border-radius: 20px;">
        <!-- Recipe Card Image Header -->
        <div style="position: relative; width: 100%; height: 210px; overflow: hidden; background: #161A20;">
          <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
          
          <div style="position: absolute; top: 1rem; left: 1rem; display: flex; gap: 0.4rem; flex-wrap: wrap;">
            <span class="badge badge-emerald" style="box-shadow: 0 4px 12px rgba(0,0,0,0.5); font-weight: 800;">
              💪 ${recipe.protein}g Proteína
            </span>
            ${recipe.isCustom ? `
              <span class="badge badge-violet" style="box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                ✨ Creada con IA
              </span>
            ` : ''}
          </div>

          <!-- Favorite Heart Button -->
          <button onclick="event.stopPropagation(); toggleRecipeFav('${recipe.id}')" class="btn-icon" style="position: absolute; top: 0.75rem; right: 0.75rem; width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); color: ${isFav ? '#EF4444' : '#FFF'}; font-size: 1rem; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s ease;" title="${isFav ? 'Quitar de favoritas' : 'Guardar en favoritas'}">
            ${isFav ? '❤️' : '🤍'}
          </button>

          <div style="position: absolute; bottom: 0.75rem; right: 0.75rem; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); padding: 0.25rem 0.65rem; border-radius: var(--radius-full); font-size: 0.75rem; font-family: var(--font-mono); color: #FFF;">
            ⏱️ ${recipe.prepTime + recipe.cookTime} min
          </div>
        </div>

        <!-- Recipe Content -->
        <div style="padding: 1.35rem; display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent-emerald); text-transform: uppercase;">
                ${recipe.category === 'desayuno' ? '☀️ Desayuno' : (recipe.category === 'cena' ? '🌙 Cena' : '🍲 Almuerzo')}
              </span>
              ${recipe.isCustom ? `
                <button onclick="event.stopPropagation(); deleteCustomRecipe('${recipe.id}')" class="btn-icon" style="color: var(--accent-coral); font-size: 0.8rem; padding: 0.2rem 0.4rem;" title="Eliminar receta">
                  🗑️
                </button>
              ` : ''}
            </div>

            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem; line-height: 1.25; color: #FFF;">${recipe.title}</h3>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
              ${recipe.subtitle || recipe.description}
            </p>
          </div>

          <!-- Footer Actions -->
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem; margin-top: 0.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-tertiary);">
              🔥 ${recipe.calories} kcal
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-secondary btn-sm" onclick="openRecipeModal('${recipe.id}')">Ver Detalle →</button>
              <a href="cook.html?recipe=${recipe.id}" class="btn btn-primary btn-sm">👨‍🍳 Cocinar</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Open Detailed Recipe Modal with Interactive Checklist & Launch Cook HUD
window.openRecipeModal = function(recipeId) {
  const recipe = window.FridgeData.recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const pantry = fridgeStore.getPantry();
  const pantryIds = new Set(pantry.map(i => i.id));
  const match = calculateRecipeMatch(recipe, pantry);

  let modal = document.getElementById('recipe-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'recipe-detail-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 820px; padding: 0; overflow: hidden; border-radius: 24px; border: 1px solid var(--border-strong);">
      <!-- Modal Header Banner -->
      <div style="position: relative; width: 100%; height: 260px; background: #000;">
        <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;" />
        <button class="btn-icon modal-close" onclick="closeRecipeModal()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.6); color: #FFF; border: none;">✕</button>
        <div style="position: absolute; bottom: 1.25rem; left: 1.5rem; right: 1.5rem;">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-emerald">💪 ${recipe.protein}g Proteína</span>
            <span class="badge badge-muted">⏱️ ${recipe.prepTime + recipe.cookTime} min</span>
            <span class="badge badge-muted">👨‍🍳 Dificultad: ${recipe.difficulty}</span>
            ${recipe.isCustom ? `<span class="badge badge-violet">✨ Creada con IA</span>` : ''}
          </div>
          <h2 style="color: #FFF; font-size: clamp(1.4rem, 2.5vw, 1.9rem); line-height: 1.15; margin: 0;">${recipe.title}</h2>
        </div>
      </div>

      <!-- Modal Body -->
      <div style="padding: 2rem; max-height: 60vh; overflow-y: auto;">
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
          ${recipe.description}
        </p>

        <!-- Macro breakdown cards -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 1.75rem; text-align: center;">
          <div class="glass-panel" style="padding: 0.75rem; border-radius: 12px;">
            <div style="font-size: 0.75rem; color: var(--text-tertiary);">Calorías</div>
            <div style="font-family: var(--font-mono); font-weight: 700; font-size: 1.15rem; color: var(--accent-amber);">${recipe.calories}</div>
          </div>
          <div class="glass-panel" style="padding: 0.75rem; border-radius: 12px;">
            <div style="font-size: 0.75rem; color: var(--text-tertiary);">Proteína</div>
            <div style="font-family: var(--font-mono); font-weight: 700; font-size: 1.15rem; color: var(--accent-emerald);">${recipe.protein}g</div>
          </div>
          <div class="glass-panel" style="padding: 0.75rem; border-radius: 12px;">
            <div style="font-size: 0.75rem; color: var(--text-tertiary);">Carbohidratos</div>
            <div style="font-family: var(--font-mono); font-weight: 700; font-size: 1.15rem; color: var(--accent-sky);">${recipe.carbs}g</div>
          </div>
          <div class="glass-panel" style="padding: 0.75rem; border-radius: 12px;">
            <div style="font-size: 0.75rem; color: var(--text-tertiary);">Grasas</div>
            <div style="font-family: var(--font-mono); font-weight: 700; font-size: 1.15rem; color: var(--accent-violet);">${recipe.fat}g</div>
          </div>
        </div>

        <!-- Ingredients Checklist -->
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.85rem; font-weight: 700;">
            📋 Ingredientes Requeridos (${recipe.servings} raciones)
          </h4>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${(recipe.ingredients || []).map(ing => {
              return `
                <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-elevated); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <span style="font-size: 1.2rem;">🛒</span>
                    <span style="font-weight: 600; color: var(--text-primary); font-size: 0.92rem;">${ing.name}</span>
                  </div>
                  <span class="badge badge-muted" style="font-family: var(--font-mono); font-size: 0.8rem;">${ing.amount} ${ing.unit}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Modal Footer Launch Action -->
      <div style="padding: 1.25rem 2rem; background: var(--bg-elevated); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
        <button class="btn btn-secondary" onclick="addToMealPlannerQuick('${recipe.id}')">📅 Asignar al Planificador</button>
        <a href="cook.html?recipe=${recipe.id}" class="btn btn-primary btn-lg">
          🍳 Iniciar Modo Cocina HUD →
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  if (window.soundFX) window.soundFX.playFridgePop();
};

window.closeRecipeModal = function() {
  const modal = document.getElementById('recipe-detail-modal');
  if (modal) modal.classList.remove('active');
};

window.resetFilters = function() {
  currentCategoryFilter = 'all';
  currentDietFilter = 'all';
  window.activeIngredientFilters = [];
  
  const catBtns = document.querySelectorAll('.recipe-cat-filter');
  catBtns.forEach(b => {
    b.classList.remove('active', 'btn-primary');
    b.classList.add('btn-ghost');
    if (b.dataset.cat === 'all') {
      b.classList.add('active', 'btn-primary');
      b.classList.remove('btn-ghost');
    }
  });

  const dietBtns = document.querySelectorAll('.recipe-diet-filter');
  dietBtns.forEach(b => {
    b.classList.remove('active', 'badge-emerald');
    b.classList.add('badge-muted');
    if (b.dataset.diet === 'all') {
      b.classList.add('active', 'badge-emerald');
      b.classList.remove('badge-muted');
    }
  });

  renderRecipes();
  if (window.soundFX) window.soundFX.playClick();
};

window.addToMealPlannerQuick = function(recipeId) {
  fridgeStore.setMealSlot('day_1', 'lunch', recipeId);
  closeRecipeModal();
  if (window.soundFX) window.soundFX.playFanfare();
  window.showToast('📅 Receta añadida al Día 1 en tu Planificador Semanal', 'emerald');
};

// ==========================================================================
// 4. AI RECIPE CREATOR MODAL CONTROLLER & MULTI-STAGE GENERATION
// ==========================================================================

let uploadedImageDataUrl = null;
let uploadedImageName = '';

window.handleAIImageSelect = function(e) {
  const file = e.target.files && e.target.files[0];
  if (file) processUploadedAIImage(file);
};

function processUploadedAIImage(file) {
  if (!file.type.startsWith('image/')) {
    window.showToast('Por favor selecciona un archivo de imagen válido (PNG, JPG, WebP)', 'amber');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;
    
    // Scale image if larger than 1000px to keep storage lightweight and fast
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const maxDim = 1000;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      uploadedImageDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      uploadedImageName = file.name || 'captura.jpg';

      // Update UI preview
      const placeholder = document.getElementById('ai-image-placeholder');
      const previewContainer = document.getElementById('ai-image-preview-container');
      const previewImg = document.getElementById('ai-image-preview-img');
      const previewName = document.getElementById('ai-image-preview-name');
      const statusBadge = document.getElementById('ai-image-status');

      if (placeholder) placeholder.style.display = 'none';
      if (previewContainer) previewContainer.style.display = 'flex';
      if (previewImg) previewImg.src = uploadedImageDataUrl;
      if (previewName) previewName.textContent = uploadedImageName;
      if (statusBadge) statusBadge.style.display = 'inline';

      // If dish name is empty, try to auto-fill friendly name
      const dishInput = document.getElementById('ai-dish-name');
      if (dishInput && !dishInput.value.trim()) {
        const cleanName = uploadedImageName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        if (cleanName && cleanName.length > 2 && !cleanName.toLowerCase().startsWith('image') && !cleanName.toLowerCase().startsWith('captura') && !cleanName.toLowerCase().startsWith('screenshot')) {
          dishInput.value = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        }
      }

      if (window.soundFX) window.soundFX.playClick();
      window.showToast('📸 Captura/foto cargada para el Chef IA', 'emerald');
    };
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

window.removeAIImage = function(e) {
  if (e) e.stopPropagation();
  uploadedImageDataUrl = null;
  uploadedImageName = '';
  
  const fileInput = document.getElementById('ai-dish-image-file');
  if (fileInput) fileInput.value = '';

  const placeholder = document.getElementById('ai-image-placeholder');
  const previewContainer = document.getElementById('ai-image-preview-container');
  const previewImg = document.getElementById('ai-image-preview-img');
  const statusBadge = document.getElementById('ai-image-status');

  if (placeholder) placeholder.style.display = 'block';
  if (previewContainer) previewContainer.style.display = 'none';
  if (previewImg) previewImg.src = '';
  if (statusBadge) statusBadge.style.display = 'none';
};

window.openAICreatorModal = function() {
  const modal = document.getElementById('ai-creator-modal');
  if (!modal) return;

  const formView = document.getElementById('ai-creator-form-view');
  const loadingView = document.getElementById('ai-creator-loading-view');
  const previewView = document.getElementById('ai-creator-preview-view');

  if (formView) formView.style.display = 'block';
  if (loadingView) loadingView.style.display = 'none';
  if (previewView) previewView.style.display = 'none';

  removeAIImage();

  modal.classList.add('active');
  const nameInput = document.getElementById('ai-dish-name');
  if (nameInput) {
    nameInput.value = '';
    setTimeout(() => nameInput.focus(), 150);
  }

  initAIDragAndPaste();
};

function initAIDragAndPaste() {
  const dropzone = document.getElementById('ai-image-dropzone');
  if (dropzone && !dropzone.dataset.hasListeners) {
    dropzone.dataset.hasListeners = 'true';

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.style.borderColor = 'var(--accent-emerald)';
        dropzone.style.background = 'rgba(16, 185, 129, 0.12)';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.style.borderColor = 'rgba(16, 185, 129, 0.35)';
        dropzone.style.background = 'rgba(0,0,0,0.25)';
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        processUploadedAIImage(files[0]);
      }
    });
  }

  // Paste handler for screenshots from clipboard (Ctrl+V)
  if (!window._aiPasteHandlerRegistered) {
    window._aiPasteHandlerRegistered = true;
    window.addEventListener('paste', (e) => {
      const modal = document.getElementById('ai-creator-modal');
      if (!modal || !modal.classList.contains('active')) return;

      const items = (e.clipboardData || window.clipboardData).items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            processUploadedAIImage(blob);
            break;
          }
        }
      }
    });
  }
}

window.closeAICreatorModal = function() {
  const modal = document.getElementById('ai-creator-modal');
  if (modal) modal.classList.remove('active');
};

window.handleAICreateSubmit = async function(e) {
  e.preventDefault();

  let dishName = document.getElementById('ai-dish-name').value.trim();
  const dishNotes = document.getElementById('ai-dish-notes').value.trim();
  const focusRadio = document.querySelector('input[name="ai-focus-radio"]:checked');
  const focus = focusRadio ? focusRadio.value : 'protein';

  if (!dishName && !uploadedImageDataUrl) {
    window.showToast('Por favor, escribe el nombre del plato o sube una foto / captura', 'amber');
    return;
  }

  if (!dishName && uploadedImageDataUrl) {
    dishName = uploadedImageName ? uploadedImageName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') : 'Plato Detectado por Foto';
    if (!dishName || dishName.length < 2) dishName = 'Creación Culinaria con Foto';
    dishName = dishName.charAt(0).toUpperCase() + dishName.slice(1);
  }

  const formView = document.getElementById('ai-creator-form-view');
  const loadingView = document.getElementById('ai-creator-loading-view');
  const previewView = document.getElementById('ai-creator-preview-view');

  formView.style.display = 'none';
  loadingView.style.display = 'block';
  previewView.style.display = 'none';

  const statusTitle = document.getElementById('ai-loading-status-title');
  const barFill = document.getElementById('ai-loading-bar-fill');

  try {
    const generated = await window.aiRecipeGenerator.generateRecipe(
      dishName,
      dishNotes,
      focus,
      (progress) => {
        if (statusTitle) statusTitle.textContent = progress.text;
        if (barFill) barFill.style.width = `${progress.step * 20}%`;
      },
      uploadedImageDataUrl
    );

    tempGeneratedRecipe = generated;
    renderAIPreview(generated);

    if (window.soundFX) window.soundFX.playFanfare();
    window.showToast(`✨ ¡Receta "${generated.title}" creada con éxito!`, 'emerald');

  } catch (err) {
    console.error('Error generating AI recipe:', err);
    window.showToast(err.message || 'Error al generar la receta', 'coral');
    formView.style.display = 'block';
    loadingView.style.display = 'none';
  }
};

function renderAIPreview(recipe) {
  const loadingView = document.getElementById('ai-creator-loading-view');
  const previewView = document.getElementById('ai-creator-preview-view');

  loadingView.style.display = 'none';
  previewView.style.display = 'block';

  previewView.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem; max-height: 75vh; overflow-y: auto; padding-right: 4px;">
      
      <!-- Recipe Card Preview Header -->
      <div style="display: flex; gap: 1.15rem; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: 18px;">
        <div style="position: relative; flex-shrink: 0;">
          <img id="ai-preview-dish-img" src="${recipe.image}" alt="${recipe.title}" style="width: 95px; height: 95px; border-radius: 16px; object-fit: cover; box-shadow: 0 6px 20px rgba(0,0,0,0.6); border: 1px solid rgba(16, 185, 129, 0.4);" />
          <button type="button" onclick="regenerateAIPreviewImage()" class="btn btn-ghost btn-sm" style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); font-size: 0.68rem; padding: 0.2rem 0.5rem; background: rgba(13, 17, 23, 0.95); border: 1px solid var(--accent-emerald); border-radius: 20px; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.4);" title="Generar otra variante de foto">
            🔄 Cambiar Foto
          </button>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
            <span class="badge badge-emerald">💪 ${recipe.protein}g Proteína</span>
            <span class="badge badge-muted">✨ Creada con IA</span>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0; color: #FFF; line-height: 1.3;">${recipe.title}</h3>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.35rem;">
            ⏱️ ${recipe.prepTime + recipe.cookTime} min · 🔥 ${recipe.calories} kcal · ${recipe.difficulty}
          </div>
        </div>
      </div>

      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin: 0; background: rgba(0,0,0,0.2); padding: 0.85rem 1rem; border-radius: 12px; border: 1px solid var(--border-subtle);">
        ${recipe.description}
      </p>

      <!-- Macro Summary Strip -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; text-align: center;">
        <div class="glass-panel" style="padding: 0.5rem 0.25rem;">
          <div style="font-size: 0.7rem; color: var(--text-tertiary);">Calorías</div>
          <div style="font-weight: 800; font-size: 1.05rem; color: var(--accent-amber);">${recipe.calories}</div>
        </div>
        <div class="glass-panel" style="padding: 0.5rem 0.25rem;">
          <div style="font-size: 0.7rem; color: var(--text-tertiary);">Proteína</div>
          <div style="font-weight: 800; font-size: 1.05rem; color: var(--accent-emerald);">${recipe.protein}g</div>
        </div>
        <div class="glass-panel" style="padding: 0.5rem 0.25rem;">
          <div style="font-size: 0.7rem; color: var(--text-tertiary);">Carbos</div>
          <div style="font-weight: 800; font-size: 1.05rem; color: var(--accent-sky);">${recipe.carbs}g</div>
        </div>
        <div class="glass-panel" style="padding: 0.5rem 0.25rem;">
          <div style="font-size: 0.7rem; color: var(--text-tertiary);">Grasas</div>
          <div style="font-weight: 800; font-size: 1.05rem; color: var(--accent-violet);">${recipe.fat}g</div>
        </div>
      </div>

      <!-- Ingredients Sample -->
      <div>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.5px;">
          Ingredientes identificados (${recipe.ingredients.length}):
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${recipe.ingredients.map(i => `<span class="badge badge-muted" style="font-size: 0.78rem; padding: 0.35rem 0.65rem; background: rgba(255,255,255,0.06);">${i.name} (${i.amount} ${i.unit})</span>`).join('')}
        </div>
      </div>

      <!-- Cooking Steps Preview -->
      <div>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.5px;">
          Pasos de preparación (${recipe.steps.length}):
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${recipe.steps.map(s => `
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); padding: 0.65rem 0.85rem; border-radius: 10px; font-size: 0.82rem; line-height: 1.45;">
              <span style="color: var(--accent-emerald); font-weight: 700;">Paso ${s.step}:</span> ${s.instruction}
              ${s.timerSeconds > 0 ? `<span class="badge badge-amber" style="margin-left: 0.35rem; font-size: 0.7rem; padding: 0.15rem 0.4rem;">⏱️ ${Math.round(s.timerSeconds / 60)} min</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.15rem; flex-wrap: wrap; gap: 0.75rem;">
        <button class="btn btn-ghost btn-sm" onclick="openAICreatorModal()">🔄 Crear Otra</button>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn btn-secondary" onclick="saveAndAssignToPlanner()">📅 Asignar al Menú</button>
          <button id="btn-save-ai-recipe-main" class="btn btn-primary btn-lg" onclick="saveAndCloseAICreator()" style="box-shadow: 0 0 20px var(--accent-emerald-glow);">
            💾 Guardar en mi Catálogo
          </button>
        </div>
      </div>

    </div>
  `;
}

window.regenerateAIPreviewImage = async function() {
  if (!tempGeneratedRecipe) return;
  const imgEl = document.getElementById('ai-preview-dish-img');
  if (imgEl) {
    imgEl.style.opacity = '0.5';
    imgEl.style.filter = 'grayscale(0.5)';
  }
  const newSeed = Math.floor(Math.random() * 999999);
  const newImgUrl = await window.aiRecipeGenerator.generateAIImageUrl(tempGeneratedRecipe.title, null, newSeed);
  tempGeneratedRecipe.image = newImgUrl;
  
  if (imgEl) {
    imgEl.src = newImgUrl;
    imgEl.style.opacity = '1';
    imgEl.style.filter = 'none';
    imgEl.style.animation = 'pulseAmber 0.8s ease';
    setTimeout(() => { imgEl.style.animation = ''; }, 800);
  }
  if (window.showToast) window.showToast('🎨 Fotografía gourmet regenerada con Nano Banana 2', 'sky');
};

window.saveAndCloseAICreator = async function() {
  if (!tempGeneratedRecipe) return;
  
  const saveBtn = document.getElementById('btn-save-ai-recipe-main');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = '☁️ Guardando en la nube...';
  }

  try {
    // 1. Save in local storage & sync catalog
    fridgeStore.saveCustomRecipe(tempGeneratedRecipe);

    // 2. Persist to Firebase Cloud Firestore & Storage
    if (window.firebaseDB && typeof window.firebaseDB.saveRecipe === 'function') {
      await window.firebaseDB.saveRecipe(tempGeneratedRecipe);
    }

    closeAICreatorModal();
    if (window.soundFX) window.soundFX.playFanfare();
    window.showToast(`✨ ¡Receta "${tempGeneratedRecipe.title}" guardada y sincronizada en Firebase!`, 'emerald');
    renderRecipes();
  } catch (err) {
    console.error('Error saving AI recipe:', err);
    fridgeStore.saveCustomRecipe(tempGeneratedRecipe);
    closeAICreatorModal();
    window.showToast(`✨ Receta guardada localmente`, 'emerald');
    renderRecipes();
  }
};

window.saveAndAssignToPlanner = async function() {
  if (!tempGeneratedRecipe) return;

  try {
    // 1. Save in local storage & assign slot
    fridgeStore.saveCustomRecipe(tempGeneratedRecipe);
    fridgeStore.setMealSlot('day_1', 'lunch', tempGeneratedRecipe.id);

    // 2. Persist to Firebase Cloud Firestore & Storage
    if (window.firebaseDB && typeof window.firebaseDB.saveRecipe === 'function') {
      await window.firebaseDB.saveRecipe(tempGeneratedRecipe);
    }

    closeAICreatorModal();
    if (window.soundFX) window.soundFX.playFanfare();
    window.showToast(`✨ ¡Receta guardada en Firebase y asignada al Día 1!`, 'emerald');
    renderRecipes();
  } catch (err) {
    console.error('Error saving and assigning AI recipe:', err);
    fridgeStore.saveCustomRecipe(tempGeneratedRecipe);
    fridgeStore.setMealSlot('day_1', 'lunch', tempGeneratedRecipe.id);
    closeAICreatorModal();
    renderRecipes();
  }
};

window.deleteCustomRecipe = function(recipeId) {
  if (confirm('¿Estás seguro de que quieres eliminar esta receta personalizada?')) {
    fridgeStore.deleteCustomRecipe(recipeId);
    if (window.soundFX) window.soundFX.playClick();
    window.showToast('Receta eliminada del catálogo', 'amber');
    renderRecipes();
  }
};
