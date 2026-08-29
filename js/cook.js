/* ==========================================================================
   FRIDGEFLOW - HIGH-PRECISION CHEF HUD & COOK MODE CONTROLLER (V3.0)
   Complete Step-by-Step, Ingredient Mapping, Smart Timers & Dual View Modes
   ========================================================================== */

let currentRecipe = null;
let currentStepIndex = 0;
let currentViewMode = 'sheet'; // 'sheet' | 'focus'
let currentServings = 2;
let wakeLockSentinel = null;
let isWakeLockActive = false;
let timerInterval = null;
let timerTargetTimestamp = 0;
let timerSecondsRemaining = 0;
let totalTimerDuration = 0;
let isTimerRunning = false;
let isVoiceEnabled = false;
let checkedIngredients = new Set();
let completedSteps = new Set();

// Sheet view independent timers map
const sheetTimers = {};

document.addEventListener('DOMContentLoaded', () => {
  initCookHUD();
});

function initCookHUD() {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get('recipe') || 'pasta-burrata-tomates';
  const viewModeParam = params.get('view') || 'sheet';

  // Ensure storage catalog is synchronized
  if (window.fridgeStore && typeof window.fridgeStore.syncRecipesCatalog === 'function') {
    window.fridgeStore.syncRecipesCatalog();
  }

  // Find recipe
  if (window.FridgeData && window.FridgeData.recipes) {
    currentRecipe = window.FridgeData.recipes.find(r => r.id === recipeId);
    if (!currentRecipe) {
      currentRecipe = window.FridgeData.recipes[0];
    }
  }

  if (!currentRecipe) {
    console.error('No recipe found for cook mode');
    return;
  }

  currentServings = currentRecipe.servings || 2;

  // Initialize UI components
  renderTopHeader();
  renderSidebarPrep();
  renderStepperPills();
  renderCurrentFocusStep();
  renderSheetView();
  switchCookView(viewModeParam);
  initStepTimers();
  initVoiceAssistant();
  initSoundscapeToggle();
  initKeyboardShortcuts();
  initWakeLock();
}

// 1. Render Sticky Top Header
function renderTopHeader() {
  const titleEl = document.getElementById('hud-recipe-title');
  const thumbEl = document.getElementById('hud-recipe-thumb');
  const categoryEl = document.getElementById('hud-recipe-category');
  const timeEl = document.getElementById('hud-recipe-time');
  const proteinEl = document.getElementById('hud-recipe-protein');

  if (titleEl) titleEl.textContent = currentRecipe.title;
  if (thumbEl) {
    thumbEl.src = currentRecipe.image || 'assets/images/recipe_mediterranean_pasta.jpg';
    thumbEl.alt = currentRecipe.title;
  }
  if (categoryEl) {
    categoryEl.textContent = currentRecipe.category ? currentRecipe.category.toUpperCase() : 'GOURMET';
  }
  if (timeEl) {
    const totalTime = (currentRecipe.prepTime || 10) + (currentRecipe.cookTime || 15);
    timeEl.textContent = `⏱️ ${totalTime} min total`;
  }
  if (proteinEl) {
    proteinEl.textContent = `💪 ${currentRecipe.protein || 30}g Proteína`;
  }
}

// 2. Render Stepper Pills & Checkpoints
function renderStepperPills() {
  const container = document.getElementById('cook-stepper-pills');
  if (!container) return;

  container.innerHTML = currentRecipe.steps.map((step, idx) => {
    const isCompleted = completedSteps.has(idx);
    const isActive = idx === currentStepIndex;
    const phase = getStepPhaseName(step, idx, currentRecipe.steps.length);
    
    let classes = 'cook-step-pill-btn';
    if (isActive) classes += ' active';
    if (isCompleted) classes += ' completed';

    return `
      <button class="${classes}" onclick="goToStep(${idx})" title="Paso ${idx + 1}: ${step.instruction.substring(0, 50)}...">
        <span>${isCompleted ? '✓' : idx + 1}</span>
        <span>${phase}</span>
      </button>
    `;
  }).join('');

  updateProgressFill();
}

function updateProgressFill() {
  const fillEl = document.getElementById('hud-progress-fill');
  if (!fillEl) return;
  const pct = ((currentStepIndex + 1) / currentRecipe.steps.length) * 100;
  fillEl.style.width = `${pct}%`;
}

