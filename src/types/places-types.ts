import {z} from 'zod';

const cropSchema = z.object({
    aspectRatio: z.string(),
    url: z.string().url().or(z.literal('')) // Allow empty or valid URL
});

const imageSchema = z.object({
    url: z.string().url().or(z.literal('')),
    credit: z.string().optional(),
    altText: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    caption: z.string().optional(),
    crops: z.array(cropSchema).optional()
});

const relatedParkSchema = z.object({
    states: z.string(),
    parkCode: z.string(),
    designation: z.string().optional(),
    fullName: z.string(),
    url: z.string().url(),
    name: z.string()
});

const quickFactSchema = z.object({
    id: z.string(),
    value: z.string(),
    name: z.string()
});

const multimediaSchema = z.object({
    title: z.string(),
    id: z.string(),
    type: z.string(),
    url: z.string().url()
});

const placeItemSchema = z.object({
    id: z.string(),
    url: z.string().url(),
    title: z.string(),
    listingDescription: z.string().optional().default(''),
    images: z.array(imageSchema),
    relatedParks: z.array(relatedParkSchema),
    relatedOrganizations: z.array(z.unknown()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    latitude: z.string().optional().default(''),
    longitude: z.string().optional().default(''),
    latLong: z.string().optional().default(''),
    bodyText: z.string().optional().default(''),
    audioDescription: z.string().optional().default(''),
    isPassportStampLocation: z.string().optional().default('0'),
    passportStampLocationDescription: z.string().optional().default(''),
    passportStampImages: z.array(z.unknown()).optional().default([]),
    managedByUrl: z.string().optional().default(''),
    isOpenToPublic: z.string().optional().default(''),
    isMapPinHidden: z.string().optional().default(''),
    npmapId: z.string().optional().default(''),
    geometryPoiId: z.string().optional().default(''),
    isManagedByNps: z.string().optional().default(''),
    amenities: z.array(z.string()).optional().default([]),
    managedByOrg: z.string().optional().default(''),
    quickFacts: z.array(quickFactSchema).optional().default([]),
    location: z.string().optional().default(''),
    locationDescription: z.string().optional().default(''),
    credit: z.string().optional().default(''),
    multimedia: z.array(multimediaSchema).optional().default([]),
    relevanceScore: z.number()
});

export const placesResponseSchema = z.object({
    total: z.string(),
    limit: z.string(),
    start: z.string(),
    data: z.array(placeItemSchema)
});

export type Crop = z.infer<typeof cropSchema>;
export type Image = z.infer<typeof imageSchema>;
export type RelatedPark = z.infer<typeof relatedParkSchema>;
export type QuickFact = z.infer<typeof quickFactSchema>;
export type Multimedia = z.infer<typeof multimediaSchema>;
export type PlaceItem = z.infer<typeof placeItemSchema>;
export type PlacesResponse = z.infer<typeof placesResponseSchema>;
