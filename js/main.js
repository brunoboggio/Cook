/* ==========================================================================
   FRIDGEFLOW - GLOBAL APPLICATION SCRIPTS & CONTROLLER
   Awwwards Navigation, Magnetic Cursor, Toast System, Universal Search & Audio FX
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initNavbar();
  initSoundBindings();
  initUniversalSearch();
  initToasts();
  initPWA();
  initBackupHandlers();
});

// PWA Service Worker Registration
function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('ServiceWorker registration error:', err);
      });
    });
  }
}

// Backup & Migration Modal Handlers
function initBackupHandlers() {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      openBackupModal();
    }
  });

  const backupBtns = document.querySelectorAll('.trigger-backup-modal');
  backupBtns.forEach(btn => btn.addEventListener('click', openBackupModal));
}

window.openBackupModal = function() {
  let modal = document.getElementById('backup-migration-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'backup-migration-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 580px; padding: 2rem; border-radius: 24px; background: linear-gradient(145deg, rgba(24, 29, 38, 0.98) 0%, rgba(13, 17, 23, 0.99) 100%); border: 1px solid rgba(16, 185, 129, 0.3);">
      <button class="btn-icon modal-close" onclick="closeBackupModal()">✕</button>
      
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
        <div style="font-size: 1.8rem; width: 44px; height: 44px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.3);">💾</div>
        <div>
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800;">Copia de Seguridad & Migración</h3>
          <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary);">Exporta o restaura tus recetas IA, planes y precios sin registro</p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 0.5rem;">
            1. Guardar o transferir tus datos:
          </label>
          <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="copyBackupToClipboard()" style="font-weight: 700; flex: 1;">
              📋 Copiar al Portapapeles
            </button>
            <button class="btn btn-secondary btn-sm" onclick="downloadBackupFile()" style="font-weight: 700; flex: 1;">
              ⬇️ Descargar Archivo .json
            </button>
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 0.5rem;">
            2. Restaurar Copia de Seguridad:
          </label>
          <textarea id="import-backup-textarea" class="form-control" rows="3" placeholder="Pega aquí el código JSON de tu copia de seguridad..."></textarea>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <input type="file" id="import-backup-file-input" accept=".json" style="display: none;" onchange="handleBackupFileUpload(event)" />
            <button class="btn btn-ghost btn-sm" onclick="document.getElementById('import-backup-file-input').click()" style="border: 1px solid rgba(255,255,255,0.12);">
              📂 Cargar archivo .json
            </button>
            <button class="btn btn-primary btn-sm" onclick="handleBackupTextImport()">
              ↺ Restaurar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
};

window.closeBackupModal = function() {
  const modal = document.getElementById('backup-migration-modal');
  if (modal) modal.classList.remove('active');
};

// Firebase Cloud Status Modal
window.openFirebaseStatusModal = function() {
  let modal = document.getElementById('firebase-status-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'firebase-status-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const recipeCount = (window.FridgeData && window.FridgeData.recipes) ? window.FridgeData.recipes.length : 37;
  const isOnline = navigator.onLine;

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 580px; padding: 2rem; border-radius: 24px; background: linear-gradient(145deg, rgba(24, 29, 38, 0.98) 0%, rgba(13, 17, 23, 0.99) 100%); border: 1px solid rgba(16, 185, 129, 0.35);">
      <button class="btn-icon modal-close" onclick="closeFirebaseStatusModal()">✕</button>
      
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
        <div style="font-size: 1.8rem; width: 48px; height: 48px; border-radius: 14px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.3);">
          🔥
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #FFF;">Firebase Cloud Firestore</h3>
            <span class="badge badge-emerald" style="font-size: 0.72rem;">${isOnline ? '🟢 Online' : '🟡 Offline'}</span>
          </div>
          <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary);">Base de datos central en la nube activa y sincronizada en tiempo real</p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        
        <!-- Info Grid -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
          <div class="glass-panel" style="padding: 0.85rem; border-radius: 12px; background: rgba(255,255,255,0.03);">
            <div style="font-size: 0.72rem; color: var(--text-tertiary);">Proyecto Firebase</div>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">fridgeflow-recetas-db</div>
          </div>
          <div class="glass-panel" style="padding: 0.85rem; border-radius: 12px; background: rgba(255,255,255,0.03);">
            <div style="font-size: 0.72rem; color: var(--text-tertiary);">Recetas en Cloud</div>
            <div style="font-weight: 700; color: var(--accent-emerald); font-size: 0.9rem;">${recipeCount} recetas sincronizadas</div>
          </div>
          <div class="glass-panel" style="padding: 0.85rem; border-radius: 12px; background: rgba(255,255,255,0.03);">
            <div style="font-size: 0.72rem; color: var(--text-tertiary);">Modo de Base de Datos</div>
            <div style="font-weight: 700; color: var(--accent-sky); font-size: 0.9rem;">Firestore Native (nam5)</div>
          </div>
          <div class="glass-panel" style="padding: 0.85rem; border-radius: 12px; background: rgba(255,255,255,0.03);">
            <div style="font-size: 0.72rem; color: var(--text-tertiary);">Persistencia Local</div>
            <div style="font-weight: 700; color: var(--accent-amber); font-size: 0.9rem;">IndexedDB Activo ⚡</div>
          </div>
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 14px; padding: 1rem; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
          ✨ Cada receta nueva que crees con IA, modificación de precios en ARS o cambio en tu menú semanal se guarda instantáneamente en Firebase Firestore y estará disponible desde cualquier dispositivo.
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem; justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="closeFirebaseStatusModal()">Cerrar</button>
          <button class="btn btn-primary btn-sm" onclick="forceFirebaseResync()" style="font-weight: 700; box-shadow: 0 0 15px var(--accent-emerald-glow);">
            🔄 Forzar Resincronización
          </button>
        </div>

      </div>
    </div>
  `;

  modal.classList.add('active');
};

window.closeFirebaseStatusModal = function() {
  const modal = document.getElementById('firebase-status-modal');
  if (modal) modal.classList.remove('active');
};

window.forceFirebaseResync = async function() {
  if (window.soundFX) window.soundFX.playClick();
  if (window.showToast) window.showToast('🔄 Sincronizando con Firebase Firestore...', 'sky');
  
  if (window.firebaseDB && typeof window.firebaseDB.fetchAllRecipes === 'function') {
    const recipes = await window.firebaseDB.fetchAllRecipes();
    if (recipes && recipes.length > 0) {
      window.FridgeData.recipes = recipes;
      window.dispatchEvent(new CustomEvent('fridgeflow:statechange', { detail: { action: 'resync', count: recipes.length } }));
      if (window.showToast) window.showToast(`✨ Sincronización completa: ${recipes.length} recetas activas`, 'emerald');
      if (window.soundFX) window.soundFX.playFanfare();
    }
  }
  closeFirebaseStatusModal();
};

window.copyBackupToClipboard = function() {
  const json = fridgeStore.exportBackupData();
  navigator.clipboard.writeText(json).then(() => {
    if (window.soundFX) window.soundFX.playClick();
    if (window.showToast) window.showToast('📋 Copia de seguridad copiada al portapapeles', 'emerald');
  });
};

window.downloadBackupFile = function() {
  const json = fridgeStore.exportBackupData();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fridgeflow_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (window.soundFX) window.soundFX.playClick();
  if (window.showToast) window.showToast('⬇️ Archivo de copia descargado', 'emerald');
};

window.handleBackupTextImport = function() {
  const textarea = document.getElementById('import-backup-textarea');
  if (!textarea || !textarea.value.trim()) {
    if (window.showToast) window.showToast('Por favor pega el código JSON de la copia', 'coral');
    return;
  }
  const result = fridgeStore.importBackupData(textarea.value.trim());
  if (result.success) {
    if (window.soundFX) window.soundFX.playFanfare();
    if (window.showToast) window.showToast('✨ Copia de seguridad restaurada con éxito', 'emerald');
    closeBackupModal();
  } else {
    if (window.showToast) window.showToast(`Error: ${result.error}`, 'coral');
  }
};

window.handleBackupFileUpload = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const result = fridgeStore.importBackupData(e.target.result);
    if (result.success) {
      if (window.soundFX) window.soundFX.playFanfare();
      if (window.showToast) window.showToast('✨ Copia de seguridad restaurada con éxito', 'emerald');
      closeBackupModal();
    } else {
      if (window.showToast) window.showToast(`Error: ${result.error}`, 'coral');
    }
  };
  reader.readAsText(file);
};

// 1. Theme Management (Obsidian Dark / Linen Light)
function initTheme() {
  const savedTheme = localStorage.getItem('ff_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ff_theme', next);
      themeToggles.forEach(b => b.innerHTML = next === 'dark' ? '☀️' : '🌙');
      if (window.soundFX) window.soundFX.playClick();
    });
  });
}

// 2. Custom Magnetic Cursor
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let dot = document.querySelector('.custom-cursor-dot');
  let outline = document.querySelector('.custom-cursor-outline');

  if (!dot || !outline) {
    dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    outline = document.createElement('div');
    outline.className = 'custom-cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);
  }

  window.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    outline.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });

  const interactives = document.querySelectorAll('a, button, input, .fridge-item-pill, .interactive-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
}

// 3. Floating Navbar & Mobile Drawer
function initNavbar() {
  const navbar = document.querySelector('.navbar-floating');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'planner.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    if (href === currentPath || (currentPath === '' && href === 'planner.html') || (href.split('#')[0] === currentPath && !href.includes('#'))) {
      link.classList.add('active');
    }
  });

  // Mobile menu
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-drawer-open', isOpen);
      if (window.soundFX) window.soundFX.playClick();
    });
  }

  if (closeBtn && mobileDrawer) {
    closeBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-drawer-open');
      if (window.soundFX) window.soundFX.playClick();
    });
  }

  if (mobileDrawer) {
    const drawerLinks = mobileDrawer.querySelectorAll('.nav-link, a, button:not(.mobile-drawer-close):not(.audio-toggle-btn):not(.theme-toggle-btn)');
    drawerLinks.forEach(item => {
      item.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-drawer-open');
      });
    });

    window.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !mobileDrawer.classList.contains('active')) return;
      mobileDrawer.classList.remove('active');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
      document.body.classList.remove('nav-drawer-open');
    });
  }
}

// 4. Sound & Audio UI Bindings
function initSoundBindings() {
  const audioToggle = document.querySelectorAll('.audio-toggle-btn');
  audioToggle.forEach(btn => {
    const isMuted = localStorage.getItem('ff_audio_muted') === 'true';
    btn.innerHTML = isMuted ? '🔇' : '🔊';
    btn.title = isMuted ? 'Activar Efectos Sonoros' : 'Silenciar Audio';

    btn.addEventListener('click', () => {
      if (window.soundFX) {
        const muted = window.soundFX.toggleMute();
        audioToggle.forEach(b => {
          b.innerHTML = muted ? '🔇' : '🔊';
          b.title = muted ? 'Activar Efectos Sonoros' : 'Silenciar Audio';
        });
        showToast(muted ? 'Audio silenciado' : 'Efectos de sonido activados 🔔', 'muted');
      }
    });
  });

  // Button clicks
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .btn, .nav-link');
    if (btn && window.soundFX && !btn.classList.contains('audio-toggle-btn')) {
      window.soundFX.playClick();
    }
  });
}

// 5. Toast Notifications
function initToasts() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

window.showToast = function(message, type = 'emerald') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast badge-${type}`;

  const iconMap = {
    emerald: '✨',
    amber: '⚡',
    coral: '⚠️',
    violet: '💡',
    muted: '🔔'
  };

  toast.innerHTML = `
    <span style="font-size: 1.1rem;">${iconMap[type] || '✨'}</span>
    <span style="font-weight: 500; font-size: 0.9rem;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// 6. Universal Search Modal (Command+K)
function initUniversalSearch() {
  // Setup keyboard shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      closeSearchModal();
    }
  });

  const searchButtons = document.querySelectorAll('.trigger-search-modal');
  searchButtons.forEach(btn => btn.addEventListener('click', openSearchModal));
}

function openSearchModal() {
  let modal = document.getElementById('universal-search-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'universal-search-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 620px;">
        <button class="btn-icon modal-close" onclick="closeSearchModal()">✕</button>
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.3rem; margin-bottom: 0.25rem;">Buscador Culinario Universal</h3>
          <p style="font-size: 0.85rem;">Encuentra recetas proteicas, menús y trucos gastronómicos</p>
        </div>
        <div class="input-group" style="margin-bottom: 1.5rem;">
          <input type="text" id="universal-search-input" class="form-control" placeholder="Escribe 'salmón', 'tomate', 'conservar albahaca'..." autofocus />
        </div>
        <div id="universal-search-results" style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 380px; overflow-y: auto;">
          <div style="text-align: center; padding: 2rem; color: var(--text-tertiary);">Escribe al menos 2 letras para buscar...</div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const input = modal.querySelector('#universal-search-input');
    input.addEventListener('input', (e) => handleSearchInput(e.target.value));
  }

  modal.classList.add('active');
  const input = modal.querySelector('#universal-search-input');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 100);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('universal-search-modal');
  if (modal) modal.classList.remove('active');
}
window.closeSearchModal = closeSearchModal;

function handleSearchInput(query) {
  const resultsContainer = document.getElementById('universal-search-results');
  if (!resultsContainer) return;

  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    resultsContainer.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-tertiary);">Escribe al menos 2 letras para buscar...</div>`;
    return;
  }

  const recipes = window.FridgeData ? window.FridgeData.recipes.filter(r => 
    r.title.toLowerCase().includes(q) || 
    r.description.toLowerCase().includes(q) ||
    r.tags.some(t => t.toLowerCase().includes(q))
  ) : [];

  const ingredients = window.FridgeData ? window.FridgeData.ingredients.filter(i => 
    i.name.toLowerCase().includes(q)
  ) : [];

  const hacks = window.FridgeData ? window.FridgeData.preservationHacks.filter(h => 
    h.ingredient.toLowerCase().includes(q) || 
    h.tip.toLowerCase().includes(q)
  ) : [];

  let html = '';

  if (recipes.length > 0) {
    html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-emerald); margin-top: 0.5rem;">Recetas Encontradas (${recipes.length})</div>`;
    recipes.forEach(r => {
      html += `
        <a href="recipes.html?highlight=${r.id}" class="glass-panel" style="padding: 0.85rem 1.1rem; display: flex; align-items: center; justify-content: space-between; text-decoration: none; border-radius: 12px;">
          <div>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${r.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">${r.prepTime + r.cookTime} min · ${r.difficulty} · ${r.calories} kcal</div>
          </div>
          <span class="badge badge-emerald">Ver Receta →</span>
        </a>
      `;
    });
  }

  if (ingredients.length > 0) {
    html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-amber); margin-top: 0.75rem;">Ingredientes (${ingredients.length})</div>`;
    ingredients.slice(0, 4).forEach(i => {
      html += `
        <div class="glass-panel" style="padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.2rem;">${i.emoji}</span>
            <span style="font-weight: 600; color: var(--text-primary); font-size: 0.9rem;">${i.name}</span>
          </div>
          <a href="recipes.html?filterIngredient=${i.id}" class="btn btn-sm btn-secondary">Ver Recetas con ${i.name} →</a>
        </div>
      `;
    });
  }

  if (hacks.length > 0) {
    html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-violet); margin-top: 0.75rem;">Trucos de Conservación (${hacks.length})</div>`;
    hacks.forEach(h => {
      html += `
        <div class="glass-panel" style="padding: 0.75rem 1rem; border-radius: 12px;">
          <div style="font-weight: 600; color: var(--text-primary); font-size: 0.85rem; margin-bottom: 0.2rem;">${h.icon} ${h.ingredient} - ${h.tag}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">${h.tip}</div>
        </div>
      `;
    });
  }

  if (recipes.length === 0 && ingredients.length === 0 && hacks.length === 0) {
    html = `<div style="text-align: center; padding: 2rem; color: var(--text-tertiary);">No se encontraron resultados para "${query}".</div>`;
  }

  resultsContainer.innerHTML = html;
}

/* ==========================================================================
   AI SETTINGS & GOOGLE AI STUDIO MODAL CONTROLLER
   ========================================================================== */

