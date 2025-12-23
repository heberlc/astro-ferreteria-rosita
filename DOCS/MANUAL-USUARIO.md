# Manual de Usuario - Panel de Administración Keystatic

## Ferretería Rosita

Este manual explica cómo usar el panel de administración para gestionar los productos, categorías y configuración del sitio web.

---

## 1. Acceder al Panel

### Requisitos
- El servidor de desarrollo debe estar corriendo
- Navegador web (Chrome, Firefox, Edge)

### Pasos
1. Abrir el navegador
2. Ir a: **http://localhost:4321/keystatic**
3. Aparecerá el panel de administración

---

## 2. Navegación del Panel

El menú lateral tiene 2 secciones:

### 📦 Catálogo
- **Productos** - Todos los productos de la tienda
- **Categorías** - Categorías de productos

### ⚙️ Configuración
- **Configuración del Sitio** - Datos del negocio (WhatsApp, dirección, etc.)

---

## 3. Gestionar Productos

### 3.1 Ver lista de productos
1. Click en **Productos** en el menú lateral
2. Aparece la lista de todos los productos

### 3.2 Crear producto nuevo
1. Click en botón **Create** (arriba a la derecha)
2. Llenar los campos:

| Campo | Descripción | Obligatorio |
|-------|-------------|-------------|
| Nombre | Nombre del producto | ✅ |
| Slug | URL automática (no modificar) | ✅ |
| Descripción | Texto corto del producto | No |
| Precio de Venta | Precio actual en soles | No* |
| Precio Antes de Oferta | Solo si hay descuento | No |
| Variantes | Tamaños/pesos con precios | No* |
| Categoría | Seleccionar de lista | ✅ |
| Marca | Nombre de la marca | ✅ |
| Imagen Principal | Foto del producto | ✅ |
| Características | Lista de características | No |
| En Stock | ¿Está disponible? | ✅ |
| Destacado | ¿Mostrar en inicio? | No |
| Es Nuevo | ¿Mostrar badge "Nuevo"? | No |

*Nota: Usar Precio de Venta O Variantes, no ambos.

3. Click en **Create** para guardar

### 3.3 Editar producto
1. Click en el producto de la lista
2. Modificar los campos deseados
3. Click en **Save** para guardar

### 3.4 Eliminar producto
1. Abrir el producto
2. Scroll hasta abajo
3. Click en **Delete**
4. Confirmar eliminación

---

## 4. Gestionar Variantes

Para productos con múltiples presentaciones (tamaños, pesos):

### 4.1 Agregar variante
1. Editar el producto
2. Ir a sección "Variantes del Producto"
3. Click en **Add**
4. Escribir nombre (ej: "25kg")
5. Escribir precio
6. Repetir para cada variante
7. **Save**

### 4.2 Ejemplo de variantes
```
Cemento Sol:
├── 10kg - S/ 8.50
├── 25kg - S/ 18.00
└── 42.5kg - S/ 28.50
```

### 4.3 Información importante
- Si el producto tiene variantes, dejar vacío el "Precio de Venta"
- El precio más bajo se muestra como "desde S/ X"
- El código SKU se genera automáticamente

---

## 5. Gestionar Categorías

### 5.1 Ver categorías
1. Click en **Categorías** en el menú lateral

### 5.2 Crear categoría
1. Click en **Create**
2. Llenar campos:

| Campo | Descripción |
|-------|-------------|
| Nombre | Nombre de la categoría |
| Slug | URL automática |
| Descripción | Texto de la categoría |
| Icono | Seleccionar del menú |
| Imagen | Foto representativa |
| Orden | Número (menor = primero) |

3. Click en **Create**

### 5.3 Iconos disponibles
El menú de iconos incluye:
- 🏗️ Construcción
- 🔧 Gasfitería
- ⚡ Electricidad
- 🎨 Pinturas
- 🔩 Ferretería
- 🏠 Cerámicos
- Y más...

---

## 6. Configuración del Sitio

### 6.1 Acceder
1. Click en **Configuración del Sitio** en el menú

### 6.2 Campos editables

**Información del Negocio:**
- Nombre del Negocio
- Eslogan
- Descripción

**Contacto:**
- WhatsApp Principal (formato: 51999888777)
- WhatsApp Secundario
- Teléfono Fijo
- Email

**Dirección:**
- Calle
- Distrito
- Ciudad
- URL de Google Maps

**Horarios:**
- Horario Semanal (ej: "Lun - Sáb: 8:00 - 18:00")
- Horario Fin de Semana

**Redes Sociales:**
- Facebook URL
- Instagram URL
- TikTok URL

3. Click en **Save** después de editar

---

## 7. Subir Imágenes

### 7.1 Formatos aceptados
- JPG
- PNG
- WebP

### 7.2 Tamaños recomendados
- Productos: 800x800 px (cuadrada)
- Categorías: 800x600 px

### 7.3 Pasos
1. Editar producto o categoría
2. Click en **Choose file** en campo de imagen
3. Seleccionar imagen del computador
4. Esperar que cargue el preview
5. **Save**

---

## 8. Después de Guardar

Los cambios se guardan localmente. Para que aparezcan en el sitio web:

### Opción 1: Pedir al desarrollador
Contactar al desarrollador para que publique los cambios.

### Opción 2: Hacerlo tú mismo (si tienes acceso)
```bash
git add .
git commit -m "Actualización de productos"
git push
```

Luego esperar 2-3 minutos para que el sitio se actualice.

---

## 9. Problemas Comunes

### No puedo guardar
- Verificar que campos obligatorios (*) estén llenos
- Revisar formato de números (no usar comas)

### Imagen no carga
- Verificar formato (JPG, PNG, WebP)
- Verificar tamaño (< 5MB)
- Reiniciar el servidor

### Cambios no se ven
- Refrescar página (Ctrl+F5)
- Esperar unos segundos
- Verificar que guardaste (botón Save)

---

## 10. Contacto de Soporte

Si tienes dudas o problemas:
- **Desarrollador**: HeberLC
- **Email**: [contacto del desarrollador]

---

*Manual actualizado: Diciembre 2024*
