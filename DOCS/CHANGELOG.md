# Changelog - Ferretería Rosita

Historial de cambios del proyecto.

---

## [Unreleased]

### Added
- Singleton de Configuración del Sitio en Keystatic
- Select de iconos para categorías (25+ opciones)
- Helper `getSiteSettings()` para leer configuración
- Documentación completa:
  - SEO-GUIDE.md
  - PERSONALIZACION.md
  - DESPLIEGUE.md
  - PROYECTO-OVERVIEW.md
  - FAQ-CLIENTE.md
  - ARQUITECTURA.md
  - TROUBLESHOOTING.md

### Changed
- Campo de icono de categoría: de texto a select
- Labels de precio más descriptivos

### Fixed
- Slug duplicado en categorías
- Campo `images` obsoleto en cemento-andino

---

## [1.2.0] - 2024-12-23

### Added
- Sistema de variantes para productos (similar a WooCommerce)
- SKU auto-generado para variantes
- "desde S/ X" en productos con variantes
- Selector de variantes en página de producto
- Keystatic CMS con modo local
- Migración de imágenes a estructura de subcarpetas

### Changed
- Archivos de contenido migrados de .md a .mdoc
- Estructura de assets por producto

---

## [1.1.0] - 2024-12-22

### Added
- Sistema de ratings y reviews (ocultable)
- Búsqueda instantánea en catálogo
- Filtros por categoría y marca
- Carrito de compras con localStorage

### Changed
- Diseño responsive mejorado
- Animaciones en tarjetas de producto

---

## [1.0.0] - 2024-12-20

### Added
- Setup inicial con Astro
- Página de inicio con hero
- Catálogo de productos
- Página de detalle de producto
- Página de contacto
- Integración con WhatsApp
- Diseño oscuro moderno
- SEO básico (meta tags, sitemap)
- PWA (manifest, iconos)

---

## Formato

Este changelog sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

Tipos de cambios:
- **Added**: Nuevas funcionalidades
- **Changed**: Cambios en funcionalidades existentes
- **Deprecated**: Funcionalidades que serán removidas
- **Removed**: Funcionalidades removidas
- **Fixed**: Corrección de bugs
- **Security**: Correcciones de seguridad
