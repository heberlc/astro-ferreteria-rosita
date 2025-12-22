# Sistema de Valoraciones (Rating)

## Campos en Content Collection

Los productos pueden tener valoraciones. Campos definidos en `src/content/config.ts`:

```yaml
rating: 4.5      # Valoración 0-5 (soporta decimales para medias estrellas)
reviewCount: 47  # Número de reseñas
```

## Valores por defecto

Si no se especifican, ambos campos tienen valor `0`:
- **rating = 0**: Muestra "Sin reseñas"
- **reviewCount = 0**: No muestra el contador

---

## Ejemplo de producto con rating

```yaml
---
title: "Taladro Percutor DeWalt 20V"
slug: "taladro-percutor-dewalt"
price: 389.99
category: "ferreteria"
brand: "DeWalt"
image: "../../assets/products/taladro.png"
stock: true
featured: true
isNew: false
discount: 15
rating: 4.5       # ⭐⭐⭐⭐½
reviewCount: 47   # (47 reseñas)
features:
  - "Motor brushless"
  - "Incluye 2 baterías"
---
```

---

## Componentes que usan rating

| Componente | Ubicación |
|------------|-----------|
| `ProductCard.astro` | `src/components/catalog/` |
| `FeaturedProducts.astro` | `src/components/home/` |

---

## Visualización

| Rating | Estrellas mostradas |
|--------|---------------------|
| 5 | ⭐⭐⭐⭐⭐ |
| 4.5 | ⭐⭐⭐⭐½ |
| 4 | ⭐⭐⭐⭐☆ |
| 3.5 | ⭐⭐⭐½☆ |
| 0 | "Sin reseñas" |

---

## Productos con rating (ejemplos)

| Producto | Rating | Reseñas |
|----------|--------|---------|
| Taladro Dewalt | 4.5 | 47 |
| Cemento Sol | 4 | 28 |
| Cable Indeco | 4.5 | 35 |
| Foco LED Philips | 5 | 52 |
