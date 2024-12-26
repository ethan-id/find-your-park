import {z} from 'zod';

const cropSchema = z.object({
    aspectRatio: z.string(),
    url: z.string().url()
});

const imageSchema = z.object({
    credit: z.string().optional(),
    crops: z.array(cropSchema).optional(),
    altText: z.string().optional(),
    title: z.string().optional(),
    caption: z.string().optional(),
    url: z.string().url()
});

const quickFactSchema = z.object({
    id: z.string(),
    value: z.string(),
    name: z.string()
});

const relatedParkSchema = z.object({
    states: z.string(),
    fullName: z.string(),
    url: z.string().url(),
    parkCode: z.string(),
    designation: z.string().optional(),
    name: z.string()
});

const personSchema = z.object({
    id: z.string(),
    url: z.string().url(),
    title: z.string(),
    listingDescription: z.string(),
    images: z.array(imageSchema),
    relatedParks: z.array(relatedParkSchema),
    relatedOrganizations: z.array(z.unknown()).optional(),
    tags: z.array(z.string()),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    latLong: z.string().optional(),
    bodyText: z.string(),
    geometryPoiId: z.string().optional(),
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    quickFacts: z.array(quickFactSchema),
    credit: z.string().optional()
});

export const peopleAPISchema = z.object({
    total: z.string(),
    data: z.array(personSchema),
    limit: z.string(),
    start: z.string()
});

export type PersonImage = z.infer<typeof imageSchema>;
export type QuickFact = z.infer<typeof quickFactSchema>;
export type RelatedPark = z.infer<typeof relatedParkSchema>;
export type Person = z.infer<typeof personSchema>;
export type PeopleAPIResponse = z.infer<typeof peopleAPISchema>;