// 3. Render Left Sidebar (Recipe Card, Ingredients Checklist, Utensils, Roadmap)
function renderSidebarPrep() {
  const baseServings = currentRecipe.servings || 2;
  const multiplier = currentServings / baseServings;

  // Hero Image & Badges
  const imgEl = document.getElementById('sidebar-recipe-img');
  const diffEl = document.getElementById('sidebar-difficulty-badge');
  const servEl = document.getElementById('sidebar-servings-badge');

  if (imgEl) imgEl.src = currentRecipe.image || 'assets/images/recipe_mediterranean_pasta.jpg';
  if (diffEl) diffEl.textContent = currentRecipe.difficulty || 'Fácil';
  if (servEl) {
    servEl.textContent = `${currentServings} Porciones ▾`;
    servEl.style.cursor = 'pointer';
    servEl.onclick = window.cycleServings;
    servEl.title = 'Clic para cambiar porciones (1, 2, 3, 4, 6)';
  }

  // Scaled Macros
  const calEl = document.getElementById('sidebar-calories-val');
  const protEl = document.getElementById('sidebar-protein-val');
  const carbsEl = document.getElementById('sidebar-carbs-val');
  const fatEl = document.getElementById('sidebar-fat-val');

  if (calEl) calEl.textContent = `${Math.round((currentRecipe.calories || 500) * multiplier)} kcal`;
  if (protEl) protEl.textContent = `${Math.round((currentRecipe.protein || 30) * multiplier)}g`;
  if (carbsEl) carbsEl.textContent = `${Math.round((currentRecipe.carbs || 45) * multiplier)}g`;
  if (fatEl) fatEl.textContent = `${Math.round((currentRecipe.fat || 20) * multiplier)}g`;

  // Ingredients Checklist (Mise en place)
  renderIngredientsChecklist();

  // Utensils
  const equipContainer = document.getElementById('sidebar-equipment-list');
  if (equipContainer) {
    const equipment = currentRecipe.equipment && currentRecipe.equipment.length > 0 
      ? currentRecipe.equipment 
      : ['Sartén antiadherente', 'Tabla de cortar', 'Cuchillo de chef', 'Espátula'];
    
    equipContainer.innerHTML = equipment.map(item => `
      <span class="cook-equip-pill">
        <span>🍳</span>
        <span>${item}</span>
      </span>
    `).join('');
  }

  // Step Roadmap
  renderRoadmapTimeline();

  // Chef Pro Secret
  const chefNotesEl = document.getElementById('sidebar-chef-notes');
  if (chefNotesEl) {
    chefNotesEl.textContent = currentRecipe.chefNotes || 'Cocina a fuego medio-alto para sellar los jugos y concentrar los azúcares naturales.';
  }
}

window.cycleServings = function() {
  const options = [1, 2, 3, 4, 6];
  const currentIdx = options.indexOf(currentServings);
  currentServings = options[(currentIdx + 1) % options.length];
  renderSidebarPrep();
  renderCurrentFocusStep();
  renderSheetView();
  if (window.soundFX) window.soundFX.playClick();
  if (window.showToast) window.showToast(`🍽️ Porciones ajustadas a: ${currentServings}`, 'emerald');
};

function getScaledAmount(amountStr, baseServings, targetServings) {
  const num = parseFloat(amountStr);
  if (isNaN(num)) return amountStr;
  const scaled = (num / (baseServings || 2)) * targetServings;
  return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1).replace(/\.0$/, '');
}

function renderIngredientsChecklist() {
  const container = document.getElementById('sidebar-ingredients-checklist');
  const counterEl = document.getElementById('ingredients-checked-counter');
  if (!container) return;

  const total = currentRecipe.ingredients.length;
  const checkedCount = checkedIngredients.size;

  if (counterEl) {
    counterEl.textContent = `${checkedCount}/${total} Listos`;
  }

  const baseServings = currentRecipe.servings || 2;

  container.innerHTML = currentRecipe.ingredients.map((ing, idx) => {
    const isChecked = checkedIngredients.has(ing.id || idx.toString());
    const scaledAmount = getScaledAmount(ing.amount, baseServings, currentServings);
    return `
      <div class="cook-checklist-item ${isChecked ? 'checked' : ''}" onclick="toggleIngredientCheck('${ing.id || idx}')">
        <div class="cook-check-left">
          <div class="cook-check-box">${isChecked ? '✓' : ''}</div>
          <span class="cook-check-name">${ing.name}</span>
        </div>
        <span class="cook-check-amount">${scaledAmount} ${ing.unit}</span>
      </div>
    `;
  }).join('');
}

