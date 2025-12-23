# Troubleshooting - Problemas y Soluciones

## Desarrollo Local

### El servidor no inicia

**Síntoma**: `pnpm dev` muestra error

**Soluciones**:
```bash
# 1. Reinstalar dependencias
rm -rf node_modules
pnpm install

# 2. Limpiar caché
rm -rf .astro

# 3. Verificar versión de Node
node --version  # Debe ser 18+
```

---

### Puerto 4321 ya está en uso

**Síntoma**: Error "Port 4321 is already in use"

**Solución**:
```powershell
# Windows - matar procesos Node
Get-Process -Name node | Stop-Process -Force

# Luego reiniciar
pnpm dev
```

---

### Cambios no se reflejan

**Síntoma**: Edité un archivo pero el navegador muestra lo viejo

**Soluciones**:
1. Ctrl+Shift+R (hard refresh)
2. Limpiar caché: `rm -rf .astro && pnpm dev`
3. Reiniciar el servidor

---

## Keystatic

### Panel muestra campos vacíos

**Síntoma**: Singleton de configuración no carga datos

**Solución**:
1. Reiniciar el servidor (`Ctrl+C`, luego `pnpm dev`)
2. Verificar que archivo `.yaml` existe en la ruta correcta

---

### Error "Field validation failed"

**Síntoma**: No puedo guardar en Keystatic

**Causas y soluciones**:

| Error | Causa | Solución |
|-------|-------|----------|
| "Must be a valid option" | Campo select con valor no listado | Agregar valor a opciones del select |
| "Required field" | Campo vacío | Llenar el campo |
| "Invalid format" | Formato incorrecto | Revisar formato esperado |

---

### Imágenes no muestran preview

**Síntoma**: Campo de imagen muestra icono roto

**Solución**: Verificar `publicPath` en keystatic.config.ts:
```typescript
image: fields.image({
  directory: 'src/assets/products',
  publicPath: '../../assets/products/',  // Ruta relativa correcta
})
```

---

## Build y Deploy

### Build falla localmente

**Síntoma**: `pnpm build` muestra errores

**Pasos de diagnóstico**:
```bash
# 1. Ver error completo
pnpm build 2>&1 | head -50

# 2. Errores comunes:
# - Imagen no encontrada: verificar ruta en .mdoc
# - TypeScript error: verificar tipos en componentes
# - Import error: verificar que archivo existe
```

---

### Build falla en Cloudflare

**Síntoma**: Deploy falla en Cloudflare Pages

**Soluciones**:
1. Revisar logs en Cloudflare Dashboard
2. Verificar `NODE_VERSION` en variables de entorno
3. Probar build local primero

---

### Sitio en blanco después de deploy

**Síntoma**: URL muestra página vacía

**Soluciones**:
1. Verificar `site` en astro.config.mjs
2. Revisar que `dist/` se generó correctamente
3. Verificar rutas de assets

---

## Contenido

### Producto no aparece en catálogo

**Síntomas**: Creé producto pero no se ve

**Checklist**:
- [ ] Archivo `.mdoc` existe en `src/content/products/`
- [ ] Frontmatter tiene todos los campos requeridos
- [ ] Categoría está escrita correctamente
- [ ] No hay errores de YAML (indentación)

---

### Imagen no carga en frontend

**Síntoma**: Producto muestra imagen rota

**Verificar**:
1. Ruta en archivo .mdoc: `image: ../../assets/products/slug/image.jpg`
2. Archivo existe en esa ubicación
3. Nombre de archivo coincide exactamente

---

## Errores Comunes de YAML

### Error de indentación

```yaml
# ❌ Incorrecto
variants:
- name: "10kg"  # Falta espacio
  price: 10

# ✅ Correcto
variants:
  - name: "10kg"
    price: 10
```

### Error de comillas

```yaml
# ❌ Incorrecto (comillas mezcladas)
description: "Cemento de alta calidad'

# ✅ Correcto
description: "Cemento de alta calidad"
```

---

## Contacto de Soporte

Si el problema persiste:
1. Revisar esta guía
2. Buscar en los logs del servidor
3. Contactar al desarrollador con:
   - Descripción del problema
   - Pasos para reproducirlo
   - Captura de pantalla del error
