# Plan de Desarrollo con Keystatic CMS

## Objetivo

Guía paso a paso para crear proyectos Astro con Keystatic CMS desde cero, evitando migraciones y problemas comunes.

---

## Fase 1: Setup Inicial (15 min)

### 1.1 Crear proyecto Astro

```bash
pnpm create astro@latest mi-proyecto
cd mi-proyecto
```

Seleccionar:
- Template: Empty
- TypeScript: Strict
- Install dependencies: Yes

### 1.2 Instalar dependencias

```bash
# Keystatic
pnpm add @keystatic/core @keystatic/astro

# Markdoc (obligatorio para .mdoc)
pnpm add @astrojs/markdoc

# Cloudflare adapter (si es para Cloudflare Pages)
pnpm add @astrojs/cloudflare

# Opcionales
pnpm add @astrojs/sitemap @astrojs/react tailwindcss
```

### 1.3 Configurar astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mi-sitio.pages.dev',
  adapter: cloudflare(),
  integrations: [
    markdoc(),
    react(),
    keystatic(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

---

## Fase 2: Estructura de Carpetas (10 min)

### 2.1 Crear estructura correcta ANTES de agregar contenido

```
src/
├── assets/
│   ├── products/           # Subcarpetas por producto
│   │   └── .gitkeep
│   └── categories/         # Subcarpetas por categoría
│       └── .gitkeep
├── content/
│   ├── products/           # Archivos .mdoc
│   │   └── .gitkeep
│   ├── categories/
│   │   └── .gitkeep
│   └── config.ts           # Zod schemas
├── components/
├── layouts/
└── pages/
```

### 2.2 Crear archivos .gitkeep

```bash
mkdir -p src/assets/products src/assets/categories
mkdir -p src/content/products src/content/categories
touch src/assets/products/.gitkeep
touch src/assets/categories/.gitkeep
touch src/content/products/.gitkeep
touch src/content/categories/.gitkeep
```

---

## Fase 3: Content Config (15 min)

### 3.1 Crear src/content/config.ts

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Schema de variantes (opcional)
const variantSchema = z.object({
  name: z.string(),
  price: z.number(),
});

// Productos
const products = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/products" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
    variants: z.array(variantSchema).optional(),
    category: z.string(),
    brand: z.string(),
    image: z.union([image(), z.string()]),
    stock: z.boolean().default(true),
    featured: z.boolean().default(false),
    isNew: z.boolean().default(false),
    discount: z.number().optional(),
  }),
});

// Categorías
const categories = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/categories" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(),
    image: z.union([image(), z.string()]),
    order: z.number().default(0),
  }),
});

export const collections = { products, categories };
```

---

## Fase 4: Keystatic Config (20 min)

### 4.1 Crear keystatic.config.ts en raíz

```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  
  ui: {
    brand: { name: 'Mi Tienda' },
    navigation: {
      'Catálogo': ['products'],
      'Configuración': ['categories'],
    },
  },

  collections: {
    // ========== PRODUCTOS ==========
    products: collection({
      label: 'Productos',
      slugField: 'title',
      path: 'src/content/products/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ 
          name: { 
            label: 'Nombre del Producto',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Slug (URL)',
            description: 'No modificar después de crear.',
          },
        }),
        description: fields.text({ 
          label: 'Descripción',
          multiline: true,
        }),
        price: fields.number({ 
          label: 'Precio Base',
          description: 'Opcional si hay variantes',
        }),
        // Variantes
        variants: fields.array(
          fields.object({
            name: fields.text({ 
              label: 'Variante',
              description: 'Ej: 10kg, 1 galón',
              validation: { isRequired: true },
            }),
            price: fields.number({ 
              label: 'Precio',
              validation: { isRequired: true, min: 0 },
            }),
          }),
          { 
            label: 'Variantes',
            itemLabel: (props) => props.fields.name.value || 'Nueva',
          }
        ),
        category: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Categoría 1', value: 'categoria-1' },
            { label: 'Categoría 2', value: 'categoria-2' },
          ],
          defaultValue: 'categoria-1',
        }),
        brand: fields.text({ 
          label: 'Marca',
          validation: { isRequired: true },
        }),
        // ⚠️ IMAGEN: Usar subcarpetas
        image: fields.image({
          label: 'Imagen',
          directory: 'src/assets/products',
          publicPath: '../../assets/products/',
          validation: { isRequired: true },
        }),
        stock: fields.checkbox({ 
          label: 'En Stock',
          defaultValue: true,
        }),
        featured: fields.checkbox({ 
          label: 'Destacado',
          defaultValue: false,
        }),
        isNew: fields.checkbox({ 
          label: 'Nuevo',
          defaultValue: false,
        }),
        discount: fields.number({ label: 'Descuento (%)' }),
        content: fields.markdoc({ label: 'Descripción Detallada' }),
      },
    }),

    // ========== CATEGORÍAS ==========
    categories: collection({
      label: 'Categorías',
      slugField: 'title',
      path: 'src/content/categories/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ 
          name: { label: 'Nombre' },
          slug: { label: 'Slug' },
        }),
        slug: fields.text({
          label: 'Slug URL',
          validation: { isRequired: true },
        }),
        description: fields.text({ 
          label: 'Descripción',
          multiline: true,
        }),
        icon: fields.text({ label: 'Icono (Material Symbols)' }),
        image: fields.image({
          label: 'Imagen',
          directory: 'src/assets/categories',
          publicPath: '../../assets/categories/',
        }),
        order: fields.number({ 
          label: 'Orden',
          defaultValue: 0,
        }),
        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
  },
});
```

---

## Fase 5: Primer Contenido de Prueba (10 min)

### 5.1 Iniciar servidor

```bash
pnpm dev
```

### 5.2 Abrir Keystatic

```
http://localhost:4321/keystatic
```

### 5.3 Crear primera categoría

1. Click en "Categorías" → "Create"
2. Nombre: "Construcción"
3. Slug: "construccion"
4. Subir imagen
5. Guardar

### 5.4 Crear primer producto

1. Click en "Productos" → "Create"
2. Nombre: "Cemento Sol"
3. Subir imagen
4. Agregar variantes si aplica
5. Guardar

### 5.5 Verificar estructura creada

```
src/assets/
├── categories/
│   └── construccion/
│       └── image.jpg    ← Creado por Keystatic
└── products/
    └── cemento-sol/
        └── image.png    ← Creado por Keystatic

