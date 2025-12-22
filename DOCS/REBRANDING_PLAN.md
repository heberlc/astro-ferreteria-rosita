# Plan de Rebranding: Ferretería Rosita

Este documento detalla la estrategia para modernizar la presencia web de **Corporación Ferretería Rosita**, migrando de WordPress a una arquitectura moderna basada en **Astro** y **TailwindCSS**.

## 1. Análisis Actual y Objetivos

### Estado Actual
- **Tecnología**: WordPress (Elementor).
- **Contenido**: Catálogo de productos (Gasfitería, Construcción, etc.), Información Corporativa, Contacto.
- **Identidad**: Funcional, enfocada en marcas y productos.

### Objetivos del Rebranding
- **Velocidad y Rendimiento**: Obtener puntuaciones de 100/100 en Lighthouse mediante Astro (SSG).
- **Estética Premium**: Diseño moderno, limpio y profesional con TailwindCSS.
- **Gestión de Contenido**: Centralizar productos y textos en **Content Collections** (Markdown/MDX) para mantenimiento sencillo.
- **Experiencia de Usuario (UX)**: Mejorar la navegación móvil y la búsqueda de productos.

---

## 2. Identidad de Marca Propuesta

Mantendremos la esencia "Ferretera" pero con un toque moderno y tecnológico.

### Paleta de Colores (Tailwind Config)
Proponemos mantener el naranja característico (construcción/fuerza) pero ajustado a tonos web modernos.

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        rosita: {
          orange: '#FF6B00', // Principal: Acción, Construcción
          dark: '#1A1A1A',   // Fondos oscuros, Texto principal
          gray: '#F3F4F6',   // Fondos claros
          blue: '#004E98',   // Confianza, Corporativo (Acento)
        }
      }
    }
  }
}
```

### Tipografía
- **Principal (Títulos)**: *Outfit* o *Manrope* (Modernas, geométricas).
- **Cuerpo**: *Inter* (Legibilidad excelente).

### Visualización Conceptual (Mockup)

![Diseño Propuesto - Home](assets/ferreteria_rosita_home_mockup.png)
![Diseño Propuesto - Home](assets/ferreteria_rosita_home_mockup.png)
*Concepto de diseño industrial "Dark Mode" con acentos naranjas de alta visibilidad.*

### Análisis de Diseños Provistos (Stitch Assets)

El usuario ha proporcionado maquetas de alta fidelidad en `DOCS/assets/UI` que confirman la dirección visual:
-   **Homepage (`ferretería_rosita_homepage_1`)**: Implementa el modo oscuro con la paleta exacta propuesta (`#181411` fondo, `#f96b06` acento). Incluye navegación con "glassmorphism" y grillas de categorías efectivas.
-   **Catálogo (`product_catalog_page`)**: Estructura sólida con Sidebar de filtros (Categoría, Precio, Marca) y Grid de productos responsive.
-   **Conclusión**: Utilizaremos estos archivos HTML como base para crear los componentes Astro (`Header.astro`, `ProductCard.astro`, `FilterSidebar.astro`), acelerando el desarrollo del frontend.

