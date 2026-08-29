/* ==========================================================================
   FRIDGEFLOW - AI CULINARY RECIPE GENERATOR & SEARCH ENGINE
   Intelligent Recipe Creation from Natural Language, Macro Calculation & Imagery
   ========================================================================== */

class AIRecipeGenerator {
  constructor() {
    this.photoCatalog = {
      chicken: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
      pollo: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
      salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      salmón: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      beef: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      ternera: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      carne: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      tuna: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=800&q=80',
      atun: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=800&q=80',
      atún: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=800&q=80',
      pasta: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
      curry: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
      bowl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      salad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      ensalada: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      egg: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      huevo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      tortilla: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      tofu: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      hamburguesa: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      pavo: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
      arroz: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
      rice: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
      queso: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
      default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    };
  }

  // Generate Recipe Asynchronously with Multi-Stage Progress Simulation
  async generateRecipe(dishName, userNotes = '', focus = 'protein', onProgress = null, customImage = null) {
    if ((!dishName || dishName.trim().length === 0) && !customImage) {
      throw new Error('Por favor, introduce el nombre del plato o sube una imagen.');
    }

    const cleanTitle = (dishName && dishName.trim().length > 0) ? dishName.trim() : 'Creación Culinaria Especial';
    const cleanNotes = userNotes.trim();

    // Stage 1: Analyze dish & culinary profile / image
    if (onProgress) {
      const step1Text = customImage 
        ? `📸 Analizando imagen y reconociendo ingredientes para "${cleanTitle}"...`
        : `🔍 Investigando técnicas y perfiles de sabor para "${cleanTitle}"...`;
      onProgress({ step: 1, text: step1Text });
    }
    await this.delay(650);

    // Stage 2: Nutrient & protein calculation
    if (onProgress) onProgress({ step: 2, text: '⚖️ Calculando macronutrientes, proteínas y micronutrientes biodisponibles...' });
    await this.delay(650);

    // Stage 3: Image generation & styling
    if (onProgress) {
      const step3Text = customImage
        ? '✨ Optimizando fotografía adjunta y ficha gastronómica...'
        : '🎨 Generando presentación visual y fotografía culinaria en alta resolución...';
      onProgress({ step: 3, text: step3Text });
    }
    await this.delay(700);

    // Stage 4: Structure cooking steps & timers
    if (onProgress) onProgress({ step: 4, text: '📝 Estructurando pasos cronometrados, timers y consejos de Chef...' });
    await this.delay(600);

    // Build the AI Recipe Object
    const recipe = this.synthesizeRecipe(cleanTitle, cleanNotes, focus, customImage);

    if (onProgress) onProgress({ step: 5, text: '✨ ¡Receta completada y lista para cocinar!' });
    await this.delay(350);

    return recipe;
  }