window.toggleIngredientCheck = function(id) {
  if (checkedIngredients.has(id)) {
    checkedIngredients.delete(id);
  } else {
    checkedIngredients.add(id);
    if (window.soundFX) window.soundFX.playClick();
  }
  renderIngredientsChecklist();
};

function renderRoadmapTimeline() {
  const container = document.getElementById('sidebar-roadmap-timeline');
  if (!container) return;

  container.innerHTML = currentRecipe.steps.map((step, idx) => {
    const isActive = idx === currentStepIndex;
    const isCompleted = completedSteps.has(idx);
    const phase = getStepPhaseName(step, idx, currentRecipe.steps.length);

    let classes = 'cook-roadmap-item';
    if (isActive) classes += ' active';
    if (isCompleted) classes += ' completed';

    return `
      <div class="${classes}" onclick="goToStep(${idx})" title="Ir al paso ${idx + 1}">
        <div class="cook-roadmap-badge">
          ${isCompleted ? '✓' : idx + 1}
        </div>
        <div class="cook-roadmap-text">
          <strong>${phase}:</strong> ${step.instruction.substring(0, 45)}...
        </div>
      </div>
    `;
  }).join('');
}

// 4. Render Active Master Step (Focus View)
function renderCurrentFocusStep() {
  const step = currentRecipe.steps[currentStepIndex];
  if (!step) return;

  // Step badges
  const badgeEl = document.getElementById('step-indicator-badge');
  const phaseEl = document.getElementById('step-phase-tag');
  const timeBadgeEl = document.getElementById('step-estimated-time-badge');

  if (badgeEl) badgeEl.textContent = `PASO ${step.step} DE ${currentRecipe.steps.length}`;
  if (phaseEl) phaseEl.textContent = getStepPhaseName(step, currentStepIndex, currentRecipe.steps.length);
  if (timeBadgeEl) {
    const mins = step.timerSeconds ? Math.ceil(step.timerSeconds / 60) : 2;
    timeBadgeEl.textContent = `⏱️ ~${mins} min`;
  }

  // Instruction with culinary highlights
  const instructionEl = document.getElementById('step-instruction-text');
  if (instructionEl) {
    instructionEl.innerHTML = formatInstructionWithHighlights(step.instruction, currentRecipe.ingredients);
  }

  // Step Specific Ingredients
  const specificSection = document.getElementById('step-specific-ingredients-section');
  const specificList = document.getElementById('step-specific-ingredients-list');
  const stepIngredients = findIngredientsInStep(step.instruction, currentRecipe.ingredients);

  if (specificSection && specificList) {
    if (stepIngredients.length > 0) {
      const baseServings = currentRecipe.servings || 2;
      specificSection.style.display = 'block';
      specificList.innerHTML = stepIngredients.map(ing => {
        const scaledAmt = getScaledAmount(ing.amount, baseServings, currentServings);
        return `
          <span class="cook-step-ing-chip">
            <span>🥑</span>
            <span>${ing.name}:</span>
            <strong>${scaledAmt} ${ing.unit}</strong>
          </span>
        `;
      }).join('');
    } else {
      specificSection.style.display = 'none';
    }
  }

  // Tip Pro Panel
  const tipContainer = document.getElementById('step-tip-container');
  const tipText = document.getElementById('step-tip-text');
  if (tipContainer && tipText) {
    if (step.tip) {
      tipContainer.style.display = 'flex';
      tipText.textContent = step.tip;
    } else {
      tipContainer.style.display = 'none';
    }
  }

  // Setup Timer for this step
  resetTimer(step.timerSeconds || 0);

  // Step Done toggle button state
  const isStepDone = completedSteps.has(currentStepIndex);
  const doneBtn = document.getElementById('btn-toggle-step-done');
  const doneIcon = document.getElementById('step-done-icon');
  const doneLabel = document.getElementById('step-done-label');

  if (doneBtn && doneIcon && doneLabel) {
    doneBtn.classList.toggle('is-done', isStepDone);
    doneIcon.textContent = isStepDone ? '✅' : '⭕';
    doneLabel.textContent = isStepDone ? 'Paso Completado' : 'Marcar como Hecho';
  }

  // Navigation button states
  const prevBtn = document.getElementById('btn-prev-step');
  const nextBtn = document.getElementById('btn-next-step');

  if (prevBtn) prevBtn.disabled = currentStepIndex === 0;
  if (nextBtn) {
    if (currentStepIndex === currentRecipe.steps.length - 1) {
      nextBtn.innerHTML = '🎉 ¡Finalizar y Servir!';
      nextBtn.classList.remove('btn-primary');
      nextBtn.classList.add('btn-emerald');
    } else {
      nextBtn.innerHTML = 'Siguiente Paso →';
      nextBtn.classList.remove('btn-emerald');
      nextBtn.classList.add('btn-primary');
    }
  }

  // Update Stepper & Timeline
  renderStepperPills();
  renderRoadmapTimeline();

  // Voice narration if enabled
  if (isVoiceEnabled) {
    speakStepInstruction(step.instruction);
  }
}

