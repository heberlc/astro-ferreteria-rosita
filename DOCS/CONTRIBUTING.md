# Guía para Colaboradores

Instrucciones para desarrolladores que quieran contribuir o trabajar en el proyecto desde el repositorio original.

---

## Requisitos Previos

### Software necesario

| Software | Versión | Link |
|----------|---------|------|
| Node.js | 18 o superior | [nodejs.org](https://nodejs.org/) |
| pnpm | 8 o superior | `npm install -g pnpm` |
| Git | Cualquiera | [git-scm.com](https://git-scm.com/) |
| VS Code | Recomendado | [code.visualstudio.com](https://code.visualstudio.com/) |

### Verificar instalación
```bash
node --version    # v18.x.x o superior
pnpm --version    # 8.x.x o superior
git --version     # Cualquier versión
```

---

## Clonar el Proyecto

### 1. Clonar repositorio
```bash
git clone https://github.com/heberlc/ferreteria-rosita.git
cd ferreteria-rosita
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Iniciar servidor de desarrollo
```bash
pnpm dev
```

### 4. Abrir en navegador
- Sitio: http://localhost:4321
- Panel Admin: http://localhost:4321/keystatic

---

## Estructura del Proyecto

```
ferreteria-rosita/
├── src/
│   ├── assets/       # Imágenes de productos y categorías
│   ├── components/   # Componentes Astro
│   ├── config/       # Configuración del sitio
│   ├── content/      # Contenido (Keystatic)
│   ├── layouts/      # Layout principal
│   ├── pages/        # Rutas del sitio
│   ├── scripts/      # JavaScript del cliente
│   └── styles/       # Estilos globales
├── public/           # Assets estáticos
├── DOCS/             # Documentación
├── keystatic.config.ts
└── astro.config.mjs
```

---

## Flujo de Trabajo con Git

### Crear rama para cambios
```bash
# Actualizar main
git checkout main
git pull origin main

# Crear rama
git checkout -b feature/nombre-de-la-feature
```

### Hacer cambios y commit
```bash
git add .
git commit -m "tipo: descripción del cambio"
```

### Tipos de commit
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de estilos
- `refactor:` Refactorización de código

### Subir cambios
```bash
git push origin feature/nombre-de-la-feature
```

### Crear Pull Request
1. Ir a GitHub
2. Click en "Compare & pull request"
3. Describir los cambios
4. Esperar revisión

---

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm preview` | Preview del build |

---

## Extensiones de VS Code Recomendadas

```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

Instalar todas:
1. Abrir VS Code en el proyecto
2. Ctrl+Shift+P → "Extensions: Show Recommended Extensions"
3. Instalar todas

---

## Tecnologías Usadas

| Tecnología | Uso | Documentación |
|------------|-----|---------------|
| Astro | Framework web | [docs.astro.build](https://docs.astro.build) |
| TailwindCSS | Estilos | [tailwindcss.com](https://tailwindcss.com/docs) |
| Keystatic | CMS | [keystatic.com](https://keystatic.com/docs) |
| Markdoc | Contenido | [markdoc.dev](https://markdoc.dev) |

---

## Editar Contenido

### Productos y Categorías
1. Abrir http://localhost:4321/keystatic
2. Editar contenido desde el panel
3. Los cambios se guardan en `src/content/`

### Archivos directamente
Los contenidos están en formato Markdoc:
- `src/content/products/*.mdoc`
- `src/content/categories/*.mdoc`

---

## Problemas Comunes

### Puerto 4321 en uso
```powershell
# Windows
Get-Process -Name node | Stop-Process -Force
pnpm dev
```

### Error de dependencias
```bash
rm -rf node_modules
pnpm install
```

### Cambios no se reflejan
```bash
rm -rf .astro
pnpm dev
```

---

## Documentación del Proyecto

Ver carpeta `DOCS/` para:
- `PROYECTO-OVERVIEW.md` - Visión general
- `ARQUITECTURA.md` - Estructura técnica
- `KEYSTATIC-LOCAL-GUIDE.md` - Guía del CMS
- `TROUBLESHOOTING.md` - Solución de problemas

---

## Contacto

**Desarrollador principal**: HeberLC

Para dudas sobre el proyecto, crear un Issue en GitHub o contactar directamente.

---

*Última actualización: Diciembre 2024*