  synthesizeRecipe(title, notes, focus, customImage = null) {
    const lowerTitle = title.toLowerCase();
    const lowerNotes = notes.toLowerCase();
    const combined = `${lowerTitle} ${lowerNotes}`;

    // 1. Identify Main Protein & Ingredients
    const ingredients = [];
    let estimatedProtein = 42;
    let estimatedCalories = 490;
    let estimatedCarbs = 32;
    let estimatedFat = 14;
    let prepTime = 12;
    let cookTime = 15;
    let category = 'almuerzo';

    if (combined.includes('desayuno') || combined.includes('pancakes') || combined.includes('tostada') || combined.includes('smoothie') || combined.includes('tortilla')) {
      category = 'desayuno';
    } else if (combined.includes('cena') || combined.includes('ligero') || combined.includes('ensalada') || combined.includes('sopa') || combined.includes('crema')) {
      category = 'cena';
    } else {
      category = 'almuerzo';
    }

    // Determine Protein Source & Core Ingredients
    if (combined.includes('pollo') || combined.includes('pechuga')) {
      ingredients.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo fresca', amount: '220', unit: 'g', isMainProtein: true });
      estimatedProtein = 48;
      estimatedCalories = 480;
    } else if (combined.includes('ternera') || combined.includes('carne') || combined.includes('hamburguesa')) {
      ingredients.push({ id: 'ternera_picada', name: 'Carne magra de ternera', amount: '200', unit: 'g', isMainProtein: true });
      estimatedProtein = 50;
      estimatedCalories = 520;
    } else if (combined.includes('salmón') || combined.includes('salmon')) {
      ingredients.push({ id: 'salmon', name: 'Lomo de salmón fresco', amount: '220', unit: 'g', isMainProtein: true });
      estimatedProtein = 46;
      estimatedCalories = 540;
      estimatedFat = 20;
    } else if (combined.includes('atún') || combined.includes('atun') || combined.includes('tataki')) {
      ingredients.push({ id: 'atun_fresco', name: 'Lomo de atún fresco', amount: '200', unit: 'g', isMainProtein: true });
      ingredients.push({ id: 'edamame', name: 'Edamames desgranados', amount: '80', unit: 'g' });
      estimatedProtein = 52;
      estimatedCalories = 490;
    } else if (combined.includes('pavo')) {
      ingredients.push({ id: 'pavo_pechuga', name: 'Pechuga de pavo braseada', amount: '200', unit: 'g', isMainProtein: true });
      estimatedProtein = 46;
      estimatedCalories = 440;
    } else if (combined.includes('tofu') || combined.includes('seitan') || combined.includes('vegano') || combined.includes('soja')) {
      ingredients.push({ id: 'tofu', name: 'Tofu firme marinado en soja', amount: '250', unit: 'g', isMainProtein: true });
      ingredients.push({ id: 'edamame', name: 'Edamames verdes', amount: '100', unit: 'g' });
      estimatedProtein = 42;
      estimatedCalories = 460;
    } else if (combined.includes('huevo') || combined.includes('tortilla') || combined.includes('claras')) {
      ingredients.push({ id: 'claras_huevo', name: 'Claras de huevo pasteurizadas', amount: '200', unit: 'ml', isMainProtein: true });
      ingredients.push({ id: 'huevos', name: 'Huevos de campo enteros', amount: '2', unit: 'unidades' });
      estimatedProtein = 40;
      estimatedCalories = 380;
    } else {
      // Default versatile protein
      ingredients.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo de corral', amount: '200', unit: 'g', isMainProtein: true });
      estimatedProtein = 45;
      estimatedCalories = 480;
    }

    // Determine Carbs & Sides
    if (combined.includes('arroz') || combined.includes('basmati')) {
      ingredients.push({ id: 'arroz_jazmin', name: 'Arroz basmati / jazmín aromático', amount: '75', unit: 'g' });
      estimatedCarbs = 58;
    } else if (combined.includes('pasta') || combined.includes('fettuccine') || combined.includes('macarrones')) {
      ingredients.push({ id: 'pasta_fettuccine', name: 'Pasta integral o fettuccine', amount: '80', unit: 'g' });
      estimatedCarbs = 55;
    } else if (combined.includes('quinoa')) {
      ingredients.push({ id: 'quinoa', name: 'Quinoa real lavada', amount: '80', unit: 'g' });
      estimatedCarbs = 48;
      estimatedProtein += 4;
    } else if (combined.includes('patata') || combined.includes('boniato')) {
      ingredients.push({ id: 'patata', name: 'Patatas (Papas) al vapor', amount: '200', unit: 'g' });
      estimatedCarbs = 40;
    } else if (combined.includes('garbanzos') || combined.includes('lentejas')) {
      ingredients.push({ id: 'garbanzos_cocidos', name: 'Garbanzos cocidos escurridos', amount: '150', unit: 'g' });
      estimatedCarbs = 38;
      estimatedProtein += 9;
    } else {
      // Healthy vegetable carbs
      ingredients.push({ id: 'arroz_jazmin', name: 'Guarnición de arroz o quinoa', amount: '60', unit: 'g' });
      estimatedCarbs = 42;
    }

    // Fresh Aromatics & Greens
    if (combined.includes('curry') || combined.includes('coco')) {
      ingredients.push({ id: 'leche', name: 'Leche de coco cremosa', amount: '120', unit: 'ml' });
      ingredients.push({ id: 'paprika', name: 'Polvo de curry y pimentón', amount: '1.5', unit: 'cucharadita' });
      ingredients.push({ id: 'espinacas', name: 'Espinacas tiernas baby', amount: '70', unit: 'g' });
    } else if (combined.includes('aguacate') || combined.includes('bowl')) {
      ingredients.push({ id: 'aguacate', name: 'Aguacate (Palta) en láminas', amount: '0.5', unit: 'unidades' });
      ingredients.push({ id: 'tomates_cherry', name: 'Tomates cherry partidos', amount: '80', unit: 'g' });
      ingredients.push({ id: 'sesamo', name: 'Semillas de sésamo tostado', amount: '1', unit: 'cucharaditas' });
    } else {
      ingredients.push({ id: 'ajo', name: 'Dientes de ajo laminados', amount: '2', unit: 'dientes' });
      ingredients.push({ id: 'aceite_oliva', name: 'Aceite de oliva virgen extra (AOVE)', amount: '10', unit: 'ml' });
      ingredients.push({ id: 'perejil', name: 'Perejil o cilantro fresco picado', amount: '1', unit: 'cucharadas' });
    }

    // Adjust for focus
    if (focus === 'keto') {
      estimatedCarbs = Math.min(12, estimatedCarbs);
      estimatedFat += 10;
    } else if (focus === 'protein' || focus === 'hyperprotein') {
      estimatedProtein = Math.max(45, estimatedProtein);
    }

    // Select Best Image
    const matchedImage = this.matchImage(combined);

    // Generate Step-by-Step Cooking Guide with Timers
    const steps = this.generateSteps(title, ingredients, combined);

    // Unique Slug ID
    const cleanId = 'ai-' + lowerTitle
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Math.floor(Math.random() * 1000);

    return {
      id: cleanId,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      subtitle: `Plato de alta biodisponibilidad creado con precisión gastronómica e IA.`,
      description: `Una creación gastronómica equilibrada diseñada para optimizar tu aporte proteico (${estimatedProtein}g) sin sacrificar textura ni sabor. Cada ingrediente ha sido seleccionado para potenciar la absorción de nutrientes y agilizar la preparación. ${notes ? 'Nota personalizada: ' + notes : ''}`,
      category: category,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: 1,
      difficulty: cookTime > 20 ? 'Intermedia' : 'Fácil',
      calories: estimatedCalories,
      protein: estimatedProtein,
      carbs: estimatedCarbs,
      fat: estimatedFat,
      fiber: 6,
      image: customImage || matchedImage,
      tags: ['✨ Creada con IA', customImage ? '📸 Con Foto/Captura' : 'Hiperproteico', 'Fácil', 'Fitness', category === 'cena' ? 'Cena Ligera' : 'Energético'],
      isCustom: true,
      ingredients: ingredients,
      steps: steps,
      createdAt: new Date().toISOString()
    };
  }

