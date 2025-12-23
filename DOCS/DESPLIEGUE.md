# Guía de Despliegue - Ferretería Rosita

## Plataforma

**Cloudflare Pages** - Hosting gratuito con CDN global.

---

## Requisitos

1. Cuenta en [Cloudflare](https://dash.cloudflare.com)
2. Repositorio en GitHub
3. Proyecto conectado a Cloudflare Pages

---

## Configuración Inicial

### 1. Crear proyecto en Cloudflare Pages

1. Ir a Cloudflare Dashboard → Pages
2. Create a project → Connect to Git
3. Seleccionar repositorio `ferreteria-rosita`

### 2. Configurar build

| Campo | Valor |
|-------|-------|
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node.js version | `18` o superior |

### 3. Variables de entorno (opcional)

```
NODE_VERSION=18
```

---

## Flujo de Deploy

```
1. Hacer cambios localmente
2. git add . && git commit -m "descripción"
3. git push origin main
4. Cloudflare detecta push automáticamente
5. Build y deploy (~2-3 minutos)
6. ✅ Sitio actualizado
```

---

## URLs

| Ambiente | URL |
|----------|-----|
| Producción | `https://ferreteria-rosita.pages.dev` |
| Preview (por PR) | `https://{branch}.ferreteria-rosita.pages.dev` |

### Dominio personalizado
1. Cloudflare Pages → Custom domains
2. Agregar dominio (ej: `www.ferreteriarosita.com`)
3. Configurar DNS según instrucciones

---

## Comandos Locales

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

---

## Límites del Plan Gratuito

| Recurso | Límite |
|---------|--------|
| Builds/mes | 500 |
| Ancho de banda | Ilimitado |
| Sitios | Ilimitados |
| Proyectos simultáneos | 1 |

---

## Troubleshooting

### Build falla

1. Revisar logs en Cloudflare Pages → Deployments
2. Probar build local: `pnpm build`
3. Verificar versión de Node.js
4. Revisar dependencias: `pnpm install`

### Cambios no se ven

1. Esperar 2-3 minutos para propagación
2. Limpiar caché del navegador (Ctrl+Shift+R)
3. Verificar que el push llegó a GitHub
4. Revisar status del deployment en Cloudflare

### Imágenes no cargan

1. Verificar rutas relativas en archivos .mdoc
2. Confirmar que imagen existe en `src/assets/`
3. Hacer build local para verificar

---

## Rollback

Si un deploy causa problemas:
1. Cloudflare Pages → Deployments
2. Encontrar deployment anterior funcionando
3. Click en "..." → "Rollback to this deployment"

---

## Monitoreo

- **Cloudflare Analytics**: Tráfico, países, dispositivos
- **Web Analytics**: Rendimiento real de usuarios
- **Logs**: Disponibles en Deployments → Logs

---

## Checklist de Deploy

- [ ] Build local exitoso (`pnpm build`)
- [ ] Tests manuales en localhost
- [ ] Commit con mensaje descriptivo
- [ ] Push a main
- [ ] Verificar deployment en Cloudflare
- [ ] Probar sitio en producción
- [ ] Verificar en móvil
