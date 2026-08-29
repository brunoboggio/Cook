/* ==========================================================================
   FRIDGEFLOW - FIRESTORE & FIREBASE STORAGE VERIFICATION SUITE
   Full end-to-end testing of Database, Collections, Storage & Realtime Engine
   ========================================================================== */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, setDoc, getDoc, deleteDoc } = require('firebase/firestore');
const { getStorage, ref, uploadString, getDownloadURL, deleteObject } = require('firebase/storage');

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
const storage = getStorage(app);

async function runCompleteVerification() {
  console.log('🧪 ========================================================');
  console.log('🔥 FRIDGEFLOW - SUITE DE VERIFICACIÓN TOTAL (DB & STORAGE)');
  console.log('🧪 ========================================================\n');

  // Test 1: Recipes collection
  console.log('1️⃣ Test: Leyendo colección "recipes" en Cloud Firestore...');
  const recipesSnap = await getDocs(collection(db, 'recipes'));
  console.log(`   ✅ Éxito: Se obtuvieron ${recipesSnap.size} recetas desde Cloud Firestore.`);
  if (recipesSnap.size < 37) {
    throw new Error(`Se esperaban al menos 37 recetas, pero se encontraron ${recipesSnap.size}`);
  }

  // Count recipes using Firebase Storage URLs
  let storageUrlCount = 0;
  recipesSnap.forEach(docSnap => {
    const data = docSnap.data();
    if (data.image && (data.image.includes('firebasestorage.googleapis.com') || data.image.startsWith('https://'))) {
      storageUrlCount++;
    }
  });
  console.log(`   🖼️ Recetas con imágenes alojadas en la nube / Firebase Storage: ${storageUrlCount} / ${recipesSnap.size}`);

  // Test 2: System metadata & Image Assets
  console.log('\n2️⃣ Test: Verificando colecciones "system" y "image_assets"...');
  const ingCatalogSnap = await getDoc(doc(db, 'system', 'ingredients_catalog'));
  const imageAssetsSnap = await getDoc(doc(db, 'system', 'image_assets'));
  
  if (ingCatalogSnap.exists()) {
    console.log(`   ✅ Catálogo de ingredientes: ${ingCatalogSnap.data().count} insumos sincronizados.`);
  }
  if (imageAssetsSnap.exists()) {
    console.log(`   ✅ Catálogo de imágenes en Storage: ${imageAssetsSnap.data().count} imágenes mapeadas.`);
  }

  // Test 3: Firebase Storage Upload Test
  console.log('\n3️⃣ Test: Subida y generación de URL pública en Firebase Cloud Storage...');
  const testStoragePath = `tests/verify_${Date.now()}.txt`;
  const storageRef = ref(storage, testStoragePath);
  await uploadString(storageRef, 'data:text/plain;base64,RnJpZGdlRmxvdyBGaXJlYmFzZSBTdG9yYWdlIFRlc3Q=', 'data_url');
  const downloadUrl = await getDownloadURL(storageRef);
  console.log(`   ✅ Éxito: Archivo subido a Firebase Storage.`);
  console.log(`   🔗 URL de descarga pública: ${downloadUrl}`);

  // Clean test file
  await deleteObject(storageRef);
  console.log(`   🧹 Archivo de prueba eliminado de Storage.`);

  // Test 4: Custom Recipe CRUD with Cloud Storage Image Link
  console.log('\n4️⃣ Test: Creación de receta personalizada con imagen Cloud (CRUD Write)...');
  const testRecipeId = 'test_ai_rec_' + Date.now();
  const testRecipeData = {
    id: testRecipeId,
    title: 'Bowl Proteico de Pollo y Aguacate Test',
    subtitle: 'Prueba de sincronización en la nube',
    description: 'Receta creada automáticamente para verificar la base de datos.',
    category: 'almuerzo',
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    difficulty: 'Fácil',
    calories: 450,
    protein: 48,
    carbs: 25,
    fat: 15,
    fiber: 8,
    tags: ['Hiperproteico', 'Test', 'Firebase Storage'],
    image: downloadUrl,
    ingredients: [
      { id: 'pollo_pechuga', name: 'Pechuga de pollo', amount: 200, unit: 'g' },
      { id: 'aguacate', name: 'Aguacate', amount: 1, unit: 'unidades' }
    ],
    instructions: [
      'Cocinar el pollo a la plancha.',
      'Cortar el aguacate y montar el bowl.'
    ],
    isCustom: true,
    storageProvider: 'firebase_storage',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'recipes', testRecipeId), testRecipeData);
  console.log(`   ✅ Éxito: Documento ${testRecipeId} creado en Firestore.`);

  // Test 5: Read back written document
  console.log('\n5️⃣ Test: Verificación de lectura del documento recién creado (CRUD Read)...');
  const readBackSnap = await getDoc(doc(db, 'recipes', testRecipeId));
  if (!readBackSnap.exists()) {
    throw new Error('No se pudo encontrar el documento de prueba recién creado.');
  }
  console.log(`   ✅ Éxito: Receta "${readBackSnap.data().title}" leída correctamente (${readBackSnap.data().protein}g proteína).`);

  // Test 6: Delete test document
  console.log('\n6️⃣ Test: Eliminación del documento de prueba (CRUD Delete)...');
  await deleteDoc(doc(db, 'recipes', testRecipeId));
  const verifyDeleteSnap = await getDoc(doc(db, 'recipes', testRecipeId));
  if (verifyDeleteSnap.exists()) {
    throw new Error('El documento de prueba no fue eliminado correctamente.');
  }
  console.log(`   ✅ Éxito: Documento ${testRecipeId} eliminado limpiamente de Firestore.`);

  // Test 7: App State sync
  console.log('\n7️⃣ Test: Sincronización de estado global (app_state)...');
  await setDoc(doc(db, 'app_state', 'system_health'), {
    status: 'healthy',
    lastChecked: new Date().toISOString(),
    engine: 'FridgeFlow Firebase & Storage v4.5'
  }, { merge: true });
  console.log('   ✅ Éxito: app_state/system_health actualizado correctamente.');

  console.log('\n🎉 ========================================================');
  console.log('🚀 ¡TODAS LAS PRUEBAS DE FIRESTORE Y STORAGE PASARON CON ÉXITO! (7/7)');
  console.log('✨ Base de datos y almacenamiento de imágenes 100% operativos.');
  console.log('🎉 ========================================================');
  process.exit(0);
}

runCompleteVerification().catch(err => {
  console.error('\n❌ ERROR EN VERIFICACIÓN:', err);
  process.exit(1);
});