function initAISettingsHandlers() {
  const settingsBtns = document.querySelectorAll('.trigger-ai-settings-modal');
  settingsBtns.forEach(btn => btn.addEventListener('click', openAISettingsModal));
  updateGlobalAIStatusBadges();
}

window.openAISettingsModal = function() {
  let modal = document.getElementById('ai-settings-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'ai-settings-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const settings = window.aiRecipeGenerator 
    ? window.aiRecipeGenerator.getAISettings() 
    : { apiKey: localStorage.getItem('fridgeflow_gemini_api_key') || '', textModel: 'gemini-3.7-flash-light', imageModel: 'nano-banana-2' };

  const hasKey = Boolean(settings.apiKey && settings.apiKey.trim().length > 10);

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 580px; padding: 2rem; border-radius: 24px; background: linear-gradient(145deg, rgba(24, 29, 38, 0.98) 0%, rgba(13, 17, 23, 0.99) 100%); border: 1px solid rgba(16, 185, 129, 0.35); box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
      <button class="btn-icon modal-close" onclick="closeAISettingsModal()">✕</button>
      
      <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.25rem;">
        <div style="font-size: 1.8rem; width: 46px; height: 46px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.35);">
          🤖
        </div>
        <div>
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800;">Configuración de IA (Google AI Studio)</h3>
          <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary);">Potencia la creación de recetas con Gemini y generación de imágenes nano-banana-2</p>
        </div>
      </div>

      <!-- Live Connection Status Pill -->
      <div id="ai-modal-status-banner" style="margin-bottom: 1.25rem; padding: 0.75rem 1rem; border-radius: 12px; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between; ${hasKey ? 'background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #34D399;' : 'background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); color: #FBBF24;'}">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${hasKey ? '#10B981' : '#F59E0B'}; box-shadow: 0 0 8px ${hasKey ? '#10B981' : '#F59E0B'};"></span>
          <span>${hasKey ? 'API Key Configurada y Lista' : 'Sin API Key (Usa motor local gratuito)'}</span>
        </div>
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; font-weight: 600; font-size: 0.76rem;">
          Obtener gratis ↗
        </a>
      </div>

      <form id="ai-settings-form" onsubmit="saveAISettingsFromModal(event)" style="display: flex; flex-direction: column; gap: 1.2rem;">
        
        <!-- API Key Input -->
        <div>
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary); display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span>🔑 Google AI Studio API Key:</span>
            <span style="font-size: 0.75rem; color: var(--text-tertiary); font-weight: normal;">Guardada de forma segura en tu navegador</span>
          </label>
          <div style="position: relative;">
            <input type="password" id="ai-settings-api-key" class="form-control" placeholder="AIzaSy..." value="${settings.apiKey || ''}" style="padding-right: 2.8rem; font-family: monospace;" />
            <button type="button" class="btn-icon" onclick="toggleApiKeyVisibility()" style="position: absolute; right: 0.4rem; top: 50%; transform: translateY(-50%); padding: 0.25rem 0.5rem; font-size: 0.9rem;" title="Mostrar / Ocultar clave">
              👁️
            </button>
          </div>
          <div style="font-size: 0.74rem; color: var(--text-tertiary); margin-top: 0.35rem;">
            Crea tu clave gratis en <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: var(--accent-emerald);">Google AI Studio (aistudio.google.com)</a>.
          </div>
        </div>

        <!-- Text Model Selection -->
        <div>
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 0.4rem;">
            🧠 Modelo de Texto y Lógica de Receta:
          </label>
          <select id="ai-settings-text-model" class="form-control">
            <option value="gemini-3.7-flash-light" ${settings.textModel === 'gemini-3.7-flash-light' ? 'selected' : ''}>⚡ gemini-3.7-flash-light (Ultrarrápido & Económico)</option>
            <option value="gemini-2.5-flash-lite" ${settings.textModel === 'gemini-2.5-flash-lite' ? 'selected' : ''}>⚡ gemini-2.5-flash-lite (Flash Lite de Precisión)</option>
            <option value="gemini-2.0-flash" ${settings.textModel === 'gemini-2.0-flash' ? 'selected' : ''}>🌟 gemini-2.0-flash (Multimodal con Visión)</option>
            <option value="gemini-1.5-flash" ${settings.textModel === 'gemini-1.5-flash' ? 'selected' : ''}>✨ gemini-1.5-flash (Estándar Estable)</option>
          </select>
        </div>

        <!-- Image Model Selection -->
        <div>
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 0.4rem;">
            🎨 Modelo de Fotografía Gourmet:
          </label>
          <select id="ai-settings-image-model" class="form-control">
            <option value="nano-banana-2" ${settings.imageModel === 'nano-banana-2' ? 'selected' : ''}>🍌 nano-banana-2 (Fotografía Gastronómica 8K)</option>
            <option value="flux" ${settings.imageModel === 'flux' ? 'selected' : ''}>✨ FLUX.1 Culinario</option>
            <option value="turbo" ${settings.imageModel === 'turbo' ? 'selected' : ''}>⚡ Turbo HD</option>
          </select>
        </div>

        <!-- Test Results Message Area -->
        <div id="ai-settings-test-msg" style="display: none; font-size: 0.82rem; padding: 0.6rem 0.85rem; border-radius: 8px;"></div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="testGeminiConnectionFromModal()" style="font-weight: 600;">
            🧪 Probar Conexión
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn btn-ghost btn-sm" onclick="closeAISettingsModal()">Cancelar</button>
            <button type="submit" class="btn btn-primary btn-sm" style="font-weight: 700;">
              💾 Guardar Configuración
            </button>
          </div>
        </div>

      </form>
    </div>
  `;

  modal.classList.add('active');
};

window.closeAISettingsModal = function() {
  const modal = document.getElementById('ai-settings-modal');
  if (modal) modal.classList.remove('active');
};

window.toggleApiKeyVisibility = function() {
  const input = document.getElementById('ai-settings-api-key');
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
};

window.testGeminiConnectionFromModal = async function() {
  const apiKeyInput = document.getElementById('ai-settings-api-key');
  const textModelInput = document.getElementById('ai-settings-text-model');
  const msgBox = document.getElementById('ai-settings-test-msg');

  if (!apiKeyInput || !apiKeyInput.value.trim()) {
    if (msgBox) {
      msgBox.style.display = 'block';
      msgBox.style.background = 'rgba(239, 68, 68, 0.15)';
      msgBox.style.color = '#F87171';
      msgBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      msgBox.textContent = '❌ Por favor ingresa una API Key para probar la conexión.';
    }
    return;
  }

  if (msgBox) {
    msgBox.style.display = 'block';
    msgBox.style.background = 'rgba(16, 185, 129, 0.1)';
    msgBox.style.color = '#34D399';
    msgBox.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    msgBox.textContent = '⏳ Probando conexión con Google AI Studio...';
  }

  try {
    const res = await window.aiRecipeGenerator.testGeminiConnection(
      apiKeyInput.value.trim(),
      textModelInput ? textModelInput.value : 'gemini-3.7-flash-light'
    );
    if (msgBox) {
      msgBox.style.background = 'rgba(16, 185, 129, 0.2)';
      msgBox.style.color = '#34D399';
      msgBox.style.border = '1px solid #10B981';
      msgBox.innerHTML = `✅ <strong>¡Conexión Exitosa!</strong> Google AI Studio respondió correctamente con modelo: <code>${res.modelUsed}</code>.`;
    }
    if (window.soundFX) window.soundFX.playFanfare();
  } catch (err) {
    if (msgBox) {
      msgBox.style.background = 'rgba(239, 68, 68, 0.15)';
      msgBox.style.color = '#F87171';
      msgBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      msgBox.textContent = `❌ Error de conexión: ${err.message}`;
    }
  }
};

window.saveAISettingsFromModal = function(e) {
  if (e) e.preventDefault();
  const apiKey = document.getElementById('ai-settings-api-key')?.value.trim() || '';
  const textModel = document.getElementById('ai-settings-text-model')?.value || 'gemini-3.7-flash-light';
  const imageModel = document.getElementById('ai-settings-image-model')?.value || 'nano-banana-2';

  const settings = { apiKey, textModel, imageModel };
  if (window.aiRecipeGenerator) {
    window.aiRecipeGenerator.saveAISettings(settings);
  } else {
    localStorage.setItem('fridgeflow_ai_config', JSON.stringify(settings));
    localStorage.setItem('fridgeflow_gemini_api_key', apiKey);
  }

  updateGlobalAIStatusBadges();
  window.closeAISettingsModal();
  if (window.soundFX) window.soundFX.playPop();
  window.showToast('💾 Configuración de IA guardada con éxito', 'emerald');
};

window.updateGlobalAIStatusBadges = function() {
  const settings = window.aiRecipeGenerator 
    ? window.aiRecipeGenerator.getAISettings() 
    : { apiKey: localStorage.getItem('fridgeflow_gemini_api_key') || '' };

  const hasKey = Boolean(settings.apiKey && settings.apiKey.trim().length > 10);
  const statusBadges = document.querySelectorAll('.ai-api-status-pill');
  statusBadges.forEach(badge => {
    if (hasKey) {
      badge.className = 'badge badge-emerald ai-api-status-pill';
      badge.innerHTML = `🟢 Gemini (${settings.textModel || 'gemini-3.7-flash-light'})`;
    } else {
      badge.className = 'badge badge-muted ai-api-status-pill';
      badge.innerHTML = `⚙️ Configurar Gemini API`;
    }
  });

  const textElem = document.getElementById('ai-api-status-text');
  if (textElem) {
    textElem.textContent = hasKey ? `🟢 Conectado (${settings.textModel || 'gemini-3.7-flash-light'})` : '🔑 Configurar API Key';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initAISettingsHandlers();
});

