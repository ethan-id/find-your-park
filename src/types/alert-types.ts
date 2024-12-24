import {z} from 'zod';

const relatedRoadEventSchema = z.object({
    title: z.string(),
    id: z.string(),
    type: z.string(),
    url: z.string().url()
});

const alertSchema = z.object({
    id: z.string(),
    url: z.string().url().or(z.literal('')),
    title: z.string(),
    parkCode: z.string(),
    description: z.string(),
    category: z.string(),
    relatedRoadEvents: z.array(relatedRoadEventSchema).default([]),
    lastIndexedDate: z.string()
});

export const alertsAPISchema = z.object({
    total: z.string(),
    limit: z.string(),
    start: z.string(),
    data: z.array(alertSchema)
});

export type RelatedRoadEvent = z.infer<typeof relatedRoadEventSchema>;
export type Alert = z.infer<typeof alertSchema>;
export type AlertsAPIResponse = z.infer<typeof alertsAPISchema>;