// 5. Render Full Sheet View (All Steps Sequentially)
function renderSheetView() {
  const imgEl = document.getElementById('sheet-recipe-img');
  const titleEl = document.getElementById('sheet-recipe-title');
  const descEl = document.getElementById('sheet-recipe-desc');
  const catEl = document.getElementById('sheet-category-badge');
  const diffEl = document.getElementById('sheet-difficulty-badge');
  const timeEl = document.getElementById('sheet-time-badge');
  const macrosBanner = document.getElementById('sheet-macros-banner');
  const ingGrid = document.getElementById('sheet-ingredients-grid');
  const stepsContainer = document.getElementById('sheet-all-steps-container');

  if (imgEl) imgEl.src = currentRecipe.image || 'assets/images/recipe_mediterranean_pasta.jpg';
  if (titleEl) titleEl.textContent = currentRecipe.title;
  if (descEl) descEl.textContent = currentRecipe.description || currentRecipe.subtitle || '';
  if (catEl) catEl.textContent = currentRecipe.category ? currentRecipe.category.toUpperCase() : 'RECETA';
  if (diffEl) diffEl.textContent = currentRecipe.difficulty || 'Fácil';
  if (timeEl) {
    const totalTime = (currentRecipe.prepTime || 10) + (currentRecipe.cookTime || 15);
    timeEl.textContent = `⏱️ ${totalTime} min`;
  }

  const baseServings = currentRecipe.servings || 2;
  const multiplier = currentServings / baseServings;

  if (macrosBanner) {
    macrosBanner.innerHTML = `
      <span class="badge badge-emerald" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">💪 ${Math.round((currentRecipe.protein || 30) * multiplier)}g Proteína</span>
      <span class="badge badge-amber" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">🔥 ${Math.round((currentRecipe.calories || 500) * multiplier)} kcal</span>
      <span class="badge badge-violet" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">🌾 ${Math.round((currentRecipe.carbs || 45) * multiplier)}g Carbos</span>
      <span class="badge badge-coral" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">🥑 ${Math.round((currentRecipe.fat || 20) * multiplier)}g Grasas</span>
    `;
  }

  if (ingGrid) {
    ingGrid.innerHTML = currentRecipe.ingredients.map(ing => {
      const scaledAmt = getScaledAmount(ing.amount, baseServings, currentServings);
      return `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 0.6rem 0.85rem; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.88rem; font-weight: 600; color: #FFF;">${ing.name}</span>
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--accent-amber);">${scaledAmt} ${ing.unit}</span>
        </div>
      `;
    }).join('');
  }

  if (stepsContainer) {
    stepsContainer.innerHTML = currentRecipe.steps.map((step, idx) => {
      const isDone = completedSteps.has(idx);
      const phase = getStepPhaseName(step, idx, currentRecipe.steps.length);
      const stepIngs = findIngredientsInStep(step.instruction, currentRecipe.ingredients);
      const durationMins = step.timerSeconds ? Math.ceil(step.timerSeconds / 60) : 2;

      return `
        <div class="cook-sheet-step-card ${isDone ? 'is-completed' : ''}" id="sheet-step-card-${idx}">
          <div class="cook-sheet-step-top">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span class="step-num-pill">PASO ${step.step}</span>
              <span class="step-phase-pill">${phase}</span>
              <span class="step-time-badge">⏱️ ~${durationMins} min</span>
            </div>

            <div style="display: flex; gap: 0.5rem; align-items: center;">
              ${step.timerSeconds ? `
                <button class="btn btn-secondary btn-sm" id="btn-sheet-timer-${idx}" onclick="startSheetStepTimer(${idx}, ${step.timerSeconds})">
                  ⏱️ Iniciar Timer (${formatSeconds(step.timerSeconds)})
                </button>
              ` : ''}
              <button class="btn btn-ghost btn-sm" onclick="toggleSheetStepDone(${idx})" style="font-weight: 700;">
                <span id="sheet-step-check-${idx}">${isDone ? '✅ Hecho' : '⭕ Marcar Hecho'}</span>
              </button>
            </div>
          </div>

          <div class="cook-sheet-step-instruction">
            ${formatInstructionWithHighlights(step.instruction, currentRecipe.ingredients)}
          </div>

          ${stepIngs.length > 0 ? `
            <div style="margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center;">
              <span style="font-size: 0.78rem; color: var(--text-secondary); font-weight: 700; text-transform: uppercase;">Ingredientes:</span>
              ${stepIngs.map(ing => {
                const scaledAmt = getScaledAmount(ing.amount, baseServings, currentServings);
                return `
                  <span class="cook-step-ing-chip" style="font-size: 0.8rem; padding: 0.25rem 0.6rem;">
                    <span>${ing.name}</span>: <strong>${scaledAmt} ${ing.unit}</strong>
                  </span>
                `;
              }).join('')}
            </div>
          ` : ''}

          ${step.tip ? `
            <div class="cook-step-tip-panel" style="margin-bottom: 0;">
              <div class="cook-step-tip-icon">💡</div>
              <div class="cook-step-tip-body">
                <div class="cook-step-tip-title">Consejo del Chef:</div>
                <div class="cook-step-tip-content">${step.tip}</div>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }
}

// 6. View Mode Switcher ('focus' | 'sheet')
window.switchCookView = function(mode) {
  currentViewMode = mode;

  const focusView = document.getElementById('cook-view-focus');
  const sheetView = document.getElementById('cook-view-sheet');
  const tabFocus = document.getElementById('tab-btn-focus');
  const tabSheet = document.getElementById('tab-btn-sheet');

  if (mode === 'focus') {
    if (focusView) focusView.classList.add('active');
    if (sheetView) sheetView.classList.remove('active');
    if (tabFocus) tabFocus.classList.add('active');
    if (tabSheet) tabSheet.classList.remove('active');
    renderCurrentFocusStep();
  } else {
    if (focusView) focusView.classList.remove('active');
    if (sheetView) sheetView.classList.add('active');
    if (tabFocus) tabFocus.classList.remove('active');
    if (tabSheet) tabSheet.classList.add('active');
    renderSheetView();
  }

  if (window.soundFX) window.soundFX.playClick();
};

// 7. Navigation Controls
window.goToStep = function(idx) {
  if (idx >= 0 && idx < currentRecipe.steps.length) {
    currentStepIndex = idx;
    if (currentViewMode === 'focus') {
      renderCurrentFocusStep();
    } else {
      switchCookView('focus');
    }
    if (window.soundFX) window.soundFX.playKnifeChop();
  }
};

window.prevStep = function() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderCurrentFocusStep();
    if (window.soundFX) window.soundFX.playKnifeChop();
  }
};

