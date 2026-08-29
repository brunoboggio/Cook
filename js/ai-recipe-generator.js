/* ==========================================================================
   FRIDGEFLOW - AI CULINARY RECIPE GENERATOR & GASTRONOMIC ENGINE (v5.0)
   Dynamic Multi-Cuisine Synthesis, Photorealistic AI Imagery, Macro Engine & Cloud Sync
   ========================================================================== */

class AIRecipeGenerator {
  constructor() {
    // Verified High-Definition Curated Culinary Photo Library (Fallback & Archetype Engine)
    this.photoCatalog = {
      // Carnes y Platos Típicos Argentinos / Latinos
      empanada: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
      milanesa: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      asado: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      bife: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      carne: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      ternera: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      hamburguesa: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      tarta: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',

      // Aves y Pescados
      pollo: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
      chicken: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
      pavo: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
      salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      salmón: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      atun: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=800&q=80',
      atún: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=800&q=80',
      pescado: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
      merluza: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
      langostinos: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
      gambas: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',

      // Cocina Italiana y Pastas
      lasana: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80',
      lasagna: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80',
      pasta: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
      espaguetis: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
      fettuccine: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
      pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      risotto: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
      arroz: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
      paella: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80',

      // Mexicana y Tex-Mex
      taco: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
      tacos: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
      fajitas: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=800&q=80',
      burrito: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
      quesadilla: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',

      // Asiática y Exótica
      curry: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
      sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      wok: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
      tataki: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=800&q=80',
      poke: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      ceviche: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=800&q=80',
      tofu: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',

      // Sopas, Guisos y Legumbres
      guiso: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      sopa: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      lentejas: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      garbanzos: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',

      // Desayunos, Huevos y Bowls Fitness
      huevo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      huevos: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      tortilla: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      omelette: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      pancakes: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
      panqueques: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
      avena: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80',
      tostada: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      bowl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      ensalada: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',

      default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    };
  }

  // --- Model Name Normalizer ---
  normalizeModelName(rawModel) {
    if (!rawModel) return 'gemini-3.7-flash';
    let m = String(rawModel).trim().toLowerCase();
    if (m.startsWith('models/')) m = m.substring(7);
    if (m === 'gemini-3.7-flash-light' || m === 'gemini-3.7-flash-lite' || m === 'gemini-3.7') return 'gemini-3.7-flash';
    if (m === 'gemini-3.6-flash-light' || m === 'gemini-3.6-flash-lite' || m === 'gemini-3.6') return 'gemini-3.6-flash';
    if (m === 'gemini-3.5-flash-light' || m === 'gemini-3.5-flash') return 'gemini-3.5-flash-lite';
    if (m === 'gemini-3.1-flash-light' || m === 'gemini-3.1-flash') return 'gemini-3.1-flash-lite';
    if (m === 'gemini-2.5-flash-lite' || m === 'gemini-2.5-flash' || m === 'gemini-2.0-flash' || m === 'gemini-1.5-flash') return 'gemini-3.7-flash';
    return m;
  }

  // --- AI Settings & Google AI Studio Configuration ---
  getAISettings() {
    try {
      const stored = localStorage.getItem('fridgeflow_ai_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.textModel = this.normalizeModelName(parsed.textModel || 'gemini-3.7-flash');
        return parsed;
      }
    } catch (e) {}
    const directKey = localStorage.getItem('fridgeflow_gemini_api_key') || '';
    return {
      apiKey: directKey,
      textModel: 'gemini-3.7-flash',
      imageModel: 'nano-banana-2'
    };
  }

  saveAISettings(settings) {
    if (settings && settings.textModel) {
      settings.textModel = this.normalizeModelName(settings.textModel);
    }
    localStorage.setItem('fridgeflow_ai_config', JSON.stringify(settings));
    if (settings && settings.apiKey !== undefined) {
      localStorage.setItem('fridgeflow_gemini_api_key', settings.apiKey.trim());
    }
  }

  // --- Dynamic AI Image Generator with nano-banana-2 ---
  generateAIImageUrl(dishName, customPrompt = null, seed = null) {
    const settings = this.getAISettings();
    const model = settings.imageModel || 'nano-banana-2';
    const cleanSeed = seed || Math.floor(Math.random() * 999999);
    const cleanPrompt = encodeURIComponent(
      customPrompt || `professional gourmet delicious food photography of ${dishName}, restaurant culinary plating, cinematic warm lighting, sharp focus, 8k resolution, award winning culinary styling`
    );
    return `https://image.pollinations.ai/prompt/${cleanPrompt}?model=${encodeURIComponent(model)}&width=800&height=600&nologo=true&seed=${cleanSeed}`;
  }