src/content/
├── categories/
│   └── construccion.mdoc
└── products/
    └── cemento-sol.mdoc
```

---

## Fase 6: Frontend Básico (30 min)

### 6.1 Página de catálogo

```astro
---
// src/pages/catalogo/index.astro
import { getCollection } from "astro:content";

const products = await getCollection("products");
---

<h1>Catálogo</h1>
{products.map((product) => (
  <a href={`/catalogo/${product.id}`}>
    <h2>{product.data.title}</h2>
    <p>S/{product.data.price}</p>
  </a>
))}
```

### 6.2 Página de producto con variantes

```astro
---
// src/pages/catalogo/[slug].astro
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const products = await getCollection("products");
  return products.map((product) => ({
    params: { slug: product.id },
    props: { product },
  }));
}

const { product } = Astro.props;
const { title, variants, price } = product.data;

const hasVariants = variants && variants.length > 0;
const displayPrice = hasVariants
  ? Math.min(...variants.map((v) => v.price))
  : price;

function generateSku(productId, variantName) {
  return `${productId}-${variantName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}
---

<h1>{title}</h1>

{hasVariants ? (
  <select id="variant-selector">
    {variants.map((v) => (
      <option value={generateSku(product.id, v.name)} data-price={v.price}>
        {v.name} - S/{v.price.toFixed(2)}
      </option>
    ))}
  </select>
) : (
  <p>S/{price}</p>
)}
```

---

## Checklist de Validación

### Antes de agregar contenido real:
- [ ] Keystatic admin funciona en /keystatic
- [ ] Se puede crear categoría con imagen
- [ ] Se puede crear producto con imagen
- [ ] Imágenes se guardan en subcarpetas correctas
- [ ] Archivos .mdoc se crean correctamente
- [ ] Frontend muestra productos
- [ ] Variantes funcionan (si aplica)

### Antes de deploy:
- [ ] Build exitoso: `pnpm build`
- [ ] Todas las imágenes cargan
- [ ] URLs de productos funcionan
- [ ] Git commit con todo el contenido

---

## Comandos Útiles

```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Preview local del build
pnpm preview

# Ver archivos modificados
git status

# Commit y push
git add .
git commit -m "Actualizar productos"
git push
```

---

## Errores Comunes a Evitar

| ❌ No hacer | ✅ Hacer |
|-------------|----------|
| Crear archivos .md | Usar .mdoc desde el inicio |
| Poner imágenes sueltas | Estructura subcarpetas |
| Usar @assets en publicPath | Usar rutas relativas ../../ |
| Ejecutar múltiples pnpm dev | Solo una instancia |
| Editar slug después de crear | Definir slug correcto al crear |