window.nextStep = function() {
  // Mark current step as completed automatically
  completedSteps.add(currentStepIndex);

  if (currentStepIndex < currentRecipe.steps.length - 1) {
    currentStepIndex++;
    renderCurrentFocusStep();
    if (window.soundFX) window.soundFX.playKnifeChop();
  } else {
    finishRecipeCelebration();
  }
};

window.toggleCurrentStepDone = function() {
  if (completedSteps.has(currentStepIndex)) {
    completedSteps.delete(currentStepIndex);
  } else {
    completedSteps.add(currentStepIndex);
    if (window.soundFX) window.soundFX.playChime();
  }
  renderCurrentFocusStep();
};

window.toggleSheetStepDone = function(idx) {
  if (completedSteps.has(idx)) {
    completedSteps.delete(idx);
  } else {
    completedSteps.add(idx);
    if (window.soundFX) window.soundFX.playChime();
  }
  renderSheetView();
  renderStepperPills();
};

// 8. Smart Multi-Timer Controller (Timestamp-based with background lag resistance)
function initStepTimers() {
  const playPauseBtn = document.getElementById('btn-timer-play-pause');
  const resetBtn = document.getElementById('btn-timer-reset');

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', toggleTimer);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const step = currentRecipe.steps[currentStepIndex];
      resetTimer(step.timerSeconds || 0);
    });
  }

  // Resync on tab visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (isTimerRunning && timerTargetTimestamp > 0) {
        timerSecondsRemaining = Math.max(0, Math.ceil((timerTargetTimestamp - Date.now()) / 1000));
        updateTimerDisplay();
      }
      if (isWakeLockActive && !wakeLockSentinel) {
        requestWakeLock();
      }
    }
  });
}

