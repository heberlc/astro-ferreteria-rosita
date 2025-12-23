# Guía SEO - Ferretería Rosita

## Optimizaciones Implementadas

### 1. Meta Tags Básicos

Ubicación: `src/components/SEO.astro` y `src/layouts/Layout.astro`

```html
<title>{title} | Ferretería Rosita</title>
<meta name="description" content="{description}" />
<meta name="keywords" content="ferretería, materiales construcción, Lima, Perú" />
```

### 2. Open Graph (Redes Sociales)

```html
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="/images/og-image.jpg" />
<meta property="og:url" content="https://ferreteria-rosita.pages.dev" />
<meta property="og:type" content="website" />
```

### 3. Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
```

---

## Archivos de Rastreo

### robots.txt
Ubicación: `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://ferreteria-rosita.pages.dev/sitemap-index.xml
```

### Sitemap
Generado automáticamente por `@astrojs/sitemap`.

Configuración en `astro.config.mjs`:
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ferreteria-rosita.pages.dev',
  integrations: [sitemap()],
});
```

---

## Configuración Centralizada

Archivo: `src/config/site.ts`

```typescript
export const SITE = {
  url: "https://ferreteria-rosita.pages.dev",
  title: "Ferretería Rosita | Materiales de Construcción en Lima",
  defaultDescription: "Tu ferretería de confianza...",
  ogImage: "/images/og-image.jpg",
};
```

---

## PWA / Iconos

### Manifest
Ubicación: `public/manifest.json`

Iconos requeridos:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-touch-icon.png` (180x180)

### Favicon
Ubicación: `public/favicon.svg` (SVG para mejor escalabilidad)

---

## Páginas Optimizadas

| Página | URL | Meta Description |
|--------|-----|------------------|
| Inicio | `/` | Descripción general del negocio |
| Catálogo | `/catalogo` | "Catálogo de productos de ferretería en Lima" |
| Producto | `/catalogo/{slug}` | Descripción del producto |
| Categoría | `/catalogo?category={cat}` | "Productos de {categoría}" |
| Contacto | `/contacto` | "Contáctanos, estamos en Chorrillos, Lima" |

---

## Buenas Prácticas Implementadas

1. **URLs amigables**: `/catalogo/cemento-sol` en vez de `/producto?id=123`
2. **Imágenes optimizadas**: WebP con fallback
3. **Lazy loading**: Imágenes cargan al hacer scroll
4. **Mobile-first**: Google prioriza versión móvil
5. **Core Web Vitals**: 
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

---

## Herramientas de Verificación

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Rich Results Test](https://search.google.com/test/rich-results)

---

## Checklist SEO

- [ ] Verificar sitio en Google Search Console
- [ ] Enviar sitemap
- [ ] Probar en PageSpeed Insights
- [ ] Verificar Open Graph con [debugger de Facebook](https://developers.facebook.com/tools/debug/)
- [ ] Crear ficha en Google My Business
