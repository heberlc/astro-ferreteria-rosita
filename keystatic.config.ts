import { config, fields, collection } from '@keystatic/core';

/**
 * Keystatic CMS Configuration
 * Panel Admin: /keystatic
 * 
 * Sistema con variantes de productos (similar a WooCommerce)
 */
export default config({
  storage: {
    kind: 'local',
  },
  
  ui: {
    brand: {
      name: 'Ferretería Rosita',
    },
    navigation: {
      'Catálogo': ['products'],
      'Configuración': ['categories'],
    },
  },

  collections: {
    // ============ PRODUCTOS ============
    products: collection({
      label: 'Productos',
      slugField: 'title',
      path: 'src/content/products/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ 
          name: { 
            label: 'Nombre del Producto',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Slug (URL)',
            description: 'Se genera automáticamente. No modificar después de crear.',
          },
        }),
        description: fields.text({ 
          label: 'Descripción Corta',
          multiline: true,
        }),
        // Precio para productos sin variantes
        price: fields.number({ 
          label: 'Precio de Venta (S/)',
          description: 'El precio actual. Dejar vacío si el producto tiene variantes.',
        }),
        originalPrice: fields.number({ 
          label: 'Precio Antes de Oferta (S/)',
          description: 'Solo si hay descuento. Se muestra tachado. Dejar vacío si no hay oferta.',
        }),
        // ===== VARIANTES =====
        variants: fields.array(
          fields.object({
            name: fields.text({ 
              label: 'Nombre de Variante',
              description: 'Ej: 10kg, 25kg, 42.5kg',
              validation: { isRequired: true },
            }),
            price: fields.number({ 
              label: 'Precio (S/)',
              validation: { isRequired: true, min: 0 },
            }),
          }),
          { 
            label: 'Variantes del Producto',
            description: 'Diferentes presentaciones (tamaños, pesos, colores). El código se genera automáticamente.',
            itemLabel: (props) => props.fields.name.value || 'Nueva variante',
          }
        ),
        category: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Construcción', value: 'construccion' },
            { label: 'Gasfitería', value: 'gasfiteria' },
            { label: 'Electricidad', value: 'electricidad' },
            { label: 'Pinturas', value: 'pinturas' },
            { label: 'Ferretería', value: 'ferreteria' },
            { label: 'Cerámicos', value: 'ceramicos' },
          ],
          defaultValue: 'ferreteria',
        }),
        brand: fields.text({ 
          label: 'Marca',
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Imagen Principal',
          directory: 'src/assets/products',
          publicPath: '../../assets/products/',
          validation: { isRequired: true },
        }),
        features: fields.array(
          fields.text({ label: 'Característica' }),
          { label: 'Características' }
        ),
        stock: fields.checkbox({ 
          label: 'En Stock',
          defaultValue: true,
        }),
        featured: fields.checkbox({ 
          label: 'Destacado',
          defaultValue: false,
        }),
        isNew: fields.checkbox({ 
          label: 'Nuevo',
          defaultValue: false,
        }),
        discount: fields.number({ 
          label: 'Descuento (%)',
        }),
        rating: fields.number({ 
          label: 'Rating (0-5)',
          defaultValue: 0,
        }),
        reviewCount: fields.number({ 
          label: 'Reseñas',
          defaultValue: 0,
        }),
        content: fields.markdoc({
          label: 'Descripción Detallada',
        }),
      },
    }),

    // ============ CATEGORÍAS ============
    categories: collection({
      label: 'Categorías',
      slugField: 'title',
      path: 'src/content/categories/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ 
          name: { 
            label: 'Nombre',
            validation: { isRequired: true },
          },
        }),
        slug: fields.text({
          label: 'Slug',
          validation: { isRequired: true },
        }),
        description: fields.text({ 
          label: 'Descripción',
          multiline: true,
          validation: { isRequired: true },
        }),
        icon: fields.text({ 
          label: 'Icono',
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Imagen',
          directory: 'src/assets/categories',
          publicPath: '../../assets/categories/',
          validation: { isRequired: true },
        }),
        order: fields.number({ 
          label: 'Orden',
          defaultValue: 0,
        }),
        content: fields.markdoc({
          label: 'Contenido',
        }),
      },
    }),
  },
});
