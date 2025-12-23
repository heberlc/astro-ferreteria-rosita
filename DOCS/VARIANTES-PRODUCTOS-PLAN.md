# Sistema de Variantes de Productos

## Objetivo
Implementar un sistema de variantes de productos similar a WooCommerce, donde un producto base puede tener múltiples presentaciones (tamaños, colores, etc.) con precios diferentes.

## Arquitectura

```
Producto Base (cemento-sol.mdoc)
├── title: "Cemento Sol"
├── image: cemento-sol.png (imagen principal)
├── variants:
│   ├── { name: "10kg", sku: "cemento-sol-10kg", price: 8.50 }
│   ├── { name: "25kg", sku: "cemento-sol-25kg", price: 18.00 }
│   └── { name: "42.5kg", sku: "cemento-sol-42kg", price: 28.50 }
└── ... otros campos
```

---

## Proposed Changes

### Schema - Keystatic

#### [MODIFY] [keystatic.config.ts](file:///h:/Dev/HeberDev/cloudflare-pages/astro-ferreteria-rosita/keystatic.config.ts)

Agregar campo `variants` al schema de productos:

```typescript
variants: fields.array(
  fields.object({
    name: fields.text({ label: 'Nombre de Variante' }),
    sku: fields.text({ label: 'SKU (código único)' }),
    price: fields.number({ label: 'Precio (S/)' }),
  }),
  { 
    label: 'Variantes del Producto',
    description: 'Diferentes presentaciones (tamaños, pesos, etc.)'
  }
)
```

Eliminar campos redundantes:
- `slug` (text) → se usará el nombre del archivo
- `price` (number) → se mueve a variantes

---

### Schema - Astro Content Collections

#### [MODIFY] [config.ts](file:///h:/Dev/HeberDev/cloudflare-pages/astro-ferreteria-rosita/src/content/config.ts)

Actualizar Zod schema:

```typescript
variants: z.array(z.object({
  name: z.string(),
  sku: z.string(),
  price: z.number(),
})).optional(),
price: z.number().optional(), // Mantener para productos sin variantes
```

---

### Frontend - Página de Producto

#### [MODIFY] [[slug].astro](file:///h:/Dev/HeberDev/cloudflare-pages/astro-ferreteria-rosita/src/pages/catalogo/[slug].astro)

- Agregar dropdown selector de variantes
- JavaScript para actualizar precio dinámicamente
- Pasar SKU de variante al carrito

---

### Carrito

#### [MODIFY] [cart-store.ts](file:///h:/Dev/HeberDev/cloudflare-pages/astro-ferreteria-rosita/src/scripts/cart-store.ts)

Actualizar tipo CartItem:

```typescript
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;  // Nuevo: nombre de variante
  sku?: string;      // Nuevo: SKU de variante
}
```

---

## Verification Plan

### Pruebas Manuales
1. Crear producto con variantes en Keystatic
2. Verificar selector de variantes en página de producto
3. Agregar producto con variante al carrito
4. Verificar mensaje de WhatsApp incluye variante

---

## Ejemplo de Producto

Cemento Sol con 3 variantes:
| Variante | SKU | Precio |
|----------|-----|--------|
| 10kg | cemento-sol-10kg | S/ 8.50 |
| 25kg | cemento-sol-25kg | S/ 18.00 |
| 42.5kg | cemento-sol-42kg | S/ 28.50 |
