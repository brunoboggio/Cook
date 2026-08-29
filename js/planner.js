/* ==========================================================================
   FRIDGEFLOW - HIGH-PROTEIN MEAL PLANNER & SMART SHOPPING CART CONTROLLER (V3.2)
   Configurable Days per Week, Number of Weeks (1-8), Multi-Week Grids & Cart
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPlannerPage();
});

function initPlannerPage() {
  initControlListeners();
  renderPlannerView();
  renderConsolidatedCart();

  // Listen for storage changes
  window.addEventListener('fridgeflow:statechange', () => {
    renderPlannerView();
    renderConsolidatedCart();
  });
}

// 1. Controls & Settings Event Listeners
function initControlListeners() {
  const config = fridgeStore.getPlannerConfig();

  // A. Days Per Week Buttons
  const daysButtons = document.querySelectorAll('.days-selector-btn');
  daysButtons.forEach(btn => {
    const days = parseInt(btn.dataset.daysPerWeek, 10);
    if (days === config.daysPerWeek) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      daysButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const customDaysInput = document.getElementById('custom-days-per-week-input');
      if (customDaysInput) customDaysInput.value = days;

      updatePlannerDuration(days, config.weeksCount);
    });
  });

  // Custom Days Per Week Input
  const customDaysInput = document.getElementById('custom-days-per-week-input');
  if (customDaysInput) {
    customDaysInput.value = config.daysPerWeek;
    customDaysInput.addEventListener('change', (e) => {
      const val = Math.min(7, Math.max(1, parseInt(e.target.value, 10) || 5));
      customDaysInput.value = val;

      daysButtons.forEach(b => {
        const d = parseInt(b.dataset.daysPerWeek, 10);
        b.classList.toggle('active', d === val);
      });

      updatePlannerDuration(val, config.weeksCount);
    });
  }

  // B. Number of Weeks Buttons
  const weeksButtons = document.querySelectorAll('.weeks-selector-btn');
  weeksButtons.forEach(btn => {
    const weeks = parseInt(btn.dataset.weeks, 10);
    if (weeks === config.weeksCount) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      weeksButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const customWeeksInput = document.getElementById('custom-weeks-input');
      if (customWeeksInput) customWeeksInput.value = weeks;

      updatePlannerDuration(config.daysPerWeek, weeks);
    });
  });

  // Custom Weeks Input
  const customWeeksInput = document.getElementById('custom-weeks-input');
  if (customWeeksInput) {
    customWeeksInput.value = config.weeksCount;
    customWeeksInput.addEventListener('change', (e) => {
      const val = Math.min(8, Math.max(1, parseInt(e.target.value, 10) || 1));
      customWeeksInput.value = val;

      weeksButtons.forEach(b => {
        const w = parseInt(b.dataset.weeks, 10);
        b.classList.toggle('active', w === val);
      });

      updatePlannerDuration(config.daysPerWeek, val);
    });
  }

  // C. Protein Target Slider & Inputs
  const proteinSlider = document.getElementById('protein-target-slider');
  const proteinNumber = document.getElementById('protein-target-number');
  const proteinBadge = document.getElementById('protein-target-badge');

  if (proteinSlider && proteinNumber) {
    proteinSlider.value = config.proteinTarget;
    proteinNumber.value = config.proteinTarget;
    if (proteinBadge) proteinBadge.textContent = `${config.proteinTarget}g / día`;

    proteinSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      proteinNumber.value = val;
      if (proteinBadge) proteinBadge.textContent = `${val}g / día`;
      updateProteinTarget(val);
    });

    proteinNumber.addEventListener('change', (e) => {
      const val = Math.min(260, Math.max(40, parseInt(e.target.value, 10) || 120));
      proteinNumber.value = val;
      proteinSlider.value = val;
      if (proteinBadge) proteinBadge.textContent = `${val}g / día`;
      updateProteinTarget(val);
    });
  }

  // Quick Protein Preset Badges
  const presetButtons = document.querySelectorAll('.protein-preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.protein, 10);
      if (proteinSlider) proteinSlider.value = target;
      if (proteinNumber) proteinNumber.value = target;
      if (proteinBadge) proteinBadge.textContent = `${target}g / día`;
      updateProteinTarget(target);
    });
  });

  // Breakfast / Snack Option Checkbox
  const breakfastCheckbox = document.getElementById('include-breakfast-checkbox');
  if (breakfastCheckbox) {
    breakfastCheckbox.checked = !!config.includeBreakfast;
    breakfastCheckbox.addEventListener('change', (e) => {
      const currentConfig = fridgeStore.getPlannerConfig();
      currentConfig.includeBreakfast = e.target.checked;
      fridgeStore.savePlannerConfig(currentConfig);
      fridgeStore.generateProteinPlan(currentConfig.daysCount, currentConfig.proteinTarget, currentConfig.includeBreakfast);
      if (window.soundFX) window.soundFX.playClick();
      renderPlannerView();
      renderConsolidatedCart();
    });
  }

  // Auto-Generate Button
  const autoGenBtn = document.getElementById('btn-generate-protein-plan');
  if (autoGenBtn) {
    autoGenBtn.addEventListener('click', () => {
      const currentConfig = fridgeStore.getPlannerConfig();
      fridgeStore.generateProteinPlan(currentConfig.daysCount, currentConfig.proteinTarget, currentConfig.includeBreakfast);
      if (window.soundFX) window.soundFX.playFanfare();
      window.showToast(`✨ Menú de ${currentConfig.weeksCount} semanas (${currentConfig.daysCount} días) optimizado a ${currentConfig.proteinTarget}g de proteína/día`, 'emerald');
      renderPlannerView();
      renderConsolidatedCart();
    });
  }

  syncConfigSummaryUI(config);
}

function updatePlannerDuration(daysPerWeek, weeksCount) {
  const config = fridgeStore.getPlannerConfig();
  config.daysPerWeek = daysPerWeek;
  config.weeksCount = weeksCount;
  config.daysCount = daysPerWeek * weeksCount;

  fridgeStore.savePlannerConfig(config);
  fridgeStore.generateProteinPlan(config.daysCount, config.proteinTarget, config.includeBreakfast);

  syncConfigSummaryUI(config);

  if (window.soundFX) window.soundFX.playClick();
  window.showToast(`📅 Menú configurado para ${weeksCount} sem (${config.daysCount} días totales)`, 'emerald');
  renderPlannerView();
  renderConsolidatedCart();
}

function updateProteinTarget(target) {
  const config = fridgeStore.getPlannerConfig();
  config.proteinTarget = target;
  fridgeStore.savePlannerConfig(config);
  fridgeStore.generateProteinPlan(config.daysCount, target, config.includeBreakfast);
  renderPlannerView();
  renderConsolidatedCart();
}

function syncConfigSummaryUI(config) {
  const daysBadge = document.getElementById('days-per-week-badge');
  const weeksBadge = document.getElementById('weeks-count-badge');
  const summaryCalc = document.getElementById('summary-period-calc');
  const summaryMeals = document.getElementById('summary-meals-count');
  const summaryCartDays = document.getElementById('summary-cart-days');

  if (daysBadge) daysBadge.textContent = `${config.daysPerWeek} días / sem`;
  if (weeksBadge) weeksBadge.textContent = `${config.weeksCount} ${config.weeksCount === 1 ? 'Semana' : 'Semanas'}`;
  
  const totalMeals = config.daysCount * (config.includeBreakfast ? 3 : 2);
  if (summaryCalc) {
    summaryCalc.textContent = `${config.daysPerWeek} días/sem × ${config.weeksCount} ${config.weeksCount === 1 ? 'semana' : 'semanas'} = ${config.daysCount} días totales`;
  }
  if (summaryMeals) {
    summaryMeals.textContent = `(${totalMeals} comidas)`;
  }
  if (summaryCartDays) {
    summaryCartDays.textContent = `${config.daysCount} días de compra (${totalMeals} comidas)`;
  }
}

// 2. Render Dynamic Planner Grid (Single-week or Multi-week Accordion/Sections)
function renderPlannerView() {
  const container = document.getElementById('planner-grid-container');
  if (!container) return;

  const config = fridgeStore.getPlannerConfig();
  const plan = fridgeStore.getMealPlan();
  const recipes = (window.FridgeData && window.FridgeData.recipes) ? window.FridgeData.recipes : [];

  syncConfigSummaryUI(config);

  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Render Day Column Helper
  const renderDayColumn = (dayIndex, weekNumber, dayInWeekNumber) => {
    const dayKey = `day_${dayIndex}`;
    const dayPlan = plan[dayKey] || {};

    const lunchRecipe = dayPlan.lunch ? recipes.find(r => r.id === dayPlan.lunch) : null;
    const dinnerRecipe = dayPlan.dinner ? recipes.find(r => r.id === dayPlan.dinner) : null;
    const breakfastRecipe = dayPlan.breakfast ? recipes.find(r => r.id === dayPlan.breakfast) : null;

    let totalDayProtein = 0;
    let totalDayCalories = 0;

    if (lunchRecipe) {
      totalDayProtein += (lunchRecipe.protein || 0);
      totalDayCalories += (lunchRecipe.calories || 0);
    }
    if (dinnerRecipe) {
      totalDayProtein += (dinnerRecipe.protein || 0);
      totalDayCalories += (dinnerRecipe.calories || 0);
    }
    if (breakfastRecipe) {
      totalDayProtein += (breakfastRecipe.protein || 0);
      totalDayCalories += (breakfastRecipe.calories || 0);
    }

    const target = config.proteinTarget || 120;
    const percent = Math.min(100, Math.round((totalDayProtein / target) * 100));
    const isTargetMet = totalDayProtein >= target;
    const progressColor = isTargetMet ? '#10B981' : (percent >= 80 ? '#F59E0B' : '#EF4444');

    const dayName = dayInWeekNumber <= 7 ? dayNames[dayInWeekNumber - 1] : `Día ${dayInWeekNumber}`;
    const dayLabel = config.weeksCount > 1 ? `${dayName}` : dayName;

    return `
      <div class="day-column glass-panel glow-card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--radius-lg);">
        
        <!-- Day Header & Protein Tracker -->
        <div style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <div>
              <span style="font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; color: var(--text-primary);">
                ${dayLabel}
              </span>
              ${config.weeksCount > 1 ? `<span style="font-size: 0.72rem; color: var(--text-tertiary); display: block;">Día ${dayIndex} del plan</span>` : ''}
            </div>
            <span class="badge ${isTargetMet ? 'badge-emerald' : 'badge-amber'}" style="font-size: 0.75rem; font-weight: 700;">
              ${totalDayProtein}g Prot
            </span>
          </div>

          <!-- Protein Progress Gauge -->
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.35rem;">
            <span>Meta: ${target}g</span>
            <span style="color: ${progressColor}; font-weight: 700;">${percent}% ${isTargetMet ? '✅ Cumplida' : ''}</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${percent}%; height: 100%; background: ${progressColor}; border-radius: var(--radius-full); transition: width 0.4s ease;"></div>
          </div>
        </div>

        <!-- Meal Slots Container -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem; flex: 1;">
          
          ${(config.includeBreakfast || breakfastRecipe) ? `
            <!-- BREAKFAST / SNACK SLOT -->
            <div class="meal-slot-card">
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.55rem; letter-spacing: 0.03em;">
                <span>☀️ Desayuno / Snack</span>
                ${breakfastRecipe ? `<span style="color: #34D399; font-weight: 800; font-size: 0.8rem;">+${breakfastRecipe.protein}g Prot</span>` : ''}
              </div>

              ${breakfastRecipe ? `
                <div style="display: flex; gap: 0.75rem; align-items: center;">
                  <img src="${breakfastRecipe.image}" onerror="this.src='assets/images/recipe_mediterranean_pasta.jpg'" alt="${breakfastRecipe.title}" style="width: 52px; height: 52px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.35); flex-shrink: 0;" />
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 700; font-size: 0.88rem; color: #FFFFFF; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;" onclick="window.openRecipeModal('${breakfastRecipe.id}')" title="${breakfastRecipe.title}">
                      ${breakfastRecipe.title}
                    </div>
                    <div style="font-size: 0.74rem; color: var(--text-secondary); margin-top: 0.25rem;">
                      ⏱️ ${breakfastRecipe.prepTime + breakfastRecipe.cookTime}m · ${breakfastRecipe.calories} kcal
                    </div>
                             <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.65rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.45rem;">
                  <div style="display: flex; gap: 0.35rem; align-items: center;">
                    <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 8px;" onclick="duplicateMealToNextDay('${dayKey}', 'breakfast')" title="Repetir desayuno al día siguiente">
                      🔁 Repetir
                    </button>
                    <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 8px;" onclick="openRecipeSwapModal('${dayKey}', 'breakfast')">
                      🔄 Cambiar
                    </button>
                  </div>
                  <a href="cook.html?recipe=${breakfastRecipe.id}" class="btn btn-secondary btn-sm" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; border-radius: 8px;">
                    👨‍🍳 Cocinar
                  </a>
                </div>
              ` : `
                <div style="text-align: center; padding: 0.75rem 0; cursor: pointer; color: var(--text-muted); font-size: 0.8rem;" onclick="openRecipeSwapModal('${dayKey}', 'breakfast')">
                  + Asignar Desayuno
                </div>
              `}
            </div>
          ` : ''}

          <!-- LUNCH SLOT -->
          <div class="meal-slot-card">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.55rem; letter-spacing: 0.03em;">
              <span>🍲 Almuerzo</span>
              ${lunchRecipe ? `<span style="color: #34D399; font-weight: 800; font-size: 0.8rem;">+${lunchRecipe.protein}g Prot</span>` : ''}
            </div>

            ${lunchRecipe ? `
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <img src="${lunchRecipe.image}" onerror="this.src='assets/images/recipe_mediterranean_pasta.jpg'" alt="${lunchRecipe.title}" style="width: 52px; height: 52px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.35); flex-shrink: 0;" />
                <div style="flex: 1; min-width: 0;">
                  <div style="font-weight: 700; font-size: 0.88rem; color: #FFFFFF; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;" onclick="window.openRecipeModal('${lunchRecipe.id}')" title="${lunchRecipe.title}">
                    ${lunchRecipe.title}
                  </div>
                  <div style="font-size: 0.74rem; color: var(--text-secondary); margin-top: 0.25rem;">
                    ⏱️ ${lunchRecipe.prepTime + lunchRecipe.cookTime}m · ${lunchRecipe.calories} kcal
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.65rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.45rem;">
                <div style="display: flex; gap: 0.35rem; align-items: center;">
                  <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 8px;" onclick="duplicateMealToNextDay('${dayKey}', 'lunch')" title="Repetir almuerzo al día siguiente (Batch cooking)">
                    🔁 Repetir
                  </button>
                  <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 8px;" onclick="openRecipeSwapModal('${dayKey}', 'lunch')">
                    🔄 Cambiar
                  </button>
                </div>
                <a href="cook.html?recipe=${lunchRecipe.id}" class="btn btn-secondary btn-sm" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; border-radius: 8px;">
                  👨‍🍳 Cocinar
                </a>
              </div>
            ` : `
              <div style="text-align: center; padding: 0.75rem 0; cursor: pointer; color: var(--text-muted); font-size: 0.8rem;" onclick="openRecipeSwapModal('${dayKey}', 'lunch')">
                + Asignar Almuerzo
              </div>
            `}
          </div>

          <!-- DINNER SLOT -->
          <div class="meal-slot-card">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 0.55rem; letter-spacing: 0.03em;">
              <span>🌙 Cena</span>
              ${dinnerRecipe ? `<span style="color: #34D399; font-weight: 800; font-size: 0.8rem;">+${dinnerRecipe.protein}g Prot</span>` : ''}
            </div>

            ${dinnerRecipe ? `
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <img src="${dinnerRecipe.image}" onerror="this.src='assets/images/recipe_mediterranean_pasta.jpg'" alt="${dinnerRecipe.title}" style="width: 52px; height: 52px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.35); flex-shrink: 0;" />
                <div style="flex: 1; min-width: 0;">
                  <div style="font-weight: 700; font-size: 0.88rem; color: #FFFFFF; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;" onclick="window.openRecipeModal('${dinnerRecipe.id}')" title="${dinnerRecipe.title}">
                    ${dinnerRecipe.title}
                  </div>
                  <div style="font-size: 0.74rem; color: var(--text-secondary); margin-top: 0.25rem;">
                    ⏱️ ${dinnerRecipe.prepTime + dinnerRecipe.cookTime}m · ${dinnerRecipe.calories} kcal
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.65rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.45rem;">
                <div style="display: flex; gap: 0.35rem; align-items: center;">
                  <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 8px;" onclick="duplicateMealToNextDay('${dayKey}', 'dinner')" title="Repetir cena al día siguiente (Batch cooking)">
                    🔁 Repetir
                  </button>
                  <button class="btn btn-ghost btn-sm" style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 8px;" onclick="openRecipeSwapModal('${dayKey}', 'dinner')">
                    🔄 Cambiar
                  </button>
                </div>
                <a href="cook.html?recipe=${dinnerRecipe.id}" class="btn btn-secondary btn-sm" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; border-radius: 8px;">
                  👨‍🍳 Cocinar
                </a>
              </div>
            ` : `
              <div style="text-align: center; padding: 0.75rem 0; cursor: pointer; color: var(--text-muted); font-size: 0.8rem;" onclick="openRecipeSwapModal('${dayKey}', 'dinner')">
                + Asignar Cena
              </div>
            `}
          </div>

        </div>

        <!-- Daily Totals Footer -->
        <div style="margin-top: 1rem; padding-top: 0.65rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-tertiary);">
          <span>Total Energía:</span>
          <span style="font-weight: 600; color: var(--text-secondary);">${totalDayCalories} kcal</span>
        </div>

      </div>
    `;
  };

  // Check if Multi-Week mode or Single Week
  if (config.weeksCount <= 1) {
    container.className = `single-week-layout planner-week-grid grid-days-${config.daysPerWeek}`;
    let html = '';
    for (let d = 1; d <= config.daysPerWeek; d++) {
      html += renderDayColumn(d, 1, d);
    }
    container.innerHTML = html;
  } else {
    // Multi-week view grouped into dedicated weekly sections stacked vertically below each other
    container.className = 'multi-week-layout';
    let multiWeekHtml = '';

    for (let w = 1; w <= config.weeksCount; w++) {
      const startDay = (w - 1) * config.daysPerWeek + 1;
      const endDay = w * config.daysPerWeek;

      let weekDaysHtml = '';
      for (let d = 1; d <= config.daysPerWeek; d++) {
        const absoluteDayIdx = (w - 1) * config.daysPerWeek + d;
        weekDaysHtml += renderDayColumn(absoluteDayIdx, w, d);
      }

      multiWeekHtml += `
        <div class="planner-week-section">
          <div class="planner-week-header">
            <div class="planner-week-title">
              <span class="badge badge-emerald" style="font-size: 0.88rem; padding: 0.4rem 0.9rem; font-weight: 800;">
                📅 SEMANA ${w}
              </span>
              <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800;">
                Menú de la Semana ${w}
              </h3>
            </div>
            <div class="planner-week-stats">
              <span>🗓️ <strong>${config.daysPerWeek} días</strong> (Día ${startDay} al ${endDay})</span>
              <span>🥩 <strong>${config.daysPerWeek * (config.includeBreakfast ? 3 : 2)} comidas</strong></span>
              <span>💪 Meta diaria: <strong>${config.proteinTarget}g</strong></span>
            </div>
          </div>
          <div class="planner-week-grid grid-days-${config.daysPerWeek}">
            ${weekDaysHtml}
          </div>
        </div>
      `;
    }

    container.innerHTML = multiWeekHtml;
  }
}

// Duplicate meal helper for Batch Cooking
window.duplicateMealToNextDay = function(dayKey, slot) {
  const dayNum = parseInt(dayKey.replace('day_', ''), 10);
  const config = fridgeStore.getPlannerConfig();
  const nextDayNum = dayNum < config.daysCount ? dayNum + 1 : 1;
  const nextDayKey = `day_${nextDayNum}`;

  fridgeStore.duplicateMeal(dayKey, slot, nextDayKey, slot);
  if (window.soundFX) window.soundFX.playKnifeChop();
  const slotName = slot === 'lunch' ? 'Almuerzo' : (slot === 'dinner' ? 'Cena' : 'Desayuno');
  window.showToast(`🔁 ${slotName} duplicado al Día ${nextDayNum}`, 'emerald');
  renderPlannerView();
  renderConsolidatedCart();
};

// 3. Swap / Select Recipe Modal with Macro Balancing Assistant
window.openRecipeSwapModal = function(dayKey, slot) {
  const recipes = (window.FridgeData && window.FridgeData.recipes) ? window.FridgeData.recipes : [];
  const plan = fridgeStore.getMealPlan();
  const config = fridgeStore.getPlannerConfig();
  const dayPlan = plan[dayKey] || {};

  let otherProtein = 0;
  Object.entries(dayPlan).forEach(([s, rId]) => {
    if (s !== slot && rId) {
      const rec = recipes.find(r => r.id === rId);
      if (rec) otherProtein += (rec.protein || 0);
    }
  });

  const target = config.proteinTarget || 120;
  const neededProtein = Math.max(0, target - otherProtein);
  const slotLabel = slot === 'lunch' ? 'Almuerzo' : (slot === 'breakfast' ? 'Desayuno' : 'Cena');

  const candidates = [...recipes].sort((a, b) => (b.protein || 0) - (a.protein || 0));

  let modalOverlay = document.getElementById('recipe-swap-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'recipe-swap-modal-overlay';
    modalOverlay.className = 'modal-backdrop';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="modal-card glass-panel" style="max-width: 640px; max-height: 85vh; display: flex; flex-direction: column; border-radius: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-subtle);">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0 0 0.25rem 0;">Seleccionar ${slotLabel} Proteico</h3>
          <p style="font-size: 0.85rem; color: var(--text-tertiary); margin: 0;">Platos optimizados para tu meta proteica</p>
        </div>
        <button class="btn-icon" onclick="closeRecipeSwapModal()">✕</button>
      </div>

      <div style="padding: 1rem 1.5rem 0 1.5rem;">
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 0.65rem 0.9rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-size: 0.82rem; color: #FFF;">🎯 Meta diaria: <strong>${target}g</strong> (Llevas <strong>${otherProtein}g</strong>)</span>
          <span class="badge badge-emerald" style="font-size: 0.78rem; font-weight: 800;">
            ${neededProtein > 0 ? `Recomendado: ≥ ${neededProtein}g` : '¡Meta ya cubierta!'}
          </span>
        </div>
      </div>

      <div style="padding: 1.25rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; flex: 1;">
        ${candidates.map(r => {
          const isTargetMatched = (r.protein || 0) >= neededProtein;
          return `
            <div class="glass-panel glass-panel-interactive" style="padding: 0.85rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-radius: 14px; cursor: pointer; border-left: 3px solid ${isTargetMatched ? 'var(--accent-emerald)' : 'transparent'};" onclick="selectRecipeForSlot('${dayKey}', '${slot}', '${r.id}')">
              <div style="display: flex; align-items: center; gap: 0.85rem;">
                <img src="${r.image}" onerror="this.src='assets/images/recipe_mediterranean_pasta.jpg'" alt="${r.title}" style="width: 52px; height: 52px; border-radius: 10px; object-fit: cover;" />
                <div>
                  <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${r.title}</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
                    ⏱️ ${r.prepTime + r.cookTime}m · ${r.calories} kcal
                  </div>
                </div>
              </div>
              <div style="text-align: right; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
                <span class="badge badge-emerald" style="font-size: 0.82rem; font-weight: 800;">
                  ${r.protein}g Prot
                </span>
                ${isTargetMatched && neededProtein > 0 ? `
                  <span style="font-size: 0.7rem; color: #34D399; font-weight: 700;">✨ Completa meta</span>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  modalOverlay.classList.add('open');
};

window.closeRecipeSwapModal = function() {
  const modalOverlay = document.getElementById('recipe-swap-modal-overlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
};

window.selectRecipeForSlot = function(dayKey, slot, recipeId) {
  fridgeStore.setMealSlot(dayKey, slot, recipeId);
  closeRecipeSwapModal();
  if (window.soundFX) window.soundFX.playKnifeChop();
  window.showToast('Plato actualizado en tu menú', 'emerald');
  renderPlannerView();
  renderConsolidatedCart();
};

// 4. Render Consolidated Smart Shopping Cart for Multi-Week Period
function renderConsolidatedCart() {
  const container = document.getElementById('shopping-cart-container');
  if (!container) return;

  const cartData = fridgeStore.getConsolidatedCart();
  const config = fridgeStore.getPlannerConfig();
  const { categories, totalCount, activeEstimatedTotal, activeCount, checkedCount, excludedCount } = cartData;

  // Format ARS Currency
  function formatARS(amount) {
    const num = Math.round(Number(amount) || 0);
    return num.toLocaleString('es-AR');
  }

  // Update summary badges
  const totalItemsBadge = document.getElementById('cart-total-items-badge');
  const totalPriceBadge = document.getElementById('cart-total-price-badge');
  const averagesBadge = document.getElementById('cart-averages-badge');

  if (totalItemsBadge) {
    totalItemsBadge.textContent = `${activeCount} a comprar · ${config.weeksCount} ${config.weeksCount === 1 ? 'sem' : 'sems'} (${config.daysCount} días)`;
  }
  if (totalPriceBadge) {
    totalPriceBadge.textContent = `$ ${formatARS(activeEstimatedTotal)} ARS`;
  }
  if (averagesBadge) {
    averagesBadge.textContent = `~$ ${formatARS(cartData.dailyAverage)} / día · ~$ ${formatARS(cartData.mealAverage)} / plato (${activeCount} en lista)`;
  }

  if (totalCount === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem; color: var(--text-tertiary);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛒</div>
        <h4>Carrito vacío</h4>
        <p style="font-size: 0.9rem;">Genera un menú semanal para consolidar automáticamente todos los ingredientes necesarios.</p>
      </div>
    `;
    return;
  }

  let html = `
    <!-- Cart Multi-Week Banner -->
    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 14px; padding: 0.9rem 1.25rem; margin-bottom: 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span style="font-size: 1.2rem;">📦</span>
        <div>
          <strong style="color: #FFF; font-size: 0.95rem;">Compra Consolidada para ${config.weeksCount} ${config.weeksCount === 1 ? 'Semana' : 'Semanas'}</strong>
          <div style="font-size: 0.78rem; color: var(--text-secondary);">
            ${config.daysPerWeek} días por semana · ${config.daysCount} días totales planificados (${config.totalMeals} comidas)
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
        <a href="prices.html" class="btn btn-ghost btn-sm" style="border: 1px solid rgba(255,255,255,0.14); font-size: 0.76rem; padding: 0.3rem 0.65rem; border-radius: 10px; color: #CBD5E1;" title="Personalizar precios de insumos en pesos argentinos">
          💰 Ajustar Precios ($ ARS)
        </a>
        <span class="badge badge-emerald" style="font-weight: 800;">
          ${activeCount} por comprar ${excludedCount > 0 ? `(${excludedCount} en casa)` : ''}
        </span>
      </div>
    </div>
  `;

  // Filter items: Pending (not checked) vs Checked
  const checkedItemsList = [];

  Object.entries(categories).forEach(([catKey, catData]) => {
    if (!catData.items || catData.items.length === 0) return;

    const pendingItems = catData.items.filter(item => {
      if (item.isChecked) {
        checkedItemsList.push(item);
        return false;
      }
      return true;
    });

    if (pendingItems.length === 0) return;

    html += `
      <div class="glass-panel" style="margin-bottom: 1.5rem; padding: 1.25rem; border-radius: 16px;">
        <div style="font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; color: var(--text-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
          <span>${catData.title} <span style="font-size: 0.8rem; color: var(--text-tertiary); font-weight: normal;">(${pendingItems.length})</span></span>
        </div>

        <div class="cart-items-grid">
          ${pendingItems.map(item => `
            <div class="cart-item-card ${item.isExcluded ? 'is-excluded' : ''}">
              
              <label class="cart-item-check-label">
                <input type="checkbox" 
                       ${item.isChecked ? 'checked' : ''} 
                       onchange="toggleCartItem('${item.id}', this.checked)" 
                       class="cart-item-checkbox" />
                <div class="cart-item-content">
                  <div class="cart-item-title-row">
                    <span class="cart-item-emoji">${item.emoji}</span>
                    <span class="cart-item-name">${item.name}</span>
                  </div>
                  <div class="cart-item-subtitle">
                    ${item.isExcluded ? '🏠 En despensa (no suma gasto)' : `Para: ${item.usedInRecipes.slice(0, 2).join(', ')}${item.usedInRecipes.length > 2 ? ' +' + (item.usedInRecipes.length - 2) : ''}`}
                  </div>
                </div>
              </label>

              <div class="cart-item-pricing">
                <div class="cart-item-qty-row">
                  <button class="btn-icon cart-item-pantry-btn" onclick="toggleCartItemExcluded('${item.id}', ${!item.isExcluded})" title="${item.isExcluded ? 'Incluir en presupuesto de compra' : 'Marcar que ya tengo en casa (descontar gasto)'}">
                    ${item.isExcluded ? '🏠' : '🛒'}
                  </button>
                  <span class="badge badge-muted cart-item-qty-badge">
                    ${item.totalAmount} ${item.unit}
                  </span>
                </div>
                <span class="cart-item-price ${item.isExcluded ? 'is-excluded-price' : ''}">
                  $ ${formatARS(item.estimatedPrice)}
                </span>
              </div>

            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  // Collapsible Accordion for Purchased Items (Modo Supermercado)
  if (checkedItemsList.length > 0) {
    html += `
      <details class="cart-purchased-accordion">
        <summary class="cart-purchased-summary">
          <span>✓ ${checkedItemsList.length} productos ya comprados en el carrito</span>
          <span style="font-size: 0.78rem; color: var(--text-tertiary); font-weight: normal;">(Clic para ver/desmarcar)</span>
        </summary>
        <div class="cart-purchased-grid">
          ${checkedItemsList.map(item => `
            <div class="cart-purchased-item">
              <label class="cart-purchased-label">
                <input type="checkbox" checked onchange="toggleCartItem('${item.id}', this.checked)" class="cart-item-checkbox" />
                <span class="cart-purchased-name">
                  ${item.emoji} ${item.name} (${item.totalAmount} ${item.unit})
                </span>
              </label>
              <span class="cart-purchased-price">$ ${formatARS(item.estimatedPrice)}</span>
            </div>
          `).join('')}
        </div>
      </details>
    `;
  }

  container.innerHTML = html;
}

window.toggleCartItem = function(itemId, isChecked) {
  fridgeStore.setCartItemChecked(itemId, isChecked);
  if (window.soundFX) window.soundFX.playClick();
  renderConsolidatedCart();
};

window.toggleCartItemExcluded = function(itemId, isExcluded) {
  fridgeStore.setCartItemExcluded(itemId, isExcluded);
  if (window.soundFX) window.soundFX.playClick();
  if (window.showToast) {
    window.showToast(isExcluded ? '🏠 Insumo marcado en despensa (descontado del gasto)' : '🛒 Insumo agregado a la lista de compra', 'emerald');
  }
  renderConsolidatedCart();
};

window.exportCartToWhatsApp = function() {
  const cartData = fridgeStore.getConsolidatedCart();
  if (cartData.totalCount === 0) return;

  const formatARS = (n) => Math.round(Number(n) || 0).toLocaleString('es-AR');
  
  // Calculate only items pending to buy (excluding pantry items and already bought items)
  let totalItemsToBuy = 0;
  let totalPriceToBuy = 0;
  const categoriesToBuy = [];

  Object.entries(cartData.categories).forEach(([catKey, catData]) => {
    const itemsToBuy = (catData.items || []).filter(i => !i.isExcluded && !i.isChecked);
    if (itemsToBuy.length > 0) {
      const catTotal = itemsToBuy.reduce((sum, i) => sum + (i.estimatedPrice || 0), 0);
      totalItemsToBuy += itemsToBuy.length;
      totalPriceToBuy += catTotal;
      categoriesToBuy.push({
        title: catData.title,
        items: itemsToBuy
      });
    }
  });

  if (totalItemsToBuy === 0) {
    if (window.showToast) {
      window.showToast('✅ ¡No tienes artículos pendientes por comprar!', 'emerald');
    }
    return;
  }

  const config = fridgeStore.getPlannerConfig();
  let text = `🛒 *LISTA DE COMPRAS - FRIDGEFLOW*\n`;
  text += `📦 Artículos a comprar: ${totalItemsToBuy} | 💰 Total Estimado: ~$ ${formatARS(totalPriceToBuy)} ARS\n`;
  text += `📅 Período: ${config.weeksCount} Sem (${config.daysCount} días planificados)\n\n`;

  categoriesToBuy.forEach(cat => {
    text += `*${cat.title}*\n`;
    cat.items.forEach(item => {
      text += `▫️ ${item.name}: ${item.totalAmount} ${item.unit} (~$ ${formatARS(item.estimatedPrice)} ARS)\n`;
    });
    text += `\n`;
  });

  text += `_Solo artículos pendientes por comprar · Precios en Pesos Argentinos ($ ARS)_`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

window.copyCartToClipboard = function() {
  const cartData = fridgeStore.getConsolidatedCart();
  if (cartData.totalCount === 0) return;

  const formatARS = (n) => Math.round(Number(n) || 0).toLocaleString('es-AR');
  
  // Calculate only items pending to buy (excluding pantry items and already bought items)
  let totalItemsToBuy = 0;
  let totalPriceToBuy = 0;
  const categoriesToBuy = [];

  Object.entries(cartData.categories).forEach(([catKey, catData]) => {
    const itemsToBuy = (catData.items || []).filter(i => !i.isExcluded && !i.isChecked);
    if (itemsToBuy.length > 0) {
      const catTotal = itemsToBuy.reduce((sum, i) => sum + (i.estimatedPrice || 0), 0);
      totalItemsToBuy += itemsToBuy.length;
      totalPriceToBuy += catTotal;
      categoriesToBuy.push({
        title: catData.title,
        items: itemsToBuy
      });
    }
  });

  if (totalItemsToBuy === 0) {
    if (window.showToast) {
      window.showToast('✅ ¡No tienes artículos pendientes por comprar!', 'emerald');
    }
    return;
  }

  const config = fridgeStore.getPlannerConfig();
  let text = `LISTA DE COMPRAS - FRIDGEFLOW\n`;
  text += `Artículos a comprar: ${totalItemsToBuy} | Total estimado: ~$ ${formatARS(totalPriceToBuy)} ARS (${config.daysCount} días planificados)\n\n`;

  categoriesToBuy.forEach(cat => {
    text += `${cat.title}:\n`;
    cat.items.forEach(item => {
      text += `- ${item.name}: ${item.totalAmount} ${item.unit} (~$ ${formatARS(item.estimatedPrice)} ARS)\n`;
    });
    text += `\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    if (window.soundFX) window.soundFX.playClick();
    window.showToast(`📋 ${totalItemsToBuy} artículos a comprar copiados al portapapeles`, 'emerald');
  });
};

window.printCart = function() {
  const cartData = fridgeStore.getConsolidatedCart();
  if (cartData.totalCount === 0) return;

  const formatARS = (n) => Math.round(Number(n) || 0).toLocaleString('es-AR');

  // Filter ONLY items to buy (excluding pantry items and already bought items)
  let totalItemsToBuy = 0;
  let totalPriceToBuy = 0;
  const categoriesToBuy = [];

  Object.entries(cartData.categories).forEach(([catKey, catData]) => {
    const itemsToBuy = (catData.items || []).filter(i => !i.isExcluded && !i.isChecked);
    if (itemsToBuy.length > 0) {
      const catTotal = itemsToBuy.reduce((sum, i) => sum + (i.estimatedPrice || 0), 0);
      totalItemsToBuy += itemsToBuy.length;
      totalPriceToBuy += catTotal;
      categoriesToBuy.push({
        title: catData.title,
        items: itemsToBuy
      });
    }
  });

  if (totalItemsToBuy === 0) {
    if (window.showToast) {
      window.showToast('✅ ¡No tienes artículos pendientes por comprar para imprimir!', 'emerald');
    }
    return;
  }

  const config = fridgeStore.getPlannerConfig();
  const dateStr = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });

  // Build clean printable document HTML
  const printDocHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Lista de Compras — FridgeFlow</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 12mm 15mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #111827;
          background: #FFFFFF;
          margin: 0;
          padding: 0;
          font-size: 12px;
          line-height: 1.4;
        }
        .header {
          border-bottom: 2.5px solid #10B981;
          padding-bottom: 10px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .header h1 {
          margin: 0 0 3px 0;
          font-size: 20px;
          font-weight: 800;
          color: #065F46;
        }
        .header .meta {
          font-size: 11px;
          color: #4B5563;
        }
        .summary-box {
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 8px;
          padding: 8px 12px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .summary-stat {
          font-size: 12px;
          color: #065F46;
        }
        .summary-stat strong {
          font-size: 14px;
          font-weight: 800;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .category-box {
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 9px 11px;
          break-inside: avoid;
          page-break-inside: avoid;
          background: #FAFAFA;
        }
        .category-title {
          font-size: 12px;
          font-weight: 800;
          color: #111827;
          border-bottom: 1px solid #E5E7EB;
          padding-bottom: 4px;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3.5px 0;
          border-bottom: 1px dotted #E5E7EB;
        }
        .item-row:last-child {
          border-bottom: none;
        }
        .item-left {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
        }
        .checkbox {
          width: 13px;
          height: 13px;
          border: 1.5px solid #6B7280;
          border-radius: 3px;
          display: inline-block;
          flex-shrink: 0;
        }
        .item-name {
          font-weight: 600;
          color: #1F2937;
          font-size: 12px;
        }
        .item-right {
          text-align: right;
          white-space: nowrap;
          font-size: 11px;
          margin-left: 8px;
        }
        .item-amount {
          color: #4B5563;
          font-weight: 500;
          margin-right: 6px;
        }
        .item-price {
          color: #059669;
          font-weight: 700;
        }
        .footer {
          margin-top: 18px;
          border-top: 1px solid #E5E7EB;
          padding-top: 8px;
          text-align: center;
          font-size: 10px;
          color: #6B7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>🥑 FridgeFlow · Lista de Compras</h1>
          <div class="meta">Período: ${config.weeksCount} Semanas (${config.daysCount} días planificados) · ${dateStr}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11px; color: #6B7280;">Total Estimado ($ ARS):</div>
          <div style="font-size: 20px; font-weight: 800; color: #059669;">$ ${formatARS(totalPriceToBuy)}</div>
        </div>
      </div>

      <div class="summary-box">
        <div class="summary-stat">Artículos por comprar: <strong>${totalItemsToBuy}</strong></div>
        <div class="summary-stat">Meta Proteica: <strong>${config.proteinTarget}g / día</strong></div>
        <div class="summary-stat">Presupuesto: <strong>$ ${formatARS(totalPriceToBuy)} ARS</strong></div>
      </div>

      <div class="grid">
        ${categoriesToBuy.map(cat => `
          <div class="category-box">
            <div class="category-title">${cat.title} (${cat.items.length})</div>
            ${cat.items.map(item => `
              <div class="item-row">
                <div class="item-left">
                  <span class="checkbox"></span>
                  <span class="item-name">${item.emoji || '🛒'} ${item.name}</span>
                </div>
                <div class="item-right">
                  <span class="item-amount">${item.totalAmount} ${item.unit}</span>
                  <span class="item-price">$ ${formatARS(item.estimatedPrice)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>

      <div class="footer">
        Generado con FridgeFlow · Solo artículos pendientes de compra · Precios en Pesos Argentinos ($ ARS)
      </div>
    </body>
    </html>
  `;

  // Use hidden iframe to trigger print dialog cleanly without popup blocker issues
  let printFrame = document.getElementById('fridgeflow-print-frame');
  if (!printFrame) {
    printFrame = document.createElement('iframe');
    printFrame.id = 'fridgeflow-print-frame';
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);
  }

  const frameDoc = printFrame.contentWindow || printFrame.contentDocument.document || printFrame.contentDocument;
  frameDoc.document.open();
  frameDoc.document.write(printDocHtml);
  frameDoc.document.close();

  setTimeout(() => {
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
  }, 250);
};

window.addEventListener('fridgeflow:priceschange', () => {
  renderConsolidatedCart();
});

