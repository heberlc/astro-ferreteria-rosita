# Proyecto Web Ferretería Rosita

## Descripción General

Sitio web de catálogo de productos para **Ferretería Rosita**, una ferretería con más de 30 años en Lima, Perú. Permite mostrar productos, categorías, y facilitar pedidos por WhatsApp.

---

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Astro** | Framework web (SSG) |
| **TailwindCSS** | Estilos y diseño |
| **Keystatic** | CMS para gestión de contenido |
| **Markdoc** | Formato de contenido (.mdoc) |
| **Cloudflare Pages** | Hosting y despliegue |

---

## Características Principales

### Para el Cliente
- ✅ Catálogo de productos con filtros
- ✅ Variantes de productos (tamaños, pesos)
- ✅ Carrito de compras (local)
- ✅ Pedidos por WhatsApp
- ✅ Diseño responsive (móvil y desktop)

### Para el Administrador
- ✅ Panel Keystatic para editar contenido
- ✅ Gestión de productos y categorías
- ✅ Configuración del sitio (contacto, horarios)
- ✅ Sin código para cambios básicos

---

## Estructura del Proyecto

```
ferreteria-rosita/
├── src/
│   ├── assets/           # Imágenes (productos, categorías)
│   ├── components/       # Componentes Astro
│   ├── config/           # Configuración del sitio
│   ├── content/          # Contenido (Keystatic)
│   │   ├── products/     # Productos (.mdoc)
│   │   ├── categories/   # Categorías (.mdoc)
│   │   └── settings/     # Config del sitio (.yaml)
│   ├── layouts/          # Layout principal
│   ├── pages/            # Páginas del sitio
│   ├── scripts/          # JavaScript (carrito, filtros)
│   └── styles/           # Estilos globales
├── public/               # Assets estáticos
├── DOCS/                 # Documentación
├── keystatic.config.ts   # Configuración del CMS
└── astro.config.mjs      # Configuración de Astro
```

---

## Páginas del Sitio

| Página | Ruta | Descripción |
|--------|------|-------------|
| Inicio | `/` | Hero, categorías, productos destacados |
| Catálogo | `/catalogo` | Lista de productos con filtros |
| Producto | `/catalogo/{slug}` | Detalle de producto |
| Contacto | `/contacto` | Formulario y mapa |
| Keystatic | `/keystatic` | Panel de administración |

---

## Flujo de Trabajo

### Desarrollo
```bash
pnpm install    # Instalar dependencias
pnpm dev        # Servidor de desarrollo (localhost:4321)
```

### Edición de Contenido
1. Abrir http://localhost:4321/keystatic
2. Editar productos, categorías o configuración
3. Los cambios se guardan en archivos locales

### Despliegue
```bash
git add .
git commit -m "descripción"
git push
# Cloudflare Pages hace build automático
```

---

## Documentación Disponible

| Documento | Descripción |
|-----------|-------------|
| `SEO-GUIDE.md` | Optimización para buscadores |
| `PERSONALIZACION.md` | Cómo personalizar el sitio |
| `DESPLIEGUE.md` | Guía de deploy en Cloudflare |
| `KEYSTATIC-LOCAL-GUIDE.md` | Problemas y soluciones de Keystatic |
| `KEYSTATIC-DEV-PLAN.md` | Plan para nuevos proyectos |
| `SISTEMA-DISENO.md` | Sistema de diseño y colores |
| `VARIANTES-PRODUCTOS-PLAN.md` | Sistema de variantes |

---

## Contacto del Negocio

- **WhatsApp**: +51 955 314 610
- **Dirección**: Av. Guardia Civil 221-225, Chorrillos, Lima
- **Horario**: Lun - Sáb: 8:00 - 18:00

---

## Desarrollador

Desarrollado por **HeberLC / DEVKAEL**.
