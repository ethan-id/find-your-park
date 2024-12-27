import {z} from 'zod';

const activitySchema = z.object({
    id: z.string(),
    name: z.string()
});

const topicSchema = z.object({
    id: z.string(),
    name: z.string()
});

const addressSchema = z.object({
    postalCode: z.string(),
    city: z.string(),
    stateCode: z.string(),
    countryCode: z.string().optional(),
    line1: z.string(),
    type: z.string(),
    line2: z.string().optional(),
    line3: z.string().optional(),
    provinceTerritoryCode: z.string().optional()
});

const imageSchema = z.object({
    credit: z.string().optional(),
    title: z.string(),
    altText: z.string().optional(),
    caption: z.string().optional(),
    url: z.string()
});

const parkSchema = z.object({
    id: z.string(),
    url: z.string(),
    fullName: z.string(),
    parkCode: z.string(),
    description: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    latLong: z.string(),
    activities: z.array(activitySchema),
    topics: z.array(topicSchema),
    states: z.string(),
    contacts: z.object({
        phoneNumbers: z.array(
            z.object({
                phoneNumber: z.string(),
                description: z.string().optional(),
                extension: z.string().optional(),
                type: z.string()
            })
        ),
        emailAddresses: z.array(
            z.object({
                description: z.string().optional(),
                emailAddress: z.string()
            })
        )
    }),
    entranceFees: z
        .array(
            z.object({
                cost: z.string(),
                description: z.string(),
                title: z.string()
            })
        )
        .optional(),
    entrancePasses: z
        .array(
            z.object({
                cost: z.string(),
                description: z.string(),
                title: z.string()
            })
        )
        .optional(),
    fees: z.array(z.unknown()).optional(),
    directionsInfo: z.string().optional(),
    directionsUrl: z.string().optional(),
    operatingHours: z
        .array(
            z.object({
                exceptions: z.array(
                    z.object({
                        startDate: z.string(),
                        endDate: z.string(),
                        name: z.string(),
                        exceptionHours: z.record(z.string()).optional()
                    })
                ),
                description: z.string(),
                standardHours: z.record(z.string()),
                name: z.string()
            })
        )
        .optional(),
    addresses: z.array(addressSchema),
    images: z.array(imageSchema),
    weatherInfo: z.string().optional(),
    name: z.string(),
    designation: z.string().optional(),
    multimedia: z.array(z.unknown()).optional(),
    relevanceScore: z.number().optional()
});

export const npsResponseSchema = z.object({
    total: z.string(),
    limit: z.string(),
    start: z.string(),
    data: z.array(parkSchema)
});

export type ParkImage = z.infer<typeof imageSchema>;
export type Park = z.infer<typeof parkSchema>;
export type ParksAPIResponse = z.infer<typeof npsResponseSchema>;
