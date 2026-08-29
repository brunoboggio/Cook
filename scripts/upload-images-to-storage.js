/* ==========================================================================
   FRIDGEFLOW - FIREBASE STORAGE IMAGE UPLOADER & FIRESTORE SYNC
   Uploads all assets/images to Firebase Cloud Storage and updates Firestore
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { getFirestore, collection, getDocs, doc, updateDoc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCDwrENSMdgCAN14mcHoD8jlhshCA_aWEA',
  authDomain: 'fridgeflow-recetas-db.firebaseapp.com',
  projectId: 'fridgeflow-recetas-db',
  storageBucket: 'fridgeflow-recetas-db.firebasestorage.app',
  messagingSenderId: '38077504307',
  appId: '1:38077504307:web:451eaf945f1f81b2cdfc46'
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

async function uploadImages() {
  console.log('🖼️ Iniciando carga masiva de imágenes a Firebase Cloud Storage...\n');
  const imagesDir = path.join(__dirname, '..', 'assets', 'images');
  const files = fs.readdirSync(imagesDir);

  console.log(`📁 Encontrados ${files.length} archivos de imagen en assets/images/`);

  const urlMap = {};
  let uploadedCount = 0;

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp|svg)$/i)) continue;

    const filePath = path.join(imagesDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    const storageRef = ref(storage, `images/${file}`);

    const metadata = {
      contentType: file.endsWith('.png') ? 'image/png' : 'image/jpeg',
      customMetadata: {
        originalName: file,
        uploadedAt: new Date().toISOString()
      }
    };

    try {
      await uploadBytes(storageRef, fileBuffer, metadata);
      const downloadURL = await getDownloadURL(storageRef);
      urlMap[file] = downloadURL;
      urlMap[`assets/images/${file}`] = downloadURL;
      uploadedCount++;
      console.log(`  ✅ [${uploadedCount}/${files.length}] Subida: ${file}`);
    } catch (err) {
      console.error(`  ❌ Error subiendo ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Total imágenes subidas a Firebase Storage: ${uploadedCount}`);

  // Save the URL mapping to Firestore system/image_assets
  await setDoc(doc(db, 'system', 'image_assets'), {
    count: uploadedCount,
    storageBucket: firebaseConfig.storageBucket,
    urlMap: urlMap,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  console.log('✅ Mapa de imágenes guardado en Firestore: system/image_assets');

  // Now update each recipe in Firestore with the Firebase Storage image URL
  console.log('\n🔄 Actualizando recetas en Firestore con URLs de Firebase Storage...');
  const recipesSnapshot = await getDocs(collection(db, 'recipes'));
  let updatedRecipes = 0;

  for (const docSnap of recipesSnapshot.docs) {
    const data = docSnap.data();
    const currentImage = data.image;

    if (currentImage && urlMap[currentImage]) {
      const storageUrl = urlMap[currentImage];
      await updateDoc(doc(db, 'recipes', docSnap.id), {
        image: storageUrl,
        localImageFallback: currentImage,
        storageProvider: 'firebase_storage',
        imageUpdatedAt: new Date().toISOString()
      });
      updatedRecipes++;
      console.log(`  ✨ Receta actualizada en Firestore: [${docSnap.id}] -> ${data.title}`);
    }
  }

  console.log(`\n🎉 ¡COMPLETADO! ${updatedRecipes} recetas en Firestore ahora utilizan URLs de Firebase Cloud Storage.`);
  process.exit(0);
}

uploadImages().catch(err => {
  console.error('\n❌ ERROR EN PROCESO DE IMÁGENES:', err);
  process.exit(1);
});