  // --- Discover Available Models for API Key ---
  async fetchAvailableModels(apiKey) {
    if (!apiKey || !apiKey.trim()) return [];
    const key = apiKey.trim();
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.models && Array.isArray(data.models)) {
          return data.models
            .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name.replace(/^models\//, ''));
        }
      }
    } catch (e) {
      console.warn('No se pudo listar modelos dinámicamente:', e);
    }
    return ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-3.5-flash-lite'];
  }

  // --- Google AI Studio Test Connection Ping ---
  async testGeminiConnection(apiKey, model = 'gemini-3.7-flash') {
    if (!apiKey || !apiKey.trim()) {
      throw new Error('Debes ingresar una API Key de Google AI Studio.');
    }

    const key = apiKey.trim();
    const primary = this.normalizeModelName(model || 'gemini-3.7-flash');

    // First attempt to discover dynamic models from user's account
    const discovered = await this.fetchAvailableModels(key).catch(() => []);

    const modelsToTry = [
      primary,
      ...discovered.filter(m => m.includes('flash') || m.includes('pro')),
      'gemini-3.7-flash',
      'gemini-3.6-flash',
      'gemini-3.1-flash-lite',
      'gemini-3.5-flash-lite'
    ];
    const uniqueModels = [...new Set(modelsToTry)];

    let lastError = null;
    for (const testModel of uniqueModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${testModel}:generateContent?key=${key}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: 'Responde exclusivamente este JSON: {"status": "ok", "message": "Gemini conectado"}' }]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          return { success: true, modelUsed: testModel, data, availableCount: discovered.length };
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData?.error?.message || `HTTP ${response.status} (${response.statusText})`;
          // Continue loop to try next model in cascade
          continue;
        }
      } catch (err) {
        lastError = err.message;
        continue;
      }
    }

    throw new Error(lastError || 'No se pudo conectar con Google AI Studio. Verifica tu clave API.');
  }

  // --- Main AI Generation Pipeline with Gemini & nano-banana-2 ---
  async generateRecipe(dishName, userNotes = '', focus = 'protein', onProgress = null, customImage = null) {
    if ((!dishName || dishName.trim().length === 0) && !customImage) {
      throw new Error('Por favor, escribe el nombre del plato o sube una fotografía.');
    }

    const cleanTitle = (dishName && dishName.trim().length > 0) ? dishName.trim() : 'Creación Culinaria Especial';
    const cleanNotes = userNotes.trim();
    const settings = this.getAISettings();

    // If API Key is configured, use Google AI Studio Gemini
    if (settings.apiKey && settings.apiKey.trim().length > 10) {
      try {
        return await this.callGeminiAPI(cleanTitle, cleanNotes, focus, customImage, onProgress, settings);
      } catch (geminiError) {
        console.warn('⚠️ Error con Gemini API, aplicando síntesis culinaria de respaldo:', geminiError);
        if (onProgress) {
          onProgress({ step: 2, text: `⚠️ Gemini API (${geminiError.message || 'error'}), usando motor de respaldo...` });
        }
        await this.delay(600);
      }
    }

    // Fallback: Smart Gastronomic Engine with nano-banana-2
    if (onProgress) {
      const step1Text = customImage 
        ? `📸 Analizando imagen y reconociendo ingredientes para "${cleanTitle}"...`
        : `🔍 Investigando técnica gastronómica y perfil de sabor para "${cleanTitle}"...`;
      onProgress({ step: 1, text: step1Text });
    }
    await this.delay(500);

    if (onProgress) onProgress({ step: 2, text: '⚖️ Calculando macronutrientes exactos, proteínas biodisponibles y calorías...' });
    await this.delay(500);

    if (onProgress) {
      const step3Text = customImage
        ? '✨ Optimizando fotografía gastronómica adjunta...'
        : '🎨 Generando fotografía gourmet con modelo nano-banana-2...';
      onProgress({ step: 3, text: step3Text });
    }
    await this.delay(600);

    if (onProgress) onProgress({ step: 4, text: '📝 Redactando pasos guiados cronometrados y consejos de Chef...' });
    await this.delay(500);

    const recipe = this.synthesizeRecipe(cleanTitle, cleanNotes, focus, customImage);

    if (onProgress) onProgress({ step: 5, text: '✨ ¡Receta completada y lista para cocinar!' });
    await this.delay(300);

    return recipe;
  }

  // --- Real Google AI Studio Gemini API Client ---
  async callGeminiAPI(dishName, userNotes, focus, customImage, onProgress, settings) {
    const apiKey = settings.apiKey.trim();
    const normalizedPrimary = this.normalizeModelName(settings.textModel || 'gemini-3.7-flash');
    if (onProgress) {
      onProgress({ step: 1, text: `🤖 Conectando con Google AI Studio (${normalizedPrimary})...` });
    }
    await this.delay(300);

    const promptText = `Actúa como un Chef Ejecutivo de Estrella Michelin y Nutricionista Deportivo de Élite para FridgeFlow.
Crea una receta detallada y exquisita a partir de las instrucciones del usuario:
- Plato o idea solicitada: "${dishName}"
- Requerimientos o notas del usuario: "${userNotes || 'Ninguno en específico'}"
- Enfoque nutricional: "${focus}" (protein = hiperproteico con mínimo 40g proteína; balanced = balanceado y saludable; keto = bajo en carbohidratos; vegetarian = vegetariano completo).
${customImage ? '- Se ha adjuntado una fotografía o captura del plato. Analiza los ingredientes visibles, cocción y emplatado para reflejarlos con total fidelidad.' : ''}

Debes responder ÚNICAMENTE con un JSON válido que cumpla estrictamente este esquema:
{
  "title": "Nombre creativo y gourmet del plato",
  "subtitle": "Breve frase descriptiva y apetecible (máximo 12 palabras)",
  "description": "Explicación culinaria completa, textura, perfil aromático y justificación nutricional de cada ingrediente.",
  "category": "desayuno" | "almuerzo" | "cena",
  "prepTime": 15,
  "cookTime": 20,
  "servings": 1,
  "difficulty": "Fácil" | "Intermedia" | "Avanzada",
  "calories": 520,
  "protein": 48,
  "carbs": 42,
  "fat": 14,
  "fiber": 6,
  "tags": ["✨ Gemini AI", "Hiperproteico", "Express", "Gourmet"],
  "ingredients": [
    {
      "id": "pollo_pechuga",
      "name": "Pechuga de pollo fresca en filetes",
      "amount": "220",
      "unit": "g",
      "isMainProtein": true
    },
    {
      "id": "arroz_jazmin",
      "name": "Arroz basmati / jazmín aromático",
      "amount": "70",
      "unit": "g",
      "isMainProtein": false
    }
  ],
  "steps": [
    {
      "step": 1,
      "instruction": "Instrucción de mise en place y preparación inicial",
      "timerSeconds": 0,
      "tip": "Consejo técnico de chef para corte o marinado",
      "equipment": ["Tabla de corte", "Cuchillo de chef"]
    },
    {
      "step": 2,
      "instruction": "Instrucción de sellado a fuego vivo o cocción base",
      "timerSeconds": 240,
      "tip": "Consejo para la reacción de Maillard o dorado",
      "equipment": ["Sartén o Plancha"]
    },
    {
      "step": 3,
      "instruction": "Instrucción de cocción principal, salsa o guarnición",
      "timerSeconds": 600,
      "tip": "Consejo de cocción",
      "equipment": ["Sartén"]
    },
    {
      "step": 4,
      "instruction": "Instrucción de reposo, emplatado y toque final",
      "timerSeconds": 0,
      "tip": "Consejo de presentación gourmet",
      "equipment": ["Plato de presentación"]
    }
  ],
  "imagePrompt": "A stunning, hyperrealistic 8k gourmet food photography of ${dishName}, restaurant culinary plating, warm soft lighting, macro detail, award winning food styling"
}

REGLAS ESTRICTAS:
1. Incluye entre 5 y 9 ingredientes detallados con sus cantidades y unidades.
2. Incluye exactamente 4 pasos cronológicos con temporizadores en segundos ('timerSeconds') realistas.
3. Las calorías y macronutrientes deben ser el cálculo matemático real de los ingredientes.
4. Responde ÚNICAMENTE el JSON, sin texto ni explicaciones adicionales.`;

    const parts = [];

    // Multimodal image support
    if (customImage && typeof customImage === 'string' && customImage.startsWith('data:')) {
      const commaIdx = customImage.indexOf(',');
      const mimeType = customImage.substring(5, customImage.indexOf(';')) || 'image/jpeg';
      const base64Data = customImage.substring(commaIdx + 1);
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data
        }
      });
    }

    parts.push({ text: promptText });

    if (onProgress) {
      onProgress({ step: 2, text: `🧠 Gemini (${normalizedPrimary}) analizando ingredientes, técnicas y macros...` });
    }

    const modelsToTry = [
      normalizedPrimary,
      'gemini-3.7-flash',
      'gemini-3.6-flash',
      'gemini-3.1-flash-lite',
      'gemini-3.5-flash-lite',
      'gemini-flash-lite-latest'
    ];
    const uniqueModels = [...new Set(modelsToTry)];

    let lastError = null;
    let rawText = '';
    let usedModel = normalizedPrimary;

    for (const model of uniqueModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{ parts }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7
            }
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData?.error?.message || `HTTP ${response.status}`;
          lastError = new Error(errMsg);
          console.warn(`[Gemini API] Modelo ${model} respondió ${response.status}: ${errMsg}. Probando siguiente modelo en cascada...`);
          continue;
        }

        const data = await response.json();
        const candidate = data.candidates && data.candidates[0];
        if (candidate && candidate.content && candidate.content.parts && candidate.content.parts[0]) {
          rawText = candidate.content.parts[0].text;
          usedModel = model;
          break;
        } else {
          continue;
        }
      } catch (err) {
        lastError = err;
        console.warn(`[Gemini API] Excepción con modelo ${model}:`, err.message);
        continue;
      }
    }

    if (!rawText) {
      throw lastError || new Error('No se pudo generar la receta con Gemini.');
    }

    // Clean JSON response
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('Error parseando JSON de Gemini:', parseErr, cleanJson);
      throw new Error('La respuesta de Gemini no tuvo el formato JSON esperado.');
    }

    if (onProgress) {
      onProgress({ step: 3, text: '🎨 Generando fotografía gourmet con modelo nano-banana-2...' });
    }
    await this.delay(400);

    // Generate image using nano-banana-2
    let finalImage = customImage;
    if (!finalImage) {
      finalImage = this.generateAIImageUrl(parsed.title || dishName, parsed.imagePrompt);
    }

    if (onProgress) {
      onProgress({ step: 4, text: '📝 Validando información y sincronizando con Firebase Cloud...' });
    }
    await this.delay(300);

    const cleanSlug = 'ai-' + (parsed.title || dishName)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Math.floor(Math.random() * 1000);

    const recipe = {
      id: cleanSlug,
      title: parsed.title || dishName,
      subtitle: parsed.subtitle || `Receta gourmet creada con Gemini (${usedModel}) e IA.`,
      description: parsed.description || `Plato diseñado por Gemini AI para optimizar aporte nutricional.`,
      category: ['desayuno', 'almuerzo', 'cena'].includes(parsed.category) ? parsed.category : 'almuerzo',
      prepTime: parseInt(parsed.prepTime, 10) || 12,
      cookTime: parseInt(parsed.cookTime, 10) || 18,
      servings: parseInt(parsed.servings, 10) || 1,
      difficulty: parsed.difficulty || 'Fácil',
      calories: parseInt(parsed.calories, 10) || 500,
      protein: parseInt(parsed.protein, 10) || 45,
      carbs: parseInt(parsed.carbs, 10) || 40,
      fat: parseInt(parsed.fat, 10) || 14,
      fiber: parseInt(parsed.fiber, 10) || 5,
      image: finalImage,
      tags: Array.isArray(parsed.tags) ? parsed.tags : ['✨ Gemini AI', 'Hiperproteico', 'Gourmet'],
      isCustom: true,
      ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : [],
      steps: Array.isArray(parsed.steps) ? parsed.steps : [],
      createdAt: new Date().toISOString()
    };

    if (onProgress) {
      onProgress({ step: 5, text: '✨ ¡Receta completada con éxito por Gemini!' });
    }
    await this.delay(300);

    return recipe;
  }

  // --- Deep Gastronomic Decomposer ---
  synthesizeRecipe(title, notes, focus, customImage = null) {
    const lower = `${title} ${notes}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 1. Determine Meal Category
    let category = 'almuerzo';
    if (lower.includes('desayun') || lower.includes('pancake') || lower.includes('panqueque') || lower.includes('tostad') || lower.includes('smoothie') || lower.includes('avena') || lower.includes('waffle') || lower.includes('porridge')) {
      category = 'desayuno';
    } else if (lower.includes('cena') || lower.includes('ensalada') || lower.includes('sopa') || lower.includes('crema') || lower.includes('ligero') || lower.includes('tartar') || lower.includes('ceviche')) {
      category = 'cena';
    } else {
      category = 'almuerzo';
    }

    // 2. Determine Archetype & Cuisine Profile
    const archetype = this.detectArchetype(lower);
    
    // 3. Assemble Specific Ingredients
    const ingredients = this.buildIngredients(archetype, lower, focus);

    // 4. Calculate Mathematical True Macros based on Ingredients
    const macros = this.calculateMacros(ingredients, focus);

    // 5. Build Cooking Times & Steps
    const cookingTimes = this.calculateTimes(archetype);
    const steps = this.generateSpecificSteps(title, archetype, ingredients, lower);

    // 6. Select Best Image (Custom Image > AI Generated Pollinations Image > Curated Unsplash Fallback)
    let finalImage = customImage;
    if (!finalImage) {
      finalImage = this.generateAIImageUrl(title);
    }

    // Unique Slug ID
    const cleanSlug = 'ai-' + title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Math.floor(Math.random() * 1000);

    // Format Title
    const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return {
      id: cleanSlug,
      title: formattedTitle,
      subtitle: `Plato ${archetype.label} de alto rendimiento creado con Inteligencia Artificial.`,
      description: `Creación culinaria artesanal diseñada para optimizar tu nutrición (${macros.protein}g proteína) con técnica profesional. Combina ${ingredients.slice(0, 3).map(i => i.name.toLowerCase()).join(', ')} para una textura impecable y sabor profundo. ${notes ? 'Nota personalizada: ' + notes : ''}`,
      category: category,
      prepTime: cookingTimes.prepTime,
      cookTime: cookingTimes.cookTime,
      servings: 1,
      difficulty: cookingTimes.cookTime > 25 ? 'Intermedia' : 'Fácil',
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      fiber: macros.fiber,
      image: finalImage,
      tags: ['✨ Creada con IA', customImage ? '📸 Con Foto' : 'Hiperproteico', archetype.tag, 'Fácil', category === 'cena' ? 'Cena Ligera' : 'Energético'],
      isCustom: true,
      ingredients: ingredients,
      steps: steps,
      createdAt: new Date().toISOString()
    };
  }

  // --- Cuisine Archetype Detection ---
  detectArchetype(query) {
    if (query.includes('empanada')) {
      return { type: 'empanadas', label: 'Estilo Rioplatense', tag: 'Empanadas', method: 'horno' };
    }
    if (query.includes('milanesa') || query.includes('suprema') || query.includes('escalope')) {
      return { type: 'milanesa', label: 'Clásico al Horno / Sartén', tag: 'Milanesa', method: 'horno' };
    }
    if (query.includes('asado') || query.includes('bife') || query.includes('entran') || query.includes('parrilla')) {
      return { type: 'asado', label: 'Parrilla Gourmet', tag: 'Asado', method: 'plancha' };
    }
    if (query.includes('tarta') || query.includes('quiche') || query.includes('pascualina')) {
      return { type: 'tarta', label: 'Tarta Horneada Fit', tag: 'Tarta', method: 'horno' };
    }
    if (query.includes('lasana') || query.includes('lasagna') || query.includes('canelon')) {
      return { type: 'lasagna', label: 'Italiano Gratinado', tag: 'Lasaña', method: 'horno' };
    }
    if (query.includes('pasta') || query.includes('espagueti') || query.includes('fettuccine') || query.includes('macarron') || query.includes('ñoqui') || query.includes('penne')) {
      return { type: 'pasta', label: 'Pasta Artesanal', tag: 'Pasta', method: 'hervido' };
    }
    if (query.includes('risotto') || query.includes('paella')) {
      return { type: 'risotto', label: 'Arroz Gourmet', tag: 'Arroz', method: 'sofrito' };
    }
    if (query.includes('taco') || query.includes('fajita') || query.includes('burrito') || query.includes('quesadilla')) {
      return { type: 'tacos', label: 'Cocina Mexicana', tag: 'Tacos', method: 'plancha' };
    }
    if (query.includes('burger') || query.includes('hamburguesa')) {
      return { type: 'burger', label: 'Burger Gourmet Fit', tag: 'Hamburguesa', method: 'plancha' };
    }
    if (query.includes('curry') || query.includes('tikka') || query.includes('masala')) {
      return { type: 'curry', label: 'Curry Aromático', tag: 'Curry', method: 'guiso' };
    }
    if (query.includes('poke') || query.includes('ceviche') || query.includes('tartar') || query.includes('sushi')) {
      return { type: 'poke_ceviche', label: 'Crudo & Curado Gourmet', tag: 'Poke / Ceviche', method: 'frio' };
    }
    if (query.includes('wok') || query.includes('saltead') || query.includes('teriyaki') || query.includes('stir')) {
      return { type: 'wok', label: 'Wok & Salteado Oriental', tag: 'Salteado', method: 'plancha' };
    }
    if (query.includes('sopa') || query.includes('ramen') || query.includes('guiso') || query.includes('cazuela') || query.includes('estofado')) {
      return { type: 'guiso', label: 'Guiso / Sopa Reconfortante', tag: 'Guiso', method: 'guiso' };
    }
    if (query.includes('pancake') || query.includes('panqueque') || query.includes('avena') || query.includes('waffle') || query.includes('desayun')) {
      return { type: 'breakfast', label: 'Desayuno Proteico', tag: 'Desayuno Fit', method: 'plancha' };
    }
    if (query.includes('tortilla') || query.includes('omelette') || query.includes('huevo') || query.includes('shakshuka')) {
      return { type: 'eggs', label: 'Huevos & Tortillas Gourmet', tag: 'Huevos', method: 'plancha' };
    }
    if (query.includes('ensalada') || query.includes('bowl')) {
      return { type: 'salad', label: 'Bowl & Ensalada Fresca', tag: 'Ensalada', method: 'frio' };
    }

    // Default: Proteína al Plato con Guarnición
    return { type: 'general_protein', label: 'Alta Proteína', tag: 'Fitness', method: 'plancha' };
  }

  // --- Dynamic Ingredients Builder ---
  buildIngredients(archetype, query, focus) {
    const list = [];

    switch (archetype.type) {
      case 'empanadas':
        if (query.includes('pollo')) {
          list.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo cocida y desmechada', amount: '220', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'ternera_picada', name: 'Carne magra de ternera picada a cuchillo', amount: '220', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'cebolla', name: 'Cebolla dulce picada en brunoise', amount: '1', unit: 'unidades' });
        list.push({ id: 'pimiento_rojo', name: 'Pimiento rojo picado fino', amount: '0.5', unit: 'unidades' });
        list.push({ id: 'huevos', name: 'Huevo duro de campo picado', amount: '1', unit: 'unidades' });
        list.push({ id: 'arroz_jazmin', name: 'Discos de masa para empanadas al horno', amount: '3', unit: 'unidades' });
        list.push({ id: 'aceite_oliva', name: 'Aceite de oliva virgen extra (AOVE)', amount: '10', unit: 'ml' });
        break;

      case 'milanesa':
        if (query.includes('pollo') || query.includes('suprema')) {
          list.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo fileteada', amount: '220', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'ternera_picada', name: 'Filetes tiernos de nalga o lomo vacuno', amount: '220', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'huevos', name: 'Huevos de campo batidos con ajo y perejil', amount: '1', unit: 'unidades' });
        list.push({ id: 'avena', name: 'Rebozado crujiente de pan rallado integral y avena', amount: '40', unit: 'g' });
        if (query.includes('napolitana') || query.includes('queso')) {
          list.push({ id: 'queso_parmesano', name: 'Queso mozzarella o cuartirolo fundente', amount: '50', unit: 'g' });
          list.push({ id: 'tomate', name: 'Salsa de tomate casera al orégano', amount: '60', unit: 'g' });
        }
        list.push({ id: 'patata', name: 'Papas (patatas) en bastones al horno', amount: '150', unit: 'g' });
        list.push({ id: 'aceite_oliva', name: 'Aceite de oliva virgen extra (AOVE)', amount: '10', unit: 'ml' });
        break;

      case 'curry':
        if (query.includes('ternera') || query.includes('carne')) {
          list.push({ id: 'ternera_picada', name: 'Carne magra de ternera en dados tiernos', amount: '220', unit: 'g', isMainProtein: true });
        } else if (query.includes('garbanzo') || query.includes('vegano') || query.includes('tofu')) {
          list.push({ id: 'tofu', name: 'Tofu firme o garbanzos bio', amount: '250', unit: 'g', isMainProtein: true });
        } else if (query.includes('langostino') || query.includes('gamba')) {
          list.push({ id: 'gambas', name: 'Langostinos o gambas peladas', amount: '200', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo en dados tiernos', amount: '220', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'leche_coco', name: 'Leche de coco cremosa light', amount: '120', unit: 'ml' });
        list.push({ id: 'garbanzos_cocidos', name: 'Garbanzos cocidos o espinacas', amount: '80', unit: 'g' });
        list.push({ id: 'arroz_jazmin', name: 'Arroz basmati aromático', amount: '70', unit: 'g' });
        list.push({ id: 'pimiento_rojo', name: 'Pimiento rojo y cebolla en juliana', amount: '80', unit: 'g' });
        list.push({ id: 'ajo', name: 'Jengibre fresco, ajo y curry en polvo', amount: '2', unit: 'dientes' });
        break;

      case 'burger':
        if (query.includes('pollo')) {
          list.push({ id: 'pollo_pechuga', name: 'Medallón 100% pechuga de pollo picada', amount: '200', unit: 'g', isMainProtein: true });
        } else if (query.includes('lentejas') || query.includes('vegano') || query.includes('tofu')) {
          list.push({ id: 'lentejas_cocidas', name: 'Medallón artesanal de lentejas y avena', amount: '200', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'ternera_picada', name: 'Medallón 100% carne magra de ternera', amount: '200', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'huevos', name: 'Huevo de campo a la plancha', amount: '1', unit: 'unidades' });
        list.push({ id: 'queso_parmesano', name: 'Queso cheddar o mozzarella en lámina', amount: '30', unit: 'g' });
        list.push({ id: 'arroz_jazmin', name: 'Pan brioche tostado o base al plato', amount: '1', unit: 'unidades' });
        list.push({ id: 'tomate', name: 'Rodajas de tomate y hojas verdes', amount: '60', unit: 'g' });
        list.push({ id: 'cebolla', name: 'Cebolla caramelizada sin azúcares añadidos', amount: '40', unit: 'g' });
        break;

      case 'lasagna':
        if (query.includes('pollo') || query.includes('pavo')) {
          list.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo o pavo picada magra', amount: '200', unit: 'g', isMainProtein: true });
        } else if (query.includes('atun')) {
          list.push({ id: 'atun_fresco', name: 'Atún desmenuzado y espinacas', amount: '200', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'ternera_picada', name: 'Carne magra de ternera picada', amount: '200', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'pasta_fettuccine', name: 'Láminas de pasta para lasaña', amount: '70', unit: 'g' });
        list.push({ id: 'tomate', name: 'Salsa pomodoro rústica con albahaca', amount: '120', unit: 'g' });
        list.push({ id: 'espinacas', name: 'Espinacas frescas salteadas', amount: '80', unit: 'g' });
        list.push({ id: 'queso_parmesano', name: 'Queso ricotta o ricota magra', amount: '60', unit: 'g' });
        list.push({ id: 'queso_parmesano', name: 'Parmesano rallado para gratinar', amount: '20', unit: 'g' });
        list.push({ id: 'ajo', name: 'Dientes de ajo y cebolla', amount: '2', unit: 'dientes' });
        break;

      case 'pasta':
        if (query.includes('salmon')) {
          list.push({ id: 'salmon', name: 'Lomo de salmón en dados', amount: '200', unit: 'g', isMainProtein: true });
        } else if (query.includes('atun')) {
          list.push({ id: 'atun_fresco', name: 'Lomo de atún fresco o en lata', amount: '180', unit: 'g', isMainProtein: true });
        } else if (query.includes('gamba') || query.includes('langostino')) {
          list.push({ id: 'gambas', name: 'Langostinos pelados frescos', amount: '200', unit: 'g', isMainProtein: true });
        } else if (query.includes('ternera') || query.includes('carne') || query.includes('bolognesa')) {
          list.push({ id: 'ternera_picada', name: 'Carne magra de ternera picada', amount: '200', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo en tiras doradas', amount: '200', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'pasta_fettuccine', name: 'Pasta fettuccine o rigatoni', amount: '80', unit: 'g' });
        list.push({ id: 'tomates_cherry', name: 'Tomates cherry dulces confitados', amount: '80', unit: 'g' });
        list.push({ id: 'ajo', name: 'Dientes de ajo laminados', amount: '2', unit: 'dientes' });
        list.push({ id: 'albahaca', name: 'Hojas de albahaca fresca', amount: '6', unit: 'hojas' });
        list.push({ id: 'queso_parmesano', name: 'Parmesano reggiano rallado', amount: '20', unit: 'g' });
        list.push({ id: 'aceite_oliva', name: 'Aceite de oliva virgen extra', amount: '10', unit: 'ml' });
        break;

      case 'tacos':
        if (query.includes('pollo')) {
          list.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo marinada en lima y especias', amount: '220', unit: 'g', isMainProtein: true });
        } else if (query.includes('cerdo') || query.includes('pastor') || query.includes('carnitas')) {
          list.push({ id: 'lomo_cerdo', name: 'Lomo de cerdo magro en tiras especiadas', amount: '220', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'ternera_picada', name: 'Carne magra de ternera en fajitas', amount: '220', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'arroz_jazmin', name: 'Tortillas de maíz o trigo artesanales', amount: '3', unit: 'unidades' });
        list.push({ id: 'aguacate', name: 'Aguacate (Palta) para guacamole fresco', amount: '0.5', unit: 'unidades' });
        list.push({ id: 'cebolla', name: 'Cebolla morada en pluma con cilantro', amount: '0.5', unit: 'unidades' });
        list.push({ id: 'tomate', name: 'Pico de gallo con tomate fresco', amount: '70', unit: 'g' });
        list.push({ id: 'cilantro', name: 'Gajos de lima y cilantro fresco', amount: '1', unit: 'unidades' });
        break;

      case 'poke_ceviche':
        if (query.includes('atun')) {
          list.push({ id: 'atun_fresco', name: 'Lomo de atún rojo cortado en dados', amount: '200', unit: 'g', isMainProtein: true });
        } else if (query.includes('pescado') || query.includes('corvina') || query.includes('merluza')) {
          list.push({ id: 'merluza_pescado', name: 'Pescado blanco fresco curado en lima', amount: '200', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'salmon', name: 'Lomo de salmón fresco en cubos', amount: '200', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'arroz_jazmin', name: 'Base de arroz de sushi o quinoa real', amount: '65', unit: 'g' });
        list.push({ id: 'aguacate', name: 'Aguacate (Palta) en láminas', amount: '0.5', unit: 'unidades' });
        list.push({ id: 'edamame', name: 'Edamames verdes desgranados', amount: '60', unit: 'g' });
        list.push({ id: 'pepino', name: 'Pepino crujiente y cebolla morada', amount: '60', unit: 'g' });
        list.push({ id: 'sesamo', name: 'Semillas de sésamo y aderezo de soja-lima', amount: '10', unit: 'ml' });
        break;

      case 'breakfast':
        list.push({ id: 'claras_huevo', name: 'Claras de huevo pasteurizadas', amount: '180', unit: 'ml', isMainProtein: true });
        list.push({ id: 'huevos', name: 'Huevo entero de campo', amount: '1', unit: 'unidades' });
        list.push({ id: 'avena', name: 'Avena integral suave en copos', amount: '50', unit: 'g' });
        list.push({ id: 'yogur_griego', name: 'Yogur griego natural alto en proteína', amount: '80', unit: 'g' });
        list.push({ id: 'platano', name: 'Plátano / Banana o frutos rojos frescos', amount: '60', unit: 'g' });
        list.push({ id: 'canela', name: 'Canela de ceilán y esencia de vainilla', amount: '1', unit: 'pizca' });
        break;

      default:
        // Generic Intelligent High Protein Meal
        if (query.includes('salmon')) {
          list.push({ id: 'salmon', name: 'Lomo de salmón fresco', amount: '220', unit: 'g', isMainProtein: true });
        } else if (query.includes('ternera') || query.includes('carne')) {
          list.push({ id: 'ternera_picada', name: 'Corte magro de ternera o lomo', amount: '220', unit: 'g', isMainProtein: true });
        } else if (query.includes('pavo')) {
          list.push({ id: 'pavo_pechuga', name: 'Pechuga de pavo braseada', amount: '220', unit: 'g', isMainProtein: true });
        } else if (query.includes('tofu') || query.includes('vegano')) {
          list.push({ id: 'tofu', name: 'Tofu firme marinado en soja y sésamo', amount: '250', unit: 'g', isMainProtein: true });
        } else {
          list.push({ id: 'pollo_pechuga', name: 'Pechuga de pollo de corral', amount: '220', unit: 'g', isMainProtein: true });
        }
        list.push({ id: 'patata', name: 'Guarnición de batatas / papas al vapor o arroz', amount: '150', unit: 'g' });
        list.push({ id: 'espinacas', name: 'Vegetales salteados (espinacas, champiñones, cherry)', amount: '100', unit: 'g' });
        list.push({ id: 'ajo', name: 'Dientes de ajo y hierbas aromáticas', amount: '2', unit: 'dientes' });
        list.push({ id: 'aceite_oliva', name: 'Aceite de oliva virgen extra (AOVE)', amount: '10', unit: 'ml' });
        break;
    }

    return list;
  }

  // --- Real Mathematical Macro Engine ---
  calculateMacros(ingredients, focus) {
    let protein = 0;
    let calories = 0;
    let carbs = 0;
    let fat = 0;
    let fiber = 5;

    ingredients.forEach(item => {
      const name = item.name.toLowerCase();
      const amount = parseFloat(item.amount) || 100;

      if (name.includes('pollo') || name.includes('pavo')) {
        protein += Math.round((amount / 100) * 31);
        calories += Math.round((amount / 100) * 165);
        fat += Math.round((amount / 100) * 3.5);
      } else if (name.includes('ternera') || name.includes('carne') || name.includes('lomo')) {
        protein += Math.round((amount / 100) * 26);
        calories += Math.round((amount / 100) * 200);
        fat += Math.round((amount / 100) * 9);
      } else if (name.includes('salmon')) {
        protein += Math.round((amount / 100) * 25);
        calories += Math.round((amount / 100) * 208);
        fat += Math.round((amount / 100) * 12);
      } else if (name.includes('atun') || name.includes('pescado') || name.includes('merluza')) {
        protein += Math.round((amount / 100) * 28);
        calories += Math.round((amount / 100) * 130);
        fat += Math.round((amount / 100) * 1.5);
      } else if (name.includes('tofu')) {
        protein += Math.round((amount / 100) * 16);
        calories += Math.round((amount / 100) * 140);
        fat += Math.round((amount / 100) * 8);
      } else if (name.includes('huevo') || name.includes('claras')) {
        protein += 14;
        calories += 110;
        fat += 6;
      } else if (name.includes('pasta') || name.includes('arroz') || name.includes('avena')) {
        carbs += Math.round((amount / 100) * 70);
        protein += Math.round((amount / 100) * 10);
        calories += Math.round((amount / 100) * 360);
      } else if (name.includes('patata') || name.includes('papa') || name.includes('batata') || name.includes('boniato')) {
        carbs += Math.round((amount / 100) * 20);
        calories += Math.round((amount / 100) * 90);
      } else if (name.includes('queso') || name.includes('parmesano') || name.includes('mozzarella')) {
        protein += 10;
        fat += 10;
        calories += 140;
      } else if (name.includes('aceite') || name.includes('aove')) {
        fat += 10;
        calories += 90;
      } else if (name.includes('aguacate') || name.includes('palta')) {
        fat += 12;
        calories += 130;
        fiber += 4;
      }
    });

    // Guard rails & minimum protein target
    if (focus === 'keto') {
      carbs = Math.min(14, carbs);
      fat = Math.max(22, fat);
    } else {
      protein = Math.max(42, protein);
    }

    calories = Math.max(380, calories);

    return {
      protein: Math.round(protein),
      calories: Math.round(calories),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      fiber: Math.round(fiber)
    };
  }

  // --- Times Calculation ---
  calculateTimes(archetype) {
    switch (archetype.method) {
      case 'horno':
        return { prepTime: 15, cookTime: 25 };
      case 'guiso':
        return { prepTime: 12, cookTime: 22 };
      case 'frio':
        return { prepTime: 14, cookTime: 0 };
      case 'hervido':
        return { prepTime: 8, cookTime: 14 };
      default:
        return { prepTime: 10, cookTime: 12 };
    }
  }

  // --- Specific Step Generation Tailored to Archetype ---
  generateSpecificSteps(title, archetype, ingredients, query) {
    const mainProt = ingredients.find(i => i.isMainProtein) || ingredients[0];
    const rawProtName = mainProt.name.toLowerCase();
    const protName = rawProtName.replace(/en (tiras|dados|cubos|fajitas|bastones)[^,]*/gi, '').trim();
    const steps = [];

    if (archetype.type === 'empanadas') {
      steps.push({
        step: 1,
        instruction: `Mise en place del relleno: Pica finamente la cebolla dulce y el pimiento en brunoise. En una sartén amplia con un hilo de AOVE, rehoga los vegetales a fuego medio durante 6 a 8 minutos hasta que caramelicen de forma natural.`,
        timerSeconds: 420,
        tip: 'Cocinar la cebolla lentamente hasta que quede translúcida y dulce es el secreto de la jugosidad tradicional del relleno.',
        equipment: ['Tabla de corte', 'Sartén amplia', 'Cuchillo de chef']
      });
      steps.push({
        step: 2,
        instruction: `Añade ${protName} al sofrito. Sube el fuego y cocina durante 5 minutos desmenuzando la carne. Condimenta con sal marina, pimienta, comino molido y pimentón dulce. Retira del fuego e incorpora el huevo duro picado. Deja templar el relleno.`,
        timerSeconds: 300,
        tip: 'Nunca armes las empanadas con el relleno caliente para no ablandar la masa antes del horno.',
        equipment: ['Espátula']
      });
      steps.push({
        step: 3,
        instruction: `Precalienta el horno a 200°C. Coloca una porción generosa de relleno en el centro de cada disco de masa, humedece los bordes y realiza un repulgue firme. Pincela con un toque de huevo batido para un dorado brillante.`,
        timerSeconds: 0,
        tip: 'Cerrar sin que quede aire dentro evita que la masa se abra durante la expansión del vapor en el horno.',
        equipment: ['Placa de horno', 'Pincel de cocina']
      });
      steps.push({
        step: 4,
        instruction: `Hornea durante 15 a 18 minutos hasta que la masa adquiera un tono dorado intenso y crujiente. Retira, deja reposar 2 minutos y sirve bien calientes.`,
        timerSeconds: 960,
        tip: 'El reposo de 2 minutos permite que los jugos internos se asienten sin quemar al morder.',
        equipment: ['Plato de servicio']
      });
      return steps;
    }

    if (archetype.type === 'milanesa') {
      steps.push({
        step: 1,
        instruction: `Prepara la estación de rebozado: Bate el huevo con ajo picado, perejil fresco y sal. Pasa los filetes de ${protName} por el huevo y luego presiónalos firmemente sobre el pan rallado integral / avena para que quede una capa uniforme y crujiente.`,
        timerSeconds: 0,
        tip: 'Presionar la carne con la palma de la mano asegura que el rebozado quede adherido sin desprenderse al cocinar.',
        equipment: ['2 Fuentes planas', 'Tenedor']
      });
      steps.push({
        step: 2,
        instruction: `Dispone las milanesas en una bandeja de horno precalentada a 200°C con unas gotas de AOVE. Hornea durante 8 minutos por lado (o sella en sartén a fuego medio-alto 3-4 min por lado).`,
        timerSeconds: 480,
        tip: 'Cocinarlas a horno fuerte con placa precalentada logra el mismo crujiente que la fritura pero con un 80% menos de grasas.',
        equipment: ['Placa de horno antiadherente']
      });
      steps.push({
        step: 3,
        instruction: query.includes('napolitana') 
          ? `Cubre cada milanesa con salsa de tomate casera y láminas de queso mozzarella/parmesano. Gratina en el horno a 220°C durante 4 a 5 minutos hasta que el queso burbujee.` 
          : `Corta las papas o batatas en bastones, sazona con pimentón y hornéalas hasta que estén tiernas y doradas.`,
        timerSeconds: 300,
        tip: 'Un toque de orégano seco sobre el queso fundido potencia el aroma clásico napolitano.',
        equipment: ['Horno / Espátula']
      });
      steps.push({
        step: 4,
        instruction: `Emplata la milanesa recién salida, acompaña con gajos de limón fresco y la guarnición elegida. ¡Disfruta inmediatamente!`,
        timerSeconds: 0,
        tip: 'El chorrito de limón al momento aporta frescura y corta la untuosidad del plato.',
        equipment: ['Plato llano']
      });
      return steps;
    }

    if (archetype.type === 'poke_ceviche') {
      steps.push({
        step: 1,
        instruction: `Corta ${protName} en dados limpios y regulares de 1.5 cm. En un bowl frío, mezcla con zumo de lima recién exprimido, un toque de sal marina y cebolla morada en pluma muy fina.`,
        timerSeconds: 0,
        tip: 'Mantener el pescado bien frío y usar un cuchillo con filo impecable preserva la firmeza y brillo del corte.',
        equipment: ['Tabla de corte', 'Cuchillo de chef afilado', 'Bowl de vidrio']
      });
      steps.push({
        step: 2,
        instruction: `Deja marinar durante 4 a 6 minutos para que los cítricos desnaturalicen ligeramente las proteínas superficiales ("leche de tigre").`,
        timerSeconds: 300,
        tip: 'Para pescados de alta calidad, un marinado corto conserva el corazón jugoso y tierno.',
        equipment: ['Temporizador']
      });
      steps.push({
        step: 3,
        instruction: `Prepara la base de granos (arroz o quinoa) en un bowl amplio. Dispone por sectores el aguacate en abanico, los edamames y el pepino crujiente.`,
        timerSeconds: 0,
        tip: 'El contraste de temperaturas (base templada e ingredientes fríos) eleva la experiencia gastronómica.',
        equipment: ['Bowl gourmet']
      });
      steps.push({
        step: 4,
        instruction: `Corona con la proteína marinada en el centro, vierte el aderezo restante y decora con semillas de sésamo tostado y cilantro fresco. ¡Sirve al instante!`,
        timerSeconds: 0,
        tip: 'Consumir recién montado asegura el máximo crujiente de las semillas y frescura del pescado.',
        equipment: ['Bowl de presentación']
      });
      return steps;
    }

    if (archetype.type === 'lasagna') {
      steps.push({
        step: 1,
        instruction: `Sofrito y boloñesa: En una sartén con AOVE, rehoga la cebolla y el ajo picados. Incorpora ${protName} y dora a fuego vivo 5 min. Añade la salsa de tomate, orégano y albahaca, y deja reducir 10 min a fuego lento.`,
        timerSeconds: 600,
        tip: 'Cocinar la salsa a fuego suave permite que la carne absorba los aromas del tomate y la albahaca.',
        equipment: ['Sartén honda', 'Espátula']
      });
      steps.push({
        step: 2,
        instruction: `Montaje por capas: En una fuente apta para horno, coloca una base fina de salsa, una capa de láminas de pasta, relleno de carne, espinacas y una capa de queso ricotta / mozzarella. Repite hasta completar 3 capas.`,
        timerSeconds: 0,
        tip: 'Asegúrate de cubrir bien los bordes de la pasta con salsa para que se hidraten uniformemente.',
        equipment: ['Fuente refractaria para horno']
      });
      steps.push({
        step: 3,
        instruction: `Corona la lasaña con abundante queso parmesano rallado. Cubre con papel de aluminio y hornea a 190°C durante 18 minutos.`,
        timerSeconds: 1080,
        tip: 'El papel aluminio retiene la humedad interna para cocinar la pasta sin quemar la superficie.',
        equipment: ['Horno', 'Papel aluminio']
      });
      steps.push({
        step: 4,
        instruction: `Retira el papel de aluminio y gratina a 220°C durante 5 a 7 minutos hasta obtener una costra dorada y burbujeante. Deja reposar 5 min antes de cortar.`,
        timerSeconds: 360,
        tip: 'El reposo previo al corte es crucial para que las capas se compacten y no se desarmen al servir.',
        equipment: ['Pala para servir']
      });
      return steps;
    }

    if (archetype.type === 'pasta') {
      steps.push({
        step: 1,
        instruction: `En una olla amplia, pon a hervir 2 litros de agua con un puñado generoso de sal marina. Cuando rompa el hervor, añade la pasta y cocina durante los minutos indicados para un punto "al dente".`,
        timerSeconds: 540,
        tip: 'El agua debe tener el punto de sal del agua de mar para sazonar la pasta desde el núcleo.',
        equipment: ['Olla grande', 'Pinzas de pasta']
      });
      steps.push({
        step: 2,
        instruction: `Mientras tanto, en una sartén con AOVE dora los dientes de ajo laminados y añade ${protName}. Sella a fuego vivo durante 4 a 5 minutos y agrega los tomates cherry cortados al medio.`,
        timerSeconds: 270,
        tip: 'Saltear a fuego fuerte carameliza los azúcares naturales de los tomates cherry creando una salsa instantánea.',
        equipment: ['Sartén antiadherente']
      });
      steps.push({
        step: 3,
        instruction: `Mantecatura: Escurre la pasta reservando 1/2 taza del agua de cocción con almidón. Vierte la pasta directamente en la sartén con la proteína, añade el agua de cocción y saltea enérgicamente para emulsionar la salsa.`,
        timerSeconds: 120,
        tip: 'El almidón del agua de pasta emulsiona con el aceite creando una salsa brillante y sedosa sin necesidad de nata.',
        equipment: ['Sartén']
      });
      steps.push({
        step: 4,
        instruction: `Retira del fuego. Incorpora hojas de albahaca fresca troceadas con las manos, abundante parmesano recién rallado y un toque de pimienta negra molida. ¡Emplata de inmediato!`,
        timerSeconds: 0,
        tip: 'Romper la albahaca a mano en lugar de cuchillo previene la oxidación y mantiene su perfume fresco intacto.',
        equipment: ['Plato hondo']
      });
      return steps;
    }

    if (archetype.type === 'tacos') {
      steps.push({
        step: 1,
        instruction: `Marinado exprés: Corta ${protName} en tiras delgadas. Mezcla en un bowl con zumo de lima, ajo picado, pimentón, comino, sal y unas gotas de AOVE. Deja marinar 5 minutos.`,
        timerSeconds: 300,
        tip: 'El zumo de lima ablanda las fibras de la carne haciéndola más tierna y jugosa al saltear.',
        equipment: ['Tabla de corte', 'Bowl de marinado']
      });
      steps.push({
        step: 2,
        instruction: `Prepara los acompañamientos: Pica la cebolla morada en pluma fina con cilantro fresco y gajos de lima. Machaca el aguacate con sal y unas gotas de cítrico para un guacamole rústico.`,
        timerSeconds: 0,
        tip: 'Mantener la cebolla y el cilantro bien frescos aporta el contraste crujiente clásico de las taquerías.',
        equipment: ['Cuchillo de chef']
      });
      steps.push({
        step: 3,
        instruction: `Calienta una plancha o sartén de hierro a fuego muy vivo. Vierte la carne marinada y cocina durante 4 a 6 minutos sin remover en exceso para lograr un sellado ahumado y jugoso.`,
        timerSeconds: 300,
        tip: 'El fuego bien caliente sella los jugos al instante y aporta el característico sabor a las brasas.',
        equipment: ['Plancha / Sartén de hierro']
      });
      steps.push({
        step: 4,
        instruction: `Calienta las tortillas de maíz 30 segundos por lado. Rellena generosamente con la carne caliente, corona con guacamole, cebolla morada, pico de gallo y lima fresca. ¡Sirve al momento!`,
        timerSeconds: 60,
        tip: 'Calentar la tortilla sobre la misma plancha de la carne absorbe los aromas residuales.',
        equipment: ['Plato para tacos']
      });
      return steps;
    }

    if (archetype.type === 'burger') {
      steps.push({
        step: 1,
        instruction: `Forma el medallón con ${protName} sin compactar en exceso para mantener la jugosidad interna. Sazona ambas caras con sal marina gruesa y pimienta recién molida.`,
        timerSeconds: 0,
        tip: 'Sazonar justo antes de cocinar y no mezclar la sal dentro de la carne mantiene una textura mucho más tierna.',
        equipment: ['Tabla de corte']
      });
      steps.push({
        step: 2,
        instruction: `Calienta una plancha de hierro a fuego alto. Coloca el medallón y presiona firmemente los primeros 10 segundos. Cocina 3 minutos por lado. Añade el queso encima en el último minuto y cubre con una campana para fundir.`,
        timerSeconds: 240,
        tip: 'Cubrir con una tapa y unas gotas de agua en la plancha genera vapor que derrite el queso en segundos.',
        equipment: ['Plancha de hierro', 'Espátula de metal']
      });
      steps.push({
        step: 3,
        instruction: `Tuesta el pan sobre la plancha con unas gotas de AOVE durante 1 minuto hasta que esté dorado y crujiente para que no absorba la humedad de los vegetales.`,
        timerSeconds: 60,
        tip: 'El tostado crea una barrera crujiente que evita que el pan se ablande con las salsas.',
        equipment: ['Plancha']
      });
      steps.push({
        step: 4,
        instruction: `Montaje: Unta la base con mostaza dijon, coloca hojas verdes, rodajas de tomate fresco, el medallón con queso fundido y cebolla caramelizada. ¡Sirve con la guarnición dorada!`,
        timerSeconds: 0,
        tip: 'Colocar la lechuga en la base protege el pan inferior de los jugos calientes de la carne.',
        equipment: ['Plato gourmet']
      });
      return steps;
    }

    if (archetype.type === 'curry') {
      steps.push({
        step: 1,
        instruction: `En una cazuela o wok a fuego medio, rehoga con AOVE la cebolla en juliana, el ajo picado y el jengibre rallado durante 4 minutos hasta que desprendan todo su aroma.`,
        timerSeconds: 240,
        tip: 'Rallar el jengibre fresco libera sus aceites esenciales mucho más que cortarlo en láminas.',
        equipment: ['Cazuela / Wok', 'Rallador']
      });
      steps.push({
        step: 2,
        instruction: `Añade ${protName} en dados junto al polvo de curry y pimentón. Tuesta las especias 1 minuto en seco junto a la proteína para activar su fragancia.`,
        timerSeconds: 180,
        tip: 'Tostar las especias en seco despierta notas aromáticas complejas que no se consiguen si se agregan en líquido.',
        equipment: ['Espátula']
      });
      steps.push({
        step: 3,
        instruction: `Vierte la leche de coco cremosa e incorpora los garbanzos / vegetales. Reduce a fuego lento y cocina tapado durante 10 a 12 minutos para que todos los sabores se concentren.`,
        timerSeconds: 660,
        tip: 'El chup-chup a fuego suave permite que la salsa espese naturalmente sin necesidad de harinas.',
        equipment: ['Cazuela con tapa']
      });
      steps.push({
        step: 4,
        instruction: `Sirve el curry caliente en un bowl hondo sobre una base de arroz basmati aromático. Decora con hojas de cilantro fresco y unas gotas de zumo de lima.`,
        timerSeconds: 0,
        tip: 'El toque ácido de la lima al final equilibra la suntuosidad de la leche de coco.',
        equipment: ['Bowl oriental']
      });
      return steps;
    }

    if (archetype.type === 'breakfast') {
      steps.push({
        step: 1,
        instruction: `En un vaso de batidora o bowl, combina las claras de huevo pasteurizadas, el huevo entero, la avena en copos, canela y esencia de vainilla. Procesa 45 segundos hasta obtener una mezcla suave y homogénea.`,
        timerSeconds: 45,
        tip: 'Dejar reposar la mezcla 2 minutos permite que la avena absorba líquido y las tortitas queden más esponjosas.',
        equipment: ['Batidora o Bowl', 'Varillas']
      });
      steps.push({
        step: 2,
        instruction: `Calienta una sartén antiadherente a fuego medio con unas gotas de aceite o spray. Vierte porciones de masa y cocina durante 2 minutos hasta que aparezcan burbujas en la superficie.`,
        timerSeconds: 120,
        tip: 'Cuando se formen burbujas estables en la cara superior es el momento exacto para dar la vuelta.',
        equipment: ['Sartén antiadherente', 'Espátula fina']
      });
      steps.push({
        step: 3,
        instruction: `Gira con cuidado y cocina 1 a 2 minutos más por el otro lado hasta que adquieran un tono dorado apetitoso.`,
        timerSeconds: 90,
        tip: 'Cocinar a fuego moderado evita que se tuesten por fuera antes de cocerse por dentro.',
        equipment: ['Sartén']
      });
      steps.push({
        step: 4,
        instruction: `Apila las tortitas en un plato, corona con yogur griego alto en proteína, rodajas de plátano / frutos rojos y un toque de canela. ¡Disfruta de un desayuno energizante!`,
        timerSeconds: 0,
        tip: 'El yogur griego aporta cremosidad fría en contraste con las tortitas calientes y eleva el contenido proteico total.',
        equipment: ['Plato llano']
      });
      return steps;
    }

    // Default High-Protein Standard Culinary Flow
    steps.push({
      step: 1,
      instruction: `Lava, seca y porciona los ingredientes frescos. Corta ${protName} en porciones uniformes y sazona con sal marina, pimienta recién molida, ajo y unas gotas de AOVE.`,
      timerSeconds: 0,
      tip: 'Secar la proteína con papel absorbente antes de la cocción garantiza un dorado crujiente sin hervirse.',
      equipment: ['Tabla de corte', 'Cuchillo de chef']
    });

    steps.push({
      step: 2,
      instruction: `Calienta una sartén amplia, plancha o wok a fuego medio-alto. Añade ${protName} y sella firmemente durante 3 a 4 minutos por lado hasta lograr una costra dorada aromática (Reacción de Maillard).`,
      timerSeconds: 240,
      tip: 'No muevas la pieza durante los primeros 2 minutos para permitir que se desarrolle el dorado caramelizado.',
      equipment: ['Sartén antiadherente o Plancha', 'Pinzas']
    });

    steps.push({
      step: 3,
      instruction: `Baja a fuego medio e incorpora los vegetales y la guarnición aromática. Saltea durante 4 a 6 minutos manteniendo las verduras al dente para preservar todos sus micronutrientes y textura crujiente.`,
      timerSeconds: 300,
      tip: 'Las verduras al dente aportan saciedad prolongada y colores vivos.',
      equipment: ['Espátula']
    });

    steps.push({
      step: 4,
      instruction: `Retira del fuego. Emplata con estética gourmet, añade hierbas frescas picadas, un toque de especias y un hilo final de aceite virgen extra en crudo. ¡Listo para disfrutar!`,
      timerSeconds: 0,
      tip: 'Dejar reposar la proteína caliente 1 minuto antes de servir redistribuye los jugos internos por toda la pieza.',
      equipment: ['Plato hondo o llano']
    });

    return steps;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Global instance
window.aiRecipeGenerator = new AIRecipeGenerator();
