# Plan de Desarrollo por Etapas - Ferretería Rosita

Este documento describe las actividades detalladas para cada etapa del desarrollo.
Al finalizar cada etapa:
1. Se ejecutará `pnpm run build` para verificar que no hay errores.
2. Si el build es exitoso, se realizará un commit con el mensaje indicado.

---

## Etapa 1: Foundation (Scaffold)

**Objetivo**: Inicializar el proyecto base con Astro y TailwindCSS.

### Actividades
- [x] ~~Ejecutar `pnpm create astro@latest ./` para iniciar proyecto.~~ (Pre-instalado)
- [x] ~~Instalar TailwindCSS v4.~~ (Pre-instalado: `@tailwindcss/vite`, `tailwindcss`)
- [x] ~~Instalar Sharp para optimización de imágenes.~~ (Pre-instalado)
- [ ] Configurar `tailwind.config.mjs` (o CSS Variables) con la paleta Rosita.
- [ ] Crear estructura base de carpetas:
    - `src/components/common/`
    - `src/components/home/`
    - `src/components/catalog/`
    - `src/components/ui/`
    - `src/content/products/`
    - `src/content/categories/`
- [ ] Crear `src/content/config.ts` con esquemas Zod para productos y categorías.
- [ ] Limpiar archivos de ejemplo generados por Astro.

### Verificación
```bash
pnpm run build
```

### Commit
```bash
git add -A && git commit -m "feat: initial project scaffold with Astro and TailwindCSS"
```

---

## Etapa 2: Core Layout

**Objetivo**: Crear los componentes de layout reutilizables.

### Actividades
- [ ] Crear `src/layouts/Layout.astro` con estructura HTML base (head, body).
- [ ] Implementar `src/components/common/Header.astro` usando el HTML de Stitch.
- [ ] Implementar `src/components/common/Footer.astro` usando el HTML de Stitch.
- [ ] Agregar Google Fonts (Inter) en el layout.
- [ ] Crear archivo `src/styles/global.css` con estilos base.

### Verificación
```bash
pnpm run build
```

### Commit
```bash
git add -A && git commit -m "feat: core layout with Header and Footer components"
```

---

## Etapa 3: Homepage

**Objetivo**: Implementar la página de inicio completa.

### Actividades
- [ ] Crear `src/components/home/Hero.astro` con gradientes y CTA.
- [ ] Crear `src/components/home/CategoryGrid.astro` con tarjetas de categoría.
- [ ] Crear `src/components/home/FeaturedProducts.astro` con grid de productos.
- [ ] Crear `src/components/home/TrustIndicators.astro` (Envíos, Seguridad, Soporte).
- [ ] Ensamblar todos los componentes en `src/pages/index.astro`.

### Verificación
```bash
pnpm run build
```

### Commit
```bash
git add -A && git commit -m "feat: homepage with Hero, Categories, Products and Trust sections"
```

---

## Etapa 4: Catalog System

**Objetivo**: Crear el sistema de catálogo con Content Collections.

### Actividades
- [ ] Crear `src/components/catalog/ProductCard.astro`.
- [ ] Crear `src/components/catalog/FilterSidebar.astro`.
- [ ] Crear `src/pages/catalogo/index.astro` (listado con filtros).
- [ ] Crear `src/pages/catalogo/[slug].astro` (detalle de producto).
- [ ] Agregar 5 productos de ejemplo en `src/content/products/`.
- [ ] Agregar las 6 categorías en `src/content/categories/`.

### Verificación
```bash
pnpm run build
```

### Commit
```bash
git add -A && git commit -m "feat: catalog system with products and filters"
```

---

## Etapa 5: Static Pages

**Objetivo**: Crear las páginas estáticas informativas.

### Actividades
- [ ] Crear `src/pages/nosotros.astro` con contenido de Misión/Visión/Valores.
- [ ] Crear `src/pages/contactanos.astro` con formulario y mapa.

### Verificación
```bash
pnpm run build
```

### Commit
```bash
git add -A && git commit -m "feat: about us and contact pages"
```

---

## Etapa 6: WhatsApp Cart (Nano Stores)

**Objetivo**: Implementar el carrito de cotización con exportación a WhatsApp.

### Actividades
- [ ] Instalar dependencias: `pnpm install nanostores @nanostores/persistent preact`.
- [ ] Ejecutar `pnpm dlx astro add preact`.
- [ ] Crear `src/stores/cartStore.ts` con la lógica del carrito.
- [ ] Crear `src/components/cart/AddToCartButton.tsx` (Preact Island).
- [ ] Crear `src/components/cart/CartDrawer.tsx` (Preact Island).
- [ ] Implementar función `generateWhatsAppMessage()` en `src/lib/whatsapp.ts`.
- [ ] Integrar botón de carrito en `Header.astro`.

### Verificación
```bash
pnpm run build
```

### Commit
```bash
git add -A && git commit -m "feat: WhatsApp quote cart with Nano Stores"
```

---

## Etapa 7: SEO & Optimization

**Objetivo**: Optimizar el sitio para motores de búsqueda.

### Actividades
- [ ] Crear `src/components/common/SEO.astro` con meta tags.
- [ ] Crear `public/manifest.json`.
- [ ] Crear `public/robots.txt`.
- [ ] Instalar y configurar `@astrojs/sitemap`.
- [ ] Agregar Schema.org `LocalBusiness` en el layout.

### Verificación
```bash
pnpm run build
```

### Commit
```bash
git add -A && git commit -m "feat: SEO optimization with sitemap and schema"
```

---

## Estado General

| Etapa | Estado | Commit |
|-------|--------|--------|
| 1. Foundation | ⏳ Pendiente | - |
| 2. Core Layout | ⏳ Pendiente | - |
| 3. Homepage | ⏳ Pendiente | - |
| 4. Catalog | ⏳ Pendiente | - |
| 5. Static Pages | ⏳ Pendiente | - |
| 6. WhatsApp Cart | ⏳ Pendiente | - |
| 7. SEO | ⏳ Pendiente | - |