function resetTimer(seconds) {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerSecondsRemaining = seconds;
  totalTimerDuration = seconds;
  timerTargetTimestamp = 0;

  const timerWrapper = document.getElementById('step-timer-wrapper');
  if (timerWrapper) {
    timerWrapper.style.display = seconds > 0 ? 'block' : 'none';
  }

  const statusBadge = document.getElementById('timer-status-badge');
  if (statusBadge) statusBadge.textContent = 'Listo para iniciar';

  updateTimerDisplay();
  const playBtn = document.getElementById('btn-timer-play-pause');
  if (playBtn) playBtn.innerHTML = '▶️ Iniciar Temporizador';
}

function toggleTimer() {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSecondsRemaining = Math.max(0, Math.ceil((timerTargetTimestamp - Date.now()) / 1000));
    document.getElementById('btn-timer-play-pause').innerHTML = '▶️ Reanudar';
    const statusBadge = document.getElementById('timer-status-badge');
    if (statusBadge) statusBadge.textContent = 'Pausado';
    if (window.soundFX) window.soundFX.playClick();
  } else {
    if (timerSecondsRemaining <= 0) return;
    isTimerRunning = true;
    timerTargetTimestamp = Date.now() + (timerSecondsRemaining * 1000);
    document.getElementById('btn-timer-play-pause').innerHTML = '⏸️ Pausar';
    const statusBadge = document.getElementById('timer-status-badge');
    if (statusBadge) statusBadge.textContent = 'En cuenta regresiva... ⏳';
    if (window.soundFX) window.soundFX.playClick();

    timerInterval = setInterval(() => {
      const remainingMs = timerTargetTimestamp - Date.now();
      timerSecondsRemaining = Math.max(0, Math.ceil(remainingMs / 1000));
      updateTimerDisplay();

      if (timerSecondsRemaining <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timerTargetTimestamp = 0;
        document.getElementById('btn-timer-play-pause').innerHTML = '✓ ¡Tiempo Completado!';
        const statusBadge = document.getElementById('timer-status-badge');
        if (statusBadge) statusBadge.textContent = '¡Listo! 🔥';
        if (window.soundFX) window.soundFX.playChime();
        if (window.showToast) window.showToast('🔔 ¡Tiempo completado para este paso!', 'emerald');
      }
    }, 250);
  }
}

window.adjustTimer = function(deltaSeconds) {
  timerSecondsRemaining = Math.max(0, timerSecondsRemaining + deltaSeconds);
  if (isTimerRunning) {
    timerTargetTimestamp += (deltaSeconds * 1000);
  }
  if (timerSecondsRemaining > totalTimerDuration) {
    totalTimerDuration = timerSecondsRemaining;
  }
  updateTimerDisplay();
  if (window.soundFX) window.soundFX.playClick();
};

function updateTimerDisplay() {
  const display = document.getElementById('timer-time-text');
  const circle = document.getElementById('timer-progress-circle');

  const mins = Math.floor(timerSecondsRemaining / 60);
  const secs = timerSecondsRemaining % 60;
  const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  if (display) display.textContent = formatted;

  if (circle && totalTimerDuration > 0) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = (totalTimerDuration - timerSecondsRemaining) / totalTimerDuration;
    const offset = circumference - (progress * circumference);
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  }
}

window.startSheetStepTimer = function(idx, initialSecs) {
  const btn = document.getElementById(`btn-sheet-timer-${idx}`);
  if (!btn) return;

  if (sheetTimers[idx] && sheetTimers[idx].running) {
    clearInterval(sheetTimers[idx].interval);
    sheetTimers[idx].running = false;
    const rem = Math.max(0, Math.ceil((sheetTimers[idx].target - Date.now()) / 1000));
    sheetTimers[idx].remaining = rem;
    btn.innerHTML = `▶️ Reanudar (${formatSeconds(rem)})`;
    return;
  }

  let remaining = sheetTimers[idx] ? sheetTimers[idx].remaining : initialSecs;
  const target = Date.now() + (remaining * 1000);

  const interval = setInterval(() => {
    const rem = Math.max(0, Math.ceil((target - Date.now()) / 1000));
    sheetTimers[idx].remaining = rem;
    btn.innerHTML = `⏸️ ${formatSeconds(rem)}`;

    if (rem <= 0) {
      clearInterval(interval);
      sheetTimers[idx].running = false;
      btn.innerHTML = `✓ ¡Listo!`;
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-emerald');
      if (window.soundFX) window.soundFX.playChime();
      if (window.showToast) window.showToast(`🔔 ¡Paso ${idx + 1} completado!`, 'emerald');
    }
  }, 250);

  sheetTimers[idx] = { interval, target, remaining, running: true };
  btn.innerHTML = `⏸️ ${formatSeconds(remaining)}`;
};

