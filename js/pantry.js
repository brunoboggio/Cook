/* ==========================================================================
   FRIDGEFLOW - PANTRY & REFRIGERATOR CONTROLLER
   3D Fridge Door physics, Shelf Drag & Drop, AI Vision Scanner Simulator & Expiry Radar
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPantryView();
  init3DFridge();
  initScannerSimulator();
  initQuickAddForm();
  initPresetButtons();

  // Listen for storage updates
  window.addEventListener('fridgeflow:statechange', (e) => {
    if (e.detail && e.detail.key === fridgeStore.STORAGE_KEYS.PANTRY) {
      renderPantry();
      renderFridgeShelves();
      updatePantryStats();
    }
  });
});

let currentFilter = 'all';
let currentSearch = '';

function initPantryView() {
  renderPantry();
  renderFridgeShelves();
  updatePantryStats();

  // Category filter tabs
  const filterBtns = document.querySelectorAll('.pantry-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-ghost'));
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-ghost');
      currentFilter = btn.dataset.filter;
      renderPantry();
    });
  });

  // Search input
  const searchInput = document.getElementById('pantry-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderPantry();
    });
  }
}

// 1. Render Inventory Grid
function renderPantry() {
  const container = document.getElementById('pantry-items-grid');
  if (!container) return;

  const items = fridgeStore.getPantry();
  let filtered = items;

  if (currentFilter !== 'all') {
    filtered = filtered.filter(item => item.location === currentFilter || item.category === currentFilter);
  }

  if (currentSearch) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(currentSearch));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-glass-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🥬</div>
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">No hay ingredientes en esta sección</h3>
        <p style="font-size: 0.9rem; margin-bottom: 1.25rem;">Añade nuevos alimentos con el buscador rápido o escanea tu nevera.</p>
        <button class="btn btn-primary btn-sm" onclick="openScannerModal()">📸 Abrir Escáner IA</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const meta = window.FridgeData.ingredients.find(i => i.id === item.id) || {};
    const emoji = meta.emoji || '🥑';
    const days = item.daysToExpiry !== undefined ? item.daysToExpiry : 5;

    let expiryClass = 'expiry-fresh';
    let expiryLabel = `${days} días`;
    let badgeClass = 'badge-emerald';

    if (days <= 2) {
      expiryClass = 'expiry-critical';
      expiryLabel = days <= 0 ? '¡Caduca hoy!' : `¡${days}d restante!`;
      badgeClass = 'badge-coral';
    } else if (days <= 4) {
      expiryClass = 'expiry-soon';
      expiryLabel = `${days} días (Pronto)`;
      badgeClass = 'badge-amber';
    }

    const locationLabels = {
      fridge: '❄️ Nevera',
      pantry: '🏺 Despensa',
      freezer: '🧊 Congelador'
    };

    return `
      <div class="glass-panel glass-panel-interactive" style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        <div>
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.75rem;">
            <div style="font-size: 2rem; width: 44px; height: 44px; border-radius: 12px; background: var(--bg-elevated); display: grid; place-items: center;">
              ${emoji}
            </div>
            <button class="btn-icon" style="width: 28px; height: 28px; font-size: 0.8rem;" onclick="deletePantryItem('${item.instanceId || item.id}')" title="Eliminar">✕</button>
          </div>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.25rem;">${item.name}</h4>
          <div style="font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 0.75rem;">
            ${item.qty} ${item.unit} · ${locationLabels[item.location] || 'Nevera'}
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; margin-top: 0.5rem;">
          <span class="badge ${badgeClass}" style="font-size: 0.7rem;">
            <span class="expiry-dot ${expiryClass}"></span>
            ${expiryLabel}
          </span>
          <a href="recipes.html?filterIngredient=${item.id}" class="btn btn-ghost btn-sm" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;">Recetas →</a>
        </div>
      </div>
    `;
  }).join('');
}

// 2. Render 3D Fridge Shelves & Interactive Physics
function init3DFridge() {
  const fridgeUnit = document.getElementById('main-3d-fridge');
  const toggleDoorBtn = document.getElementById('toggle-fridge-door-btn');

  if (toggleDoorBtn && fridgeUnit) {
    toggleDoorBtn.addEventListener('click', () => {
      fridgeUnit.classList.toggle('open');
      const isOpen = fridgeUnit.classList.contains('open');
      toggleDoorBtn.innerHTML = isOpen ? '🚪 Cerrar Puerta Nevera' : '✨ Abrir Nevera 3D';
      if (window.soundFX) window.soundFX.playFridgePop();
    });
  }
}

function renderFridgeShelves() {
  const shelfTop = document.getElementById('fridge-shelf-top');
  const shelfMiddle = document.getElementById('fridge-shelf-middle');
  const shelfCrisper = document.getElementById('fridge-shelf-crisper');

  if (!shelfTop || !shelfMiddle || !shelfCrisper) return;

  const items = fridgeStore.getPantry();

  // Top Shelf (Dairy & Prepared)
  const dairyItems = items.filter(i => i.category === 'dairy' || i.category === 'proteins');
  // Middle Shelf (Cooked, Condiments & Jars)
  const midItems = items.filter(i => i.category === 'condiments' || i.category === 'grains');
  // Crisper Drawers (Vegetables & Fruits)
  const vegItems = items.filter(i => i.category === 'vegetables' || i.category === 'fruits');

  const makePills = (list) => {
    if (list.length === 0) return `<div style="font-size: 0.75rem; color: var(--text-tertiary); font-style: italic; padding: 0.5rem;">Estante vacío</div>`;
    return list.map(item => {
      const meta = window.FridgeData.ingredients.find(i => i.id === item.id) || {};
      const days = item.daysToExpiry !== undefined ? item.daysToExpiry : 5;
      const dotColor = days <= 2 ? '#EF4444' : (days <= 4 ? '#F59E0B' : '#10B981');
      return `
        <div class="fridge-item-pill" draggable="true" ondragstart="handleFridgeItemDrag(event, '${item.id}')" onclick="inspectIngredient('${item.id}')" title="${item.name} (${days} días restantes)">
          <span style="font-size: 1.15rem;">${meta.emoji || '🥗'}</span>
          <span style="font-weight: 600; font-size: 0.82rem;">${item.name}</span>
          <span style="width: 6px; height: 6px; border-radius: 50%; background: ${dotColor}; box-shadow: 0 0 6px ${dotColor}; flex-shrink: 0; margin-left: 2px;"></span>
        </div>
      `;
    }).join('');
  };

  shelfTop.innerHTML = makePills(dairyItems);
  shelfMiddle.innerHTML = makePills(midItems);
  shelfCrisper.innerHTML = makePills(vegItems);
}

window.handleFridgeItemDrag = function(e, id) {
  e.dataTransfer.setData('text/plain', id);
  if (window.soundFX) window.soundFX.playKnifeChop();
};

window.inspectIngredient = function(id) {
  const ing = window.FridgeData.ingredients.find(i => i.id === id);
  if (!ing) return;

  if (window.soundFX) window.soundFX.playClick();
  window.showToast(`${ing.emoji} ${ing.name}: ${ing.defaultExpiryDays} días vida útil estimada`, 'violet');
};

window.deletePantryItem = function(instanceId) {
  fridgeStore.removePantryItem(instanceId);
  if (window.soundFX) window.soundFX.playKnifeChop();
  window.showToast('Ingrediente retirado del inventario', 'amber');
};

// 3. Update Pantry Statistics Header
function updatePantryStats() {
  const items = fridgeStore.getPantry();
  const totalCountEl = document.getElementById('stat-total-items');
  const expiringSoonEl = document.getElementById('stat-expiring-soon');
  const rescuedCountEl = document.getElementById('stat-rescued-count');

  if (totalCountEl) totalCountEl.textContent = items.length;

  const expiring = items.filter(i => (i.daysToExpiry !== undefined ? i.daysToExpiry : 5) <= 3);
  if (expiringSoonEl) expiringSoonEl.textContent = expiring.length;

  const metrics = fridgeStore.get(fridgeStore.STORAGE_KEYS.METRICS, { mealsRescued: 23 });
  if (rescuedCountEl) rescuedCountEl.textContent = `${metrics.mealsRescued} platos`;
}

// 4. Quick Add Form with Autocomplete
function initQuickAddForm() {
  const input = document.getElementById('quick-add-input');
  const datalist = document.getElementById('ingredients-datalist');
  const form = document.getElementById('quick-add-form');

  if (datalist && window.FridgeData) {
    datalist.innerHTML = window.FridgeData.ingredients.map(ing => `
      <option value="${ing.name}" data-id="${ing.id}">${ing.emoji} ${ing.category}</option>
    `).join('');
  }

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;

      // Find in master list
      const matched = window.FridgeData.ingredients.find(i => i.name.toLowerCase() === val.toLowerCase()) || {
        id: val.toLowerCase().replace(/\s+/g, '_'),
        name: val,
        category: 'vegetables',
        defaultExpiryDays: 7
      };

      fridgeStore.addPantryItem({
        id: matched.id,
        name: matched.name,
        category: matched.category,
        qty: 1,
        unit: matched.unit || 'uds',
        daysToExpiry: matched.defaultExpiryDays || 7,
        location: 'fridge'
      });

      input.value = '';
      if (window.soundFX) window.soundFX.playKnifeChop();
      window.showToast(`✅ ${matched.name} añadido a la nevera`, 'emerald');
    });
  }
}

// 5. Preset Starter Kit Loader
function initPresetButtons() {
  const presetBtns = document.querySelectorAll('.load-preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.preset;
      fridgeStore.loadPreset(key);
      if (window.soundFX) window.soundFX.playFridgePop();
    });
  });
}

// 6. Simulated AI Computer Vision Scanner
function initScannerSimulator() {
  window.openScannerModal = function() {
    let modal = document.getElementById('ai-scanner-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ai-scanner-modal';
      modal.className = 'modal-backdrop';
      modal.innerHTML = `
        <div class="modal-content" style="max-width: 680px;">
          <button class="btn-icon modal-close" onclick="closeScannerModal()">✕</button>
          
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="font-size: 1.5rem; width: 40px; height: 40px; border-radius: 10px; background: var(--grad-brand); display: grid; place-items: center; color: #FFF;">📸</div>
            <div>
              <h3 style="font-size: 1.25rem;">FridgeFlow AI Vision™ Scanner</h3>
              <p style="font-size: 0.85rem;">Reconocimiento instantáneo de alimentos y tickets de compra</p>
            </div>
          </div>

          <!-- Video Viewport / Simulation Box -->
          <div style="position: relative; width: 100%; height: 320px; border-radius: 16px; overflow: hidden; background: #000; margin-bottom: 1.5rem; border: 1px solid var(--border-strong);">
            <img id="scanner-preview-img" src="assets/images/fridge_interior.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;" alt="Scanner stream" />
            
            <!-- Scanning Laser Ray -->
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent-emerald); box-shadow: 0 0 15px 4px var(--accent-emerald); animation: laserScan 2.2s ease-in-out infinite alternate;"></div>

            <!-- Simulated Detection Bounding Boxes -->
            <div id="detection-box-1" style="position: absolute; top: 40%; left: 20%; border: 2px solid #34D399; background: rgba(52, 211, 153, 0.15); border-radius: 6px; padding: 2px 6px; font-size: 0.75rem; font-weight: 700; color: #FFF;">
              🍅 Tomates Maduros (98%)
            </div>
            <div id="detection-box-2" style="position: absolute; top: 60%; right: 25%; border: 2px solid #34D399; background: rgba(52, 211, 153, 0.15); border-radius: 6px; padding: 2px 6px; font-size: 0.75rem; font-weight: 700; color: #FFF;">
              🥦 Brócoli Fresco (94%)
            </div>
            <div id="detection-box-3" style="position: absolute; top: 25%; right: 15%; border: 2px solid #34D399; background: rgba(52, 211, 153, 0.15); border-radius: 6px; padding: 2px 6px; font-size: 0.75rem; font-weight: 700; color: #FFF;">
              🧀 Burrata / Mozzarella (91%)
            </div>
          </div>

          <div style="background: var(--bg-elevated); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;">
            <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--accent-emerald);">
              ✨ 3 Ingredientes detectados con precisión:
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span class="badge badge-emerald">🍅 3x Tomates maduros</span>
              <span class="badge badge-emerald">🥦 1x Brócoli fresco</span>
              <span class="badge badge-emerald">🧀 1x Queso Burrata</span>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button class="btn btn-secondary" onclick="closeScannerModal()">Cancelar</button>
            <button class="btn btn-primary" onclick="confirmScannedIngredients()">📥 Añadir al Inventario</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // Add laser scan keyframes if not exists
      if (!document.getElementById('scanner-laser-style')) {
        const style = document.createElement('style');
        style.id = 'scanner-laser-style';
        style.innerHTML = `
          @keyframes laserScan {
            0% { top: 5%; }
            100% { top: 92%; }
          }
        `;
        document.head.appendChild(style);
      }
    }
    modal.classList.add('active');
    if (window.soundFX) window.soundFX.playFridgePop();
  };

  window.closeScannerModal = function() {
    const modal = document.getElementById('ai-scanner-modal');
    if (modal) modal.classList.remove('active');
  };

  window.confirmScannedIngredients = function() {
    fridgeStore.addPantryItem({ id: 'tomate', name: 'Tomates maduros', category: 'vegetables', qty: 3, unit: 'unidades', daysToExpiry: 6 });
    fridgeStore.addPantryItem({ id: 'brocoli', name: 'Brócoli fresco', category: 'vegetables', qty: 1, unit: 'unidad', daysToExpiry: 5 });
    fridgeStore.addPantryItem({ id: 'burrata', name: 'Queso Burrata artesana', category: 'dairy', qty: 1, unit: 'unidad', daysToExpiry: 4 });

    closeScannerModal();
    if (window.soundFX) window.soundFX.playFanfare();
    window.showToast('🎉 ¡3 alimentos detectados añadidos a la nevera!', 'emerald');
  };
}

// 7. Interactive Culinary Alchemy Pot Logic
const alchemyPotItems = new Set();

window.handleAlchemyPotDrop = function(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  if (id) {
    addToAlchemyPot(id);
  }
};

window.addToAlchemyPot = function(id) {
  alchemyPotItems.add(id);
  renderAlchemyPot();
  if (window.soundFX) window.soundFX.playSizzle();
};

window.clearAlchemyPot = function() {
  alchemyPotItems.clear();
  renderAlchemyPot();
  if (window.soundFX) window.soundFX.playClick();
};

function renderAlchemyPot() {
  const container = document.getElementById('alchemy-selected-ingredients');
  const btnCook = document.getElementById('btn-cook-alchemy');
  if (!container) return;

  if (alchemyPotItems.size === 0) {
    container.innerHTML = `<span style="font-size: 0.85rem; color: var(--text-tertiary); font-style: italic; padding: 0.5rem;">Ningún ingrediente seleccionado aún</span>`;
    if (btnCook) btnCook.disabled = true;
    return;
  }

  container.innerHTML = Array.from(alchemyPotItems).map(id => {
    const meta = window.FridgeData ? window.FridgeData.ingredients.find(i => i.id === id) : null;
    const name = meta ? meta.name : id;
    const emoji = meta ? meta.emoji : '🥣';

    return `
      <span class="badge badge-emerald" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.4rem;">
        ${emoji} ${name}
        <button onclick="removeAlchemyItem('${id}')" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 4px;">✕</button>
      </span>
    `;
  }).join('');

  if (btnCook) {
    btnCook.disabled = false;
    btnCook.innerHTML = `✨ Cocinar con estos ${alchemyPotItems.size} ingredientes →`;
  }
}

window.removeAlchemyItem = function(id) {
  alchemyPotItems.delete(id);
  renderAlchemyPot();
  if (window.soundFX) window.soundFX.playClick();
};

window.cookFromAlchemyPot = function() {
  if (alchemyPotItems.size === 0) return;
  const ids = Array.from(alchemyPotItems).join(',');
  window.location.href = `recipes.html?filterIngredients=${encodeURIComponent(ids)}`;
};

