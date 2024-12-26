import {z} from 'zod';

const imageSchema = z.object({
    credit: z.string(),
    crops: z.string(),
    altText: z.string(),
    title: z.string(),
    caption: z.string(),
    url: z.string().url()
});

const quickFactSchema = z.object({
    id: z.string(),
    value: z.string(),
    name: z.string()
});

const relatedParkSchema = z.object({
    states: z.array(z.string()),
    fullName: z.string(),
    url: z.string().url(),
    parkCode: z.string(),
    designation: z.string(),
    name: z.string()
});

const personSchema = z.object({
    bodyText: z.string(),
    id: z.string(),
    geometryPoiId: z.string(),
    firstName: z.string(),
    middleName: z.string().optional(), // Optional in case it's not always present
    lastName: z.string(),
    images: z.array(imageSchema),
    latLong: z.string(),
    latitude: z.string().optional(),
    listingDescription: z.string(),
    longitude: z.string().optional(),
    quickFacts: z.array(quickFactSchema),
    relatedOrganizations: z.string().optional(), // Assuming it's a stringified JSON array
    relatedParks: z.array(relatedParkSchema),
    title: z.string(),
    url: z.string()
});

export const peopleAPISchema = z.object({
    total: z.string(),
    data: z.array(personSchema),
    limit: z.string(),
    start: z.string()
});

export type Image = z.infer<typeof imageSchema>;
export type QuickFact = z.infer<typeof quickFactSchema>;
export type RelatedPark = z.infer<typeof relatedParkSchema>;
export type Person = z.infer<typeof personSchema>;
export type PeopleAPIResponse = z.infer<typeof peopleAPISchema>;
