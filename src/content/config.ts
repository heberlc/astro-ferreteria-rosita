import { defineCollection, z, type ImageFunction } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Products Collection
 * Each product is a markdown file in src/content/products/
 * Images can be local (src/assets) or external URLs
 */
const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
    originalPrice: z.number().optional(),
    category: z.enum([
      "construccion",
      "gasfiteria",
      "electricidad",
      "pinturas",
      "ferreteria",
      "ceramicos",
    ]),
    brand: z.string(),
    image: z.union([image(), z.string()]), // Supports both local images and URLs
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    stock: z.boolean().default(true),
    featured: z.boolean().default(false),
    isNew: z.boolean().default(false),
    discount: z.number().optional(),
    rating: z.number().min(0).max(5).default(0), // Product rating 0-5
    reviewCount: z.number().default(0), // Number of reviews
  }),
});

/**
 * Categories Collection
 * Each category is a markdown file in src/content/categories/
 */
const categories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(), // Material Symbols icon name
    image: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = {
  products,
  categories,
};