// Screen Wake Lock API (Keeps screen awake during cooking)
async function initWakeLock() {
  await requestWakeLock();
}

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      isWakeLockActive = true;
      updateWakeLockUI(true);
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
        updateWakeLockUI(false);
      });
    } catch (err) {
      console.warn('Wake Lock request failed:', err);
      updateWakeLockUI(false);
    }
  } else {
    updateWakeLockUI(false);
  }
}

async function releaseWakeLock() {
  if (wakeLockSentinel) {
    await wakeLockSentinel.release();
    wakeLockSentinel = null;
    isWakeLockActive = false;
    updateWakeLockUI(false);
  }
}

window.toggleWakeLock = async function() {
  if (wakeLockSentinel) {
    await releaseWakeLock();
    if (window.showToast) window.showToast('Pantalla activa desactivada', 'muted');
  } else {
    await requestWakeLock();
    if (window.showToast) window.showToast('📱 Pantalla siempre encendida activada', 'emerald');
  }
  if (window.soundFX) window.soundFX.playClick();
};

function updateWakeLockUI(active) {
  const btn = document.getElementById('btn-toggle-wake-lock');
  if (!btn) return;
  if (active) {
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-primary');
    btn.innerHTML = '📱 Pantalla Activa';
    btn.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.4)';
  } else {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    btn.innerHTML = '📱 Pantalla Standby';
    btn.style.boxShadow = 'none';
  }
}

// 9. Recipe Completion Celebration & Impact Deduction
window.finishRecipeCelebration = function() {
  // Deduct ingredients and save impact stats in LocalStorage
  if (window.fridgeStore && typeof window.fridgeStore.recordCompletedMeal === 'function') {
    window.fridgeStore.recordCompletedMeal(currentRecipe.id);
  }

  if (window.soundFX) window.soundFX.playFanfare();
  launchConfetti();

  const modal = document.getElementById('cook-complete-modal');
  if (modal) {
    modal.classList.add('active');

    // Macros summary in modal
    const macrosEl = document.getElementById('complete-macros-summary');
    if (macrosEl) {
      macrosEl.innerHTML = `
        <div>
          <span style="font-size: 0.75rem; color: var(--text-tertiary); display: block;">PROTEÍNA</span>
          <strong style="color: var(--accent-emerald); font-size: 1.15rem;">${currentRecipe.protein || 30}g</strong>
        </div>
        <div>
          <span style="font-size: 0.75rem; color: var(--text-tertiary); display: block;">CALORÍAS</span>
          <strong style="color: #FFF; font-size: 1.15rem;">${currentRecipe.calories || 500}</strong>
        </div>
        <div>
          <span style="font-size: 0.75rem; color: var(--text-tertiary); display: block;">CARBOS</span>
          <strong style="color: #FFF; font-size: 1.15rem;">${currentRecipe.carbs || 45}g</strong>
        </div>
        <div>
          <span style="font-size: 0.75rem; color: var(--text-tertiary); display: block;">GRASAS</span>
          <strong style="color: #FFF; font-size: 1.15rem;">${currentRecipe.fat || 20}g</strong>
        </div>
      `;
    }

    const impactEl = document.getElementById('complete-impact-summary');
    if (impactEl) {
      const co2 = currentRecipe.co2Saved || 1.8;
      const savedARS = Math.round((currentRecipe.moneySaved || 14.50) * 1200);
      impactEl.innerHTML = `
        🌱 Has evitado <strong>${co2} kg de CO2</strong><br/>
        💰 Has ahorrado <strong>$ ${savedARS.toLocaleString('es-AR')} ARS</strong> vs pedir delivery o restaurante.
      `;
    }
  }
};

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'celebration-canvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '9999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#10B981', '#34D399', '#F59E0B', '#F43F5E', '#8B5CF6', '#38BDF8'];

  for (let i = 0; i < 140; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20 - 5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // Gravity
      p.rotation += p.vRot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 200) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(animate);
}

