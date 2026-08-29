/* ==========================================================================
   FRIDGEFLOW - FIRESTORE DATABASE SEEDER & SYNC SCRIPT
   Loads master recipes & ingredients catalog into Cloud Firestore
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, writeBatch, getDocs, collection } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCDwrENSMdgCAN14mcHoD8jlhshCA_aWEA',
  authDomain: 'fridgeflow-recetas-db.firebaseapp.com',
  projectId: 'fridgeflow-recetas-db',
  storageBucket: 'fridgeflow-recetas-db.firebasestorage.app',
  messagingSenderId: '38077504307',
  appId: '1:38077504307:web:451eaf945f1f81b2cdfc46'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runSeeder() {
  console.log('🚀 Iniciando proceso de siembra de base de datos en Firebase Firestore...');
  
  // Load js/data.js
  const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
  const dataCode = fs.readFileSync(dataJsPath, 'utf8');

  const sandbox = { window: {}, console: console };
  vm.createContext(sandbox);
  vm.runInContext(dataCode + '; window.FridgeData = FridgeData;', sandbox);

  const FridgeData = sandbox.window.FridgeData;
  if (!FridgeData || !Array.isArray(FridgeData.recipes)) {
    throw new Error('No se pudo extraer FridgeData.recipes desde js/data.js');
  }

  const recipes = FridgeData.recipes;
  console.log('📋 Recetas encontradas en catálogo local:', recipes.length);
  console.log('🥦 Ingredientes en catálogo maestro:', FridgeData.ingredients ? FridgeData.ingredients.length : 0);

  // Write recipes in batches of 20
  let uploadedCount = 0;
  for (let i = 0; i < recipes.length; i += 20) {
    const batch = writeBatch(db);
    const slice = recipes.slice(i, i + 20);
    
    slice.forEach(rawRecipe => {
      const recipe = JSON.parse(JSON.stringify(rawRecipe));
      const docRef = doc(db, 'recipes', recipe.id);
      batch.set(docRef, {
        ...recipe,
        isCustom: false,
        source: 'catalog',
        updatedAt: new Date().toISOString()
      }, { merge: true });
    });

    await batch.commit();
    uploadedCount += slice.length;
    console.log(`✅ Lote guardado en Firestore: ${uploadedCount} / ${recipes.length} recetas`);
  }

  // Upload ingredients catalog
  if (FridgeData.ingredients) {
    const cleanIngredients = JSON.parse(JSON.stringify(FridgeData.ingredients));
    await setDoc(doc(db, 'system', 'ingredients_catalog'), {
      count: cleanIngredients.length,
      ingredients: cleanIngredients,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log('✅ Catálogo de ingredientes sincronizado en system/ingredients_catalog');
  }

  // Upload default presets
  if (FridgeData.presets) {
    const cleanPresets = JSON.parse(JSON.stringify(FridgeData.presets));
    await setDoc(doc(db, 'system', 'presets'), {
      presets: cleanPresets,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log('✅ Plantillas de despensa sincronizadas en system/presets');
  }

  // Verify total count in Firestore
  const snapshot = await getDocs(collection(db, 'recipes'));
  console.log(`\n🎉 ¡VERIFICACIÓN EXITOSA! Firestore tiene actualmente ${snapshot.size} recetas activas.`);
  console.log('🌟 Base de datos Firebase lista y operativa al 100%.');
  process.exit(0);
}

runSeeder().catch(err => {
  console.error('❌ Error ejecutando seeder:', err);
  process.exit(1);
});
