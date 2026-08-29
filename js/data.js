/* ==========================================================================
   FRIDGEFLOW - CULINARY DATABASE & KNOWLEDGE ENGINE
   140+ Ingredients, 37+ Complete Gourmet & High-Protein Recipes, Matrix & Presets
   ========================================================================== */

const FridgeData = {
  // Master Ingredients Registry
  ingredients: [
    // --- VEGETABLES & HERBS ---
    { id: 'tomate', name: 'Tomates maduros', category: 'vegetables', emoji: '🍅', defaultExpiryDays: 7, unit: 'unidades', estimatedPrice: 2700, estimatedPriceARS: 2700, co2PerKg: 1.4, substitutes: ['tomates_cherry', 'tomate_triturado'] },
    { id: 'tomates_cherry', name: 'Tomates cherry', category: 'vegetables', emoji: '🍅', defaultExpiryDays: 9, unit: 'g', estimatedPrice: 3300, estimatedPriceARS: 3300, co2PerKg: 1.5, substitutes: ['tomate'] },
    { id: 'espinacas', name: 'Espinacas frescas', category: 'vegetables', emoji: '🥬', defaultExpiryDays: 5, unit: 'g', estimatedPrice: 2250, estimatedPriceARS: 2250, co2PerKg: 0.8, substitutes: ['kale', 'acelgas', 'lechuga'] },
    { id: 'cebolla', name: 'Cebolla dulce o morada', category: 'vegetables', emoji: '🧅', defaultExpiryDays: 21, unit: 'unidades', estimatedPrice: 1800, estimatedPriceARS: 1800, co2PerKg: 0.5, substitutes: ['chalotas', 'puerro', 'cebollino'] },
    { id: 'ajo', name: 'Dientes de ajo', category: 'vegetables', emoji: '🧄', defaultExpiryDays: 30, unit: 'dientes', estimatedPrice: 1350, estimatedPriceARS: 1350, co2PerKg: 0.6, substitutes: ['ajo_polvo'] },
    { id: 'aguacate', name: 'Aguacate maduro (Palta)', category: 'vegetables', emoji: '🥑', defaultExpiryDays: 4, unit: 'unidades', estimatedPrice: 4200, estimatedPriceARS: 4200, co2PerKg: 1.3, substitutes: ['edamame', 'hummus'] },
    { id: 'champinones', name: 'Champiñones / Setas', category: 'vegetables', emoji: '🍄', defaultExpiryDays: 6, unit: 'g', estimatedPrice: 3150, estimatedPriceARS: 3150, co2PerKg: 1.2, substitutes: ['berenjena', 'tofu'] },
    { id: 'pimiento_rojo', name: 'Pimiento rojo', category: 'vegetables', emoji: '🫑', defaultExpiryDays: 10, unit: 'unidades', estimatedPrice: 2400, estimatedPriceARS: 2400, co2PerKg: 0.9, substitutes: ['pimiento_verde', 'zanahoria'] },
    { id: 'pimiento_verde', name: 'Pimiento verde', category: 'vegetables', emoji: '🫑', defaultExpiryDays: 12, unit: 'unidades', estimatedPrice: 2100, estimatedPriceARS: 2100, co2PerKg: 0.9, substitutes: ['pimiento_rojo'] },
    { id: 'zanahoria', name: 'Zanahorias', category: 'vegetables', emoji: '🥕', defaultExpiryDays: 18, unit: 'unidades', estimatedPrice: 1400, estimatedPriceARS: 1400, co2PerKg: 0.4, substitutes: ['calabaza', 'boniato'] },
    { id: 'calabacin', name: 'Calabacín (Zucchini)', category: 'vegetables', emoji: '🥒', defaultExpiryDays: 8, unit: 'unidades', estimatedPrice: 1950, estimatedPriceARS: 1950, co2PerKg: 0.7, substitutes: ['berenjena', 'pepino'] },
    { id: 'pepino', name: 'Pepino crujiente', category: 'vegetables', emoji: '🥒', defaultExpiryDays: 7, unit: 'unidades', estimatedPrice: 1300, estimatedPriceARS: 1300, co2PerKg: 0.6, substitutes: ['calabacin'] },
    { id: 'brocoli', name: 'Brócoli fresco', category: 'vegetables', emoji: '🥦', defaultExpiryDays: 7, unit: 'g', estimatedPrice: 2600, estimatedPriceARS: 2600, co2PerKg: 0.7, substitutes: ['coliflor', 'espinacas'] },
    { id: 'esparragos', name: 'Espárragos verdes trigueros', category: 'vegetables', emoji: '🎋', defaultExpiryDays: 6, unit: 'g', estimatedPrice: 3500, estimatedPriceARS: 3500, co2PerKg: 0.8, substitutes: ['judias_verdes', 'brocoli'] },
    { id: 'albahaca', name: 'Albahaca fresca', category: 'vegetables', emoji: '🌿', defaultExpiryDays: 6, unit: 'hojas', estimatedPrice: 1800, estimatedPriceARS: 1800, co2PerKg: 0.4, substitutes: ['oregano', 'perejil', 'menta'] },
    { id: 'perejil', name: 'Perejil fresco picado', category: 'vegetables', emoji: '🌿', defaultExpiryDays: 8, unit: 'cucharadas', estimatedPrice: 1200, estimatedPriceARS: 1200, co2PerKg: 0.4, substitutes: ['cilantro', 'albahaca'] },
    { id: 'cilantro', name: 'Cilantro fresco', category: 'vegetables', emoji: '🌿', defaultExpiryDays: 5, unit: 'hojas', estimatedPrice: 1350, estimatedPriceARS: 1350, co2PerKg: 0.4, substitutes: ['perejil'] },
    { id: 'boniato', name: 'Boniato / Batata', category: 'vegetables', emoji: '🍠', defaultExpiryDays: 20, unit: 'unidades', estimatedPrice: 2250, estimatedPriceARS: 2250, co2PerKg: 0.5, substitutes: ['patata', 'calabaza'] },
    { id: 'patata', name: 'Patatas (Papas)', category: 'vegetables', emoji: '🥔', defaultExpiryDays: 25, unit: 'unidades', estimatedPrice: 1800, estimatedPriceARS: 1800, co2PerKg: 0.5, substitutes: ['boniato'] },
    { id: 'radish', name: 'Rábanos frescos', category: 'vegetables', emoji: '🌱', defaultExpiryDays: 10, unit: 'unidades', estimatedPrice: 1650, estimatedPriceARS: 1650, co2PerKg: 0.5, substitutes: ['pepino'] },
    { id: 'edamame', name: 'Edamame desgranado', category: 'vegetables', emoji: '🫛', defaultExpiryDays: 14, unit: 'g', estimatedPrice: 3600, estimatedPriceARS: 3600, co2PerKg: 0.9, substitutes: ['guisantes'] },
    { id: 'guisantes', name: 'Guisantes verdes (Arvejas)', category: 'vegetables', emoji: '🫛', defaultExpiryDays: 10, unit: 'g', estimatedPrice: 1800, estimatedPriceARS: 1800, co2PerKg: 0.7, substitutes: ['edamame'] },

    // --- PROTEINS ---
    { id: 'huevos', name: 'Huevos de campo (docena)', category: 'proteins', emoji: '🥚', defaultExpiryDays: 21, unit: 'unidades', estimatedPrice: 3900, estimatedPriceARS: 3900, co2PerKg: 2.2, substitutes: ['claras_huevo', 'tofu'] },
    { id: 'claras_huevo', name: 'Claras de huevo pasteurizadas', category: 'proteins', emoji: '🍳', defaultExpiryDays: 14, unit: 'ml', estimatedPrice: 3150, estimatedPriceARS: 3150, co2PerKg: 1.8, substitutes: ['huevos'] },
    { id: 'salmon', name: 'Lomo de salmón fresco', category: 'proteins', emoji: '🐟', defaultExpiryDays: 3, unit: 'g', estimatedPrice: 9750, estimatedPriceARS: 9750, co2PerKg: 4.8, substitutes: ['atun_fresco', 'tofu', 'merluza_pescado'] },
    { id: 'atun_fresco', name: 'Lomo de atún fresco', category: 'proteins', emoji: '🍣', defaultExpiryDays: 3, unit: 'g', estimatedPrice: 10800, estimatedPriceARS: 10800, co2PerKg: 5.1, substitutes: ['salmon', 'merluza_pescado'] },
    { id: 'merluza_pescado', name: 'Lomo de merluza o bacalao', category: 'proteins', emoji: '🐟', defaultExpiryDays: 3, unit: 'g', estimatedPrice: 7200, estimatedPriceARS: 7200, co2PerKg: 3.2, substitutes: ['salmon', 'atun_fresco'] },
    { id: 'gambas', name: 'Gambas o langostinos pelados', category: 'proteins', emoji: '🦐', defaultExpiryDays: 4, unit: 'g', estimatedPrice: 8850, estimatedPriceARS: 8850, co2PerKg: 4.5, substitutes: ['pollo_pechuga', 'tofu'] },
    { id: 'pollo_pechuga', name: 'Pechuga de pollo', category: 'proteins', emoji: '🍗', defaultExpiryDays: 4, unit: 'g', estimatedPrice: 5850, estimatedPriceARS: 5850, co2PerKg: 4.2, substitutes: ['pavo_pechuga', 'tofu', 'ternera_picada'] },
    { id: 'pavo_pechuga', name: 'Pechuga de pavo', category: 'proteins', emoji: '🦃', defaultExpiryDays: 4, unit: 'g', estimatedPrice: 6150, estimatedPriceARS: 6150, co2PerKg: 3.9, substitutes: ['pollo_pechuga', 'tofu'] },
    { id: 'lomo_cerdo', name: 'Lomo de cerdo magro', category: 'proteins', emoji: '🥩', defaultExpiryDays: 4, unit: 'g', estimatedPrice: 5400, estimatedPriceARS: 5400, co2PerKg: 5.8, substitutes: ['pollo_pechuga', 'ternera_picada'] },
    { id: 'ternera_picada', name: 'Carne picada de ternera magra', category: 'proteins', emoji: '🥩', defaultExpiryDays: 3, unit: 'g', estimatedPrice: 6750, estimatedPriceARS: 6750, co2PerKg: 14.0, substitutes: ['pollo_pechuga', 'lentejas_cocidas', 'soja_texturizada'] },
    { id: 'atun_lata', name: 'Atún claro en lata', category: 'proteins', emoji: '🥫', defaultExpiryDays: 360, unit: 'latas', estimatedPrice: 3600, estimatedPriceARS: 3600, co2PerKg: 3.1, substitutes: ['salmon', 'sardinas'] },
    { id: 'garbanzos_cocidos', name: 'Garbanzos cocidos en tarro', category: 'proteins', emoji: '🫘', defaultExpiryDays: 180, unit: 'g', estimatedPrice: 1300, estimatedPriceARS: 1300, co2PerKg: 0.6, substitutes: ['lentejas_cocidas', 'alubias'] },
    { id: 'lentejas_cocidas', name: 'Lentejas cocidas', category: 'proteins', emoji: '🍲', defaultExpiryDays: 180, unit: 'g', estimatedPrice: 1350, estimatedPriceARS: 1350, co2PerKg: 0.7, substitutes: ['garbanzos_cocidos'] },
    { id: 'tofu', name: 'Tofu firme bio', category: 'proteins', emoji: '🧊', defaultExpiryDays: 15, unit: 'g', estimatedPrice: 2900, estimatedPriceARS: 2900, co2PerKg: 1.1, substitutes: ['tempeh', 'pollo_pechuga'] },
    { id: 'tempeh', name: 'Tempeh de soja bio', category: 'proteins', emoji: '🌱', defaultExpiryDays: 14, unit: 'g', estimatedPrice: 3750, estimatedPriceARS: 3750, co2PerKg: 1.2, substitutes: ['tofu', 'seitan'] },
    { id: 'seitan', name: 'Seitán artesanal de trigo', category: 'proteins', emoji: '🍞', defaultExpiryDays: 15, unit: 'g', estimatedPrice: 4200, estimatedPriceARS: 4200, co2PerKg: 1.0, substitutes: ['tofu', 'tempeh'] },
    { id: 'soja_texturizada', name: 'Soja texturizada fina/gruesa', category: 'proteins', emoji: '🌾', defaultExpiryDays: 360, unit: 'g', estimatedPrice: 2700, estimatedPriceARS: 2700, co2PerKg: 0.9, substitutes: ['ternera_picada', 'lentejas_cocidas'] },

    // --- DAIRY & PLANT-BASED ALTERNATIVES ---
    { id: 'queso_cottage', name: 'Queso Cottage / Requesón 0%', category: 'dairy', emoji: '🥣', defaultExpiryDays: 10, unit: 'g', estimatedPrice: 2850, estimatedPriceARS: 2850, co2PerKg: 2.5, substitutes: ['yogur_griego', 'queso_quark'] },
    { id: 'queso_quark', name: 'Queso fresco batido 0% / Quark', category: 'dairy', emoji: '🥛', defaultExpiryDays: 14, unit: 'g', estimatedPrice: 2400, estimatedPriceARS: 2400, co2PerKg: 2.2, substitutes: ['yogur_griego', 'queso_cottage'] },
    { id: 'yogur_griego', name: 'Yogur griego natural', category: 'dairy', emoji: '🥣', defaultExpiryDays: 14, unit: 'g', estimatedPrice: 2750, estimatedPriceARS: 2750, co2PerKg: 2.0, substitutes: ['queso_cottage', 'queso_quark'] },
    { id: 'burrata', name: 'Queso Burrata artesana', category: 'dairy', emoji: '🧀', defaultExpiryDays: 6, unit: 'unidades', estimatedPrice: 4350, estimatedPriceARS: 4350, co2PerKg: 5.5, substitutes: ['mozzarella', 'feta'] },
    { id: 'queso_feta', name: 'Queso Feta', category: 'dairy', emoji: '🧀', defaultExpiryDays: 18, unit: 'g', estimatedPrice: 3450, estimatedPriceARS: 3450, co2PerKg: 4.8, substitutes: ['queso_cabra', 'parmesano'] },
    { id: 'parmesano', name: 'Parmesano Reggiano curado', category: 'dairy', emoji: '🧀', defaultExpiryDays: 45, unit: 'g', estimatedPrice: 5700, estimatedPriceARS: 5700, co2PerKg: 6.2, substitutes: ['grana_padano', 'manchego'] },
    { id: 'leche', name: 'Leche entera o vegetal', category: 'dairy', emoji: '🥛', defaultExpiryDays: 7, unit: 'ml', estimatedPrice: 1650, estimatedPriceARS: 1650, co2PerKg: 1.6, substitutes: ['leche_avena', 'leche_almendra'] },
    { id: 'mantequilla', name: 'Mantequilla de pasto (Manteca)', category: 'dairy', emoji: '🧈', defaultExpiryDays: 30, unit: 'g', estimatedPrice: 3300, estimatedPriceARS: 3300, co2PerKg: 6.8, substitutes: ['aceite_oliva', 'aceite_coco'] },
    { id: 'mozzarella', name: 'Mozzarella fresca', category: 'dairy', emoji: '🧀', defaultExpiryDays: 8, unit: 'g', estimatedPrice: 2400, estimatedPriceARS: 2400, co2PerKg: 4.5, substitutes: ['burrata'] },

    // --- GRAINS, PASTA & BAKERY ---
    { id: 'pasta_fettuccine', name: 'Pasta Fettuccine o Tagliatelle', category: 'grains', emoji: '🍝', defaultExpiryDays: 360, unit: 'g', estimatedPrice: 2100, estimatedPriceARS: 2100, co2PerKg: 1.1, substitutes: ['pasta_espaguetis', 'pasta_penne'] },
    { id: 'arroz_jazmin', name: 'Arroz jazmín o basmati', category: 'grains', emoji: '🍚', defaultExpiryDays: 360, unit: 'g', estimatedPrice: 2550, estimatedPriceARS: 2550, co2PerKg: 1.9, substitutes: ['quinoa', 'arroz_integral'] },
    { id: 'quinoa', name: 'Quinoa real tricolor', category: 'grains', emoji: '🌾', defaultExpiryDays: 360, unit: 'g', estimatedPrice: 3750, estimatedPriceARS: 3750, co2PerKg: 1.0, substitutes: ['arroz_jazmin', 'cuscus'] },
    { id: 'pan_masa_madre', name: 'Pan rústico de masa madre', category: 'grains', emoji: '🍞', defaultExpiryDays: 5, unit: 'rebanadas', estimatedPrice: 4200, estimatedPriceARS: 4200, co2PerKg: 0.9, substitutes: ['pan_integral', 'tostadas'] },
    { id: 'avena', name: 'Copos de avena integral', category: 'grains', emoji: '🥣', defaultExpiryDays: 180, unit: 'g', estimatedPrice: 1700, estimatedPriceARS: 1700, co2PerKg: 0.7, substitutes: ['granola', 'quinoa'] },

    // --- CONDIMENTS, NUTS, SEEDS & FRUITS ---
    { id: 'crema_cacahuete', name: 'Crema de cacahuete (Maní) 100% natural', category: 'condiments', emoji: '🥜', defaultExpiryDays: 180, unit: 'g', estimatedPrice: 4200, estimatedPriceARS: 4200, co2PerKg: 1.2, substitutes: ['tahini', 'crema_almendra'] },
    { id: 'semillas_chia', name: 'Semillas de chía y cáñamo', category: 'condiments', emoji: '🌱', defaultExpiryDays: 240, unit: 'g', estimatedPrice: 3300, estimatedPriceARS: 3300, co2PerKg: 0.8, substitutes: ['sesamo'] },
    { id: 'frutos_rojos', name: 'Frutos rojos (fresas, arándanos)', category: 'fruits', emoji: '🫐', defaultExpiryDays: 5, unit: 'g', estimatedPrice: 3750, estimatedPriceARS: 3750, co2PerKg: 1.1, substitutes: ['platano', 'manzana'] },
    { id: 'platano', name: 'Plátano maduro (Banana)', category: 'fruits', emoji: '🍌', defaultExpiryDays: 6, unit: 'unidades', estimatedPrice: 1800, estimatedPriceARS: 1800, co2PerKg: 0.6, substitutes: ['frutos_rojos', 'manzana'] },
    { id: 'aceite_oliva', name: 'Aceite de oliva virgen extra (AOVE)', category: 'condiments', emoji: '🫒', defaultExpiryDays: 360, unit: 'ml', estimatedPrice: 10500, estimatedPriceARS: 10500, co2PerKg: 2.1, substitutes: ['aceite_sesamo', 'mantequilla'] },
    { id: 'salsa_soja', name: 'Salsa de soja tamari', category: 'condiments', emoji: '🍶', defaultExpiryDays: 360, unit: 'cucharadas', estimatedPrice: 3300, estimatedPriceARS: 3300, co2PerKg: 1.0, substitutes: ['tamari', 'salsa_teriyaki'] },
    { id: 'sesamo', name: 'Semillas de sésamo tostado', category: 'condiments', emoji: '🌱', defaultExpiryDays: 180, unit: 'cucharaditas', estimatedPrice: 2250, estimatedPriceARS: 2250, co2PerKg: 0.8, substitutes: ['semillas_chia'] },
    { id: 'pinones', name: 'Piñones tostados', category: 'condiments', emoji: '🌰', defaultExpiryDays: 90, unit: 'g', estimatedPrice: 6300, estimatedPriceARS: 6300, co2PerKg: 1.2, substitutes: ['nueces', 'almendras', 'pipas_girasol'] },
    { id: 'tahini', name: 'Pasta de sésamo Tahini', category: 'condiments', emoji: '🫙', defaultExpiryDays: 180, unit: 'cucharadas', estimatedPrice: 4800, estimatedPriceARS: 4800, co2PerKg: 1.1, substitutes: ['crema_cacahuete', 'yogur_griego'] },
    { id: 'miel', name: 'Miel pura de azahar', category: 'condiments', emoji: '🍯', defaultExpiryDays: 720, unit: 'cucharadas', estimatedPrice: 5250, estimatedPriceARS: 5250, co2PerKg: 1.4, substitutes: ['sirope_arce', 'azucar_moreno'] },
    { id: 'limon', name: 'Limones frescos', category: 'fruits', emoji: '🍋', defaultExpiryDays: 14, unit: 'unidades', estimatedPrice: 1950, estimatedPriceARS: 1950, co2PerKg: 0.6, substitutes: ['lima', 'vinagre_manzana'] },
    { id: 'paprika', name: 'Pimentón dulce o ahumado', category: 'condiments', emoji: '🌶️', defaultExpiryDays: 360, unit: 'cucharaditas', estimatedPrice: 1800, estimatedPriceARS: 1800, co2PerKg: 0.5, substitutes: ['chile_flocos', 'curry'] }
  ],

  // Master Recipes Catalog (37 Complete Gourmet & High-Protein Recipes)
  recipes: [
    // --- ORIGINAL CORE RECIPES ---
    {
      id: 'pasta-burrata-tomates',
      title: 'Fettuccine con Burrata y Tomates Asados',
      subtitle: 'Crema sedosa, tomates cherry caramelizados al horno y albahaca fresca',
      description: 'Una oda a la cocina mediterránea minimalista. Tomates asados a fuego vivo hasta estallar, mezclados con pasta al dente y coronados con burrata cremosa y piñones tostados.',
      category: 'almuerzo',
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      difficulty: 'Fácil',
      calories: 580,
      protein: 22,
      carbs: 68,
      fat: 24,
      co2Saved: 1.6,
      moneySaved: 14.50,
      image: 'assets/images/recipe_mediterranean_pasta.jpg',
      tags: ['Vegetariano', 'Gourmet', 'Express 15min', 'Cero Desperdicio'],
      ingredients: [
        { id: 'pasta_fettuccine', name: 'Pasta Fettuccine', amount: '200', unit: 'g', isOptional: false },
        { id: 'burrata', name: 'Burrata artesana', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'tomates_cherry', name: 'Tomates cherry', amount: '250', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Dientes de ajo laminados', amount: '3', unit: 'dientes', isOptional: false },
        { id: 'albahaca', name: 'Albahaca fresca', amount: '12', unit: 'hojas', isOptional: false },
        { id: 'pinones', name: 'Piñones tostados', amount: '20', unit: 'g', isOptional: true },
        { id: 'aceite_oliva', name: 'Aceite de oliva virgen extra', amount: '30', unit: 'ml', isOptional: false }
      ],
      equipment: ['Olla amplia', 'Sartén antiadherente', 'Pinzas de cocina'],
      steps: [
        { step: 1, instruction: 'Hierve abundante agua con sal en una olla. Añade los fettuccine y cocina 9 minutos hasta que estén al dente.', tip: 'Guarda media taza del agua de cocción antes de escurrir.', timerSeconds: 540 },
        { step: 2, instruction: 'En una sartén con AOVE a fuego medio-alto, saltea los dientes de ajo laminados y los tomates cherry enteros hasta que comiencen a dorarse y estallar.', tip: 'Presiona algunos tomates suavemente con la cuchara para soltar sus jugos naturales.', timerSeconds: 300 },
        { step: 3, instruction: 'Transfiere la pasta directamente a la sartén con los tomates, añadiendo un chorrito del agua de cocción para emulsionar la salsa.', tip: 'Mueve enérgicamente en círculos para crear una textura brillante y aterciopelada.', timerSeconds: 120 },
        { step: 4, instruction: 'Sirve en platos templados, coloca la burrata en el centro, ábrela con un corte delicado y decora con hojas de albahaca fresca y piñones.', tip: 'Termina con un hilo final de tu mejor AOVE.', timerSeconds: 60 }
      ],
      chefNotes: 'Aprovecha los tomates cherry que ya estén arrugándose; concentran mucho más azúcar natural y caramelizan mejor.'
    },

    {
      id: 'salmon-teriyaki-bowl',
      title: 'Bowl Nórdico de Salmón Teriyaki y Aguacate',
      subtitle: 'Salmón caramelizado al sésamo sobre cama de arroz aromático y edamame',
      description: 'Equilibrio maestro de ácidos grasos esenciales y frescura vegetal. Lomo de salmón sellado con costra glaseada de soja y miel, acompañado de aguacate en abanico y pepino marinado.',
      category: 'cena',
      prepTime: 12,
      cookTime: 10,
      servings: 2,
      difficulty: 'Fácil',
      calories: 620,
      protein: 38,
      carbs: 52,
      fat: 28,
      co2Saved: 2.1,
      moneySaved: 18.00,
      image: 'assets/images/recipe_salmon_bowl.jpg',
      tags: ['Rico en Proteína', 'Omega 3', 'High Protein', 'Gourmet'],
      ingredients: [
        { id: 'salmon', name: 'Lomo de salmón', amount: '300', unit: 'g', isOptional: false },
        { id: 'arroz_jazmin', name: 'Arroz jazmín cocido', amount: '200', unit: 'g', isOptional: false },
        { id: 'aguacate', name: 'Aguacate maduro', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'edamame', name: 'Edamame desgranado', amount: '100', unit: 'g', isOptional: true },
        { id: 'pepino', name: 'Pepino en láminas', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja tamari', amount: '3', unit: 'cucharadas', isOptional: false },
        { id: 'miel', name: 'Miel pura', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'sesamo', name: 'Semillas de sésamo', amount: '1', unit: 'cucharada', isOptional: true }
      ],
      equipment: ['Sartén pesada o grill', 'Cuchillo santoku afilado', 'Cuenco para marinar'],
      steps: [
        { step: 1, instruction: 'Mezcla en un cuenco la salsa de soja con la miel y un toque de ajo rallado para preparar el glaseado teriyaki rápido.', tip: 'Si tienes jengibre en polvo o fresco, añade una pizca.', timerSeconds: 60 },
        { step: 2, instruction: 'Corta el salmón en dados generosos o déjalo en lomo. Séllalo en sartén muy caliente con unas gotas de aceite durante 3 minutos por lado.', tip: 'No lo muevas durante los primeros 2 minutos para lograr una costra dorada.', timerSeconds: 360 },
        { step: 3, instruction: 'Vierte el glaseado sobre el salmón en el último minuto de cocción para que reduzca y espese envolviendo el pescado.', tip: 'Baja el fuego para evitar que la miel se queme.', timerSeconds: 90 },
        { step: 4, instruction: 'Monta los bowls con una base de arroz jazmín templado, el salmón glaseado, láminas de aguacate, pepino en cintas y edamame. Espolvorea con sésamo.', tip: 'Añade unas gotas de lima o limón para elevar la frescura.', timerSeconds: 120 }
      ],
      chefNotes: 'Si tienes restos de arroz del día anterior, caliéntalo con un cubito de hielo encima en el microondas durante 45 segundos: recupera su textura recién hecha.'
    },

    {
      id: 'shakshuka-especiada',
      title: 'Shakshuka Especiada con Huevos y Feta',
      subtitle: 'Guiso aromático de tomates, pimientos asados, huevos pochados y queso feta',
      description: 'El clásico reconfortante del Levante mediterráneo. Una salsa espesa de pimientos rojos caramelizados y comino, en la que se escalfan suavemente huevos de campo, servida directamente en sartén de hierro.',
      category: 'desayuno',
      prepTime: 10,
      cookTime: 20,
      servings: 2,
      difficulty: 'Fácil',
      calories: 410,
      protein: 21,
      carbs: 24,
      fat: 26,
      co2Saved: 1.8,
      moneySaved: 12.00,
      image: 'assets/images/recipe_shakshuka.jpg',
      tags: ['Vegetariano', 'Brunch', 'Económico', 'Bajo en Carbohidratos'],
      ingredients: [
        { id: 'huevos', name: 'Huevos de campo', amount: '3', unit: 'unidades', isOptional: false },
        { id: 'tomate', name: 'Tomates picados o triturados', amount: '400', unit: 'g', isOptional: false },
        { id: 'pimiento_rojo', name: 'Pimiento rojo en tiras', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'cebolla', name: 'Cebolla picada fina', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'ajo', name: 'Dientes de ajo', amount: '2', unit: 'dientes', isOptional: false },
        { id: 'queso_feta', name: 'Queso feta desmenuzado', amount: '50', unit: 'g', isOptional: true },
        { id: 'paprika', name: 'Pimentón dulce y ahumado', amount: '1', unit: 'cucharadita', isOptional: false },
        { id: 'pan_masa_madre', name: 'Pan de masa madre tostado', amount: '2', unit: 'rebanadas', isOptional: true }
      ],
      equipment: ['Sartén de hierro fundido o sartén honda', 'Tapa para sartén'],
      steps: [
        { step: 1, instruction: 'Sofríe la cebolla y el pimiento rojo en AOVE durante 7 minutos hasta que estén muy tiernos y fragantes.', tip: 'Añade una pizca de sal al inicio para ayudar a que la cebolla sude sus azúcares.', timerSeconds: 420 },
        { step: 2, instruction: 'Añade el ajo picado, el pimentón y una pizca de comino. Tuesta 30 segundos y vierte los tomates.', tip: 'Deja reducir a fuego medio-bajo durante 10 minutos hasta lograr una salsa espesa.', timerSeconds: 600 },
        { step: 3, instruction: 'Haz pequeños huecos con la cuchara en la salsa y casca un huevo en cada espacio. Tapa la sartén.', tip: 'Cocina a fuego lento durante 4-5 minutos hasta que las claras estén cuajadas pero las yemas sigan líquidas.', timerSeconds: 300 },
        { step: 4, instruction: 'Retira del fuego, desmenuza el queso feta por encima, decora con perejil o cilantro fresco y sirve con pan crujiente.', tip: 'Mójalo directamente en la yema caliente.', timerSeconds: 60 }
      ],
      chefNotes: 'Receta salvavidas para aprovechar tomates muy maduros y restos de pimientos que hayan perdido turgencia en el cajón de la nevera.'
    },

    {
      id: 'buddha-bowl-quinoa-garbanzos',
      title: 'Buddha Bowl Arcoíris con Garbanzos Crujientes',
      subtitle: 'Quinoa tricolor, batata asada, espinacas tiernas y vinagreta sedosa de tahini',
      description: 'El equilibrio supremo del plant-based. Garbanzos horneados con pimentón ahumado para un toque crocante irresistible, combinados con vegetales de hoja verde, aguacate y aderezo cremoso de sésamo.',
      category: 'almuerzo',
      prepTime: 15,
      cookTime: 20,
      servings: 2,
      difficulty: 'Fácil',
      calories: 520,
      protein: 19,
      carbs: 64,
      fat: 21,
      co2Saved: 2.4,
      moneySaved: 16.00,
      image: 'assets/images/recipe_buddha_bowl.jpg',
      tags: ['Vegano', 'Sin Gluten', 'Meal Prep', 'Superalimento'],
      ingredients: [
        { id: 'garbanzos_cocidos', name: 'Garbanzos cocidos', amount: '200', unit: 'g', isOptional: false },
        { id: 'quinoa', name: 'Quinoa cocida', amount: '150', unit: 'g', isOptional: false },
        { id: 'boniato', name: 'Boniato en dados', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'espinacas', name: 'Espinacas frescas', amount: '80', unit: 'g', isOptional: false },
        { id: 'aguacate', name: 'Medio aguacate en láminas', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'tahini', name: 'Pasta Tahini', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'limon', name: 'Zumo de limón recién exprimido', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'paprika', name: 'Pimentón ahumado', amount: '1', unit: 'cucharadita', isOptional: false }
      ],
      equipment: ['Bandeja de horno o freidora de aire', 'Bol espacioso'],
      steps: [
        { step: 1, instruction: 'Seca muy bien los garbanzos con un paño de cocina. Mézclalos con pimentón, sal y un hilo de AOVE junto a los dados de boniato.', tip: 'Cuanto más secos los garbanzos, más crujientes quedarán.', timerSeconds: 180 },
        { step: 2, instruction: 'Hornea a 200°C durante 18 minutos (o en airfryer 12 min a 190°C) hasta que el boniato esté tierno y los garbanzos suenen crocantes.', tip: 'Remueve a mitad de cocción para un tostado uniforme.', timerSeconds: 1080 },
        { step: 3, instruction: 'Emulsiona en un vaso el tahini con zumo de limón, 2 cucharadas de agua tibia y una pizca de sal hasta obtener una crema suave.', tip: 'Al inicio parecerá cortarse, pero bate unos segundos más y se volverá aterciopelada.', timerSeconds: 90 },
        { step: 4, instruction: 'Dispone una base de quinoa y espinacas, distribuye los garbanzos, el boniato asado y el aguacate. Baña con el aderezo de tahini.', tip: 'Añade semillas de sésamo para un acabado digno de restaurante.', timerSeconds: 60 }
      ],
      chefNotes: 'La quinoa cocida aguanta hasta 5 días en la nevera en un recipiente hermético de cristal. Ideal para cocinar en lote (Batch Cooking).'
    },

    {
      id: 'tostada-aguacate-huevo-pochado',
      title: 'Tostada Rústica de Aguacate y Huevo Escalfado',
      subtitle: 'Pan de masa madre tostado, aguacate cremoso, huevo fluido y brotes verdes',
      description: 'El desayuno de autor por excelencia. Una gruesa rebanada de pan artesano impregnada de AOVE, aguacate machacado con lima y un huevo escalfado con la yema en su punto exacto de fluidez dorada.',
      category: 'desayuno',
      prepTime: 5,
      cookTime: 5,
      servings: 1,
      difficulty: 'Fácil',
      calories: 380,
      protein: 16,
      carbs: 28,
      fat: 22,
      co2Saved: 0.9,
      moneySaved: 8.50,
      image: 'assets/images/recipe_avocado_toast.jpg',
      tags: ['Vegetariano', 'Express 15min', 'Brunch', 'Alto en Fibra'],
      ingredients: [
        { id: 'pan_masa_madre', name: 'Pan de masa madre grueso', amount: '1', unit: 'rebanada', isOptional: false },
        { id: 'aguacate', name: 'Aguacate maduro', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'huevos', name: 'Huevo fresco', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'limon', name: 'Unas gotas de zumo de limón', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'radish', name: 'Rábano en rodajas finas', amount: '1', unit: 'unidad', isOptional: true },
        { id: 'sesamo', name: 'Sésamo negro o copos de chile', amount: '1', unit: 'pizca', isOptional: true }
      ],
      equipment: ['Tostadora o sartén', 'Cazo pequeño para escalfar'],
      steps: [
        { step: 1, instruction: 'Tuesta la rebanada de pan de masa madre hasta que esté profundamente dorada por fuera pero tierna por dentro.', tip: 'Pasa un diente de ajo crudo suavemente sobre la superficie caliente para perfumarla.', timerSeconds: 120 },
        { step: 2, instruction: 'Chafa el aguacate con un tenedor en un plato con sal en escamas, pimienta y unas gotas de limón.', tip: 'No hagas un puré liso; deja trozos con textura para mayor placer en boca.', timerSeconds: 60 },
        { step: 3, instruction: 'Lleva agua a ebullición suave en un cazo con una cucharada de vinagre. Haz un remolino y desliza el huevo en el centro. Cocina 3 minutos exactos.', tip: 'El vinagre ayuda a que la clara coagule rápidamente envolviendo la yema.', timerSeconds: 180 },
        { step: 4, instruction: 'Unta el aguacate sobre el pan, corona con el huevo escalfado recién escurrido, láminas de rábano y sésamo negro.', tip: 'Haz un corte al huevo al servir para que la yema inunde el plato.', timerSeconds: 30 }
      ],
      chefNotes: 'Si el aguacate está demasiado maduro, es el momento perfecto: aportará mayor untuosidad sin necesidad de mantequilla.'
    },

    {
      id: 'frittata-dorada-sobras',
      title: 'Frittata Dorada de Fondo de Nevera',
      subtitle: 'Huevos batidos, champiñones salteados, espinacas y queso fundente',
      description: 'El arma secreta definitiva del cocinero sin desperdicio. Cualquier resto de verdura cocida o cruda cobra nueva vida en esta tortilla esponjosa de estilo italiano terminada a fuego lento.',
      category: 'cena',
      prepTime: 8,
      cookTime: 12,
      servings: 2,
      difficulty: 'Fácil',
      calories: 340,
      protein: 24,
      carbs: 8,
      fat: 23,
      co2Saved: 2.2,
      moneySaved: 11.00,
      image: 'assets/images/recipe_frittata_sobras.jpg',
      tags: ['Cero Desperdicio', 'Keto', 'Express 15min', 'Rico en Proteína'],
      ingredients: [
        { id: 'huevos', name: 'Huevos frescos', amount: '4', unit: 'unidades', isOptional: false },
        { id: 'champinones', name: 'Champiñones laminados', amount: '120', unit: 'g', isOptional: false },
        { id: 'espinacas', name: 'Espinacas frescas', amount: '60', unit: 'g', isOptional: false },
        { id: 'cebolla', name: 'Cebolla en juliana', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'parmesano', name: 'Parmesano rallado', amount: '30', unit: 'g', isOptional: true },
        { id: 'aceite_oliva', name: 'Aceite de oliva virgen extra', amount: '15', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente con mango apto para horno o tapa'],
      steps: [
        { step: 1, instruction: 'Bate los 4 huevos con una pizca generosa de sal, pimienta negra molida y la mitad del queso parmesano.', tip: 'Bate con fuerza para introducir aire; eso garantizará una frittata esponjosa.', timerSeconds: 90 },
        { step: 2, instruction: 'Saltea la cebolla y los champiñones en la sartén caliente con AOVE durante 5 minutos. Agrega las espinacas hasta que reduzcan.', tip: 'Deja que los champiñones doren bien para aportar profundidad umami.', timerSeconds: 300 },
        { step: 3, instruction: 'Vierte los huevos batidos cubriendo uniformemente todas las verduras. Baja el fuego al mínimo y tapa.', tip: 'Cocina tapado durante 6 minutos hasta que los bordes estén firmes y el centro casi cuajado.', timerSeconds: 360 },
        { step: 4, instruction: 'Espolvorea el resto de parmesano por encima y deja reposar 2 minutos antes de deslizar a un plato.', tip: 'Córtala en cuñas triangulares como una tarta salada.', timerSeconds: 120 }
      ],
      chefNotes: 'Puedes añadir restos de pollo asado, patatas cocidas o cualquier queso suelto que te quede en el cajón de quesos.'
    },

    {
      id: 'curry-lentejas-cremoso',
      title: 'Curry Cremoso de Lentejas y Tomate',
      subtitle: 'Lentejas guisadas en salsa de tomate especiada, yogur griego y arroz jazmín',
      description: 'Plato reconfortante de alta densidad nutricional listo en tiempo récord usando legumbres en conserva. Un festín de aromas cálidos con notas de jengibre, pimentón y comino.',
      category: 'cena',
      prepTime: 8,
      cookTime: 15,
      servings: 2,
      difficulty: 'Fácil',
      calories: 460,
      protein: 23,
      carbs: 65,
      fat: 12,
      co2Saved: 2.8,
      moneySaved: 13.50,
      image: 'assets/images/recipe_curry_lentejas.jpg',
      tags: ['Vegetariano', 'Económico', 'Proteína Vegetal', 'Cero Desperdicio'],
      ingredients: [
        { id: 'lentejas_cocidas', name: 'Lentejas cocidas en tarro', amount: '350', unit: 'g', isOptional: false },
        { id: 'tomate', name: 'Tomate triturado o picado', amount: '250', unit: 'g', isOptional: false },
        { id: 'cebolla', name: 'Cebolla picada', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'ajo', name: 'Dientes de ajo', amount: '2', unit: 'dientes', isOptional: false },
        { id: 'espinacas', name: 'Espinacas frescas', amount: '50', unit: 'g', isOptional: true },
        { id: 'yogur_griego', name: 'Yogur griego para mantecar', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'paprika', name: 'Pimentón y curry en polvo', amount: '1.5', unit: 'cucharaditas', isOptional: false }
      ],
      equipment: ['Cazuela mediana', 'Cuchara de madera'],
      steps: [
        { step: 1, instruction: 'En una cazuela, pocha la cebolla y los ajos en AOVE hasta que tomen color dorado claro.', tip: 'Añade el curry y el pimentón directamente al aceite caliente 20 segundos para despertar los aceites esenciales.', timerSeconds: 240 },
        { step: 2, instruction: 'Añade el tomate y cocina a fuego medio durante 6 minutos hasta que la salsa espese.', tip: 'Si el tomate es ácido, una pizca diminuta de miel equilibrará el sabor.', timerSeconds: 360 },
        { step: 3, instruction: 'Enjuaga y escurre las lentejas. Incorpóralas a la cazuela junto con las espinacas y cocina todo junto 5 minutos.', tip: 'Las lentejas absorberán toda la potencia aromática de la salsa.', timerSeconds: 300 },
        { step: 4, instruction: 'Apaga el fuego, añade las dos cucharadas de yogur griego para crear una salsa cremosa y aterciopelada.', tip: 'No dejes hervir el yogur para que conserve su textura suave.', timerSeconds: 60 }
      ],
      chefNotes: 'Un tarro de legumbres cocidas en la despensa es la mejor póliza de seguro para una cena saludable en menos de 15 minutos.'
    },

    // =========================================================================
    // --- 30 RECETAS PROTEICAS GOURMET & FITNESS (HIGH PROTEIN) ---
    // =========================================================================

    {
      id: 'pollo-limon-quinoa-romero',
      title: 'Pechuga de Pollo al Limón con Romero y Quinoa',
      subtitle: 'Pechuga dorada a la plancha, marinada en cítricos con quinoa tibia y espinacas',
      description: 'Corte magro de pechuga sellado a fuego vivo con emulsión de limón fresco, ajo y romero silvestre, servido sobre una base esponjosa de quinoa y brotes verdes.',
      category: 'almuerzo',
      prepTime: 10,
      cookTime: 12,
      servings: 1,
      difficulty: 'Fácil',
      calories: 490,
      protein: 44,
      carbs: 42,
      fat: 14,
      co2Saved: 1.9,
      moneySaved: 13.00,
      image: 'assets/images/recipe_chicken_quinoa.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Fitness', 'Sin Gluten'],
      ingredients: [
        { id: 'pollo_pechuga', name: 'Pechuga de pollo limpia', amount: '200', unit: 'g', isOptional: false },
        { id: 'quinoa', name: 'Quinoa cocida', amount: '120', unit: 'g', isOptional: false },
        { id: 'limon', name: 'Zumo y ralladura de limón', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'ajo', name: 'Diente de ajo picado', amount: '1', unit: 'diente', isOptional: false },
        { id: 'espinacas', name: 'Espinacas baby', amount: '50', unit: 'g', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén grill pesada', 'Pinzas'],
      steps: [
        { step: 1, instruction: 'Abre la pechuga en mariposa y marínala 5 minutos con zumo de limón, ajo picado, sal y pimienta.', tip: 'El ácido del limón ablanda las fibras haciéndola ultra jugosa.', timerSeconds: 300 },
        { step: 2, instruction: 'Cocina en sartén grill muy caliente con una gota de AOVE durante 4 minutos por lado hasta que esté dorada.', tip: 'No la pinches para conservar todos los jugos internos.', timerSeconds: 480 },
        { step: 3, instruction: 'En la misma sartén caliente saltea las espinacas 1 minuto junto a la quinoa cocida templada.', tip: 'Absorberá los jugos caramelizados del pollo.', timerSeconds: 60 },
        { step: 4, instruction: 'Corta el pollo en tiras diagonales y monta sobre la cama de quinoa y limón.', tip: 'Ralla un poco de piel de limón fresca al final.', timerSeconds: 30 }
      ],
      chefNotes: 'Un básico fitness infalible: 44g de proteína de máxima biodisponibilidad y digestión ligera.'
    },

    {
      id: 'tataki-atun-sesamo-edamame',
      title: 'Tataki de Atún con Costra de Sésamo y Edamame',
      subtitle: 'Lomo de atún fresco sellado 45 segundos, marinado en tamari con edamame al vapor',
      description: 'Lomo de atún de calidad sashimi con costra crujiente de sésamo bicolor y corazón rojo templado, acompañado de edamame y aliño de soja con jengibre.',
      category: 'cena',
      prepTime: 10,
      cookTime: 5,
      servings: 1,
      difficulty: 'Medio',
      calories: 520,
      protein: 48,
      carbs: 22,
      fat: 24,
      co2Saved: 2.2,
      moneySaved: 22.00,
      image: 'assets/images/recipe_tuna_tataki.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Omega 3', 'Gourmet', 'Keto'],
      ingredients: [
        { id: 'atun_fresco', name: 'Lomo de atún fresco', amount: '200', unit: 'g', isOptional: false },
        { id: 'sesamo', name: 'Semillas de sésamo tostado', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'edamame', name: 'Edamame al vapor', amount: '100', unit: 'g', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja tamari', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'limon', name: 'Zumo de lima o limón', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'aceite_oliva', name: 'Aceite de oliva virgen extra', amount: '5', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente muy caliente', 'Cuchillo bien afilado'],
      steps: [
        { step: 1, instruction: 'Pasa el lomo de atún por la salsa de soja y rebózalo firmemente en las semillas de sésamo.', tip: 'Presiona con las manos para que las semillas queden bien adheridas.', timerSeconds: 120 },
        { step: 2, instruction: 'Calienta la sartén a fuego máximo con 1 cucharadita de aceite. Sella el atún exactamente 45 segundos por lado.', tip: 'El interior debe quedar crudo y jugoso; no sobrecocines el atún.', timerSeconds: 180 },
        { step: 3, instruction: 'Retira a una tabla y deja reposar 2 minutos antes de cortar en láminas de 1 cm con cuchillo afilado.', tip: 'Corta en un solo movimiento fluido sin aserrar.', timerSeconds: 120 },
        { step: 4, instruction: 'Sirve junto al edamame desgranado y rocía con unas gotas de lima y soja.', tip: 'Añade escamas de sal marina sobre cada corte.', timerSeconds: 30 }
      ],
      chefNotes: 'Casi 50g de proteína pura con grasas saludables antiinflamatorias y textura de restaurante japonés.'
    },

    {
      id: 'tortilla-claras-pavo-feta',
      title: 'Tortilla Atlética de Claras, Pavo Braseado y Feta',
      subtitle: 'Tortilla esponjosa alta en proteína con pechuga de pavo, espinacas y queso feta',
      description: 'La reina de los desayunos y cenas proteicas. Claras batidas aireadas combinadas con dados de pavo braseado, espinacas salteadas y el toque salino del queso feta.',
      category: 'desayuno',
      prepTime: 5,
      cookTime: 8,
      servings: 1,
      difficulty: 'Fácil',
      calories: 330,
      protein: 41,
      carbs: 6,
      fat: 14,
      co2Saved: 1.4,
      moneySaved: 9.00,
      image: 'assets/images/recipe_tortilla_claras_pavo.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Fitness', 'Keto', 'Express 15min'],
      ingredients: [
        { id: 'claras_huevo', name: 'Claras de huevo', amount: '200', unit: 'ml', isOptional: false },
        { id: 'huevos', name: 'Huevo entero de campo', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'pavo_pechuga', name: 'Pechuga de pavo en dados', amount: '80', unit: 'g', isOptional: false },
        { id: 'espinacas', name: 'Espinacas tiernas', amount: '40', unit: 'g', isOptional: false },
        { id: 'queso_feta', name: 'Queso feta desmenuzado', amount: '25', unit: 'g', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '5', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente mediana', 'Espátula de silicona'],
      steps: [
        { step: 1, instruction: 'Bate las claras con el huevo entero, sal y pimienta hasta que hagan espuma superficial.', tip: 'El huevo entero aporta colina y emulsiona las claras para que no queden secas.', timerSeconds: 60 },
        { step: 2, instruction: 'Saltea el pavo en dados y las espinacas en la sartén caliente con unas gotas de AOVE durante 2 minutos.', tip: 'Deja que el pavo dore ligeramente para ganar sabor.', timerSeconds: 120 },
        { step: 3, instruction: 'Vierte las claras batidas y cocina a fuego medio-bajo, moviendo suavemente los bordes hacia el centro.', tip: 'Tapa 2 minutos para que cuaje de forma uniforme sin quemarse abajo.', timerSeconds: 180 },
        { step: 4, instruction: 'Espolvorea el queso feta, dobla la tortilla por la mitad y sirve caliente.', tip: 'Decora con perejil fresco o copos de pimentón.', timerSeconds: 30 }
      ],
      chefNotes: 'Más de 40g de proteína con solo 330 calorías y prácticamente cero carbohidratos simples.'
    },

    {
      id: 'power-bowl-cottage-frutos-rojos',
      title: 'Power Bowl de Queso Cottage, Frutos Rojos y Chía',
      subtitle: 'Crema sedosa de requesón/cottage 0% con arándanos, avena y crema de cacahuete',
      description: 'Desayuno o snack anabólico de digestión sostenida gracias a la caseína del queso cottage y los antioxidantes naturales de los frutos rojos del bosque.',
      category: 'desayuno',
      prepTime: 4,
      cookTime: 0,
      servings: 1,
      difficulty: 'Fácil',
      calories: 390,
      protein: 36,
      carbs: 34,
      fat: 12,
      co2Saved: 1.1,
      moneySaved: 7.50,
      image: 'assets/images/recipe_cottage_bowl.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Express 15min', 'Vegetariano', 'Desayuno'],
      ingredients: [
        { id: 'queso_cottage', name: 'Queso Cottage o Requesón 0%', amount: '220', unit: 'g', isOptional: false },
        { id: 'frutos_rojos', name: 'Fresas y arándanos frescos', amount: '80', unit: 'g', isOptional: false },
        { id: 'avena', name: 'Copos de avena integral', amount: '25', unit: 'g', isOptional: false },
        { id: 'crema_cacahuete', name: 'Crema de cacahuete pura', amount: '15', unit: 'g', isOptional: false },
        { id: 'semillas_chia', name: 'Semillas de chía / cáñamo', amount: '1', unit: 'cucharadita', isOptional: true },
        { id: 'miel', name: 'Hilo de miel de azahar', amount: '1', unit: 'cucharadita', isOptional: true }
      ],
      equipment: ['Bol hondo', 'Cuchara'],
      steps: [
        { step: 1, instruction: 'Coloca el queso cottage en el bol y bátelo ligeramente con una cuchara o varilla para una textura más cremosa.', tip: 'Si lo trituras en batidora 10 segundos queda con textura de mousse.', timerSeconds: 60 },
        { step: 2, instruction: 'Añade los copos de avena en un lateral del bol.', tip: 'Puedes tostar la avena en una sartén seca 2 minutos para un toque crunchy.', timerSeconds: 60 },
        { step: 3, instruction: 'Corona con los frutos rojos frescos lavados y las semillas de chía.', tip: 'Aporta fibra soluble y micronutrientes esenciales.', timerSeconds: 45 },
        { step: 4, instruction: 'Dibuja un hilo fino de crema de cacahuete y miel por encima.', tip: 'Listo en menos de 4 minutos sin ensuciar fogones.', timerSeconds: 30 }
      ],
      chefNotes: 'La caseína del queso cottage proporciona una liberación sostenida de aminoácidos durante 4 a 6 horas.'
    },

    {
      id: 'wok-ternera-brocoli-anacardos',
      title: 'Wok de Ternera Magra, Brócoli y Salsa de Soja',
      subtitle: 'Tiras de ternera salteadas a fuego vivo con brócoli crujiente, ajo y sésamo',
      description: 'Salteado estilo cantón con tiras de ternera magra marinadas, ramilletes de brócoli al dente y una reducción umami de soja, jengibre y semillas de sésamo.',
      category: 'almuerzo',
      prepTime: 10,
      cookTime: 8,
      servings: 1,
      difficulty: 'Fácil',
      calories: 470,
      protein: 46,
      carbs: 18,
      fat: 22,
      co2Saved: 1.7,
      moneySaved: 16.50,
      image: 'assets/images/recipe_wok_ternera_brocoli.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Fitness', 'Express 15min'],
      ingredients: [
        { id: 'ternera_picada', name: 'Ternera magra en tiras', amount: '200', unit: 'g', isOptional: false },
        { id: 'brocoli', name: 'Brócoli en ramilletes pequeños', amount: '150', unit: 'g', isOptional: false },
        { id: 'cebolla', name: 'Cebolla en juliana', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'ajo', name: 'Diente de ajo laminado', amount: '2', unit: 'dientes', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja tamari', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'sesamo', name: 'Semillas de sésamo', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Wok o sartén honda de fondo grueso'],
      steps: [
        { step: 1, instruction: 'Corta la ternera en tiras finas contra la veta y marínala con 1 cucharada de soja y ajo picado.', tip: 'Cortar contra la veta garantiza máxima ternura al masticar.', timerSeconds: 180 },
        { step: 2, instruction: 'Calienta el wok al máximo con AOVE y saltea la ternera a fuego abrasador durante 2 minutos hasta que dore.', tip: 'Retira la carne a un plato para no sobrecocinarla.', timerSeconds: 120 },
        { step: 3, instruction: 'En el mismo wok, añade el brócoli y la cebolla con 2 cucharadas de agua. Tapa 3 minutos para que se cocine al vapor.', tip: 'El brócoli debe quedar de color verde esmeralda brillante y crujiente.', timerSeconds: 180 },
        { step: 4, instruction: 'Devuelve la carne al wok con el resto de la salsa de soja, mezcla 1 minuto y sirve con sésamo tostado.', tip: 'Sabor de restaurante asiático con 46g de proteína limpia.', timerSeconds: 60 }
      ],
      chefNotes: 'Rica en hierro hemo de alta absorción y zinc, fundamental para la recuperación muscular y energía.'
    },

    {
      id: 'salmon-horno-costra-parmesano',
      title: 'Lomo de Salmón con Costra Crujiente de Parmesano',
      subtitle: 'Salmón asado al horno con costra dorada de parmesano, ajo y espárragos verdes',
      description: 'Una técnica gourmet sencilla: el queso parmesano rallado crea una costra salina y crocante que sella la humedad natural del salmón mientras los espárragos se caramelizan.',
      category: 'cena',
      prepTime: 8,
      cookTime: 14,
      servings: 1,
      difficulty: 'Fácil',
      calories: 560,
      protein: 43,
      carbs: 8,
      fat: 38,
      co2Saved: 2.0,
      moneySaved: 17.50,
      image: 'assets/images/recipe_salmon_costra_parmesano.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Keto', 'Omega 3', 'Gourmet'],
      ingredients: [
        { id: 'salmon', name: 'Lomo de salmón fresco', amount: '220', unit: 'g', isOptional: false },
        { id: 'parmesano', name: 'Parmesano Reggiano rallado fino', amount: '35', unit: 'g', isOptional: false },
        { id: 'esparragos', name: 'Espárragos verdes trigueros', amount: '120', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Ajo en polvo o picado', amount: '1', unit: 'diente', isOptional: false },
        { id: 'limon', name: 'Zumo de limón', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Bandeja de horno con papel vegetal'],
      steps: [
        { step: 1, instruction: 'Precalienta el horno a 200°C. Coloca los espárragos en la bandeja con sal y unas gotas de AOVE.', tip: 'Corta la parte leñosa inferior de los espárragos partiéndolos con la mano.', timerSeconds: 120 },
        { step: 2, instruction: 'Coloca el lomo de salmón al lado y cúbrelo por encima con el parmesano rallado y el ajo en polvo.', tip: 'Presiona el queso con los dedos para formar una capa compacta.', timerSeconds: 60 },
        { step: 3, instruction: 'Hornea durante 12-14 minutos hasta que el parmesano esté dorado y burbujeante.', tip: 'Pon el grill los últimos 2 minutos si buscas mayor toque crujiente.', timerSeconds: 780 },
        { step: 4, instruction: 'Emplata con los espárragos tiernos y rocía con zumo de limón fresco.', tip: 'La combinación de ácido y parmesano eleva el plato.', timerSeconds: 30 }
      ],
      chefNotes: 'Excelente aporte de ácidos grasos EPA/DHA y calcio de alta biodisponibilidad.'
    },

    {
      id: 'tofu-crujiente-curry-edamame',
      title: 'Tofu Extra Crujiente en Curry Rojo y Edamame',
      subtitle: 'Dados de tofu dorado al pimentón y jengibre sobre salsa aromática de curry y edamame',
      description: 'Demuestra que la proteína vegetal puede ser crujiente y profunda. Dados de tofu prensado horneados hasta quedar crocantes, sumergidos en curry de coco ligero.',
      category: 'almuerzo',
      prepTime: 12,
      cookTime: 15,
      servings: 1,
      difficulty: 'Fácil',
      calories: 440,
      protein: 34,
      carbs: 26,
      fat: 22,
      co2Saved: 2.5,
      moneySaved: 12.00,
      image: 'assets/images/recipe_tofu_curry_edamame.jpg',
      tags: ['Rico en Proteína', 'Vegano', 'High Protein', 'Proteína Vegetal'],
      ingredients: [
        { id: 'tofu', name: 'Tofu firme bio prensado', amount: '220', unit: 'g', isOptional: false },
        { id: 'edamame', name: 'Edamame cocido', amount: '80', unit: 'g', isOptional: false },
        { id: 'tomate', name: 'Tomate triturado', amount: '100', unit: 'g', isOptional: false },
        { id: 'espinacas', name: 'Espinacas frescas', amount: '40', unit: 'g', isOptional: false },
        { id: 'paprika', name: 'Pimentón y curry en polvo', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja tamari', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente', 'Prensa de tofu o papel de cocina'],
      steps: [
        { step: 1, instruction: 'Seca el tofu con papel absorbente, córtalo en cubos y mézclalo con soja y pimentón.', tip: 'Cuanta menos agua tenga el tofu, más crujiente quedará la costra.', timerSeconds: 180 },
        { step: 2, instruction: 'Dora los cubos de tofu en sartén caliente con AOVE durante 7 minutos girándolos hasta que suenen crujientes.', tip: 'No los amontones en la sartén para que no se cuezan.', timerSeconds: 420 },
        { step: 3, instruction: 'En un cazo, calienta el tomate triturado con curry y añade el edamame y las espinacas 3 minutos.', tip: 'La salsa debe quedar espesa y aromática.', timerSeconds: 180 },
        { step: 4, instruction: 'Vierte la salsa en la base del plato y coloca los dados de tofu crujiente encima para mantener el crunch.', tip: 'Decora con cilantro fresco.', timerSeconds: 60 }
      ],
      chefNotes: '34g de proteína vegetal completa con todos los aminoácidos esenciales y muy baja huella de carbono.'
    },

    {
      id: 'gambas-ajillo-arroz-basmati',
      title: 'Salteado Proteico de Gambas al Ajillo con Arroz',
      subtitle: 'Gambas jugosas salteadas con ajo laminado, guindilla y arroz jazmín al perejil',
      description: 'Clásico de la taberna española adaptado para nutrición de alto rendimiento: proteína de mar pura con digestión ultra rápida y carbohidratos limpios de reposición.',
      category: 'cena',
      prepTime: 6,
      cookTime: 6,
      servings: 1,
      difficulty: 'Fácil',
      calories: 430,
      protein: 39,
      carbs: 45,
      fat: 10,
      co2Saved: 1.5,
      moneySaved: 15.00,
      image: 'assets/images/recipe_gambas_al_ajillo.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Express 15min', 'Bajo en Grasa'],
      ingredients: [
        { id: 'gambas', name: 'Gambas o langostinos pelados', amount: '220', unit: 'g', isOptional: false },
        { id: 'arroz_jazmin', name: 'Arroz jazmín cocido', amount: '140', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Dientes de ajo laminados', amount: '3', unit: 'dientes', isOptional: false },
        { id: 'perejil', name: 'Perejil fresco picado', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'paprika', name: 'Pimentón dulce y copos de chile', amount: '1/2', unit: 'cucharadita', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '12', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén mediana o cazuela de barro'],
      steps: [
        { step: 1, instruction: 'En una sartén a fuego medio, dora los ajos laminados en el AOVE hasta que empiecen a bailar.', tip: 'No dejes que el ajo se queme para evitar sabor amargo.', timerSeconds: 120 },
        { step: 2, instruction: 'Sube el fuego a máximo y añade las gambas con una pizca de pimentón y sal. Saltea 2 minutos.', tip: 'Las gambas están listas en cuanto cambian a color rosa opaco.', timerSeconds: 120 },
        { step: 3, instruction: 'Espolvorea abundante perejil fresco picado y retira del fuego inmediatamente.', tip: 'El calor residual terminará de cocinarlas manteniéndolas tiernas.', timerSeconds: 30 },
        { step: 4, instruction: 'Sirve sobre la base de arroz jazmín templado, vertiendo el aceite aromatizado por encima.', tip: 'El arroz absorberá todo el jugo de ajo y marisco.', timerSeconds: 30 }
      ],
      chefNotes: '39g de proteína magra con menos de 10g de grasa. Cena post-entrenamiento perfecta.'
    },

    {
      id: 'pancakes-avena-claras-platano',
      title: 'Tortitas Proteicas de Avena, Claras y Plátano',
      subtitle: 'Pancakes esponjosos con harina de avena, claras batidas, canela y crema de cacahuete',
      description: 'El desayuno fitness legendario que sabe a postre de pastelería. Textura esponjosa sin azúcares añadidos ni harinas refinadas.',
      category: 'desayuno',
      prepTime: 5,
      cookTime: 6,
      servings: 1,
      difficulty: 'Fácil',
      calories: 420,
      protein: 35,
      carbs: 48,
      fat: 9,
      co2Saved: 1.2,
      moneySaved: 8.00,
      image: 'assets/images/recipe_protein_pancakes.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Desayuno', 'Fitness', 'Vegetariano'],
      ingredients: [
        { id: 'claras_huevo', name: 'Claras de huevo', amount: '180', unit: 'ml', isOptional: false },
        { id: 'avena', name: 'Copos de avena triturados', amount: '45', unit: 'g', isOptional: false },
        { id: 'platano', name: 'Plátano maduro', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'crema_cacahuete', name: 'Crema de cacahuete pura', amount: '15', unit: 'g', isOptional: false },
        { id: 'miel', name: 'Miel de azahar', amount: '1', unit: 'cucharadita', isOptional: true }
      ],
      equipment: ['Batidora de mano o vaso', 'Sartén antiadherente plana'],
      steps: [
        { step: 1, instruction: 'Tritura en batidora las claras con la avena, el medio plátano y una pizca de canela hasta que haga espuma.', tip: 'Dejar reposar la masa 2 minutos hace que espese ligeramente.', timerSeconds: 60 },
        { step: 2, instruction: 'Calienta la sartén antiadherente a fuego medio con una gota de aceite extendida con papel.', tip: 'Una temperatura constante evita que se quemen por fuera antes de cuajar.', timerSeconds: 60 },
        { step: 3, instruction: 'Vierte porciones de masa y cocina 2 minutos hasta que aparezcan burbujas en la superficie. Da la vuelta y cocina 1 minuto más.', tip: 'Gíralas con espátula fina de un solo movimiento.', timerSeconds: 180 },
        { step: 4, instruction: 'Apila las tortitas y corona con rodajas del plátano restante y la crema de cacahuete tibia.', tip: '35g de proteína lista para empezar el día.', timerSeconds: 30 }
      ],
      chefNotes: 'Puedes preparar el doble de masa y guardarla en la nevera en un shaker para cocinar tortitas frescas en 3 minutos cada mañana.'
    },

    {
      id: 'lomo-cerdo-mostaza-dijon-boniato',
      title: 'Medallones de Lomo de Cerdo a la Mostaza Dijon y Boniato',
      subtitle: 'Lomo extra tierno sellado a la plancha con salsa suave de mostaza y dados de batata asada',
      description: 'El lomo de cerdo es uno de los cortes más magros del mercado. Aquí se sella con costra dorada y se acompaña de mostaza de Dijon antigua y boniato caramelizado.',
      category: 'almuerzo',
      prepTime: 8,
      cookTime: 12,
      servings: 1,
      difficulty: 'Fácil',
      calories: 480,
      protein: 42,
      carbs: 38,
      fat: 16,
      co2Saved: 1.8,
      moneySaved: 12.50,
      image: 'assets/images/recipe_lomo_cerdo_mostaza.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Fitness', 'Económico'],
      ingredients: [
        { id: 'lomo_cerdo', name: 'Medallones de lomo de cerdo magro', amount: '200', unit: 'g', isOptional: false },
        { id: 'boniato', name: 'Boniato en dados cocido o asado', amount: '150', unit: 'g', isOptional: false },
        { id: 'yogur_griego', name: 'Yogur griego natural', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'ajo', name: 'Diente de ajo picado', amount: '1', unit: 'diente', isOptional: false },
        { id: 'perejil', name: 'Perejil fresco', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén pesada', 'Pinzas'],
      steps: [
        { step: 1, instruction: 'Salpimenta los medallones de lomo y séllalos en sartén muy caliente con AOVE 2.5 minutos por lado.', tip: 'No lo sobrecocines; el centro debe quedar ligeramente rosado y ultra jugoso.', timerSeconds: 300 },
        { step: 2, instruction: 'Retira la carne a un plato y en la misma sartén baja el fuego al mínimo.', tip: 'Aprovecharemos los jugos tostados de la base.', timerSeconds: 30 },
        { step: 3, instruction: 'Mezcla el yogur griego con una cucharadita de mostaza, ajo picado y 2 cucharadas de agua en la sartén para ligar la salsa.', tip: 'No dejes que hierva para que el yogur no se corte.', timerSeconds: 60 },
        { step: 4, instruction: 'Sirve los medallones con la salsa por encima y los dados de boniato asados espolvoreados con perejil.', tip: 'Un plato equilibrado y económico.', timerSeconds: 30 }
      ],
      chefNotes: 'El lomo de cerdo magro tiene un perfil lipídico comparable al de la pechuga de pollo con mayor contenido de vitamina B1 (tiamina).'
    },

    {
      id: 'ensalada-lentejas-atun-huevo',
      title: 'Ensalada Proteica de Lentejas, Atún Claro y Huevo Duro',
      subtitle: 'Lentejas cocidas, 2 latas de atún, huevo picado, tomates cherry y vinagreta de limón',
      description: 'El clásico de meal-prep imbatible: legumbres listas, atún en conserva y huevo cocido. Se prepara en 5 minutos sin fogones y mejora tras unas horas en la nevera.',
      category: 'almuerzo',
      prepTime: 6,
      cookTime: 0,
      servings: 1,
      difficulty: 'Fácil',
      calories: 460,
      protein: 45,
      carbs: 36,
      fat: 14,
      co2Saved: 2.1,
      moneySaved: 11.00,
      image: 'assets/images/recipe_ensalada_lentejas_atun.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Express 15min', 'Meal Prep', 'Económico'],
      ingredients: [
        { id: 'lentejas_cocidas', name: 'Lentejas cocidas escurridas', amount: '200', unit: 'g', isOptional: false },
        { id: 'atun_lata', name: 'Atún claro al natural o en aceite', amount: '2', unit: 'latas (120g)', isOptional: false },
        { id: 'huevos', name: 'Huevo cocido de campo', amount: '2', unit: 'unidades', isOptional: false },
        { id: 'tomates_cherry', name: 'Tomates cherry cortados en dos', amount: '80', unit: 'g', isOptional: false },
        { id: 'cebolla', name: 'Cebolla morada picada fina', amount: '1/4', unit: 'unidad', isOptional: true },
        { id: 'perejil', name: 'Perejil picado', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE y vinagre de manzana', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Bol espacioso', 'Cuchillo y tabla'],
      steps: [
        { step: 1, instruction: 'Enjuaga y escurre bien las lentejas cocidas en conserva y colócalas en el bol.', tip: 'Enjuagarlas elimina el exceso de sodio del líquido de gobierno.', timerSeconds: 60 },
        { step: 2, instruction: 'Añade el atún claro escurrido y desmigado junto a los tomates cherry en mitades y la cebolla picada.', tip: 'La cebolla morada aporta frescor y textura crujiente.', timerSeconds: 90 },
        { step: 3, instruction: 'Pela los huevos cocidos, pícalos en cuartos e incorpóralos al bol.', tip: 'Si tienes huevos cocidos ya preparados en la nevera tardas 3 minutos.', timerSeconds: 60 },
        { step: 4, instruction: 'Aliña con AOVE, vinagre de manzana, sal y perejil fresco. Mezcla con suavidad.', tip: 'Aguanta perfecta hasta 3 días en un táper hermético.', timerSeconds: 60 }
      ],
      chefNotes: '45g de proteína de absorción mixta (vegetal + animal) con alto contenido en fibra y saciedad prolongada.'
    },

    {
      id: 'pechuga-pavo-rellena-espinacas-mozzarella',
      title: 'Rollitos de Pavo Rellenos de Espinacas y Mozzarella',
      subtitle: 'Filetes de pavo rellenos de hojas verdes y queso fundido, sellados con ajo y tomillo',
      description: 'Una presentación sofisticada para un plato cotidiano. Filetes finos de pavo envueltos sobre un corazón de espinacas tiernas y mozzarella derretida.',
      category: 'cena',
      prepTime: 10,
      cookTime: 12,
      servings: 1,
      difficulty: 'Fácil',
      calories: 450,
      protein: 47,
      carbs: 6,
      fat: 24,
      co2Saved: 1.6,
      moneySaved: 14.00,
      image: 'assets/images/recipe_pavo_relleno_mozzarella.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Keto', 'Sin Gluten'],
      ingredients: [
        { id: 'pavo_pechuga', name: 'Filetes finos de pechuga de pavo', amount: '220', unit: 'g', isOptional: false },
        { id: 'espinacas', name: 'Espinacas frescas', amount: '60', unit: 'g', isOptional: false },
        { id: 'mozzarella', name: 'Mozzarella fresca en tiras', amount: '50', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Ajo picado', amount: '1', unit: 'diente', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén con tapa', 'Palillos de madera para fijar'],
      steps: [
        { step: 1, instruction: 'Extiende los filetes de pavo sobre una tabla, salpimenta y coloca encima las espinacas y tiras de mozzarella.', tip: 'No pongas demasiado relleno cerca de los extremos para poder enrollar bien.', timerSeconds: 180 },
        { step: 2, instruction: 'Enrolla los filetes firmemente y asegúralos con 1 o 2 palillos de madera.', tip: 'Los palillos evitan que el queso se escape antes de sellar.', timerSeconds: 120 },
        { step: 3, instruction: 'Dora los rollitos en sartén caliente con AOVE durante 3 minutos por cada lado.', tip: 'Tapa la sartén los últimos 4 minutos para que el queso funda completamente en el interior.', timerSeconds: 420 },
        { step: 4, instruction: 'Retira los palillos, corta los rollitos en medallones transversales y sirve.', tip: 'El queso fundido saldrá en hilos deliciosos.', timerSeconds: 60 }
      ],
      chefNotes: '47g de proteína de altísima pureza con sabor a cocina de domingo en una cena ligera entre semana.'
    },

    {
      id: 'tempeh-glaseado-tamari-sesamo',
      title: 'Tempeh Glaseado al Tamari con Sésamo y Judías',
      subtitle: 'Dados de tempeh fermentado salteados con glaseado umami de soja, jengibre y judías verdes',
      description: 'El tempeh es el rey indiscutible de la proteína vegetal fermentada, con más proteína y fibra que el tofu y un perfil digestivo enriquecido por la fermentación.',
      category: 'almuerzo',
      prepTime: 8,
      cookTime: 10,
      servings: 1,
      difficulty: 'Fácil',
      calories: 420,
      protein: 36,
      carbs: 22,
      fat: 20,
      co2Saved: 2.7,
      moneySaved: 11.50,
      image: 'assets/images/recipe_tempeh_tamari.jpg',
      tags: ['Rico en Proteína', 'Vegano', 'High Protein', 'Proteína Vegetal', 'Probiótico'],
      ingredients: [
        { id: 'tempeh', name: 'Tempeh de soja bio en dados', amount: '200', unit: 'g', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja tamari', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'miel', name: 'Miel o sirope de arce', amount: '1', unit: 'cucharadita', isOptional: false },
        { id: 'sesamo', name: 'Semillas de sésamo tostado', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'esparragos', name: 'Espárragos o judías verdes', amount: '100', unit: 'g', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente', 'Espátula'],
      steps: [
        { step: 1, instruction: 'Corta el tempeh en dados de 2 cm y mézclalo con la salsa de soja y miel.', tip: 'Si lo hierves 3 minutos antes en agua, absorberá el triple de marinada.', timerSeconds: 120 },
        { step: 2, instruction: 'Saltea el tempeh en sartén caliente con AOVE durante 6 minutos hasta que esté dorado y caramelizado.', tip: 'Mueve con frecuencia para que la miel no se queme.', timerSeconds: 360 },
        { step: 3, instruction: 'Añade los espárragos troceados y cocina 3 minutos más con 2 cucharadas de agua.', tip: 'Quedarán al dente y mantendrán su textura crujiente.', timerSeconds: 180 },
        { step: 4, instruction: 'Espolvorea con sésamo tostado y sirve caliente.', tip: 'Sabor umami profundo con 36g de proteína vegana.', timerSeconds: 30 }
      ],
      chefNotes: 'La fermentación tradicional del tempeh desactiva los fitatos de la soja, multiplicando la absorción de minerales.'
    },

    {
      id: 'bacalao-confitado-garbanzos-crujientes',
      title: 'Lomo de Bacalao con Garbanzos Crujientes y Pimientos',
      subtitle: 'Bacalao jugoso a la plancha con pimentón de la Vera y salteado de garbanzos dorados',
      description: 'Pescado blanco noble con 0% de grasa combinado con garbanzos tostados al pimentón. Una explosión de sabor tradicional con macros de competición.',
      category: 'cena',
      prepTime: 8,
      cookTime: 10,
      servings: 1,
      difficulty: 'Fácil',
      calories: 440,
      protein: 43,
      carbs: 32,
      fat: 14,
      co2Saved: 1.9,
      moneySaved: 16.00,
      image: 'assets/images/recipe_bacalao_garbanzos.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Bajo en Grasa', 'Gourmet'],
      ingredients: [
        { id: 'merluza_pescado', name: 'Lomo de bacalao o merluza desalado', amount: '220', unit: 'g', isOptional: false },
        { id: 'garbanzos_cocidos', name: 'Garbanzos cocidos escurridos', amount: '120', unit: 'g', isOptional: false },
        { id: 'pimiento_rojo', name: 'Pimiento rojo en tiras', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'ajo', name: 'Dientes de ajo laminados', amount: '2', unit: 'dientes', isOptional: false },
        { id: 'paprika', name: 'Pimentón de la Vera ahumado', amount: '1', unit: 'cucharadita', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén pesada', 'Espátula de pescado'],
      steps: [
        { step: 1, instruction: 'En una sartén con AOVE saltea los garbanzos con pimentón y sal durante 4 minutos hasta que suenen crujientes.', tip: 'Añade los pimientos rojos en tiras en los últimos 2 minutos.', timerSeconds: 240 },
        { step: 2, instruction: 'Retira los garbanzos y en la misma sartén cocina el lomo de bacalao por la piel durante 3.5 minutos.', tip: 'Presiona suavemente el lomo al inicio para que la piel quede plana y crujiente.', timerSeconds: 210 },
        { step: 3, instruction: 'Da la vuelta al bacalao y cocina 2 minutos más por el otro lado.', tip: 'Las lascas de bacalao deben separarse con solo presionar con un tenedor.', timerSeconds: 120 },
        { step: 4, instruction: 'Monta el bacalao sobre la cama de garbanzos crujientes y decora con perejil picado.', tip: 'Plato reconfortante con 43g de proteína.', timerSeconds: 30 }
      ],
      chefNotes: 'El bacalao es uno de los pescados con mayor ratio proteína/caloría del mundo: más de un 90% de sus calorías provienen de proteínas.'
    },

    {
      id: 'scramble-tofu-aguacate-tomates',
      title: 'Revuelto Vegano Proteico de Tofu, Cúrcuma y Aguacate',
      subtitle: 'Tofu desmenuzado con textura de huevo revuelto, tomates cherry asados y tostada',
      description: 'El desayuno vegano por excelencia: tofu desmigado sazonado con cúrcuma y sal negra del Himalaya para lograr la textura y aroma exactos del huevo revuelto gourmet.',
      category: 'desayuno',
      prepTime: 5,
      cookTime: 6,
      servings: 1,
      difficulty: 'Fácil',
      calories: 390,
      protein: 30,
      carbs: 24,
      fat: 20,
      co2Saved: 2.2,
      moneySaved: 8.50,
      image: 'assets/images/recipe_scramble_tofu.jpg',
      tags: ['Rico en Proteína', 'Vegano', 'High Protein', 'Desayuno', 'Sin Gluten'],
      ingredients: [
        { id: 'tofu', name: 'Tofu firme desmigado con las manos', amount: '220', unit: 'g', isOptional: false },
        { id: 'tomates_cherry', name: 'Tomates cherry cortados', amount: '80', unit: 'g', isOptional: false },
        { id: 'aguacate', name: 'Aguacate en láminas', amount: '1/3', unit: 'unidad', isOptional: false },
        { id: 'espinacas', name: 'Espinacas tiernas', amount: '30', unit: 'g', isOptional: false },
        { id: 'paprika', name: 'Cúrcuma y pimentón dulce', amount: '1', unit: 'cucharadita', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente', 'Tenedor'],
      steps: [
        { step: 1, instruction: 'Desmenuza el tofu con los dedos en trozos desiguales para imitar el huevo revuelto.', tip: 'No lo piques con cuchillo para conservar textura rústica.', timerSeconds: 60 },
        { step: 2, instruction: 'Saltea los tomates cherry y las espinacas en sartén con AOVE durante 2 minutos.', tip: 'Deja que los tomates empiecen a soltar su jugo.', timerSeconds: 120 },
        { step: 3, instruction: 'Añade el tofu desmenuzado, cúrcuma, pimentón, sal y 2 cucharadas de agua para darle jugosidad. Saltea 3 minutos.', tip: 'El agua emulsiona las especias tiñendo el tofu de amarillo dorado.', timerSeconds: 180 },
        { step: 4, instruction: 'Sirve en un plato templado y acompaña con láminas de aguacate cremoso.', tip: '30g de proteína 100% vegetal sin colesterol.', timerSeconds: 30 }
      ],
      chefNotes: 'Si utilizas sal negra Kala Namak conseguirás un aroma idéntico al del huevo fresco gracias a sus compuestos sulfurosos naturales.'
    },

    {
      id: 'hamburguesa-artesana-ternera-huevo',
      title: 'Hamburguesa Artesanal de Ternera al Plato con Huevo',
      subtitle: '200g de ternera magra a la plancha con queso parmesano derretido y huevo a la plancha',
      description: 'Olvida la comida rápida: carne de ternera picada al momento, sazonada con ajo y perejil, cocinada a la plancha y coronada con un huevo de yema líquida.',
      category: 'cena',
      prepTime: 6,
      cookTime: 8,
      servings: 1,
      difficulty: 'Fácil',
      calories: 510,
      protein: 50,
      carbs: 4,
      fat: 32,
      co2Saved: 1.3,
      moneySaved: 12.00,
      image: 'assets/images/recipe_beef_burger.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Keto', 'Express 15min'],
      ingredients: [
        { id: 'ternera_picada', name: 'Carne picada de ternera magra', amount: '200', unit: 'g', isOptional: false },
        { id: 'huevos', name: 'Huevo de campo', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'parmesano', name: 'Parmesano laminado o rallado', amount: '25', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Diente de ajo picado', amount: '1', unit: 'diente', isOptional: false },
        { id: 'perejil', name: 'Perejil picado', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '6', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén de hierro o grill', 'Espátula ancha'],
      steps: [
        { step: 1, instruction: 'Mezcla la carne picada con sal, pimienta, ajo y perejil picado. Forma una hamburguesa gruesa.', tip: 'Haz una pequeña hendidura en el centro con el pulgar para que no se abombe al cocinarse.', timerSeconds: 120 },
        { step: 2, instruction: 'Cocina la hamburguesa en sartén muy caliente con unas gotas de AOVE 3 minutos por lado.', tip: 'No la aplastes con la espátula para no perder sus jugos internos.', timerSeconds: 360 },
        { step: 3, instruction: 'Coloca el queso parmesano encima en el último minuto de cocción y cubre con una tapa para fundirlo.', tip: 'El calor fundirá el queso cubriendo la carne.', timerSeconds: 60 },
        { step: 4, instruction: 'En una esquina de la sartén fríe el huevo con la yema líquida y colócalo sobre la hamburguesa.', tip: '50g de proteína concentrada para máxima recuperación.', timerSeconds: 90 }
      ],
      chefNotes: '50g de proteína de valor biológico 100. Cena saciante perfecta para dietas bajas en carbohidratos o cetogénicas.'
    },

    {
      id: 'smoothie-bowl-quark-arandanos',
      title: 'Smoothie Bowl de Queso Fresco Batido y Arándanos',
      subtitle: 'Queso quark 0% batido con frutos rojos congelados, semillas de chía y crema de cacahuete',
      description: 'Una textura densa como helado artesanal lograda batiendo queso fresco batido con frutos rojos congelados. Rico en caseína y antioxidantes.',
      category: 'desayuno',
      prepTime: 4,
      cookTime: 0,
      servings: 1,
      difficulty: 'Fácil',
      calories: 360,
      protein: 38,
      carbs: 30,
      fat: 10,
      co2Saved: 1.0,
      moneySaved: 7.00,
      image: 'assets/images/recipe_smoothie_bowl_quark.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Express 15min', 'Vegetariano', 'Desayuno'],
      ingredients: [
        { id: 'queso_quark', name: 'Queso fresco batido 0% o Quark', amount: '250', unit: 'g', isOptional: false },
        { id: 'frutos_rojos', name: 'Arándanos y fresas congeladas', amount: '100', unit: 'g', isOptional: false },
        { id: 'avena', name: 'Copos de avena integral', amount: '20', unit: 'g', isOptional: false },
        { id: 'crema_cacahuete', name: 'Crema de cacahuete pura', amount: '12', unit: 'g', isOptional: false },
        { id: 'semillas_chia', name: 'Semillas de chía', amount: '1', unit: 'cucharadita', isOptional: true }
      ],
      equipment: ['Batidora de vaso potente', 'Bol'],
      steps: [
        { step: 1, instruction: 'Añade en la batidora el queso fresco batido junto con los frutos rojos congelados.', tip: 'Los frutos congelados son la clave para obtener consistencia de helado cremoso.', timerSeconds: 60 },
        { step: 2, instruction: 'Bate a máxima potencia durante 45 segundos hasta obtener una crema violeta homogénea y densa.', tip: 'Si queda muy espesa añade 2 cucharadas de leche vegetal.', timerSeconds: 45 },
        { step: 3, instruction: 'Vierte en un bol y decora con la avena crujiente, semillas de chía y un hilo de crema de cacahuete.', tip: 'Come con cuchara disfrutando del frescor.', timerSeconds: 60 }
      ],
      chefNotes: '38g de proteína limpia con solo 360 kcal. Ideal para el verano o después de entrenar en días calurosos.'
    },

    {
      id: 'pollo-tikka-masala-express-yogur',
      title: 'Pechuga de Pollo Tikka Masala con Yogur Griego',
      subtitle: 'Dados de pechuga marinada en curry, jengibre y yogur griego con arroz jazmín',
      description: 'La versión saludable y ligera del clásico indio. El yogur griego aporta cremosidad sin necesidad de nata pesada mientras ablanda el pollo hasta deshacerse.',
      category: 'almuerzo',
      prepTime: 10,
      cookTime: 12,
      servings: 1,
      difficulty: 'Fácil',
      calories: 510,
      protein: 46,
      carbs: 48,
      fat: 14,
      co2Saved: 1.8,
      moneySaved: 15.00,
      image: 'assets/images/recipe_pollo_tikka_masala.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Gourmet', 'Fitness'],
      ingredients: [
        { id: 'pollo_pechuga', name: 'Pechuga de pollo en dados', amount: '200', unit: 'g', isOptional: false },
        { id: 'yogur_griego', name: 'Yogur griego natural', amount: '100', unit: 'g', isOptional: false },
        { id: 'tomate', name: 'Tomate triturado', amount: '100', unit: 'g', isOptional: false },
        { id: 'arroz_jazmin', name: 'Arroz jazmín cocido', amount: '120', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Dientes de ajo y jengibre', amount: '2', unit: 'dientes', isOptional: false },
        { id: 'paprika', name: 'Curry garam masala y pimentón', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Cazuela o sartén honda'],
      steps: [
        { step: 1, instruction: 'Mezcla los dados de pollo con la mitad del yogur griego, especias, ajo picado y sal. Deja reposar 5 minutos.', tip: 'El ácido láctico del yogur ablanda el pollo de forma prodigiosa.', timerSeconds: 300 },
        { step: 2, instruction: 'Dora el pollo marinado en la cazuela con AOVE a fuego vivo durante 5 minutos.', tip: 'El yogur formará una costra dorada muy sabrosa.', timerSeconds: 300 },
        { step: 3, instruction: 'Añade el tomate triturado y cocina a fuego medio 5 minutos hasta que reduzca la salsa.', tip: 'Si está ácido añade una pizca de miel.', timerSeconds: 300 },
        { step: 4, instruction: 'Apaga el fuego, incorpora el resto del yogur griego para crear la salsa cremosa y sirve con arroz jazmín.', tip: 'Decora con cilantro fresco.', timerSeconds: 60 }
      ],
      chefNotes: '46g de proteína de alta calidad con especias termogénicas como cúrcuma y jengibre.'
    },

    {
      id: 'bowl-quinoa-edamame-salmon-ahumado',
      title: 'Bowl Proteico Nórdico de Quinoa, Salmón y Huevo Poché',
      subtitle: 'Quinoa tricolor, dados de salmón sellado, edamame al vapor y huevo escalfado fluido',
      description: 'Combinación equilibrada de grasas Omega-3 del salmón, aminoácidos completos de la quinoa y el edamame, coronado con un huevo fluido.',
      category: 'almuerzo',
      prepTime: 8,
      cookTime: 8,
      servings: 1,
      difficulty: 'Fácil',
      calories: 540,
      protein: 43,
      carbs: 38,
      fat: 24,
      co2Saved: 2.1,
      moneySaved: 18.00,
      image: 'assets/images/recipe_quinoa_salmon_edamame.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Omega 3', 'Gourmet'],
      ingredients: [
        { id: 'salmon', name: 'Lomo de salmón en dados', amount: '160', unit: 'g', isOptional: false },
        { id: 'huevos', name: 'Huevo fresco', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'quinoa', name: 'Quinoa cocida', amount: '120', unit: 'g', isOptional: false },
        { id: 'edamame', name: 'Edamame desgranado', amount: '80', unit: 'g', isOptional: false },
        { id: 'espinacas', name: 'Espinacas tiernas', amount: '30', unit: 'g', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'sesamo', name: 'Sésamo tostado', amount: '1', unit: 'cucharadita', isOptional: true }
      ],
      equipment: ['Sartén pequeña', 'Cazo para escalfar'],
      steps: [
        { step: 1, instruction: 'Sella los dados de salmón en sartén caliente con soja durante 2.5 minutos dejando el centro jugoso.', tip: 'No lo muevas durante el primer minuto para una costra caramelizada.', timerSeconds: 150 },
        { step: 2, instruction: 'Escalfa el huevo en agua hirviendo suave con vinagre durante 3 minutos.', tip: 'La yema líquida servirá de aderezo natural para la quinoa.', timerSeconds: 180 },
        { step: 3, instruction: 'Dispone en el bol la quinoa templada, las espinacas y el edamame al vapor.', tip: 'El calor de la quinoa ablandará suavemente las espinacas.', timerSeconds: 60 },
        { step: 4, instruction: 'Coloca el salmón sellado y el huevo poché en el centro. Espolvorea con sésamo.', tip: 'Abre la yema sobre el bowl al comer.', timerSeconds: 30 }
      ],
      chefNotes: '43g de proteína y más de 2.500 mg de ácidos grasos Omega-3 por ración.'
    },

    {
      id: 'revuelto-gambas-claras-esparragos',
      title: 'Revuelto Atlántico de Gambas, Claras y Espárragos',
      subtitle: 'Gambas salteadas al ajillo con claras cuajadas suavemente y puntas de espárrago',
      description: 'Una cena proteica ultra digestiva de menos de 300 kcal con 38g de proteína. Ideal para la última comida del día antes de dormir.',
      category: 'cena',
      prepTime: 5,
      cookTime: 6,
      servings: 1,
      difficulty: 'Fácil',
      calories: 290,
      protein: 38,
      carbs: 6,
      fat: 11,
      co2Saved: 1.5,
      moneySaved: 13.00,
      image: 'assets/images/recipe_revuelto_gambas_esparragos.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Bajo en Grasa', 'Express 15min', 'Keto'],
      ingredients: [
        { id: 'gambas', name: 'Gambas peladas', amount: '160', unit: 'g', isOptional: false },
        { id: 'claras_huevo', name: 'Claras de huevo', amount: '160', unit: 'ml', isOptional: false },
        { id: 'huevos', name: 'Huevo entero', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'esparragos', name: 'Espárragos trigueros en rodajas', amount: '80', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Diente de ajo laminado', amount: '1', unit: 'diente', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '6', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente', 'Espátula de silicona'],
      steps: [
        { step: 1, instruction: 'Saltea el ajo laminado y los espárragos troceados en sartén caliente con AOVE durante 3 minutos.', tip: 'Corta los espárragos en rodajas finas para que se cocinen rápido.', timerSeconds: 180 },
        { step: 2, instruction: 'Añade las gambas peladas y saltea 1.5 minutos hasta que tomen color rosa.', tip: 'No dejes que se sequen.', timerSeconds: 90 },
        { step: 3, instruction: 'Bate las claras con el huevo entero y viértelas en la sartén a fuego medio-bajo.', tip: 'Remueve lentamente con espátula formando pliegues cremosos.', timerSeconds: 120 },
        { step: 4, instruction: 'Retira del fuego cuando el huevo esté aún jugoso y brillante.', tip: 'Termina con pimienta negra recién molida.', timerSeconds: 30 }
      ],
      chefNotes: 'Cena ligera con digestión en menos de 90 minutos para favorecer el descanso profundo.'
    },

    {
      id: 'pasta-proteica-bolognesa-ternera',
      title: 'Fettuccine con Boloñesa Magra de Ternera y Parmesano',
      subtitle: 'Pasta con salsa boloñesa casera reducida de ternera magra, tomate y parmesano',
      description: 'El clásico italiano transformado en combustible muscular. Salsa boloñesa casera con ternera magra al 95%, cocinada a fuego lento con tomate maduro y hierbas.',
      category: 'almuerzo',
      prepTime: 10,
      cookTime: 15,
      servings: 1,
      difficulty: 'Fácil',
      calories: 530,
      protein: 44,
      carbs: 58,
      fat: 14,
      co2Saved: 1.7,
      moneySaved: 14.00,
      image: 'assets/images/recipe_pasta_bolognesa_ternera.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Gourmet', 'Comfort Food'],
      ingredients: [
        { id: 'pasta_fettuccine', name: 'Pasta Fettuccine', amount: '80', unit: 'g', isOptional: false },
        { id: 'ternera_picada', name: 'Ternera magra picada', amount: '180', unit: 'g', isOptional: false },
        { id: 'tomate', name: 'Tomate triturado', amount: '150', unit: 'g', isOptional: false },
        { id: 'cebolla', name: 'Cebolla picada fina', amount: '1/4', unit: 'unidad', isOptional: false },
        { id: 'ajo', name: 'Diente de ajo', amount: '1', unit: 'diente', isOptional: false },
        { id: 'parmesano', name: 'Parmesano rallado', amount: '20', unit: 'g', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Olla para pasta', 'Sartén honda para salsa'],
      steps: [
        { step: 1, instruction: 'Hierve la pasta en agua con sal durante 8 minutos hasta que esté al dente.', tip: 'Guarda 3 cucharadas de agua de cocción.', timerSeconds: 480 },
        { step: 2, instruction: 'En la sartén sofríe la cebolla y el ajo con AOVE 2 minutos. Añade la carne picada y dora a fuego vivo 4 minutos.', tip: 'Rompe la carne con la cuchara para que quede suelta y dorada.', timerSeconds: 240 },
        { step: 3, instruction: 'Añade el tomate triturado, orégano y sal. Cocina 6 minutos a fuego medio hasta espesar.', tip: 'Añade el agua de cocción para emulsionar la salsa.', timerSeconds: 360 },
        { step: 4, instruction: 'Mezcla la pasta con la salsa boloñesa y sirve coronada con el parmesano rallado.', tip: '44g de proteína con sabor de trattoria italiana.', timerSeconds: 60 }
      ],
      chefNotes: 'Comida ideal antes o después de sesiones exigentes de fuerza o resistencia.'
    },

    {
      id: 'muffins-salados-huevo-pavo-calabacin',
      title: 'Muffins Horneados de Claras, Pavo y Calabacín',
      subtitle: 'Bocados proteicos horneados con dados de pechuga de pavo, calabacín y queso feta',
      description: 'La solución perfecta para meal prep semanal. Bocados salados esponjosos horneados que se conservan 4 días en la nevera listos para comer fríos o calientes.',
      category: 'desayuno',
      prepTime: 8,
      cookTime: 18,
      servings: 2,
      difficulty: 'Fácil',
      calories: 310,
      protein: 34,
      carbs: 8,
      fat: 15,
      co2Saved: 1.4,
      moneySaved: 9.50,
      image: 'assets/images/recipe_muffins_pavo_calabacin.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Meal Prep', 'Keto', 'Sin Gluten'],
      ingredients: [
        { id: 'claras_huevo', name: 'Claras de huevo', amount: '250', unit: 'ml', isOptional: false },
        { id: 'huevos', name: 'Huevos enteros', amount: '2', unit: 'unidades', isOptional: false },
        { id: 'pavo_pechuga', name: 'Pechuga de pavo en dados pequeños', amount: '120', unit: 'g', isOptional: false },
        { id: 'calabacin', name: 'Calabacín rallado y escurrido', amount: '100', unit: 'g', isOptional: false },
        { id: 'queso_feta', name: 'Queso feta desmenuzado', amount: '40', unit: 'g', isOptional: false },
        { id: 'paprika', name: 'Pimentón y pimienta negra', amount: '1/2', unit: 'cucharadita', isOptional: false }
      ],
      equipment: ['Molde de muffins para horno', 'Bol para mezclar'],
      steps: [
        { step: 1, instruction: 'Precalienta el horno a 190°C. Ralla el calabacín y apriétalo con las manos para eliminar el exceso de agua.', tip: 'Escurrir el calabacín evita que los muffins queden blandos.', timerSeconds: 180 },
        { step: 2, instruction: 'Bate las claras con los 2 huevos enteros, sal, pimienta y pimentón.', tip: 'Bate hasta que esté homogéneo.', timerSeconds: 60 },
        { step: 3, instruction: 'Reparte en el molde de muffins el pavo, calabacín y queso feta. Vierte la mezcla de huevo encima.', tip: 'Llena hasta 3/4 de cada hueco para que no se desborden al crecer.', timerSeconds: 120 },
        { step: 4, instruction: 'Hornea durante 16-18 minutos hasta que estén dorados y firmes al tacto.', tip: 'Desmolda y disfruta al momento o guárdalos en la nevera.', timerSeconds: 1080 }
      ],
      chefNotes: 'Salen 6 muffins (3 por ración). Cada ración aporta 34g de proteína limpia.'
    },

    {
      id: 'curry-garbanzos-pollo-espinacas',
      title: 'Curry Rápido de Pollo, Garbanzos y Espinacas',
      subtitle: 'Guiso aromático de pechuga de pollo dorada con garbanzos en salsa de curry y yogur',
      description: 'Doble fuente de proteína (animal + legumbre) en un guiso reconfortante especiado de inspiración asiática listo en menos de 15 minutos.',
      category: 'almuerzo',
      prepTime: 8,
      cookTime: 12,
      servings: 1,
      difficulty: 'Fácil',
      calories: 510,
      protein: 48,
      carbs: 42,
      fat: 14,
      co2Saved: 2.3,
      moneySaved: 13.50,
      image: 'assets/images/recipe_curry_pollo_garbanzos.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Fitness', 'Cero Desperdicio'],
      ingredients: [
        { id: 'pollo_pechuga', name: 'Pechuga de pollo en dados', amount: '180', unit: 'g', isOptional: false },
        { id: 'garbanzos_cocidos', name: 'Garbanzos cocidos en tarro', amount: '120', unit: 'g', isOptional: false },
        { id: 'espinacas', name: 'Espinacas frescas', amount: '50', unit: 'g', isOptional: false },
        { id: 'tomate', name: 'Tomate triturado', amount: '100', unit: 'g', isOptional: false },
        { id: 'yogur_griego', name: 'Yogur griego', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'paprika', name: 'Curry y comino', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Cazuela mediana', 'Cuchara'],
      steps: [
        { step: 1, instruction: 'Dora los dados de pollo en cazuela caliente con AOVE y curry durante 4 minutos.', tip: 'Tostar las especias con el aceite libera sus aromas.', timerSeconds: 240 },
        { step: 2, instruction: 'Añade el tomate triturado y los garbanzos escurridos. Cocina 5 minutos a fuego medio.', tip: 'Los garbanzos absorberán el sabor especiado de la salsa.', timerSeconds: 300 },
        { step: 3, instruction: 'Añade las espinacas frescas y deja que reduzcan durante 2 minutos.', tip: 'Mantendrán su textura y color vibrante.', timerSeconds: 120 },
        { step: 4, instruction: 'Apaga el fuego, incorpora el yogur griego para una salsa suave y sirve.', tip: '48g de proteína total.', timerSeconds: 30 }
      ],
      chefNotes: 'La combinación de pollo y garbanzos asegura un perfil de aminoácidos supremo y digestión prolongada.'
    },

    {
      id: 'ceviche-pescado-blanco-aguacate-lima',
      title: 'Ceviche Fresco de Pescado Blanco y Aguacate',
      subtitle: 'Lomo de pescado blanco macerado en zumo de lima, cebolla morada, cilantro y chile',
      description: 'El milagro de la cocina peruana: el ácido cítrico cocina en frío las proteínas del pescado blanco manteniéndolas tiernas y frescas, acompañado de aguacate cremoso.',
      category: 'cena',
      prepTime: 12,
      cookTime: 0,
      servings: 1,
      difficulty: 'Fácil',
      calories: 360,
      protein: 38,
      carbs: 12,
      fat: 18,
      co2Saved: 1.8,
      moneySaved: 19.00,
      image: 'assets/images/recipe_ceviche_pescado_aguacate.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Bajo en Calorías', 'Sin Gluten', 'Gourmet'],
      ingredients: [
        { id: 'merluza_pescado', name: 'Lomo de pescado blanco fresco en cubos', amount: '220', unit: 'g', isOptional: false },
        { id: 'limon', name: 'Zumo de 2 limas o limones', amount: '2', unit: 'unidades', isOptional: false },
        { id: 'aguacate', name: 'Aguacate en dados', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'cebolla', name: 'Cebolla morada en juliana fina', amount: '1/4', unit: 'unidad', isOptional: false },
        { id: 'cilantro', name: 'Cilantro fresco picado', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'radish', name: 'Rábano en láminas', amount: '2', unit: 'unidades', isOptional: true }
      ],
      equipment: ['Bol de cristal frío', 'Cuchillo bien afilado'],
      steps: [
        { step: 1, instruction: 'Corta el pescado fresco en cubos de 1.5 cm y colócalo en el bol de cristal frío.', tip: 'Mantén el pescado muy frío durante toda la preparación.', timerSeconds: 180 },
        { step: 2, instruction: 'Exprime las limas sobre el pescado asegurando que quede bien impregnado. Añade sal y deja reposar 5 minutos.', tip: 'Verás cómo el pescado cambia de transparente a blanco opaco por la desnaturalización ácida.', timerSeconds: 300 },
        { step: 3, instruction: 'Incorpora la cebolla morada en juliana fina, el cilantro picado y unas láminas de rábano.', tip: 'Pasa la cebolla por agua helada 1 minuto antes para quitarle bravura.', timerSeconds: 60 },
        { step: 4, instruction: 'Añade los dados de aguacate en el último momento y sirve de inmediato.', tip: 'Bebe la "leche de tigre" del fondo del plato.', timerSeconds: 30 }
      ],
      chefNotes: '38g de proteína pura sin encender un solo fogón y con digestión instantánea.'
    },

    {
      id: 'pudding-nocturno-chia-cacahuete-proteina',
      title: 'Overnight Chia Pudding Proteico de Cacahuete',
      subtitle: 'Semillas de chía hidratadas en leche con crema de cacahuete, yogur y plátano',
      description: 'El desayuno que se cocina solo mientras duermes. Las semillas de chía forman un gel rico en mucílago y Omega-3 vegetal al mezclarse con yogur proteico y crema de cacahuete.',
      category: 'desayuno',
      prepTime: 4,
      cookTime: 0,
      servings: 1,
      difficulty: 'Fácil',
      calories: 390,
      protein: 31,
      carbs: 34,
      fat: 16,
      co2Saved: 1.2,
      moneySaved: 6.50,
      image: 'assets/images/recipe_chia_pudding_cacahuete.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Meal Prep', 'Desayuno', 'Vegetariano'],
      ingredients: [
        { id: 'semillas_chia', name: 'Semillas de chía', amount: '25', unit: 'g', isOptional: false },
        { id: 'yogur_griego', name: 'Yogur griego o queso fresco batido', amount: '150', unit: 'g', isOptional: false },
        { id: 'leche', name: 'Leche entera o de avena', amount: '80', unit: 'ml', isOptional: false },
        { id: 'crema_cacahuete', name: 'Crema de cacahuete pura', amount: '15', unit: 'g', isOptional: false },
        { id: 'platano', name: 'Plátano en rodajas', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'miel', name: 'Miel de azahar', amount: '1', unit: 'cucharadita', isOptional: true }
      ],
      equipment: ['Tarro de cristal con tapa'],
      steps: [
        { step: 1, instruction: 'En el tarro de cristal mezcla las semillas de chía con la leche, el yogur y la miel.', tip: 'Remueve bien durante 1 minuto con una cuchara para que las semillas no se apelmacen en el fondo.', timerSeconds: 60 },
        { step: 2, instruction: 'Cierra el tarro y guárdalo en la nevera durante al menos 4 horas (o toda la noche).', tip: 'Las semillas absorberán el líquido duplicando su tamaño.', timerSeconds: 30 },
        { step: 3, instruction: 'Por la mañana abre el tarro y añade la crema de cacahuete y las rodajas de plátano por encima.', tip: 'Listo para comer de camino al trabajo o entrenar.', timerSeconds: 60 }
      ],
      chefNotes: '31g de proteína y más de 10g de fibra prebiótica para una salud digestiva óptima.'
    },

    {
      id: 'wok-soja-texturizada-verduras-tamari',
      title: 'Wok Crujiente de Soja Texturizada y Verduras',
      subtitle: 'Tiras de soja texturizada hidratadas en caldo, salteadas al wok con pimientos y sésamo',
      description: 'La soja texturizada tiene más del 50% de proteína en peso en seco. Aquí se hidrata en caldo sabroso y se saltea a fuego vivo con verduras crujientes.',
      category: 'almuerzo',
      prepTime: 10,
      cookTime: 10,
      servings: 1,
      difficulty: 'Fácil',
      calories: 420,
      protein: 41,
      carbs: 32,
      fat: 12,
      co2Saved: 3.1,
      moneySaved: 10.00,
      image: 'assets/images/recipe_wok_soja_texturizada.jpg',
      tags: ['Rico en Proteína', 'Vegano', 'High Protein', 'Proteína Vegetal', 'Económico'],
      ingredients: [
        { id: 'soja_texturizada', name: 'Soja texturizada gruesa en seco', amount: '70', unit: 'g', isOptional: false },
        { id: 'pimiento_rojo', name: 'Pimiento rojo en tiras', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'cebolla', name: 'Cebolla en juliana', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'champinones', name: 'Champiñones laminados', amount: '80', unit: 'g', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja tamari', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'sesamo', name: 'Semillas de sésamo', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Wok o sartén honda', 'Bol para hidratar'],
      steps: [
        { step: 1, instruction: 'Hidrata la soja texturizada en agua caliente con una cucharada de salsa de soja durante 8 minutos.', tip: 'Escurre y aprieta con las manos para eliminar el exceso de agua.', timerSeconds: 480 },
        { step: 2, instruction: 'Saltea la soja en wok muy caliente con AOVE 4 minutos hasta que los bordes doren y queden crujientes.', tip: 'El dorado crea notas tostadas que recuerdan a la carne braseada.', timerSeconds: 240 },
        { step: 3, instruction: 'Añade la cebolla, pimiento y champiñones. Saltea 4 minutos a fuego máximo.', tip: 'Mantén el movimiento constante para que no se quemen.', timerSeconds: 240 },
        { step: 4, instruction: 'Añade el resto de la salsa de soja y sésamo tostado, saltea 30 segundos y sirve.', tip: '41g de proteína vegetal con coste inferior a 2€.', timerSeconds: 30 }
      ],
      chefNotes: 'Una de las fuentes de proteína vegetal más económicas y sostenibles del planeta.'
    },

    {
      id: 'brochetas-pavo-calabacin-oregano',
      title: 'Brochetas de Pavo Braseado al Orégano y Calabacín',
      subtitle: 'Dados de pechuga de pavo marinada con hierbas y calabacín a la parrilla con limón',
      description: 'Una comida fitness ligera y divertida: dados gruesos de pavo intercalados con calabacín a la brasa, aromatizados con orégano y ajo asado.',
      category: 'cena',
      prepTime: 10,
      cookTime: 10,
      servings: 1,
      difficulty: 'Fácil',
      calories: 380,
      protein: 45,
      carbs: 8,
      fat: 18,
      co2Saved: 1.6,
      moneySaved: 11.50,
      image: 'assets/images/recipe_brochetas_pavo_calabacin.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Fitness', 'Keto', 'Sin Gluten'],
      ingredients: [
        { id: 'pavo_pechuga', name: 'Pechuga de pavo en dados gruesos', amount: '220', unit: 'g', isOptional: false },
        { id: 'calabacin', name: 'Calabacín en rodajas gruesas', amount: '120', unit: 'g', isOptional: false },
        { id: 'tomates_cherry', name: 'Tomates cherry enteros', amount: '6', unit: 'unidades', isOptional: false },
        { id: 'ajo', name: 'Ajo picado', amount: '1', unit: 'diente', isOptional: false },
        { id: 'limon', name: 'Zumo de limón', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Brochetas de madera o metal', 'Sartén grill acanalada'],
      steps: [
        { step: 1, instruction: 'Ensarta en las brochetas de forma alterna los dados de pavo, rodajas de calabacín y tomates cherry.', tip: 'Moja las brochetas de madera en agua 5 minutos antes para que no se quemen.', timerSeconds: 180 },
        { step: 2, instruction: 'Pincela las brochetas con AOVE, ajo picado, orégano, sal y pimienta.', tip: 'Asegura que el pavo quede bien impregnado.', timerSeconds: 60 },
        { step: 3, instruction: 'Cocina en la sartén grill muy caliente durante 8-10 minutos girándolas cada 2 minutos.', tip: 'Las marcas doradas de la parrilla aportan sabor ahumado.', timerSeconds: 540 },
        { step: 4, instruction: 'Riega con zumo de limón fresco antes de servir.', tip: '45g de proteína magra lista en 10 minutos.', timerSeconds: 30 }
      ],
      chefNotes: 'Perfectas para cocinar en lote en la barbacoa o sartén grill y guardar en táper para 3 días.'
    },

    {
      id: 'crema-calabacin-cottage-huevo-escalfado',
      title: 'Crema Sedosa de Calabacín con Queso Cottage y Huevo',
      subtitle: 'Crema templada de calabacín enriquecida con requesón 0% y huevo escalfado con yema líquida',
      description: 'Convierte una crema de verduras clásica en un plato proteico completo batiéndola con queso cottage 0% y coronándola con huevo escalfado.',
      category: 'cena',
      prepTime: 8,
      cookTime: 12,
      servings: 1,
      difficulty: 'Fácil',
      calories: 340,
      protein: 32,
      carbs: 16,
      fat: 16,
      co2Saved: 1.5,
      moneySaved: 8.50,
      image: 'assets/images/recipe_crema_calabacin_cottage.jpg',
      tags: ['Rico en Proteína', 'Vegetariano', 'High Protein', 'Comfort Food'],
      ingredients: [
        { id: 'calabacin', name: 'Calabacines troceados', amount: '300', unit: 'g', isOptional: false },
        { id: 'cebolla', name: 'Cebolla picada', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'queso_cottage', name: 'Queso Cottage o Requesón 0%', amount: '120', unit: 'g', isOptional: false },
        { id: 'huevos', name: 'Huevo fresco', amount: '1', unit: 'unidad', isOptional: false },
        { id: 'parmesano', name: 'Parmesano rallado', amount: '15', unit: 'g', isOptional: true },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Cazuela pequeña', 'Batidora de mano'],
      steps: [
        { step: 1, instruction: 'Rehoga la cebolla y el calabacín en cazuela con AOVE 3 minutos. Añade 1 vaso de agua y cuece 8 minutos hasta que esté tierno.', tip: 'No peles el calabacín para conservar toda su fibra y color verde esmeralda.', timerSeconds: 480 },
        { step: 2, instruction: 'Añade el queso cottage a la cazuela y tritura todo con la batidora hasta lograr una crema aterciopelada.', tip: 'El cottage aporta una textura sedosa sin necesidad de nata grasa.', timerSeconds: 60 },
        { step: 3, instruction: 'Escalfa el huevo en un cazo con agua y vinagre durante 3 minutos dejando la yema líquida.', tip: 'Escurre con cuidado con una espumadera.', timerSeconds: 180 },
        { step: 4, instruction: 'Sirve la crema caliente en un bol hondo, coloca el huevo en el centro y espolvorea con parmesano.', tip: 'La yema se funde con la crema al primer corte.', timerSeconds: 30 }
      ],
      chefNotes: '32g de proteína en una cena reconfortante y ultra baja en calorías.'
    },

    {
      id: 'seitan-salteado-champinones-soja',
      title: 'Salteado de Seitán Dorado al Ajillo con Champiñones',
      subtitle: 'Dados de seitán artesanal salteados con setas laminadas, ajo y salsa de soja',
      description: 'El seitán (proteína de trigo) contiene casi un 25% de proteína limpia con textura cárnica firme que absorbe los sabores umami del champiñón y la soja.',
      category: 'almuerzo',
      prepTime: 8,
      cookTime: 10,
      servings: 1,
      difficulty: 'Fácil',
      calories: 430,
      protein: 46,
      carbs: 26,
      fat: 14,
      co2Saved: 2.8,
      moneySaved: 11.00,
      image: 'assets/images/recipe_seitan_champinones.jpg',
      tags: ['Rico en Proteína', 'Vegano', 'High Protein', 'Proteína Vegetal'],
      ingredients: [
        { id: 'seitan', name: 'Seitán artesanal en dados', amount: '200', unit: 'g', isOptional: false },
        { id: 'champinones', name: 'Champiñones laminados', amount: '150', unit: 'g', isOptional: false },
        { id: 'ajo', name: 'Dientes de ajo laminados', amount: '2', unit: 'dientes', isOptional: false },
        { id: 'perejil', name: 'Perejil fresco picado', amount: '1', unit: 'cucharada', isOptional: false },
        { id: 'salsa_soja', name: 'Salsa de soja tamari', amount: '2', unit: 'cucharadas', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '10', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén antiadherente amplia'],
      steps: [
        { step: 1, instruction: 'Corta el seitán en cubos medianos de 2 cm.', tip: 'Sécalo ligeramente con papel para que dore mejor.', timerSeconds: 60 },
        { step: 2, instruction: 'Saltea el ajo y los champiñones en sartén caliente con AOVE durante 3 minutos a fuego vivo.', tip: 'Deja que los champiñones suelten su agua y doren.', timerSeconds: 180 },
        { step: 3, instruction: 'Añade los dados de seitán y saltea 4 minutos hasta que queden con costra dorada.', tip: 'El seitán se volverá ligeramente crujiente por fuera y tierno por dentro.', timerSeconds: 240 },
        { step: 4, instruction: 'Vierte la salsa de soja y el perejil, saltea 1 minuto para glasear y sirve caliente.', tip: '46g de proteína 100% vegetal.', timerSeconds: 60 }
      ],
      chefNotes: 'Una de las mayores concentraciones proteicas del mundo vegetal con bajísimo contenido en grasa.'
    },

    {
      id: 'shakshuka-suprema-ternera-huevos',
      title: 'Shakshuka Suprema con Ternera y Huevos Pochados',
      subtitle: 'Salsa espesa de tomate y pimientos con carne picada de ternera y 2 huevos cuajados',
      description: 'Elevamos la tradicional shakshuka a la categoría de plato de culturismo gourmet: base de pimientos caramelizados, 180g de carne de ternera magra y 2 huevos de campo.',
      category: 'cena',
      prepTime: 8,
      cookTime: 14,
      servings: 1,
      difficulty: 'Fácil',
      calories: 520,
      protein: 49,
      carbs: 18,
      fat: 28,
      co2Saved: 1.5,
      moneySaved: 13.00,
      image: 'assets/images/recipe_shakshuka_suprema_ternera.jpg',
      tags: ['Rico en Proteína', 'High Protein', 'Keto', 'Comfort Food'],
      ingredients: [
        { id: 'ternera_picada', name: 'Carne picada de ternera magra', amount: '180', unit: 'g', isOptional: false },
        { id: 'huevos', name: 'Huevos de campo', amount: '2', unit: 'unidades', isOptional: false },
        { id: 'tomate', name: 'Tomate triturado', amount: '150', unit: 'g', isOptional: false },
        { id: 'pimiento_rojo', name: 'Pimiento rojo en tiras', amount: '1/2', unit: 'unidad', isOptional: false },
        { id: 'cebolla', name: 'Cebolla picada', amount: '1/4', unit: 'unidad', isOptional: false },
        { id: 'paprika', name: 'Pimentón y comino', amount: '1', unit: 'cucharadita', isOptional: false },
        { id: 'aceite_oliva', name: 'AOVE', amount: '8', unit: 'ml', isOptional: false }
      ],
      equipment: ['Sartén de hierro o sartén honda con tapa'],
      steps: [
        { step: 1, instruction: 'En la sartén dora la cebolla y pimiento con AOVE 3 minutos. Añade la ternera y cocina 3 minutos rompiéndola con la cuchara.', tip: 'Deja que la carne dore bien para concentrar el sabor umami.', timerSeconds: 240 },
        { step: 2, instruction: 'Añade el tomate triturado, pimentón, comino y sal. Cocina a fuego medio 4 minutos hasta espesar.', tip: 'La salsa debe quedar espesa para sostener los huevos.', timerSeconds: 240 },
        { step: 3, instruction: 'Haz 2 huecos con la cuchara en la mezcla y casca un huevo en cada hueco. Tapa la sartén.', tip: 'Cocina a fuego lento 4 minutos hasta que las claras cuajen pero las yemas queden líquidas.', timerSeconds: 240 },
        { step: 4, instruction: 'Retira del fuego, decora con perejil o cilantro fresco y sirve directamente en la sartén.', tip: 'Casi 50g de proteína en un festín caliente.', timerSeconds: 30 }
      ],
      chefNotes: '49g de proteína con alto aporte de hierro, vitamina B12 y fósforo para una cena saciante de alto rendimiento.'
    }
  ],

  // Predefined Pantry Starter Kits (Instant Test & Demos)
  presets: {
    gourmet: {
      name: 'Despensa Gourmet',
      description: 'Ideal para amantes de la alta cocina mediterránea y platos con personalidad.',
      items: [
        { id: 'pasta_fettuccine', qty: 500, unit: 'g', daysToExpiry: 180, location: 'pantry' },
        { id: 'burrata', qty: 2, unit: 'unidades', daysToExpiry: 4, location: 'fridge' },
        { id: 'tomates_cherry', qty: 300, unit: 'g', daysToExpiry: 5, location: 'fridge' },
        { id: 'albahaca', qty: 1, unit: 'manojo', daysToExpiry: 3, location: 'fridge' },
        { id: 'ajo', qty: 5, unit: 'dientes', daysToExpiry: 20, location: 'pantry' },
        { id: 'aceite_oliva', qty: 500, unit: 'ml', daysToExpiry: 300, location: 'pantry' },
        { id: 'pinones', qty: 50, unit: 'g', daysToExpiry: 60, location: 'pantry' },
        { id: 'parmesano', qty: 150, unit: 'g', daysToExpiry: 30, location: 'fridge' }
      ]
    },
    fitness: {
      name: 'Despensa Fitness & High Protein',
      description: 'Proteínas limpias, carbohidratos complejos y grasas saludables balanceadas.',
      items: [
        { id: 'pollo_pechuga', qty: 500, unit: 'g', daysToExpiry: 3, location: 'fridge' },
        { id: 'salmon', qty: 400, unit: 'g', daysToExpiry: 2, location: 'fridge' },
        { id: 'huevos', qty: 12, unit: 'unidades', daysToExpiry: 14, location: 'fridge' },
        { id: 'claras_huevo', qty: 500, unit: 'ml', daysToExpiry: 10, location: 'fridge' },
        { id: 'queso_cottage', qty: 400, unit: 'g', daysToExpiry: 8, location: 'fridge' },
        { id: 'arroz_jazmin', qty: 1000, unit: 'g', daysToExpiry: 360, location: 'pantry' },
        { id: 'quinoa', qty: 500, unit: 'g', daysToExpiry: 360, location: 'pantry' },
        { id: 'aguacate', qty: 2, unit: 'unidades', daysToExpiry: 3, location: 'fridge' },
        { id: 'edamame', qty: 250, unit: 'g', daysToExpiry: 12, location: 'freezer' },
        { id: 'espinacas', qty: 200, unit: 'g', daysToExpiry: 4, location: 'fridge' },
        { id: 'yogur_griego', qty: 500, unit: 'g', daysToExpiry: 10, location: 'fridge' },
        { id: 'salsa_soja', qty: 250, unit: 'ml', daysToExpiry: 300, location: 'pantry' },
        { id: 'crema_cacahuete', qty: 350, unit: 'g', daysToExpiry: 180, location: 'pantry' }
      ]
    },
    zeroWaste: {
      name: 'Nevera de Rescate (Zero Waste)',
      description: 'Varios ingredientes a punto de caducar que necesitan ser cocinados hoy mismo.',
      items: [
        { id: 'tomate', qty: 3, unit: 'unidades', daysToExpiry: 1, location: 'fridge' },
        { id: 'pimiento_rojo', qty: 1, unit: 'unidad', daysToExpiry: 2, location: 'fridge' },
        { id: 'huevos', qty: 6, unit: 'unidades', daysToExpiry: 4, location: 'fridge' },
        { id: 'cebolla', qty: 2, unit: 'unidades', daysToExpiry: 15, location: 'pantry' },
        { id: 'champinones', qty: 150, unit: 'g', daysToExpiry: 2, location: 'fridge' },
        { id: 'espinacas', qty: 100, unit: 'g', daysToExpiry: 1, location: 'fridge' },
        { id: 'pan_masa_madre', qty: 4, unit: 'rebanadas', daysToExpiry: 2, location: 'pantry' },
        { id: 'queso_feta', qty: 100, unit: 'g', daysToExpiry: 5, location: 'fridge' }
      ]
    }
  },

  // Scientific Food Preservation Hacks & Shelf-life Extenders
  preservationHacks: [
    {
      ingredient: 'Hierbas Frescas (Albahaca, Perejil, Cilantro)',
      icon: '🌿',
      tag: 'Truco del Florero',
      tip: 'Corta los tallos en diagonal y colócalas en un vaso con 2 cm de agua en la encimera (albahaca) o tapadas con una bolsa en la nevera (perejil/cilantro). Duran hasta 2 semanas.',
      savingsEstimate: 'Ahorro: ~3.50€/mes'
    },
    {
      ingredient: 'Aguacates Abiertos',
      icon: '🥑',
      tag: 'Cero Oxidación',
      tip: 'Guarda la mitad restante con el hueso dentro en un recipiente hermético junto a un trozo de cebolla cruda. Los compuestos de azufre de la cebolla previenen el pardeamiento enzimático.',
      savingsEstimate: 'Ahorro: ~5.00€/mes'
    },
    {
      ingredient: 'Hojas Verdes y Espinacas',
      icon: '🥬',
      tag: 'Control de Humedad',
      tip: 'Coloca una servilleta de papel absorbente en la base del recipiente de espinacas. Absorberá la condensación, evitando que las hojas se pudran prematuramente.',
      savingsEstimate: 'Ahorro: ~4.20€/mes'
    },
    {
      ingredient: 'Pan Artesano de Masa Madre',
      icon: '🍞',
      tag: 'Congelado Inteligente',
      tip: 'Corta el pan en rebanadas individuales el primer día y congélalas con papel de horno entre ellas. Puedes tostarlas directamente desde el congelador en 2 minutos.',
      savingsEstimate: 'Ahorro: ~6.00€/mes'
    }
  ]
};

// Export to Global Window for agnostic browser execution
if (typeof window !== 'undefined') {
  window.FridgeData = FridgeData;
}
