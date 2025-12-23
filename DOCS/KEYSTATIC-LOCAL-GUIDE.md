# Keystatic CMS - Guía de Configuración Local

## Resumen

Esta guía documenta la configuración de Keystatic CMS en modo local para proyectos Astro, incluyendo problemas comunes y sus soluciones.

---

## Requisitos Previos

```bash
pnpm add @keystatic/core @keystatic/astro
```

En `astro.config.mjs`:
```javascript
import keystatic from '@keystatic/astro';

export default defineConfig({
  integrations: [keystatic()],
});
```

---

## Problemas Encontrados y Soluciones

### 1. Keystatic no detecta archivos Markdown existentes

**Problema**: Keystatic no lee archivos `.md` existentes, muestra colección vacía.

**Causa**: Keystatic espera formato Markdoc (`.mdoc`) por defecto.

**Solución**:
1. Renombrar archivos de `.md` a `.mdoc`
2. Instalar integración Markdoc: `pnpm add @astrojs/markdoc`
3. Agregar a `astro.config.mjs`:
   ```javascript
   import markdoc from '@astrojs/markdoc';
   integrations: [markdoc(), keystatic()]
   ```
4. Actualizar `content/config.ts`:
   ```typescript
   loader: glob({ pattern: "**/*.mdoc", base: "./src/content/products" })
   ```

---

### 2. Imágenes no muestran preview en Keystatic

**Problema**: El campo `fields.image()` muestra imagen rota en el admin.

**Causa**: El alias `@assets` funciona para Astro pero no para el navegador en Keystatic.

**Solución**: Usar rutas relativas en `publicPath`:
```typescript
image: fields.image({
  label: 'Imagen Principal',
  directory: 'src/assets/products',        // Donde se guardan
  publicPath: '../../assets/products/',    // Cómo las ve el navegador
})
```

---

### 3. Keystatic crea subcarpetas para imágenes

**Problema**: Al subir imagen, Keystatic crea `producto-slug/image.png` en vez de `producto.png`.

**Comportamiento esperado**: Este ES el comportamiento por defecto de Keystatic.

**Solución**: Adaptar estructura existente al formato de Keystatic:
```
src/assets/products/
├── cemento-sol/
│   └── image.png
├── martillo-stanley/
│   └── image.png
```

**Script de migración**:
```powershell
Get-ChildItem -Path "src\assets\products\*.png" | ForEach-Object {
  $productName = $_.BaseName
  $dstDir = "src\assets\products\$productName"
  New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
  Move-Item -Path $_.FullName -Destination "$dstDir\image.png" -Force
}
```

---

### 4. Error al guardar imágenes (UnknownFilesystemError)

**Problema**: Error al intentar subir imagen desde Keystatic.

**Causa**: Múltiples instancias de `pnpm dev` o directorios faltantes.

**Solución**:
1. Cerrar todas las instancias de dev server
2. Crear directorio de destino manualmente si no existe
3. Reiniciar con una sola instancia: `pnpm dev`

---

### 5. Campo slug redundante

**Problema**: Dos campos slug: uno del `fields.slug()` (nombre archivo) y otro `fields.text()` en frontmatter.

**Solución**: Usar solo `fields.slug()` que genera el nombre del archivo:
```typescript
slugField: 'title',
schema: {
  title: fields.slug({ 
    name: { label: 'Nombre del Producto' },
    slug: { 
      label: 'Slug (URL)',
      description: 'No modificar después de crear.',
    },
  }),
  // NO agregar otro campo slug manual
}
```

---

## Sistema de Variantes de Productos

### Configuración en Keystatic

```typescript
variants: fields.array(
  fields.object({
    name: fields.text({ 
      label: 'Nombre de Variante',
      description: 'Ej: 10kg, 25kg, 42.5kg',
      validation: { isRequired: true },
    }),
    price: fields.number({ 
      label: 'Precio (S/)',
      validation: { isRequired: true, min: 0 },
    }),
  }),
  { 
    label: 'Variantes del Producto',
    description: 'SKU se genera automáticamente.',
    itemLabel: (props) => props.fields.name.value || 'Nueva variante',
  }
)
```

### Generación automática de SKU

En lugar de pedir SKU al usuario, generarlo en el frontend:

```typescript
// [slug].astro
function generateSku(productId: string, variantName: string): string {
  return `${productId}-${variantName.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '')}`;
}
```

### Schema Zod para Content Collections

```typescript
const variantSchema = z.object({
  name: z.string(),
  price: z.number(),
});

const products = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    price: z.number().optional(),
    variants: z.array(variantSchema).optional(),
    // ... otros campos
  }),
});
```

### Mostrar precio en ProductCard

```typescript
const hasVariants = variants && variants.length > 0;
const displayPrice = hasVariants
  ? Math.min(...variants.map((v) => v.price))
  : price;

// En el template:
{hasVariants && <span>desde </span>}
<span>S/{displayPrice.toFixed(2)}</span>
```

---

## Estructura de Archivos Recomendada

```
src/
├── assets/
│   ├── products/
│   │   ├── cemento-sol/
│   │   │   └── image.png
│   │   └── otro-producto/
│   │       └── image.jpg
│   └── categories/
│       ├── construccion/
│       │   └── image.jpg
│       └── ferreteria/
│           └── image.jpg
├── content/
│   ├── products/
│   │   ├── cemento-sol.mdoc
│   │   └── otro-producto.mdoc
│   ├── categories/
│   │   └── construccion.mdoc
│   └── config.ts
└── pages/
    └── catalogo/
        ├── index.astro
        └── [slug].astro
```

---

## Galería de Imágenes (Opcional)

Por defecto, este proyecto solo usa **1 imagen por producto**. Sin embargo, si necesitas múltiples imágenes (ej: tienda de ropa con colores), puedes agregar una galería:

### Ejemplo: Tienda de Ropa con Colores

**1. Agregar campo en Keystatic:**
```typescript
// keystatic.config.ts
images: fields.array(
  fields.image({ 
    label: 'Imagen',
    directory: 'src/assets/products/gallery',
    publicPath: '../../assets/products/gallery/',
  }),
  { 
    label: 'Galería de Imágenes',
    description: 'Fotos adicionales: otros colores, ángulos, detalles',
  }
),
```

**2. Agregar al schema Zod:**
```typescript
// content/config.ts
images: z.array(z.string()).optional(),
```

**3. Mostrar en frontend:**
```astro
// [slug].astro
{product.data.images && product.data.images.map((img, index) => (
  <img src={img} alt={`${title} - Imagen ${index + 1}`} />
))}
```

### Casos de Uso:
- 👕 **Ropa**: Diferentes colores de la misma prenda
- 🛋️ **Muebles**: Vista frontal, lateral, detalle
- 📱 **Electrónica**: Diferentes ángulos, puertos, accesorios

---

## Ejemplo de Producto con Variantes

```yaml
---
title: "Cemento Sol"
description: "Cemento Portland Tipo I de alta resistencia."
category: "construccion"
brand: "Sol"
image: ../../assets/products/cemento-sol/image.png
stock: true
featured: true
variants:
  - name: "10kg"
    price: 8.50
  - name: "25kg"
    price: 18.00
  - name: "42.5kg"
    price: 28.50
features:
  - "Alta resistencia inicial"
  - "Fraguado normal"
---

Cemento de primera calidad para construcciones.
```

---

## Flujo de Trabajo Recomendado

### Desarrollo (Local)
1. Ejecutar `pnpm dev`
2. Editar en http://localhost:4321/keystatic
3. Cambios se guardan automáticamente en archivos locales
4. Git commit cuando estés listo
5. Git push para deploy

### Producción (Futuro con modo GitHub)
- Configurar `storage: { kind: 'github' }`
- Cliente edita en production URL/keystatic
- Cada guardado = commit automático = build

---

## Checklist para Nuevos Proyectos

- [ ] Instalar `@keystatic/core` y `@keystatic/astro`
- [ ] Instalar `@astrojs/markdoc` para archivos .mdoc
- [ ] Crear `keystatic.config.ts` con modo local
- [ ] Configurar `fields.image()` con rutas relativas en `publicPath`
- [ ] Crear estructura de carpetas para imágenes (subcarpetas por item)
- [ ] Definir schema Zod en `content/config.ts`
- [ ] Agregar sistema de variantes si es necesario
- [ ] Probar upload de imágenes desde Keystatic
- [ ] Documentar flujo para el cliente
