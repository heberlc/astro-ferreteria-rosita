# Guía de Personalización - Ferretería Rosita

## Información del Negocio

### Desde Keystatic (Cliente)
1. Ir a http://localhost:4321/keystatic
2. Configuración → Configuración del Sitio
3. Editar: nombre, WhatsApp, dirección, horarios, redes sociales

### Desde código (Desarrollador)
Archivo: `src/config/site.ts`

```typescript
export const BUSINESS = {
  name: "Ferretería Rosita",
  tagline: "Materiales de Construcción en Lima",
  foundingYear: 1990,
};

export const CONTACT = {
  whatsapp: { primary: "51955314610" },
  address: {
    street: "Av. Guardia Civil 221-225",
    district: "Chorrillos",
    city: "Lima",
  },
};
```

---

## Colores y Estilos

Archivo: `src/styles/global.css`

### Variables CSS

```css
:root {
  /* Colores primarios */
  --primary: #f59e0b;        /* Naranja - color principal */
  --primary-hover: #d97706;
  
  /* Fondos */
  --background: #0a0a0a;
  --surface: #141414;
  --surface-dark: #1a1a1a;
  
  /* Texto */
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-muted: #525252;
  
  /* Otros */
  --border: #262626;
  --success: #22c55e;
  --error: #ef4444;
}
```

### Cambiar tema de claro a oscuro
Actualmente el sitio usa tema oscuro. Para cambiar a claro, invertir los valores de `--background` y `--text-primary`.

---

## Logo

### Ubicación
- Favicon: `public/favicon.svg`
- Logo header: `public/images/logo.png`

### Cambiar logo
1. Reemplazar archivo con mismo nombre
2. O editar ruta en `src/components/Header.astro`

---

## Tipografía

Fuente actual: **Inter** (Google Fonts)

Para cambiar, editar `src/layouts/Layout.astro`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Iconos

Sistema: **Material Symbols (Outlined)**

```html
<span class="material-symbols-outlined">shopping_cart</span>
```

Catálogo completo: [fonts.google.com/icons](https://fonts.google.com/icons)

---

## Productos

### Agregar producto
1. Keystatic → Productos → Create
2. Llenar: nombre, descripción, precio, categoría, imagen
3. Guardar

### Campos disponibles
- Nombre y descripción
- Precio de venta (o variantes)
- Precio antes de oferta (tachado)
- Categoría
- Marca
- Imagen principal
- Características (lista)
- Stock, Destacado, Nuevo

---

## Categorías

### Agregar categoría
1. Keystatic → Categorías → Create
2. Llenar: nombre, descripción, icono, imagen
3. Guardar

### Iconos disponibles
Seleccionar del dropdown: Construcción, Gasfitería, Electricidad, Pinturas, Ferretería, Cerámicos, y más.

---

## Variantes de Productos

Para productos con múltiples presentaciones:

1. Editar producto en Keystatic
2. Agregar variantes (nombre + precio)
3. Ejemplo: Cemento Sol → 10kg, 25kg, 42.5kg

El SKU se genera automáticamente: `producto-slug-variante`

---

## Feature Toggles

Archivo: `src/config/site.ts`

```typescript
export const FEATURES = {
  showProductReviews: false,  // Mostrar/ocultar estrellas
};
```

---

## Imágenes

### Formatos soportados
- JPG, PNG, WebP

### Ubicaciones
- Productos: `src/assets/products/{producto}/image.jpg`
- Categorías: `src/assets/categories/{categoria}/image.jpg`

### Optimización
Astro optimiza automáticamente las imágenes al hacer build.
