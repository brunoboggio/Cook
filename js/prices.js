/* ==========================================================================
   FRIDGEFLOW - INSUMOS & PRICES ENGINE (ARS)
   Interactive pricing manager in Argentine Pesos with real-time cart sync
   ========================================================================== */

(function() {
  'use strict';

  let activeCategory = 'all';
  let searchQuery = '';

  // Currency Formatter Helper
  function formatARS(amount) {
    const num = Math.round(Number(amount) || 0);
    return num.toLocaleString('es-AR');
  }

  // Category labels and emojis
  const categoryLabels = {
    all: 'Todos',
    proteins: '🥩 Proteínas',
    vegetables: '🥬 Frutería & Verduras',
    dairy: '🧀 Lácteos & Huevos',
    grains: '🌾 Cereales & Pastas',
    condiments: '🫒 Despensa & Condimentos'
  };

  function initPricesPage() {
    setupEventListeners();
    updateKPIs();
    renderPricesGrid();
  }

  function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-insumos-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderPricesGrid();
      });
    }

    // Category filter pills
    const catPills = document.querySelectorAll('.price-cat-pill');
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-cat') || 'all';
        if (window.soundFX) window.soundFX.playClick();
        renderPricesGrid();
      });
    });

    // Listen for outside price changes
    window.addEventListener('fridgeflow:priceschange', () => {
      updateKPIs();
      renderPricesGrid();
    });
    window.addEventListener('fridgeflow:statechange', () => {
      updateKPIs();
      renderPricesGrid();
    });
  }

  function updateKPIs() {
    const catalog = (window.FridgeData && window.FridgeData.ingredients) ? window.FridgeData.ingredients : [];
    const customPrices = fridgeStore.getCustomPrices();
    const customKeys = Object.keys(customPrices).filter(k => customPrices[k] !== undefined && customPrices[k] !== null);
    
    // KPI 1: Custom count
    const customCountEl = document.getElementById('kpi-custom-count');
    if (customCountEl) {
      customCountEl.textContent = `${customKeys.length} personalizados`;
    }

    // KPI 2: Average price
    const avgPriceEl = document.getElementById('kpi-avg-price');
    if (avgPriceEl && catalog.length > 0) {
      const sum = catalog.reduce((acc, ing) => acc + fridgeStore.getIngredientPrice(ing.id), 0);
      const avg = Math.round(sum / catalog.length);
      avgPriceEl.textContent = `$ ${formatARS(avg)} ARS`;
    }

    // KPI 3: Cart total
    const cartTotalEl = document.getElementById('kpi-cart-total');
    if (cartTotalEl) {
      const cartData = fridgeStore.getConsolidatedCart();
      cartTotalEl.textContent = `$ ${formatARS(cartData.estimatedTotal)} ARS`;
    }

    // Header badge
    const headerCustomBadge = document.getElementById('header-custom-badge');
    if (headerCustomBadge) {
      headerCustomBadge.textContent = `${customKeys.length} Precios Editados`;
    }
  }

  function renderPricesGrid() {
    const container = document.getElementById('prices-grid-container');
    if (!container) return;

    const catalog = (window.FridgeData && window.FridgeData.ingredients) ? window.FridgeData.ingredients : [];
    
    // Determine which ingredients are in the current cart/menu
    let cartIngredientIds = new Set();
    if (activeCategory === 'cart') {
      const cartData = fridgeStore.getConsolidatedCart();
      cartIngredientIds = new Set(cartData.items.map(i => i.id.toLowerCase()));
    }

    // Filter ingredients
    const filtered = catalog.filter(ing => {
      let matchesCategory = false;
      if (activeCategory === 'all') {
        matchesCategory = true;
      } else if (activeCategory === 'cart') {
        matchesCategory = cartIngredientIds.has(ing.id.toLowerCase()) || 
                          cartIngredientIds.has(ing.name.toLowerCase()) ||
                          Array.from(cartIngredientIds).some(cId => ing.id.toLowerCase().includes(cId) || cId.includes(ing.id.toLowerCase()));
      } else {
        matchesCategory = (ing.category === activeCategory);
      }

      const matchesSearch = !searchQuery || 
                            ing.name.toLowerCase().includes(searchQuery) || 
                            ing.category.toLowerCase().includes(searchQuery) ||
                            (ing.substitutes && ing.substitutes.some(s => s.toLowerCase().includes(searchQuery)));
      return matchesCategory && matchesSearch;
    });

    // Update count in UI
    const countEl = document.getElementById('prices-filtered-count');
    if (countEl) {
      countEl.textContent = `Mostrando ${filtered.length} de ${catalog.length} insumos${activeCategory === 'cart' ? ' (En tu menú semanal)' : ''}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; color: var(--text-tertiary);">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔍</div>
          <h3 style="color: #FFFFFF; font-size: 1.25rem;">No se encontraron insumos</h3>
          <p style="font-size: 0.9rem;">${activeCategory === 'cart' ? 'No hay insumos activos en tu menú actual. Genera un plan en el Planificador primero.' : 'Prueba con otro término de búsqueda o selecciona otra categoría.'}</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(ing => {
      const currentPrice = fridgeStore.getIngredientPrice(ing.id);
      const defaultPrice = fridgeStore.getDefaultIngredientPrice(ing.id);
      const isCustom = fridgeStore.isIngredientCustomPrice(ing.id);

      html += `
        <div class="insumo-price-card ${isCustom ? 'is-custom' : ''}" id="card-insumo-${ing.id}">
          <!-- Top Row: Icon, Name, Category -->
          <div style="display: flex; gap: 1rem; align-items: flex-start;">
            <div class="insumo-icon-box">
              ${ing.emoji || '🛒'}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                <span class="badge ${isCustom ? 'badge-emerald' : 'badge-muted'}" style="font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem;" id="badge-status-${ing.id}">
                  ${isCustom ? '⚡ Personalizado' : 'Base'}
                </span>
                <span style="font-size: 0.72rem; color: var(--accent-emerald); font-weight: 600;">
                  Ref: por ${ing.unit || 'unidad'}
                </span>
              </div>
              <h4 style="margin: 0; font-size: 1rem; font-weight: 700; color: #FFFFFF; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${ing.name}">
                ${ing.name}
              </h4>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem;">
                ${categoryLabels[ing.category] || ing.category}
              </div>
            </div>
          </div>

          <!-- Bottom Row: Price Input & Controls -->
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
              <label for="price-input-${ing.id}" style="font-size: 0.74rem; font-weight: 600; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.04em;">
                Precio estimado de compra:
              </label>
              ${isCustom ? `
                <button type="button" class="btn btn-ghost btn-sm" onclick="window.resetSingleInsumoPrice('${ing.id}')" style="font-size: 0.7rem; padding: 0.1rem 0.4rem; color: #F87171; border: none; cursor: pointer;" title="Restaurar precio base de $ ${formatARS(defaultPrice)}">
                  ↺ Restaurar base ($ ${formatARS(defaultPrice)})
                </button>
              ` : `
                <span style="font-size: 0.7rem; color: var(--text-tertiary);">
                  Catálogo base
                </span>
              `}
            </div>

            <div class="insumo-price-input-wrapper" id="wrapper-input-${ing.id}">
              <span class="insumo-price-currency">$</span>
              <input type="number" 
                     id="price-input-${ing.id}" 
                     class="insumo-price-input" 
                     value="${currentPrice}" 
                     min="0" 
                     step="50" 
                     onfocus="this.select()"
                     onchange="window.saveInsumoPrice('${ing.id}', this.value)" 
                     placeholder="0" />
              <span class="insumo-price-suffix">ARS</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Window Actions
  window.saveInsumoPrice = function(id, value) {
    const numericVal = Math.max(0, Math.round(Number(value) || 0));
    fridgeStore.setIngredientPrice(id, numericVal);

    const wrapper = document.getElementById(`wrapper-input-${id}`);
    if (wrapper) {
      wrapper.classList.remove('saved-flash');
      void wrapper.offsetWidth; // trigger reflow
      wrapper.classList.add('saved-flash');
    }

    const card = document.getElementById(`card-insumo-${id}`);
    if (card) card.classList.add('is-custom');

    const badge = document.getElementById(`badge-status-${id}`);
    if (badge) {
      badge.className = 'badge badge-emerald';
      badge.textContent = '⚡ Personalizado';
    }

    if (window.soundFX) window.soundFX.playClick();
    
    const ingName = fridgeStore.getIngredientName(id);
    if (window.showToast) {
      window.showToast(`✅ ${ingName} actualizado a $ ${formatARS(numericVal)} ARS`, 'emerald');
    }

    updateKPIs();
  };

  window.resetSingleInsumoPrice = function(id) {
    fridgeStore.removeCustomIngredientPrice(id);
    const defaultVal = fridgeStore.getDefaultIngredientPrice(id);

    const input = document.getElementById(`price-input-${id}`);
    if (input) input.value = defaultVal;

    const card = document.getElementById(`card-insumo-${id}`);
    if (card) card.classList.remove('is-custom');

    const badge = document.getElementById(`badge-status-${id}`);
    if (badge) {
      badge.className = 'badge badge-muted';
      badge.textContent = 'Base';
    }

    if (window.soundFX) window.soundFX.playClick();
    
    const ingName = fridgeStore.getIngredientName(id);
    if (window.showToast) {
      window.showToast(`↺ ${ingName} restaurado al precio base ($ ${formatARS(defaultVal)} ARS)`, 'info');
    }

    updateKPIs();
    renderPricesGrid();
  };

  window.promptBulkInflation = function() {
    const options = [
      { label: '+5% Inflación', val: 5 },
      { label: '+10% Inflación', val: 10 },
      { label: '+15% Inflación', val: 15 },
      { label: '+20% Inflación', val: 20 },
      { label: '-5% Descuento', val: -5 },
      { label: '-10% Descuento', val: -10 }
    ];

    let modal = document.getElementById('inflation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'inflation-modal';
      modal.className = 'modal-backdrop active';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 480px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span style="font-size: 1.5rem;">📈</span>
            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800;">Ajuste Rápido de Precios (%)</h3>
          </div>
          <button class="btn-icon" onclick="document.getElementById('inflation-modal').remove()">✕</button>
        </div>
        <div class="modal-body" style="padding: 1.5rem;">
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            Aplica un incremento o decremento porcentual a todos los precios de insumos en pesos argentinos para reflejar aumentos del supermercado o inflación general.
          </p>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.5rem;">
            ${options.map(opt => `
              <button class="btn btn-secondary btn-sm" onclick="window.applyBulkAdjustment(${opt.val})" style="font-weight: 700; border-radius: 12px; padding: 0.65rem;">
                ${opt.label}
              </button>
            `).join('')}
          </div>

          <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase;">O ingresa porcentaje personalizado:</label>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
              <input type="number" id="custom-percentage-input" placeholder="Ej: 12" class="form-control" style="flex: 1; text-align: center; font-weight: 800; font-size: 1.1rem; background: rgba(0,0,0,0.3);" />
              <button class="btn btn-primary" onclick="window.applyCustomAdjustment()" style="padding: 0 1.25rem;">
                Aplicar %
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.applyBulkAdjustment = function(percent) {
    fridgeStore.adjustPricesByPercentage(percent);
    const modal = document.getElementById('inflation-modal');
    if (modal) modal.remove();

    if (window.soundFX) window.soundFX.playSuccess();
    if (window.showToast) {
      window.showToast(`🚀 Todos los precios se ajustaron un ${percent > 0 ? '+' : ''}${percent}% en ARS`, 'emerald');
    }

    updateKPIs();
    renderPricesGrid();
  };

  window.applyCustomAdjustment = function() {
    const input = document.getElementById('custom-percentage-input');
    if (!input) return;
    const val = parseFloat(input.value);
    if (isNaN(val)) return;
    window.applyBulkAdjustment(val);
  };

  window.confirmResetAllPrices = function() {
    if (confirm('¿Estás seguro de que deseas restablecer TODOS los precios a los valores base por defecto?')) {
      fridgeStore.resetAllPricesToDefault();
      if (window.soundFX) window.soundFX.playClick();
      if (window.showToast) {
        window.showToast('↺ Todos los insumos fueron restaurados a los precios base', 'info');
      }
      updateKPIs();
      renderPricesGrid();
    }
  };

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', initPricesPage);

})();