// 10. Voice Assistant & Speech Synthesis
function initVoiceAssistant() {
  const voiceToggleBtn = document.getElementById('btn-toggle-voice-narration');
  if (voiceToggleBtn) {
    voiceToggleBtn.addEventListener('click', () => {
      isVoiceEnabled = !isVoiceEnabled;
      voiceToggleBtn.innerHTML = isVoiceEnabled ? '🎙️ Voz: ON' : '🎙️ Voz';
      voiceToggleBtn.classList.toggle('btn-primary', isVoiceEnabled);

      if (isVoiceEnabled) {
        if (window.showToast) window.showToast('🎙️ Chef FridgeFlow listo para narrar las instrucciones', 'emerald');
        const step = currentRecipe.steps[currentStepIndex];
        if (step) speakStepInstruction(step.instruction);
      } else {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    });
  }
}

function speakStepInstruction(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/<[^>]*>?/gm, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'es-ES';
  utterance.rate = 1.0;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

// 11. Ambient Bistro Soundscape
function initSoundscapeToggle() {
  const soundscapeBtn = document.getElementById('btn-toggle-soundscape');
  const bars = document.getElementById('soundscape-bars-indicator');

  if (soundscapeBtn) {
    soundscapeBtn.addEventListener('click', () => {
      if (window.soundFX) {
        const isPlaying = window.soundFX.toggleAmbientSoundscape();
        soundscapeBtn.innerHTML = isPlaying ? '🎵 Bistro: ON' : '🎵 Bistro';
        if (bars) bars.style.display = isPlaying ? 'inline-flex' : 'none';
        if (window.showToast) window.showToast(isPlaying ? '🍲 Ambiente de cocina activado' : 'Silenciado', 'violet');
      }
    });
  }
}

// 12. Keyboard Shortcuts
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextStep();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevStep();
    } else if (e.key === ' ') {
      e.preventDefault();
      toggleTimer();
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      switchCookView(currentViewMode === 'focus' ? 'sheet' : 'focus');
    } else if (e.key === 'v' || e.key === 'V') {
      e.preventDefault();
      const voiceBtn = document.getElementById('btn-toggle-voice-narration');
      if (voiceBtn) voiceBtn.click();
    }
  });
}

// --- Helper Functions ---
function getStepPhaseName(step, index, totalSteps) {
  if (index === 0) return 'PREPARACIÓN & CORTE';
  if (index === totalSteps - 1) return 'EMPLATADO & SERVICIO';
  const text = step.instruction.toLowerCase();
  if (text.includes('hierve') || text.includes('agua') || text.includes('pasta') || text.includes('cocina')) return 'COCCIÓN PRINCIPAL';
  if (text.includes('hornea') || text.includes('horno') || text.includes('airfryer')) return 'HORNEADO & TOSTADO';
  if (text.includes('saltea') || text.includes('sartén') || text.includes('dora') || text.includes('sella')) return 'SALTEADO & DORADO';
  if (text.includes('emulsiona') || text.includes('salsa') || text.includes('mezcla') || text.includes('bate')) return 'INTEGRACIÓN & SALSA';
  return `PASO TÉCNICO ${index + 1}`;
}

function findIngredientsInStep(instruction, allIngredients) {
  if (!allIngredients || !instruction) return [];
  const text = instruction.toLowerCase();
  
  return allIngredients.filter(ing => {
    const nameWords = ing.name.toLowerCase().split(/[\s,]+/);
    const idWords = (ing.id || '').toLowerCase().split('_');
    return nameWords.some(w => w.length > 3 && text.includes(w)) || 
           idWords.some(w => w.length > 3 && text.includes(w));
  });
}

function formatInstructionWithHighlights(instruction, allIngredients) {
  if (!instruction) return '';

  let html = instruction;

  // Highlight actions
  const actions = [
    'Hierve', 'hierve', 'Saltea', 'saltea', 'Sofríe', 'sofríe', 'Dora', 'dora',
    'Sella', 'sella', 'Hornea', 'hornea', 'Emulsiona', 'emulsiona', 'Remueve', 'remueve',
    'Mezcla', 'mezcla', 'Pica', 'pica', 'Corta', 'corta', 'Bate', 'bate', 'Sirve', 'sirve',
    'Transfiere', 'transfiere', 'Vierte', 'vierte', 'Monta', 'monta', 'Decora', 'decora'
  ];

  actions.forEach(act => {
    const regex = new RegExp(`\\b(${act})\\b`, 'g');
    html = html.replace(regex, `<span class="hl-action">$1</span>`);
  });

  // Highlight temperatures and key times
  html = html.replace(/(\d+°C|\d+\s*minutos|\d+\s*min|\d+\s*segundos|fuego medio-alto|fuego vivo|fuego lento|al dente)/gi, `<span class="hl-temp">$1</span>`);

  return html;
}

function formatSeconds(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
