# 🔐 Plan: Panel de Administración con Keystatic + Cloudflare Access

Plan de implementación para agregar un CMS headless con Keystatic y protección mediante Cloudflare Access.

---

## 📋 Resumen Ejecutivo

| Aspecto | Detalle |
|---------|---------|
| **CMS** | [Keystatic](https://keystatic.com/) - Git-based, tipado, visual |
| **Autenticación** | Cloudflare Access (Zero Trust) |
| **Hosting** | Cloudflare Pages (ya configurado) |
| **Ruta Admin** | `/keystatic` |
| **Contenido** | Productos, categorías, páginas estáticas |

---

## 🎯 Objetivos

1. **Panel visual** para gestionar productos sin editar código
2. **Seguridad robusta** con Cloudflare Access (emails autorizados)
3. **Tipado fuerte** con validación de campos
4. **Commits automáticos** directo a GitHub
5. **Personalizable** para futuras colecciones

---

## 🏗️ Arquitectura

```
┌─────────────────────┐     ┌──────────────────────┐
│   Cloudflare DNS    │────▶│   Cloudflare Access  │
│ ferreteria-rosita   │     │   (Zero Trust Auth)  │
│    .pages.dev       │     └──────────┬───────────┘
└─────────────────────┘                │
                                       ▼
                          ┌────────────────────────┐
                          │   /keystatic/*         │
                          │   (Ruta protegida)     │
                          └──────────┬─────────────┘
                                     │
                          ┌──────────▼─────────────┐
                          │   Keystatic Admin UI   │
                          │   (React Dashboard)    │
                          └──────────┬─────────────┘
                                     │
                          ┌──────────▼─────────────┐
                          │   GitHub API           │
                          │   (Commits directos)   │
                          └────────────────────────┘
```

---

## 📦 Fase 1: Instalación de Keystatic

### 1.1 Dependencias

```bash
pnpm add @keystatic/core @keystatic/astro
```

### 1.2 Configuración Astro

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  output: 'hybrid', // Requerido para Keystatic
  integrations: [
    react(),
    keystatic(),
  ],
  // ... resto de config
});
```

### 1.3 Archivo de Configuración Keystatic

```typescript
// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'heberlc/astro-ferreteria-rosita',
  },
  
  collections: {
    products: collection({
      label: 'Productos',
      slugField: 'name',
      path: 'src/content/products/*',
      format: { contentField: 'description' },
      schema: {
        name: fields.slug({ name: { label: 'Nombre' } }),
        price: fields.number({ label: 'Precio (S/)' }),
        originalPrice: fields.number({ label: 'Precio Original', validation: { isRequired: false } }),
        category: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Herramientas', value: 'herramientas' },
            { label: 'Materiales', value: 'materiales' },
            { label: 'Electricidad', value: 'electricidad' },
            { label: 'Pinturas', value: 'pinturas' },
            { label: 'Sanitarios', value: 'sanitarios' },
            { label: 'Seguridad', value: 'seguridad' },
          ],
          defaultValue: 'herramientas',
        }),
        brand: fields.text({ label: 'Marca' }),
        image: fields.image({
          label: 'Imagen',
          directory: 'public/images/products',
          publicPath: '/images/products/',
        }),
        featured: fields.checkbox({ label: '¿Destacado?', defaultValue: false }),
        stock: fields.select({
          label: 'Disponibilidad',
          options: [
            { label: 'En Stock', value: 'in-stock' },
            { label: 'Pocas Unidades', value: 'low-stock' },
            { label: 'Agotado', value: 'out-of-stock' },
          ],
          defaultValue: 'in-stock',
        }),
        rating: fields.number({ 
          label: 'Rating (1-5)', 
          validation: { min: 1, max: 5 },
          defaultValue: 5 
        }),
        reviewCount: fields.number({ 
          label: 'Número de Reseñas',
          defaultValue: 0 
        }),
        description: fields.document({
          label: 'Descripción',
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});
```

---

## 🔒 Fase 2: Configuración de Cloudflare Access

### 2.1 Prerrequisitos

- Dominio activo en Cloudflare (ya configurado)
- Zero Trust dashboard habilitado

### 2.2 Pasos en Cloudflare Dashboard

#### Paso 1: Crear Política de Acceso

1. Ir a **Zero Trust** → **Access** → **Access Groups**
2. Crear grupo `Admin Ferreteria`:
   - **Include**: Emails específicos
     - `hebert@hebert.dev`
     - `admin@ferreteria-rosita.pe` (ejemplo)

#### Paso 2: Crear Aplicación

1. Ir a **Zero Trust** → **Access** → **Applications**
2. Click **Add an Application** → **Self-hosted**
3. Configurar:

| Campo | Valor |
|-------|-------|
| Application name | `Keystatic Admin` |
| Session Duration | `24 hours` |
| Application domain | `ferreteria-rosita.pages.dev` |
| Path | `/keystatic*` |

4. **Policies**:
   - Action: `Allow`
   - Include: Grupo `Admin Ferreteria`

#### Paso 3: Método de Autenticación

Opciones recomendadas:
- **One-Time PIN**: Usuario recibe código por email
- **Google OAuth**: Login con cuenta Google
- **GitHub OAuth**: Login con cuenta GitHub

### 2.3 Verificar Protección

```bash
# Debe redirigir a login de Cloudflare Access
curl -I https://ferreteria-rosita.pages.dev/keystatic
```

---

## 🎨 Fase 3: Personalización del Admin

### 3.1 Branding Personalizado

```typescript
// keystatic.config.ts
export default config({
  ui: {
    brand: {
      name: 'Ferretería Rosita',
      // mark: () => <img src="/favicon.svg" alt="Logo" />,
    },
    navigation: {
      'Contenido': ['products'],
    },
  },
  // ... resto
});
```

### 3.2 Campos Personalizados Adicionales

```typescript
// Ejemplo: Especificaciones técnicas como array
specifications: fields.array(
  fields.object({
    label: fields.text({ label: 'Etiqueta' }),
    value: fields.text({ label: 'Valor' }),
  }),
  {
    label: 'Especificaciones',
    itemLabel: (props) => props.fields.label.value,
  }
),

// Ejemplo: Galería de imágenes
gallery: fields.array(
  fields.image({
    label: 'Imagen',
    directory: 'public/images/products/gallery',
    publicPath: '/images/products/gallery/',
  }),
  { label: 'Galería de Imágenes' }
),
```

### 3.3 Colecciones Futuras

```typescript
// Categorías editables
categories: collection({
  label: 'Categorías',
  path: 'src/content/categories/*',
  slugField: 'name',
  schema: {
    name: fields.slug({ name: { label: 'Nombre' } }),
    icon: fields.text({ label: 'Icono Material Symbol' }),
    description: fields.text({ label: 'Descripción', multiline: true }),
    order: fields.number({ label: 'Orden de Aparición' }),
  },
}),

// FAQs
faqs: collection({
  label: 'Preguntas Frecuentes',
  path: 'src/content/faqs/*',
  slugField: 'question',
  schema: {
    question: fields.slug({ name: { label: 'Pregunta' } }),
    answer: fields.document({ label: 'Respuesta', formatting: true }),
    category: fields.select({
      label: 'Categoría',
      options: [
        { label: 'Envíos', value: 'envios' },
        { label: 'Pagos', value: 'pagos' },
        { label: 'Productos', value: 'productos' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
    }),
  },
}),
```

---

## 📁 Estructura de Archivos Final

```
src/
├── content/
│   ├── products/        # Productos (ya existe)
│   ├── categories/      # [NUEVO] Categorías editables
│   └── faqs/            # [NUEVO] FAQs editables
├── config/
│   └── site.ts          # Configuración del sitio
└── ...

keystatic.config.ts      # [NUEVO] Configuración completa
astro.config.mjs         # Actualizado con integración
```

---

## ✅ Checklist de Implementación

### Fase 1: Setup Básico
- [ ] Instalar dependencias (`@keystatic/core`, `@keystatic/astro`, `@astrojs/react`)
- [ ] Configurar `astro.config.mjs` con `output: 'hybrid'`
- [ ] Crear `keystatic.config.ts` con colección de productos
- [ ] Verificar funcionamiento local en `/keystatic`

### Fase 2: Cloudflare Access
- [ ] Crear grupo de acceso en Zero Trust
- [ ] Configurar aplicación self-hosted
- [ ] Definir política de emails permitidos
- [ ] Seleccionar método de autenticación (One-Time PIN recomendado)
- [ ] Probar acceso restringido

### Fase 3: GitHub Integration
- [ ] Configurar storage `kind: 'github'`
- [ ] Crear GitHub OAuth App para Keystatic
- [ ] Configurar variables de entorno en Cloudflare Pages
- [ ] Probar commit desde el panel

### Fase 4: Producción
- [ ] Deploy a Cloudflare Pages
- [ ] Verificar Cloudflare Access funciona en producción
- [ ] Documentar acceso para el cliente

---

## 🔑 Variables de Entorno Requeridas

```env
# GitHub OAuth (para modo github storage)
KEYSTATIC_GITHUB_CLIENT_ID=xxx
KEYSTATIC_GITHUB_CLIENT_SECRET=xxx
KEYSTATIC_SECRET=xxx  # Generado con: openssl rand -hex 32
```

En Cloudflare Pages:
1. **Settings** → **Environment variables**
2. Agregar las 3 variables como **Production secrets**

---

## 📚 Referencias

- [Keystatic + Astro Guide](https://keystatic.com/docs/installation-astro)
- [Cloudflare Access Setup](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/)
- [GitHub Storage Mode](https://keystatic.com/docs/github-mode)

---

## ⏱️ Estimación de Tiempo

| Fase | Tiempo Estimado |
|------|-----------------|
| Setup Keystatic | 1-2 horas |
| Cloudflare Access | 30 min |
| GitHub Integration | 1 hora |
| Testing & Deploy | 1 hora |
| **Total** | **~4 horas** |

---

*Documento creado: 2024-12-22*  
*Autor: Hebert.Dev*
