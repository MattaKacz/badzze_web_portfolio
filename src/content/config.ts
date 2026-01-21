import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  schema: () => z.object({
    title: z.string(),
    description: z.string(),
    // Zmiana na string URL zgodnie z życzeniem
    coverImage: z.string().url().optional(), 
    galleryImages: z.array(z.string().url()).optional(),
    techStack: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects,
};
