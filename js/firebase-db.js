/* ==========================================================================
   FRIDGEFLOW - FIREBASE CLOUD FIRESTORE INTEGRATION ENGINE
   Real-time Cloud Database, Multi-Device Sync, Offline Cache & Auto-Seeding
   Project: fridgeflow-recetas-db
   ========================================================================== */

class FirebaseDatabaseManager {
  constructor() {
    this.config = {
      apiKey: "AIzaSyCDwrENSMdgCAN14mcHoD8jlhshCA_aWEA",
      authDomain: "fridgeflow-recetas-db.firebaseapp.com",
      projectId: "fridgeflow-recetas-db",
      storageBucket: "fridgeflow-recetas-db.firebasestorage.app",
      messagingSenderId: "38077504307",
      appId: "1:38077504307:web:451eaf945f1f81b2cdfc46"
    };

    this.app = null;
    this.db = null;
    this.isInitialized = false;
    this.isOnline = navigator.onLine;
    this.syncStatus = 'connecting'; // connecting | synced | error | offline
    this.subscribers = {
      recipes: [],
      status: []
    };

    this.init();
  }

  async init() {
    try {
      if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK no cargado aún. Esperando...');
        window.addEventListener('load', () => this.init());
        return;
      }

      // Initialize Firebase App
      if (!firebase.apps.length) {
        this.app = firebase.initializeApp(this.config);
      } else {
        this.app = firebase.app();
      }

      this.db = firebase.firestore();
      if (typeof firebase.storage === 'function') {
        this.storage = firebase.storage();
        console.log('✅ Firebase Cloud Storage inicializado.');
      }

      // Enable multi-tab offline persistence
      try {
        await this.db.enablePersistence({ synchronizeTabs: true });
        console.log('✅ Firebase Firestore: Persistencia offline e indexación activada.');
      } catch (err) {
        if (err.code === 'failed-precondition') {
          console.warn('Firestore Persistence: Múltiples pestañas abiertas.');
        } else if (err.code === 'unimplemented') {
          console.warn('Firestore Persistence: Navegador no soporta persistencia IndexedDB.');
        }
      }

      this.isInitialized = true;
      this.syncStatus = 'synced';
      this.setupNetworkListeners();
      this.attachRealtimeRecipesListener();
      this.attachRealtimeAppStateListener();
      this.updateUIStatus();

      console.log('🚀 Firebase Cloud Firestore conectado exitosamente al proyecto: fridgeflow-recetas-db');
    } catch (error) {
      console.error('❌ Error al inicializar Firebase Firestore:', error);
      this.syncStatus = 'error';
      this.updateUIStatus();
    }
  }

  setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncStatus = 'synced';
      this.updateUIStatus();
      if (typeof window.showToast === 'function') {
        window.showToast('🟢 Conexión a la nube de Firebase restablecida', 'emerald');
      }
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.syncStatus = 'offline';
      this.updateUIStatus();
      if (typeof window.showToast === 'function') {
        window.showToast('🟡 Modo sin conexión (Usando base de datos local)', 'amber');
      }
    });
  }

  // --- Real-Time Recipes Synchronization ---
  attachRealtimeRecipesListener() {
    if (!this.db) return;

    this.db.collection('recipes').onSnapshot(
      (snapshot) => {
        const firestoreRecipes = [];
        snapshot.forEach((doc) => {
          firestoreRecipes.push({ id: doc.id, ...doc.data() });
        });

        if (firestoreRecipes.length > 0) {
          if (!window.FridgeData) window.FridgeData = {};
          
          // Separate custom and catalog recipes
          const customRecipes = firestoreRecipes.filter(r => r.isCustom === true);
          const catalogRecipes = firestoreRecipes.filter(r => r.isCustom !== true);

          // Update in-memory recipes list
          window.FridgeData.recipes = firestoreRecipes;
          window._masterStaticRecipes = catalogRecipes;

          // Update localStorage cache as instant fallback
          if (window.fridgeStore) {
            localStorage.setItem(window.fridgeStore.STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(customRecipes));
          }

          this.syncStatus = 'synced';
          this.notifySubscribers('recipes', firestoreRecipes);
          this.updateUIStatus(firestoreRecipes.length);

          // Dispatch event to app
          window.dispatchEvent(new CustomEvent('fridgeflow:recipesloaded', { detail: firestoreRecipes }));
          window.dispatchEvent(new CustomEvent('fridgeflow:statechange', { detail: { source: 'firebase', count: firestoreRecipes.length } }));
        } else {
          // If empty, auto-seed from local data
          this.autoSeedInitialData();
        }
      },
      (error) => {
        console.error('Error en listener de Firestore Recipes:', error);
        this.syncStatus = 'error';
        this.updateUIStatus();
      }
    );
  }

  // --- Real-Time App State (Meal Plan, Custom Prices, Pantry) Sync ---
  attachRealtimeAppStateListener() {
    if (!this.db) return;

    this.db.collection('app_state').onSnapshot(
      (snapshot) => {
        snapshot.forEach((doc) => {
          const key = doc.id;
          const data = doc.data();
          if (data && data.payload !== undefined && window.fridgeStore) {
            const storageKey = window.fridgeStore.STORAGE_KEYS[key.toUpperCase()];
            if (storageKey) {
              const currentLocal = localStorage.getItem(storageKey);
              const incoming = JSON.stringify(data.payload);
              if (currentLocal !== incoming) {
                localStorage.setItem(storageKey, incoming);
                window.dispatchEvent(new CustomEvent('fridgeflow:statechange', { detail: { key: storageKey, data: data.payload, remote: true } }));
              }
            }
          }
        });
      },
      (err) => {
        console.warn('Error en listener de app_state:', err);
      }
    );
  }

  // --- Auto Seeding Fallback ---
  async autoSeedInitialData() {
    if (!this.db || !window.FridgeData || !Array.isArray(window.FridgeData.recipes)) return;
    try {
      console.log('🌱 Firestore vacío detectado en cliente: Sembrando 37+ recetas iniciales...');
      const batch = this.db.batch();
      window.FridgeData.recipes.forEach(recipe => {
        const ref = this.db.collection('recipes').doc(recipe.id);
        batch.set(ref, {
          ...recipe,
          isCustom: !!recipe.isCustom,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      });
      await batch.commit();
      console.log('✨ Siembra automática completada en Firestore.');
    } catch (e) {
      console.error('Error en auto-siembra:', e);
    }
  }

  // --- Firebase Storage Image Engine ---
  async uploadRecipeImage(fileOrDataUrl, recipeId = null) {
    if (!this.storage) {
      console.warn('Firebase Storage no inicializado.');
      return typeof fileOrDataUrl === 'string' ? fileOrDataUrl : null;
    }

    try {
      const id = recipeId || ('img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5));
      const filename = `recipes/custom/${id}_${Date.now()}.jpg`;
      const storageRef = this.storage.ref(filename);

      if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
        // Base64 Data URL upload
        const mimeType = fileOrDataUrl.substring(5, fileOrDataUrl.indexOf(';')) || 'image/jpeg';
        const snapshot = await storageRef.putString(fileOrDataUrl, 'data_url', {
          contentType: mimeType
        });
        const downloadUrl = await snapshot.ref.getDownloadURL();
        console.log(`🖼️ Imagen subida a Firebase Storage: ${downloadUrl}`);
        return downloadUrl;
      } else if (fileOrDataUrl instanceof Blob || (typeof File !== 'undefined' && fileOrDataUrl instanceof File)) {
        // File / Blob upload
        const snapshot = await storageRef.put(fileOrDataUrl);
        const downloadUrl = await snapshot.ref.getDownloadURL();
        console.log(`🖼️ Archivo subido a Firebase Storage: ${downloadUrl}`);
        return downloadUrl;
      } else if (typeof fileOrDataUrl === 'string') {
        // Already a normal URL string
        return fileOrDataUrl;
      }
    } catch (err) {
      console.error('Error subiendo imagen a Firebase Storage:', err);
      return typeof fileOrDataUrl === 'string' ? fileOrDataUrl : null;
    }
  }

  // --- CRUD Operations for Recipes in Cloud Firestore ---
  async saveRecipe(recipe) {
    if (!recipe || !recipe.id) throw new Error('Receta no válida o sin ID');
    
    // Auto-upload image to Firebase Storage if it is a Base64 data URL
    if (recipe.image && typeof recipe.image === 'string' && recipe.image.startsWith('data:')) {
      try {
        const cloudImageUrl = await this.uploadRecipeImage(recipe.image, recipe.id);
        if (cloudImageUrl) {
          recipe.image = cloudImageUrl;
        }
      } catch (imgErr) {
        console.warn('Fallback guardando imagen:', imgErr);
      }
    }

    // Save to local cache first for zero-latency UI
    if (window.fridgeStore && recipe.isCustom) {
      const customList = window.fridgeStore.getCustomRecipes();
      const idx = customList.findIndex(r => r.id === recipe.id);
      if (idx !== -1) customList[idx] = recipe;
      else customList.unshift(recipe);
      localStorage.setItem(window.fridgeStore.STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(customList));
    }

    if (this.db) {
      try {
        const cleanRecipe = JSON.parse(JSON.stringify(recipe));
        cleanRecipe.updatedAt = new Date().toISOString();
        if (cleanRecipe.isCustom === undefined) cleanRecipe.isCustom = true;
        
        await this.db.collection('recipes').doc(recipe.id).set(cleanRecipe, { merge: true });
        console.log(`☁️ Receta "${recipe.title}" sincronizada con Firestore & Storage.`);
        return { success: true, id: recipe.id, imageUrl: recipe.image };
      } catch (err) {
        console.error('Error guardando receta en Firestore:', err);
        return { success: false, error: err.message };
      }
    }
    return { success: true, localOnly: true };
  }

  async deleteRecipe(recipeId) {
    if (!recipeId) return;

    // Delete locally
    if (window.fridgeStore) {
      let customList = window.fridgeStore.getCustomRecipes();
      customList = customList.filter(r => r.id !== recipeId);
      localStorage.setItem(window.fridgeStore.STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(customList));
    }

    // Delete in Firestore
    if (this.db) {
      try {
        await this.db.collection('recipes').doc(recipeId).delete();
        console.log(`☁️ Receta "${recipeId}" eliminada de Firestore.`);
        return { success: true };
      } catch (err) {
        console.error('Error eliminando receta de Firestore:', err);
        return { success: false, error: err.message };
      }
    }
    return { success: true };
  }

  async fetchAllRecipes() {
    if (!this.db) {
      return (window.FridgeData && window.FridgeData.recipes) ? window.FridgeData.recipes : [];
    }
    try {
      const snapshot = await this.db.collection('recipes').get();
      const list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      return list;
    } catch (err) {
      console.error('Error leyendo recetas de Firestore:', err);
      return (window.FridgeData && window.FridgeData.recipes) ? window.FridgeData.recipes : [];
    }
  }

  // --- App State Cloud Synchronization ---
  async syncAppState(stateKey, payload) {
    if (!this.db) return;
    try {
      const cleanKey = stateKey.toLowerCase();
      await this.db.collection('app_state').doc(cleanKey).set({
        payload: JSON.parse(JSON.stringify(payload)),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn(`Error sincronizando app_state/${stateKey} en Firestore:`, err);
    }
  }

  // --- Subscribers ---
  onRecipesChange(callback) {
    if (typeof callback === 'function') {
      this.subscribers.recipes.push(callback);
    }
  }

  onSyncStatusChange(callback) {
    if (typeof callback === 'function') {
      this.subscribers.status.push(callback);
    }
  }

  notifySubscribers(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(fn => {
        try { fn(data); } catch (e) { console.error(e); }
      });
    }
  }

  // --- Visual UI Status Component ---
  updateUIStatus(recipeCount = null) {
    const badge = document.getElementById('firebase-cloud-status-badge');
    const totalCount = recipeCount || (window.FridgeData && window.FridgeData.recipes ? window.FridgeData.recipes.length : 37);

    if (badge) {
      if (this.syncStatus === 'synced' || (this.isOnline && this.isInitialized)) {
        badge.innerHTML = `
          <span class="pulse-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10B981; margin-right:6px; box-shadow:0 0 8px #10B981;"></span>
          <span>Firebase Cloud (${totalCount})</span>
        `;
        badge.className = 'badge badge-emerald firebase-status-pill';
        badge.title = `Conectado a Firebase Firestore (fridgeflow-recetas-db) · ${totalCount} recetas activas`;
      } else if (this.syncStatus === 'offline' || !this.isOnline) {
        badge.innerHTML = `
          <span class="pulse-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#F59E0B; margin-right:6px;"></span>
          <span>Modo Offline (${totalCount})</span>
        `;
        badge.className = 'badge badge-amber firebase-status-pill';
        badge.title = 'Sin conexión a internet. Los cambios se guardan localmente y se sincronizarán al reconectar.';
      } else if (this.syncStatus === 'connecting') {
        badge.innerHTML = `
          <span class="pulse-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#38BDF8; margin-right:6px;"></span>
          <span>Conectando Firebase...</span>
        `;
        badge.className = 'badge badge-sky firebase-status-pill';
      } else {
        badge.innerHTML = `
          <span class="pulse-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#EF4444; margin-right:6px;"></span>
          <span>Firebase Local</span>
        `;
        badge.className = 'badge badge-coral firebase-status-pill';
      }
    }
  }
}

// Global Singleton Initialization
window.firebaseDB = new FirebaseDatabaseManager();
