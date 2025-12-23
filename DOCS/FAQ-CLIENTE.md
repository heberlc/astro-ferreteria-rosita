# Preguntas Frecuentes - Panel Keystatic

Guía para el cliente sobre cómo gestionar el contenido del sitio web.

---

## Acceder al Panel

### ¿Cómo entro al panel de administración?

1. Asegúrate de que el servidor esté corriendo (`pnpm dev`)
2. Abre: http://localhost:4321/keystatic
3. Navega a Productos, Categorías o Configuración

---

## Productos

### ¿Cómo agrego un producto nuevo?

1. Ir a Keystatic → Productos → **Create**
2. Llenar nombre, descripción, precio
3. Seleccionar categoría
4. Subir imagen
5. Click en **Create**

### ¿Cómo cambio el precio de un producto?

1. Keystatic → Productos
2. Click en el producto
3. Editar el campo "Precio de Venta"
4. Click en **Save**

### ¿Cómo agrego variantes (tamaños, pesos)?

1. Editar producto
2. Ir a sección "Variantes del Producto"
3. Click en **Add**
4. Escribir nombre (ej: "25kg") y precio
5. Repetir para cada variante
6. **Save**

### ¿Cómo marco un producto como agotado?

1. Editar producto
2. Desmarcar "En Stock"
3. **Save**

### ¿Cómo elimino un producto?

1. Editar producto
2. Click en **Delete** (al fondo de la página)
3. Confirmar

---

## Categorías

### ¿Cómo agrego una categoría nueva?

1. Keystatic → Categorías → **Create**
2. Escribir nombre y descripción
3. Seleccionar icono del menú
4. Subir imagen
5. **Create**

### ¿Cómo cambio el orden de las categorías?

1. Editar categoría
2. Cambiar número en "Orden" (menor número = aparece primero)
3. **Save**

---

## Imágenes

### ¿Qué tamaño deben tener las imágenes?

- **Productos**: Mínimo 800x800 px (cuadradas)
- **Categorías**: Mínimo 800x600 px (rectangulares)
- Formatos: JPG, PNG, WebP

### ¿Por qué mi imagen no se ve?

1. Verificar que el formato sea JPG, PNG o WebP
2. El tamaño no debe exceder 5MB
3. Intentar subir desde otro navegador

---

## Configuración del Sitio

### ¿Cómo cambio el número de WhatsApp?

1. Keystatic → Configuración → Configuración del Sitio
2. Editar "WhatsApp Principal"
3. Formato: 51999888777 (sin + ni espacios)
4. **Save**

### ¿Cómo cambio la dirección del negocio?

1. Configuración del Sitio
2. Editar campos de dirección (Calle, Distrito, Ciudad)
3. **Save**

### ¿Cómo cambio los horarios?

1. Configuración del Sitio
2. Editar "Horario Semanal" y "Horario Fin de Semana"
3. **Save**

---

## Problemas Comunes

### Los cambios no se ven en el sitio

1. Asegúrate de haber guardado (**Save**)
2. Refresca la página del sitio (Ctrl+F5)
3. Espera unos segundos para que el servidor procese

### Error: "Field validation failed"

Algún campo requerido está vacío o tiene formato incorrecto. Revisa que todos los campos con asterisco (*) estén llenos correctamente.

### No puedo subir imagen

1. Verificar formato (JPG, PNG, WebP)
2. Verificar tamaño (< 5MB)
3. Reiniciar el servidor: cerrar terminal, ejecutar `pnpm dev` de nuevo

---

## Publicar Cambios

### ¿Cómo publico los cambios al sitio web?

Los cambios se guardan localmente. Para publicarlos:

1. Pedir al desarrollador que haga "push" de los cambios
2. O si tienes acceso a Git:
   ```
   git add .
   git commit -m "Actualización de productos"
   git push
   ```
3. Esperar 2-3 minutos para que Cloudflare procese
