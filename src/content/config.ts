import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Products Collection
 * Each product is a markdown file in src/content/products/
 */
const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
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
    image: z.string(),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    stock: z.boolean().default(true),
    featured: z.boolean().default(false),
    isNew: z.boolean().default(false),
    discount: z.number().optional(),
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
