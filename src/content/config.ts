import { defineCollection, z, type ImageFunction } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Variant Schema - para productos con múltiples presentaciones
 * SKU se genera automáticamente: producto-id + nombre-variante
 */
const variantSchema = z.object({
  name: z.string(),
  price: z.number(),
});

/**
 * Products Collection
 * Soporta productos simples y con variantes
 */
const products = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/products" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number().optional(), // Precio base (opcional si hay variantes)
    originalPrice: z.number().optional(),
    variants: z.array(variantSchema).optional(), // Variantes del producto
    category: z.enum([
      "construccion",
      "gasfiteria",
      "electricidad",
      "pinturas",
      "ferreteria",
      "ceramicos",
    ]),
    brand: z.string(),
    image: z.union([image(), z.string()]),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    stock: z.boolean().default(true),
    featured: z.boolean().default(false),
    isNew: z.boolean().default(false),
    discount: z.number().optional(),
    rating: z.number().min(0).max(5).default(0),
    reviewCount: z.number().default(0),
  }),
});

/**
 * Categories Collection
 */
const categories = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/categories" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(),
    image: z.union([image(), z.string()]),
    order: z.number().default(0),
  }),
});

export const collections = {
  products,
  categories,
};
