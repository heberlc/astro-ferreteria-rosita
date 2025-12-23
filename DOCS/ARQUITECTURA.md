# Arquitectura del Proyecto

## Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE PAGES                          │
│                    (Hosting CDN)                             │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ Deploy
                              │
┌─────────────────────────────────────────────────────────────┐
│                      GITHUB                                  │
│                   (Repositorio)                              │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ git push
                              │
┌─────────────────────────────────────────────────────────────┐
│                   LOCAL DEV                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                      ASTRO                             │  │
│  │  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐ │  │
│  │  │   Pages     │   │ Components  │   │   Layouts   │ │  │
│  │  │ /catalogo   │   │ ProductCard │   │   Layout    │ │  │
│  │  │ /contacto   │   │ Header      │   │             │ │  │
│  │  └──────┬──────┘   └──────┬──────┘   └─────────────┘ │  │
│  │         │                 │                           │  │
│  │         ▼                 ▼                           │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │              CONTENT COLLECTIONS                │ │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │ │  │
│  │  │  │ Products │  │Categories│  │   Settings   │  │ │  │
│  │  │  │  (.mdoc) │  │  (.mdoc) │  │   (.yaml)    │  │ │  │
│  │  │  └──────────┘  └──────────┘  └──────────────┘  │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                              ▲                               │
│                              │ Edita                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    KEYSTATIC                           │  │
│  │                 /keystatic (admin)                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Flujo de Datos

```
Usuario visita /catalogo
        │
        ▼
┌───────────────┐
│  [slug].astro │ ◄─── Página dinámica
└───────┬───────┘
        │
        ▼
┌───────────────────┐
│ getCollection()   │ ◄─── Astro Content API
│ products          │
└───────┬───────────┘
        │
        ▼
┌───────────────────┐
│ src/content/      │
│ products/*.mdoc   │ ◄─── Archivos Markdoc
└───────────────────┘
```

---

## Capas del Sistema

### 1. Presentación (Frontend)
- `src/pages/` - Rutas y páginas
- `src/components/` - Componentes reutilizables
- `src/layouts/` - Layout base
- `src/styles/` - CSS global

### 2. Contenido (CMS)
- `src/content/products/` - Productos (.mdoc)
- `src/content/categories/` - Categorías (.mdoc)
- `src/content/settings/` - Configuración (.yaml)

### 3. Configuración
- `src/config/site.ts` - Variables del sitio
- `src/config/settings.ts` - Lectura de Keystatic
- `keystatic.config.ts` - Esquema del CMS

### 4. Scripts (Client-side)
- `src/scripts/cart-store.ts` - Carrito de compras
- `src/scripts/filter-engine.js` - Filtros del catálogo

---

## Componentes Principales

```
Header.astro ─────────────────────────────────────────────────
       │                      │                    │
   Logo.astro            NavMenu.astro        CartIcon.astro
                                                    │
                                            CartDrawer.astro

ProductCard.astro ────────────────────────────────────────────
       │
   Image + Title + Price + AddToCart

[slug].astro ─────────────────────────────────────────────────
       │                      │                    │
  ProductImage.astro   VariantSelector.astro   AddToCart.astro
```

---

## Base de Datos (Archivos)

No hay base de datos tradicional. Los datos viven en archivos:

| Tipo | Formato | Ubicación |
|------|---------|-----------|
| Productos | YAML + Markdoc | `src/content/products/*.mdoc` |
| Categorías | YAML + Markdoc | `src/content/categories/*.mdoc` |
| Config | YAML | `src/content/settings/site.yaml` |
| Assets | Imágenes | `src/assets/` |

---

## Build Process

```
pnpm build
    │
    ▼
┌────────────────────┐
│  Astro Compiler    │
│  - Procesa .astro  │
│  - Procesa .mdoc   │
│  - Optimiza imgs   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│     /dist          │
│  HTML estático     │
│  CSS optimizado    │
│  JS minimal        │
│  Imgs WebP         │
└────────────────────┘
```
