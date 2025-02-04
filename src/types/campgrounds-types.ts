import {z} from 'zod';

const phoneNumberSchema = z.object({
    phoneNumber: z.string().optional().default(''),
    description: z.string().optional().default(''),
    extension: z.string().optional().default(''),
    type: z.string().optional().default('')
});

const emailSchema = z.object({
    description: z.string().optional().default(''),
    emailAddress: z.string().optional().default('')
});

const contactsSchema = z.object({
    phoneNumbers: z.array(phoneNumberSchema).optional().default([]),
    emailAddresses: z.array(emailSchema).optional().default([])
});

const feeSchema = z.object({
    cost: z.string().optional().default(''),
    description: z.string().optional().default(''),
    title: z.string().optional().default('')
});

const standardHoursSchema = z.object({
    wednesday: z.string().optional().default(''),
    monday: z.string().optional().default(''),
    thursday: z.string().optional().default(''),
    sunday: z.string().optional().default(''),
    tuesday: z.string().optional().default(''),
    friday: z.string().optional().default(''),
    saturday: z.string().optional().default('')
});

const exceptionSchema = z.object({
    exceptionHours: standardHoursSchema.optional().default({}),
    startDate: z.string().optional().default(''),
    name: z.string().optional().default(''),
    endDate: z.string().optional().default('')
});

const operatingHourSchema = z.object({
    exceptions: z.array(exceptionSchema).optional().default([]),
    description: z.string().optional().default(''),
    standardHours: standardHoursSchema.optional().default({}),
    name: z.string().optional().default('')
});

const addressSchema = z.object({
    postalCode: z.string().optional().default(''),
    city: z.string().optional().default(''),
    stateCode: z.string().optional().default(''),
    countryCode: z.string().optional().default(''),
    provinceTerritoryCode: z.string().optional().default(''),
    line1: z.string().optional().default(''),
    type: z.string().optional().default(''),
    line3: z.string().optional().default(''),
    line2: z.string().optional().default('')
});

/**
 * Schema for each image in the images array
 */
const imageSchema = z.object({
    credit: z.string().optional().default(''),
    crops: z.array(z.unknown()).optional().default([]),
    title: z.string().optional().default(''),
    altText: z.string().optional().default(''),
    caption: z.string().optional().default(''),
    url: z.string().url().or(z.literal('')).optional().default('')
});

const amenitiesSchema = z.object({
    trashRecyclingCollection: z.string().optional().default(''),
    toilets: z.array(z.string()).optional().default([]),
    internetConnectivity: z.string().optional().default(''),
    showers: z.array(z.string()).optional().default([]),
    cellPhoneReception: z.string().optional().default(''),
    laundry: z.string().optional().default(''),
    amphitheater: z.string().optional().default(''),
    dumpStation: z.string().optional().default(''),
    campStore: z.string().optional().default(''),
    staffOrVolunteerHostOnsite: z.string().optional().default(''),
    potableWater: z.array(z.string()).optional().default([]),
    iceAvailableForSale: z.string().optional().default(''),
    firewoodForSale: z.string().optional().default(''),
    foodStorageLockers: z.string().optional().default('')
});

const campsitesSchema = z.object({
    totalSites: z.string().optional().default(''),
    group: z.string().optional().default(''),
    horse: z.string().optional().default(''),
    tentOnly: z.string().optional().default(''),
    electricalHookups: z.string().optional().default(''),
    rvOnly: z.string().optional().default(''),
    walkBoatTo: z.string().optional().default(''),
    other: z.string().optional().default('')
});

const accessibilitySchema = z.object({
    wheelchairAccess: z.string().optional().default(''),
    internetInfo: z.string().optional().default(''),
    cellPhoneInfo: z.string().optional().default(''),
    fireStovePolicy: z.string().optional().default(''),
    rvAllowed: z.string().optional().default(''),
    rvInfo: z.string().optional().default(''),
    rvMaxLength: z.string().optional().default(''),
    additionalInfo: z.string().optional().default(''),
    trailerMaxLength: z.string().optional().default(''),
    adaInfo: z.string().optional().default(''),
    trailerAllowed: z.string().optional().default(''),
    accessRoads: z.array(z.string()).optional().default([]),
    classifications: z.array(z.string()).optional().default([])
});

const campgroundSchema = z.object({
    id: z.string(),
    url: z.string().optional().default(''),
    name: z.string().optional().default(''),
    parkCode: z.string().optional().default(''),
    description: z.string().optional().default(''),
    latitude: z.string().optional().default(''),
    longitude: z.string().optional().default(''),
    latLong: z.string().optional().default(''),
    audioDescription: z.string().optional().default(''),
    isPassportStampLocation: z.string().optional().default(''),
    passportStampLocationDescription: z.string().optional().default(''),
    passportStampImages: z.array(z.unknown()).optional().default([]),
    geometryPoiId: z.string().optional().default(''),
    reservationInfo: z.string().optional().default(''),
    reservationUrl: z.string().optional().default(''),
    regulationsurl: z.string().optional().default(''),
    regulationsOverview: z.string().optional().default(''),
    amenities: amenitiesSchema.optional().default({}),
    contacts: contactsSchema.optional().default({}),
    fees: z.array(feeSchema).optional().default([]),
    directionsOverview: z.string().optional().default(''),
    directionsUrl: z.string().optional().default(''),
    operatingHours: z.array(operatingHourSchema).optional().default([]),
    addresses: z.array(addressSchema).optional().default([]),
    images: z.array(imageSchema).optional().default([]),
    weatherOverview: z.string().optional().default(''),
    numberOfSitesReservable: z.string().optional().default(''),
    numberOfSitesFirstComeFirstServe: z.string().optional().default(''),
    campsites: campsitesSchema.optional().default({}),
    accessibility: accessibilitySchema.optional().default({}),
    multimedia: z.array(z.unknown()).optional().default([]),
    relevanceScore: z.number().optional().default(0),
    lastIndexedDate: z.string().optional().default('')
});

export const campgroundsResponseSchema = z.object({
    total: z.string(),
    limit: z.string(),
    start: z.string(),
    data: z.array(campgroundSchema)
});

export type PhoneNumber = z.infer<typeof phoneNumberSchema>;
export type Email = z.infer<typeof emailSchema>;
export type Contacts = z.infer<typeof contactsSchema>;
export type Fee = z.infer<typeof feeSchema>;
export type OperatingHour = z.infer<typeof operatingHourSchema>;
export type Address = z.infer<typeof addressSchema>;
export type ImageItem = z.infer<typeof imageSchema>;
export type Amenities = z.infer<typeof amenitiesSchema>;
export type Campsites = z.infer<typeof campsitesSchema>;
export type Accessibility = z.infer<typeof accessibilitySchema>;
export type Campground = z.infer<typeof campgroundSchema>;
export type CampgroundsResponse = z.infer<typeof campgroundsResponseSchema>;
