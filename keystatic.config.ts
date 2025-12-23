import { config, fields, collection, singleton } from '@keystatic/core';

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
      'Catálogo': ['products', 'categories'],
      'Configuración': ['siteSettings'],
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
          slug: {
            label: 'Slug (URL)',
            description: 'Se genera automáticamente. No modificar después de crear.',
          },
        }),
        description: fields.text({ 
          label: 'Descripción',
          description: 'Texto breve que describe la categoría.',
          multiline: true,
          validation: { isRequired: true },
        }),
        icon: fields.select({
          label: 'Icono de Categoría',
          description: 'Selecciona un icono para la categoría.',
          options: [
            // === CATEGORÍAS ACTUALES (valores existentes) ===
            { label: '🏗️ Construcción (foundation)', value: 'foundation' },
            { label: '🏗️ Construcción', value: 'construction' },
            { label: '🔧 Gasfitería/Plomería', value: 'plumbing' },
            { label: '⚡ Electricidad (bolt)', value: 'bolt' },
            { label: '⚡ Electricidad', value: 'electrical_services' },
            { label: '🎨 Pinturas (format_paint)', value: 'format_paint' },
            { label: '🎨 Pinturas', value: 'palette' },
            { label: '🔩 Ferretería (home_repair)', value: 'home_repair_service' },
            { label: '🔩 Ferretería/Herramientas', value: 'hardware' },
            { label: '🏠 Cerámicos/Pisos', value: 'grid_view' },
            // === CATEGORÍAS FUTURAS POPULARES ===
            { label: '🚪 Puertas/Cerrajería', value: 'door_front' },
            { label: '💡 Iluminación', value: 'light' },
            { label: '🪵 Maderas', value: 'forest' },
            { label: '🧱 Ladrillos/Blocks', value: 'view_module' },
            { label: '🏡 Jardín', value: 'yard' },
            { label: '🚿 Baños', value: 'bathroom' },
            { label: '🍳 Cocina', value: 'kitchen' },
            { label: '🔒 Seguridad', value: 'lock' },
            { label: '🧹 Limpieza', value: 'cleaning_services' },
            { label: '📦 Almacenamiento', value: 'inventory_2' },
            // === ICONOS GENÉRICOS/NEUTROS ===
            { label: '📋 General/Otros', value: 'category' },
            { label: '🛒 Productos', value: 'shopping_cart' },
            { label: '⭐ Destacados', value: 'star' },
            { label: '🏷️ Ofertas', value: 'sell' },
            { label: '📌 Nuevo', value: 'new_releases' },
          ],
          defaultValue: 'category',
        }),
        image: fields.image({
          label: 'Imagen de Categoría',
          description: 'Imagen representativa de la categoría.',
          directory: 'src/assets/categories',
          publicPath: '../../assets/categories/',
          validation: { isRequired: true },
        }),
        order: fields.number({ 
          label: 'Orden',
          description: 'Menor número = aparece primero en la lista.',
          defaultValue: 0,
        }),
        content: fields.markdoc({
          label: 'Contenido Adicional',
          description: 'Opcional. Texto largo para la página de categoría.',
        }),
      },
    }),
  },

  // ============ SINGLETONS ============
  singletons: {
    siteSettings: singleton({
      label: 'Configuración del Sitio',
      path: 'src/content/settings/site',
      format: { data: 'yaml' },
      schema: {
        // ===== INFORMACIÓN DEL NEGOCIO =====
        businessName: fields.text({
          label: 'Nombre del Negocio',
          validation: { isRequired: true },
        }),
        tagline: fields.text({
          label: 'Eslogan',
          description: 'Texto corto que aparece junto al nombre',
        }),
        description: fields.text({
          label: 'Descripción',
          multiline: true,
          description: 'Descripción para SEO y redes sociales',
        }),

        // ===== CONTACTO =====
        whatsappPrimary: fields.text({
          label: 'WhatsApp Principal',
          description: 'Número con código de país. Ej: 51999888777',
          validation: { isRequired: true },
        }),
        whatsappSecondary: fields.text({
          label: 'WhatsApp Secundario',
          description: 'Opcional. Segundo número de contacto',
        }),
        phone: fields.text({
          label: 'Teléfono Fijo',
          description: 'Ej: (01) 251 5860',
        }),
        email: fields.text({
          label: 'Email de Contacto',
          description: 'Email principal para clientes',
        }),

        // ===== DIRECCIÓN =====
        addressStreet: fields.text({
          label: 'Dirección (Calle)',
          description: 'Ej: Av. Guardia Civil 221-225',
        }),
        addressDistrict: fields.text({
          label: 'Distrito',
          description: 'Ej: Urb. La Campiña - Chorrillos',
        }),
        addressCity: fields.text({
          label: 'Ciudad',
          description: 'Ej: Lima, Perú',
        }),
        googleMapsUrl: fields.text({
          label: 'URL de Google Maps',
          description: 'Link para el botón "Ver en mapa"',
        }),

        // ===== HORARIOS =====
        hoursWeekdays: fields.text({
          label: 'Horario Semanal',
          description: 'Ej: Lun - Sáb: 8:00 - 18:00',
        }),
        hoursWeekend: fields.text({
          label: 'Horario Fin de Semana',
          description: 'Ej: Domingo: Cerrado',
        }),

        // ===== REDES SOCIALES =====
        facebookUrl: fields.text({
          label: 'Facebook URL',
        }),
        instagramUrl: fields.text({
          label: 'Instagram URL',
        }),
        tiktokUrl: fields.text({
          label: 'TikTok URL',
        }),
      },
    }),
  },
});
