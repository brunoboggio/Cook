# 🍳 Cook (FridgeFlow) — High-Protein Culinary Intelligence & Kitchen OS

Una plataforma web interactiva y moderna de **planificación de menús proteicos, generación de recetas con Inteligencia Artificial, gestión de precios en \$ ARS y consolidación inteligente de listas de compras para supermercados**.

Diseñada con estética **Awwwards Obsidian Dark & Linen Light**, 100% responsive para teléfonos móviles, tablets y computadoras de escritorio.

---

## 🌟 Características Principales

### 1. 📅 Planificador Semanal & Carrito Consolidado (planner.html)
- **Configuración Dinámica**: Elige días por semana (3, 5, 7 o a medida) y semanas totales de compra (1 a 8 semanas).
- **Meta Proteica Personalizada**: Selector con slider y presets (90g, 120g, 150g, 180g) con cálculo en tiempo real de macronutrientes.
- **Batch Cooking**: Duplicación inteligente de comidas con 1 clic para ahorrar tiempo de cocción.
- **Carrito de Compras por Pasillos**: Consolidación automática de todos los ingredientes sumados por categoría (Carnicería, Frutería, Lácteos, Despensa).
- **Exportación Multi-Canal**:
  - 📲 Enviar lista formateada directamente a **WhatsApp**.
  - 📋 Copiar lista al portapapeles.
  - 🖨️ Imprimir / Guardar en PDF con formato de supermercado.

### 2. 🍳 Catálogo Gourmet & Creador con IA (ecipes.html)
- **Catálogo de 37+ Recetas Proteicas**: Desayunos, almuerzos y cenas optimizados en proteínas, calorías y tiempo de cocción.
- **Filtros Avanzados**: High Protein, Express (≤20 min), Keto / Low Carb, Vegetariano y Favoritas.
- **Chef IA Integrado**:
  - Creación de recetas nuevas a partir de nombres de platos, fotos o capturas de pantalla.
  - Estimación instantánea de macros (proteína, carbohidratos, grasas y calorías), ingredientes y pasos culinarios.

### 3. 💰 Precios de Insumos en \$ ARS (prices.html)
- **Gestor de Precios en Pesos Argentinos**: Personalización de los 65 ingredientes base según tu supermercado o comercio de confianza.
- **Ajuste Masivo por Inflación %**: Actualización rápida de precios por lote.
- **Sincronización en Tiempo Real**: Todo cambio de precio recalcula instantáneamente el presupuesto estimado en el carrito de compras.

### 4. 👨‍🍳 Modo Cocina Chef HUD (cook.html)
- **Guía Paso a Paso Interactiva**: Modo enfocado o vista de hoja completa.
- **Mise en Place**: Checklist de ingredientes con cantidades exactas.
- **Herramientas de Cocina**: Temporizadores inteligentes, narrador por voz en español y sonido ambiente de cocina (Bistro).
- **Pantalla Siempre Activa**: Wake-Lock API para evitar que el teléfono se apague mientras cocinas.

---

## 📱 100% Responsive & PWA Ready

- Diseñado para una experiencia táctil fluida en **Smartphones (iPhone, Android)** y **Tablets (iPad)**.
- Soporte para **PWA (Progressive Web App)** con Service Worker (sw.js) y manifest.json para instalarse como app nativa en la pantalla de inicio.
- Almacenamiento local privado en localStorage con sistema de **Copia de Seguridad y Migración JSON (Ctrl+B)** sin necesidad de crear cuenta ni registrar datos personales.

---

## 🛠️ Tecnologías

- **HTML5 & CSS3 Moderno**: Variables CSS, Glassmorphism, Bento Grids y animaciones fluidas con curvas Bézier.
- **Vanilla JavaScript (ES6+)**: Cero dependencias externas pesadas, carga ultrarrápida.
- **Web Audio API**: Efectos de sonido hápticos y música ambiental procedural de cocina.
- **Web Speech & Screen Wake Lock APIs**: Asistencia de voz y pantalla activa.

---

## 🌐 Producción & Despliegue Continuo (CI/CD)

- **URL Oficial**: [http://cook.liberatueco.com/](http://cook.liberatueco.com/)
- **Servidor BanaHosting**: `bh8958.banahosting.com`
- Despliegue automático vía GitHub Actions sincronizado con BanaHosting vía FTPS Seguro.

---

Diseñado con pasión por la gastronomía inteligente y la alimentación saludable · © 2026 Cook / FridgeFlow.
