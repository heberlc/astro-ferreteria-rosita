# Buscador Inteligente (Instant Search)

Sistema de búsqueda en tiempo real que muestra productos con imagen, título, marca y precio mientras el usuario escribe.

## Cómo Funciona

### 1. API Endpoint (`/api/products.json`)

En Astro, puedes crear **endpoints de API** colocando archivos `.ts` o `.js` en la carpeta `src/pages/`. Cuando el archivo tiene extensión `.json.ts`, Astro lo trata como un endpoint JSON.

**Archivo**: `src/pages/api/products.json.ts`

```typescript
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// export const GET define qué hacer cuando alguien hace GET a /api/products.json
export const GET: APIRoute = async () => {
  // Obtener todos los productos desde Content Collections
  const products = await getCollection('products');
  
  // Mapear solo los datos necesarios para la búsqueda
  const searchData = products.map(product => ({
    slug: product.data.slug || product.id,
    title: product.data.title,
    brand: product.data.brand,
    price: product.data.price,
    image: product.data.image,
    category: product.data.category,
  }));

  // Retornar como JSON
  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
```

**Conceptos clave:**
- `export const GET` - Define una ruta que responde a peticiones HTTP GET
- `APIRoute` - Tipo de TypeScript para rutas de API
- `Response` - Objeto estándar de JavaScript para respuestas HTTP

### 2. Acceso al Endpoint

Cuando visitas `http://localhost:4321/api/products.json`, Astro ejecuta esta función y devuelve un JSON con todos los productos:

```json
[
  {
    "slug": "pintura-latex-cpp",
    "title": "Pintura Látex Lavable - 4 Galones",
    "brand": "CPP",
    "price": 89.90,
    "image": "https://...",
    "category": "pinturas"
  },
  ...
]
```

### 3. Frontend (Header.astro)

El buscador en el Header hace `fetch()` a este endpoint:

```typescript
const response = await fetch("/api/products.json");
const products = await response.json();
```

Luego filtra los productos localmente mientras el usuario escribe (con debounce de 200ms).

---

## Diagrama de Flujo

```
┌─────────────┐     ┌───────────────────┐     ┌─────────────────┐
│   Usuario   │────▶│   Header.astro    │────▶│ /api/products   │
│   escribe   │     │   (JavaScript)    │     │     .json       │
└─────────────┘     └───────────────────┘     └─────────────────┘
                            │                         │
                            │   fetch()               │
                            │◀────────────────────────│
                            │   [productos JSON]      │
                            │                         │
                    ┌───────▼───────┐                 │
                    │   Filtrar     │                 │
                    │   localmente  │                 │
                    └───────┬───────┘                 │
                            │                         │
                    ┌───────▼───────┐                 │
                    │   Mostrar     │                 │
                    │   dropdown    │                 │
                    └───────────────┘
```

---

## Archivos Relacionados

| Archivo | Propósito |
|---------|-----------|
| `src/pages/api/products.json.ts` | Endpoint que retorna productos como JSON |
| `src/components/common/Header.astro` | UI del buscador y lógica de búsqueda |

---

## Métodos HTTP Disponibles

Astro soporta múltiples métodos:

```typescript
export const GET: APIRoute = async () => { /* ... */ }
export const POST: APIRoute = async () => { /* ... */ }
export const PUT: APIRoute = async () => { /* ... */ }
export const DELETE: APIRoute = async () => { /* ... */ }
```

---

## Notas Importantes

1. **En modo estático (SSG)**: El JSON se genera en build time, no cambia dinámicamente
2. **En modo SSR**: El JSON se genera en cada request (datos siempre actualizados)
3. **Seguridad**: No expongas datos sensibles en endpoints públicos

---

## Ejemplos por Tipo de Negocio

### 🏪 E-commerce / Tiendas Online

| Endpoint | Funcionalidad |
|----------|---------------|
| `/api/products.json` | Buscador instantáneo, filtros |
| `/api/cart.json` | Estado del carrito (SSR) |
| `/api/categories.json` | Menú dinámico de categorías |
| `/api/featured.json` | Productos destacados para carrusel |

### 🍕 Restaurantes / Delivery

| Endpoint | Funcionalidad |
|----------|---------------|
| `/api/menu.json` | Carta del día con precios |
| `/api/availability.json` | Platos disponibles hoy |
| `/api/locations.json` | Sucursales para mapa interactivo |

### 🏠 Inmobiliarias

| Endpoint | Funcionalidad |
|----------|---------------|
| `/api/properties.json` | Buscador de propiedades con filtros |
| `/api/agents.json` | Lista de agentes por zona |
| `/api/neighborhoods.json` | Datos para filtro por ubicación |

### 📚 Blogs / Portales de Contenido

| Endpoint | Funcionalidad |
|----------|---------------|
| `/api/posts.json` | Buscador de artículos |
| `/api/tags.json` | Nube de etiquetas dinámica |
| `/api/recent.json` | Últimos artículos para widget |

### 🎓 Educación / Cursos Online

| Endpoint | Funcionalidad |
|----------|---------------|
| `/api/courses.json` | Catálogo de cursos con filtros |
| `/api/instructors.json` | Perfil de profesores |
| `/api/schedule.json` | Horarios disponibles |

### 🏥 Clínicas / Servicios de Salud

| Endpoint | Funcionalidad |
|----------|---------------|
| `/api/doctors.json` | Buscador de médicos por especialidad |
| `/api/services.json` | Lista de servicios con precios |
| `/api/appointments.json` | Citas disponibles (SSR) |

---

## Cuándo Usar API Endpoints

✅ **Usa endpoints cuando necesites:**
- Datos para JavaScript (buscadores, filtros, mapas)
- Alimentar aplicaciones móviles
- Compartir datos entre páginas sin recargar
- Integraciones con servicios externos

❌ **No necesitas endpoints para:**
- Contenido estático que no cambia
- Páginas que no requieren interactividad
- Datos que solo se muestran una vez
