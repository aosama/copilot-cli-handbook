import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const handbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/handbook' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.string().optional(),
  }),
});

export const collections = { handbook };
