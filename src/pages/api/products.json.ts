/**
 * API Endpoint: /api/products.json
 * 
 * Este archivo crea un endpoint JSON que retorna todos los productos.
 * Es usado por el buscador instantáneo para obtener datos.
 * 
 * CÓMO FUNCIONA:
 * 1. El archivo está en src/pages/api/products.json.ts
 * 2. La extensión ".json.ts" indica que retorna JSON
 * 3. La ubicación "/api/" es convencional pero no obligatoria
 * 4. Cuando alguien visita /api/products.json, Astro ejecuta GET
 * 
 * ACCESO:
 * - En navegador: http://localhost:4321/api/products.json
 * - En JavaScript: fetch('/api/products.json')
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * GET Handler - Se ejecuta cuando alguien hace una petición GET
 * 
 * @returns Response con JSON de todos los productos
 * 
 * Ejemplo de respuesta:
 * [
 *   {
 *     "slug": "taladro-dewalt",
 *     "title": "Taladro Percutor Inalámbrico",
 *     "brand": "DeWalt",
 *     "price": 599.00,
 *     "image": "https://...",
 *     "category": "ferreteria"
 *   },
 *   ...
 * ]
 */
export const GET: APIRoute = async () => {
  // Obtener todos los productos desde Content Collections (src/content/products/)
  const products = await getCollection('products');
  
  // Mapear solo los campos necesarios para la búsqueda
  // (No incluimos descripción completa ni otros datos pesados)
  const searchData = products.map(product => {
    // Handle both local images (ImageMetadata) and external URLs (string)
    const imageValue = product.data.image;
    const imageSrc = typeof imageValue === 'string' ? imageValue : imageValue.src;
    
    return {
      slug: product.data.slug || product.id,  // ID para la URL del producto
      title: product.data.title,              // Nombre del producto
      brand: product.data.brand,              // Marca (para filtrar)
      price: product.data.price,              // Precio (para mostrar)
      image: imageSrc,                        // Imagen del producto (URL string)
      category: product.data.category,        // Categoría (para filtrar)
    };
  });

  // Retornar el JSON
  // Response es un objeto estándar de JavaScript (Web API)
  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',  // Indica que es JSON
    },
  });
};
