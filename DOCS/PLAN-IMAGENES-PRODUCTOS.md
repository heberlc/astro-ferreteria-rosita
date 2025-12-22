# Plan: Generar Imágenes de Productos Pendientes

## Estado Actual
- **Completadas**: 9/22 imágenes generadas y configuradas
- **Pendientes**: 13 productos con URLs de Unsplash
- **Cuota**: Se restablece ~1AM (22 Dic 2025)

---

## Productos Pendientes (13)

| # | Archivo MD | Imagen a Crear | Prompt Sugerido |
|---|------------|----------------|-----------------|
| 1 | `grifo-mezclador.md` | grifo-mezclador.png | Kitchen faucet mixer tap chrome plumbing white background |
| 2 | `inodoro-trebol.md` | inodoro-trebol.png | White ceramic toilet bathroom fixture white background |
| 3 | `interruptor-bticino.md` | interruptor-bticino.png | Electric wall light switch outlet white background |
| 4 | `ladrillo-king-kong.md` | ladrillo-king-kong.png | Red clay brick construction material white background |
| 5 | `martillo-stanley.md` | martillo-stanley.png | Carpenter hammer claw hammer professional tool white background |
| 6 | `pegamento-ceramico.md` | pegamento-ceramico.png | Ceramic tile adhesive mortar bag construction white background |
| 7 | `pintura-cpp.md` | pintura-cpp.png | Latex paint bucket gallon can white background product photo |
| 8 | `porcelanato-celima.md` | porcelanato-celima.png | Porcelain floor tile ceramic tile white background |
| 9 | `rodillo-pintura.md` | rodillo-pintura.png | Paint roller with tray painting tool white background |
| 10 | `tablero-electrico.md` | tablero-electrico.png | Electrical panel breaker box distribution board white background |
| 11 | `taladro-dewalt.md` | taladro-dewalt.png | Cordless power drill 20V professional tool yellow white background |
| 12 | `tubo-pvc-pavco.md` | tubo-pvc-pavco.png | PVC pipe plumbing tube white gray white background |
| 13 | `valvula-esferica.md` | valvula-esferica.png | Ball valve brass plumbing fitting water valve white background |

---

## Pasos a Ejecutar

### 1. Generar Imágenes (cuando se restablezca cuota)
```
generate_image para cada producto usando el prompt de la tabla
```

### 2. Copiar Imágenes a Assets
```powershell
Copy-Item "C:\Users\DEVKAEL\.gemini\...\[imagen].png" ".\src\assets\products\[nombre].png"
```

### 3. Actualizar Archivos .md
Cambiar en cada archivo:
```yaml
# De (URL Unsplash):
image: "https://images.unsplash.com/..."

# A (Asset local):
image: "../../assets/products/[nombre].png"
```

---

## Archivos a Modificar

```
src/content/products/
├── grifo-mezclador.md
├── inodoro-trebol.md
├── interruptor-bticino.md
├── ladrillo-king-kong.md
├── martillo-stanley.md
├── pegamento-ceramico.md
├── pintura-cpp.md
├── porcelanato-celima.md
├── rodillo-pintura.md
├── tablero-electrico.md
├── taladro-dewalt.md
├── tubo-pvc-pavco.md
└── valvula-esferica.md
```

---

## Verificación Final
- [ ] Todas las imágenes en `src/assets/products/`
- [ ] Todos los archivos .md con rutas relativas
- [ ] Build sin errores: `npm run build`
- [ ] Imágenes optimizadas en navegador (WebP)