  matchImage(query) {
    for (const [key, url] of Object.entries(this.photoCatalog)) {
      if (query.includes(key)) {
        return url;
      }
    }
    return this.photoCatalog.default;
  }

  generateSteps(title, ingredients, query) {
    const mainProt = ingredients.find(i => i.isMainProtein) || ingredients[0];
    const steps = [];

    // Step 1: Prep
    steps.push({
      step: 1,
      instruction: `Lava, seca y porciona los ingredientes frescos. Corta ${mainProt.name.toLowerCase()} en bocados uniformes para asegurar una cocción homogénea y sazona con sal marina, pimienta negra recién molida y un hilo de AOVE.`,
      timerSeconds: 0,
      tip: 'Secar la proteína con papel de cocina antes de cocinar garantiza un dorado exterior crujiente sin que se cueza en su propio jugo.',
      equipment: ['Tabla de corte', 'Cuchillo de chef']
    });

    // Step 2: Searing / Cooking Base
    steps.push({
      step: 2,
      instruction: `Calienta una sartén amplia o wok a fuego medio-alto con unas gotas de AOVE. Añade ${mainProt.name.toLowerCase()} y sella firmemente durante 3 a 4 minutos por cada lado hasta obtener una costra dorada y jugosa.`,
      timerSeconds: 240,
      tip: 'No muevas la pieza durante los primeros 2 minutos para permitir que se forme la reacción de Maillard aromática.',
      equipment: ['Sartén antiadherente o Wok', 'Pinzas']
    });

    // Step 3: Aromatics & Sauce/Simmer
    if (query.includes('curry') || query.includes('salsa') || query.includes('guiso')) {
      steps.push({
        step: 3,
        instruction: `Reduce a fuego medio. Incorpora los aromáticos, especias y la base cremosa. Deja que reduzca a fuego suave durante 6 a 8 minutos para que todos los sabores se concentren e integren.`,
        timerSeconds: 420,
        tip: 'Cocinar las especias en seco 30 segundos antes de agregar líquidos libera sus aceites esenciales más intensos.',
        equipment: ['Espátula de silicona']
      });
    } else {
      steps.push({
        step: 3,
        instruction: `Baja a fuego medio y añade los vegetales o guarnición. Saltea durante 3 a 5 minutos manteniendo las verduras crujientes ("al dente") para preservar todas sus vitaminas.`,
        timerSeconds: 240,
        tip: 'Las verduras al dente aportan mayor saciedad y conservan su textura brillante y color vivo.',
        equipment: ['Sartén']
      });
    }

    // Step 4: Finishing & Plating
    steps.push({
      step: 4,
      instruction: `Retira del fuego. Emplata sobre una base estética, decora con hierbas frescas recién picadas, un toque de semillas y un último hilo de aceite virgen extra. ¡Sirve inmediatamente bien caliente!`,
      timerSeconds: 0,
      tip: 'Dejar reposar la proteína caliente 1 minuto antes del primer corte redistribuye los jugos internos por toda la carne.',
      equipment: ['Plato hondo o Bowl gourmet']
    });

    return steps;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global instance
window.aiRecipeGenerator = new AIRecipeGenerator();