> **Prompt de Generación:**
> *A modern, premium, high-fidelity UI design for a hardware store website 'Ferretería Rosita'. Theme: Industrial but clean and modern. Colors: Vibrant Orange (#FF6B00) accents, Dark Gray (#1A1A1A) backgrounds, Clean White text areas. Header: Modern navigation bar with logo, search bar, and cart icon. Hero Section: Large, high-quality background image of a construction site or tools, with a bold overlay text 'Soluciones Confiables para tu Proyecto' and a primary Call-to-Action button 'Ver Catálogo'. Features: A grid of 'Categorías Destacadas' (Construction, Plumbing, Electricity) using modern cards with icons or images. Style: Glassmorphism effects, rounded corners, clean sans-serif typography (Outfit or Inter). View: Desktop website screenshot.*

### ¿Por qué este diseño es superior al actual?

1.  **Psicología de Color "Heavy Duty"**:
    -   El uso de **Fondo Oscuro + Naranja Vibrante** es el estándar de oro en marcas industriales profesionales (como DeWalt, Home Depot, CAT).
    -   *Beneficio*: Transmite inconscientemente **durabilidad, fuerza y calidad profesional**, diferenciándose de ferreterías genéricas que usan blanco/azul estándar.

2.  **Jerarquía Visual y Conversión**:
    -   El **alto contraste** dirige el ojo humano inmediatamente a los botones de acción ("Ver Catálogo", "Cotizar").
    -   *Beneficio*: Reduce la carga cognitiva del cliente. Encontrará lo que busca más rápido, aumentando la probabilidad de contacto.

3.  **Experiencia Móvil (Mobile First)**:
    -   Botones y tarjetas grandes ("Touch Targets") diseñados para dedos, no solo cursores.
    -   *Beneficio*: Pensado para el maestro de obra o ingeniero que consulta desde el celular en el sitio de construcción.

4.  **Modernidad = Eficiencia**:
    -   Un diseño limpio y moderno (Glassmorphism, tipografía geométrica) comunica que la empresa está actualizada.
    -   *Beneficio*: Genera confianza implícita. "Si su web es moderna y eficiente, su logística y atención también lo serán".

---

## 3. Arquitectura Técnica (Astro)

Utilizaremos **Astro v5** para aproveitar las 'Content Layer' y Server Islands si es necesario para interactividad.

### Estructura de Carpetas

```
src/
├── components/
│   ├── common/       # Header, Footer, SEO
│   ├── home/         # Hero, FeaturedProducts, BrandCarousel
│   └── ui/           # Botones, Cards, Badges (Atomic Design)
├── content/
│   ├── products/     # Colección de productos (MDX + Schema)
│   ├── brands/       # Colección de marcas (Logos, Info)
│   └── config.ts     # Definición de esquemas Zod
├── layouts/
│   └── Layout.astro  # Layout principal
├── pages/
│   ├── index.astro
│   ├── nosotros.astro
│   ├── catalogo/
│   │   ├── [category].astro
│   │   └── [product].astro
│   └── contactanos.astro
└── styles/
    └── global.css    # Tailwind directives
```

### Content Collections
Definiremos esquemas estrictos para garantizar la integridad de los datos.

**`src/content/config.ts`**
```typescript
const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    title: z.string(),
    price: z.number().optional(),
    category: z.enum(['Construcción', 'Gasfitería', 'Electricidad', 'Pinturas', 'Ferretería', 'Cerámicos']),
    brand: z.string(),
    image: z.string(), // Path relativo o URL
    features: z.array(z.string()).optional(),
    stock: z.boolean().default(true),
  })
});
```

---

## 4. Estrategia de Contenido

### Páginas Clave

#### 1. Inicio (`/`)
- **Hero Section**: Imagen de alto impacto (obra/construcción) con propuesta de valor clara: *"Soluciones confiables para tu hogar o negocio con más de 28 años de experiencia."*
- **Categorías Destacadas**: Grid visual (Tarjetas con iconos modernos).
- **Carrusel de Marcas**: Logos en escala de grises que se colorean al hover (Pavco, Cantol, Chema, etc.).
- **CTA Contacto**: "¿Tienes un proyecto grande? Cotiza con nosotros".

#### 2. Nosotros (`/nosotros`)
- **Historia**: "Pioneros desde hace 28 años..."
- **Valores**: Cards con iconos para Respeto, Honestidad, Compromiso, Excelencia.
- **Equipo**: (Opcional) Fotos del equipo de ventas/almacén para generar confianza.

#### 3. Catálogo (`/catalogo`)
- Filtros laterales por Categoría y Marca (usando Astro `getStaticPaths` o ViewTransitions).
- Buscador rápido (Islands architecture con React o Preact si es necesario).

#### 4. Contacto (`/contactanos`)
- Formulario funcional (Netlify Forms o Formspree).
- Mapa embebido (Google Maps).
- Datos claros:
    - 📍 Av. Guardia Civil 221- 225 Urb. La Campiña, Chorrillos.
    - 📞 955 314 610 / (01) 251 5860
    - ✉️ ventas.empresarial@rosita.pe

---

## 5. Estrategia de Catálogo y Migración

Hemos elaborado un mapa detallado de categorías y productos representativos para la migración inicial.

### Estructura de Categorías Propuesta

#### 1. Construcción (Materiales Gruesos y Techos)
*Foco: Obra gruesa y techados.*
- **Cementos**: Cemento Sol (Tipo 1), Cemento Andino Ultra HS.
- **Techos y Coberturas**:
    - Policarbonato (Glanze).
    - Techos Aluzinc (Mitecho TR4).
    - Placas Fibrocemento (Superboard, Multiplaca).
- **Sistema Drywall**: Placas Volcanita (Standard, RH), Rieles y Parantes.
- **Agregados y Concreto**: Concreto listo (Unicon, Quikrete), Ladrillos.

#### 2. Baños y Gasfitería (Acabados y Redes)
*Foco: Instalaciones sanitarias y grifería.*
- **Tuberías y Conexiones**: PVC y CPVC (Pavco, Nicoll), Codos, Adaptadores.
- **Tanques y Cisternas**: Rotoplas, Fibraforte (1100L, 600L).
- **Sanitarios**: Inodoros One Piece (Tarraco, Trebol), Lavatorios.
- **Grifería**: Llaves de jardín, Mezcladoras (Italgrif, Vainsa).
- **Accesorios**: Duchas eléctricas (Lorenzetti), Válvulas.

#### 3. Iluminación y Electricidad
*Foco: Conductores y dispositivos de protección.*
- **Cables**: THW, TW, NH-80 (Indeco, Brande).
- **Tableros y Llaves**: Interruptores Termomagnéticos y Diferenciales (Bticino).
- **Iluminación**: Focos LED, Reflectores.

#### 4. Pinturas y Acabados
*Foco: Decoración y protección de superficies.*
- **Pinturas Látex**: American Colors, Duralatex (CPP), Latex Pato.
- **Preparación de Superficie**: Imprimantes (Majestad), Masillas, Selladores.
- **Complementos**: Thinner, Lijas (Asa), Brochas y Rodillos.

#### 5. Ferretería General
*Foco: Seguridad y herramientas.*
- **Cerrajería**:
    - Cerraduras de Perilla y Manija (Travex, Wailec).
    - Cerraduras Blindadas y de Sobreponer (Cantol, Forte).
- **Herramientas Manuales**: Martillos, Alicates, Cajas de herramientas (Truper).
- **Fijaciones**: Tornillos (Drywall, Autoperforantes), Clavos.
- **Abrasivos**: Discos de corte (Norton), Lijas de fierro.

#### 6. Cerámicos y Pegamentos
*Foco: Pisos y enchapes.*
- **Pegamentos**: Porcelanas y Fraguas (Chema, Celima).
- **Pegamentos**: Porcelanas y Fraguas (Chema, Celima).
- **Pisos**: Cerámicos y Porcelanatos.

---

## 6. Funcionalidades de Valor Agregado (Propuesta)

Para ir más allá de lo estético, implementaremos herramientas que **conviertan visitantes en clientes**.

### 1. "Carrito de Cotización" a WhatsApp
En lugar de un checkout complejo de e-commerce (que requiere pasarelas de pago y burocracia), implementaremos un sistema ágil:
-   **Funcionamiento**: El usuario añade productos al "carrito" -> Clic en "Pedir Cotización" -> Se genera un mensaje automático de WhatsApp con el detalle del pedido (SKUs y cantidades) directo al vendedor de Rosita.
-   **Tecnología (Nano Stores)**:
    -   Usaremos **@nanostores/persistent** para guardar el carrito en `localStorage` (sin bloqueo de hidratación).
    -   Permite compartir el estado del carrito entre componentes UI (React/Preact islands) y componentes Astro estáticos (como el contador del header) sin overhead.
-   *Valor*: Cierra la venta en el canal donde la gente ya conversa. Ideal para Perú.

### 2. Calculadoras de Materiales (Enganche)
Herramientas sencillas incrustadas en las páginas de producto para ayudar al maestro/constructor.
-   **Calculadora de Ladrillos/Muro**: Ingresa m² -> Salida: Cantidad de ladrillos y bolsas de cemento estimadas.
-   **Calculadora de Pintura**: Ingresa m² de pared -> Salida: Galones necesarios.
-   *Valor*: Posiciona a Rosita no solo como vendedor, sino como **asesor experto**. Aumenta el tiempo en página (SEO).

### 3. Buscador Inteligente (Instant Search)
Implementación de un buscador que muestra resultados con imagen y precio *mientras escribes*.
-   *Valor*: Vital para catálogos con ferretería menuda (tornillos, codos, accesorios) donde navegar por categorías puede ser lento.

---

## 7. Plan de Desarrollo por Etapas

El desarrollo se ejecutará en **7 etapas secuenciales**. Cada etapa incluye:
1.  Actividades específicas con checklist.
2.  Build de verificación (`npm run build`).
3.  Commit si el build es exitoso.

Consultar el documento detallado: [DEVELOPMENT_STAGES.md](DEVELOPMENT_STAGES.md)

| Etapa | Descripción | Commit |
|-------|-------------|--------|
| 1 | Foundation (Scaffold) | `feat: initial project scaffold` |
| 2 | Core Layout | `feat: core layout components` |
| 3 | Homepage | `feat: homepage implementation` |
| 4 | Catalog System | `feat: catalog system` |
| 5 | Static Pages | `feat: static pages` |
| 6 | WhatsApp Cart | `feat: whatsapp cart integration` |
| 7 | SEO & Optimization | `feat: seo optimization` |
