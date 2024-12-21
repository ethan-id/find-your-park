import {z} from 'zod';

const listingImageSchema = z.object({
    url: z.string().url().or(z.literal('')),
    credit: z.string(),
    altText: z.string(),
    title: z.string(),
    description: z.string(),
    caption: z.string()
});

const relatedParkSchema = z.object({
    states: z.string(),
    parkCode: z.string(),
    designation: z.string(),
    fullName: z.string(),
    url: z.string().url(),
    name: z.string()
});

const articleSchema = z.object({
    url: z.string().url(),
    title: z.string(),
    id: z.string(),
    geometryPoiId: z.string(),
    listingDescription: z.string(),
    listingImage: listingImageSchema,
    relatedParks: z.array(relatedParkSchema).default([]),
    tags: z.array(z.string()).default([]),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    latLong: z.string()
});

export const articleResponseSchema = z.object({
    total: z.string(),
    data: z.array(articleSchema),
    limit: z.string(),
    start: z.string()
});

export type Article = z.infer<typeof articleSchema>;
export type ArticlesAPIResponse = z.infer<typeof articleResponseSchema>;
