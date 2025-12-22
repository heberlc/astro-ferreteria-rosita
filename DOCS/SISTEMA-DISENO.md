# Sistema de Diseño - Variables CSS

## Variables de Color

Las variables están definidas en `src/styles/global.css` usando la directiva `@theme` de Tailwind v4.

### Colores Principales
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-primary` | `#f96b06` | Color principal (naranja) |
| `--color-primary-hover` | `#e65f00` | Hover del color principal |

### Fondos (Modo Oscuro)
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-background-dark` | `#181411` | Fondo base de la página |
| `--color-surface-dark` | `#231f1b` | Superficies (cards, inputs) |
| `--color-surface-elevated` | `#2a2622` | Tarjetas elevadas, productos |
| `--color-surface-hover` | `#333333` | Estados de focus/hover en inputs |
| `--color-border-dark` | `#3a2f27` | Bordes |
| `--color-footer-bg` | `#151515` | Fondo del footer |
| `--color-section-alt` | `#1f1f1f` | Secciones con fondo alternativo |

### Textos
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-text-primary` | `#ffffff` | Texto principal (blanco) |
| `--color-text-secondary` | `#bba89b` | Texto secundario |
| `--color-text-muted` | `#6b5a4d` | Texto deshabilitado |

### Semánticos
| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-success` | `#22c55e` | Éxito, disponible |
| `--color-warning` | `#eab308` | Advertencia |
| `--color-error` | `#ef4444` | Error, agotado |

---

## Uso en Clases Tailwind

Las variables se usan directamente como clases de Tailwind:

```html
<!-- Fondos -->
<div class="bg-primary">...</div>
<div class="bg-surface-dark">...</div>
<div class="bg-surface-elevated">...</div>

<!-- Textos -->
<p class="text-text-primary">...</p>
<p class="text-text-secondary">...</p>

<!-- Bordes -->
<div class="border-border-dark">...</div>

<!-- Hover/Focus -->
<input class="focus:bg-surface-hover">...</input>
```

---

## Buenas Prácticas

### ❌ NO usar valores hardcoded
```html
<!-- Incorrecto -->
<div class="bg-[#2a2622]">...</div>
<input class="focus:bg-[#333]">...</input>
```

### ✅ Usar variables del tema
```html
<!-- Correcto -->
<div class="bg-surface-elevated">...</div>
<input class="focus:bg-surface-hover">...</input>
```

### Agregar nuevas variables
Si necesitas un nuevo color:
1. Agrégalo en `src/styles/global.css` dentro de `@theme { }`
2. Usa el prefijo `--color-` para que Tailwind lo reconozca
3. Documenta el uso aquí

---

## Clases Utilitarias

### `.glass-panel`
Panel con efecto de vidrio esmerilado:
```css
.glass-panel {
  background: rgba(35, 31, 27, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### `.hide-scrollbar`
Oculta la barra de scroll:
```html
<div class="hide-scrollbar overflow-auto">...</div>
```
