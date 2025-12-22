# Plan: Generación de Imágenes de Productos

## Objetivo
Generar/obtener imágenes locales para los 22 productos y migrar a Astro Image component.

---

## Productos (22 total)

| # | Producto | Nombre Imagen | Prompt Sugerido |
|---|----------|---------------|-----------------|
| 1 | cemento-sol | `cemento-sol.webp` | Cement bag "Cemento Sol" Peru, 42.5kg, gray with red logo, white background |
| 2 | taladro-dewalt | `taladro-dewalt.webp` | DeWalt cordless drill, yellow/black, 20V MAX, white background |
| 3 | pintura-cpp | `pintura-cpp.webp` | 4-gallon latex paint bucket CPP Vencelatex, white background |
| 4 | ladrillo-king-kong | `ladrillo-king-kong.webp` | King Kong brick 9x13x24cm, terracotta color, white background |
| 5 | fierro-corrugado | `fierro-corrugado.webp` | Corrugated steel rebar 1/2", construction, white background |
| 6 | arena-gruesa | `arena-gruesa.webp` | Pile of coarse sand, construction material, white background |
| 7 | cable-indeco | `cable-indeco.webp` | Electrical cable roll Indeco 2.5mm, red, white background |
| 8 | tubo-pvc-pavco | `tubo-pvc-pavco.webp` | PVC pipe Pavco 4", gray, plumbing, white background |
| 9 | grifo-mezclador | `grifo-mezclador.webp` | Chrome mixer faucet bathroom, modern, white background |
| 10 | valvula-esferica | `valvula-esferica.webp` | Brass ball valve 1/2", plumbing, white background |
| 11 | inodoro-trebol | `inodoro-trebol.webp` | Toilet Trebol brand, white ceramic, one piece, white background |
| 12 | foco-led-philips | `foco-led-philips.webp` | LED bulb Philips 12W, E27, warm white, white background |
| 13 | interruptor-bticino | `interruptor-bticino.webp` | Light switch Bticino white, modern design, white background |
| 14 | tablero-electrico | `tablero-electrico.webp` | Electrical panel box 6 circuits, white, white background |
| 15 | esmalte-cpp | `esmalte-cpp.webp` | Enamel paint can 1 gallon, CPP brand, white background |
| 16 | rodillo-pintura | `rodillo-pintura.webp` | Paint roller 9 inch, with handle, white background |
| 17 | martillo-stanley | `martillo-stanley.webp` | Stanley claw hammer, yellow/black handle, white background |
| 18 | destornilladores-truper | `destornilladores-truper.webp` | Truper screwdriver set 6pcs, red/black handles, white background |
| 19 | cerradura-yale | `cerradura-yale.webp` | Yale door lock, brass finish, security, white background |
| 20 | porcelanato-celima | `porcelanato-celima.webp` | Porcelain tile Celima 60x60cm, gray marble look, white background |
| 21 | pegamento-ceramico | `pegamento-ceramico.webp` | Ceramic adhesive bag 25kg, construction, white background |
| 22 | fragua-blanca | `fragua-blanca.webp` | White grout bag 1kg, tile joints, white background |

---

## Pasos para Implementar

### 1. Generar Imágenes
```bash
# Usar generate_image tool o descargar de Unsplash
# Guardar en: src/assets/products/
```

### 2. Actualizar Content Schema
```typescript
// src/content/config.ts
image: z.string(), // Cambiar a path local: "/src/assets/products/..."
```

### 3. Actualizar Productos
```yaml
# En cada archivo .md
image: "/src/assets/products/cemento-sol.webp"
```

### 4. Usar Astro Image
```astro
---
import { Image } from 'astro:assets';
import cementoImg from '../assets/products/cemento-sol.webp';
---
<Image src={cementoImg} alt="Cemento Sol" />
```

---

## Beneficios de Astro Image
- ✅ Optimización automática (WebP, AVIF)
- ✅ Lazy loading nativo
- ✅ Responsive srcset
- ✅ Mejor Core Web Vitals
