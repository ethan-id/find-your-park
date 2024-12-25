import {z} from 'zod';

const eventImageSchema = z.object({
    altText: z.string(),
    caption: z.string(),
    credit: z.string(),
    imageId: z.string(),
    ordinal: z.string(),
    path: z.string(),
    title: z.string(),
    url: z.string().url().or(z.literal(''))
});

const eventTimeSchema = z.object({
    timestart: z.string(),
    timeend: z.string(),
    sunsetend: z.boolean(),
    sunrisestart: z.boolean()
});

const eventSchema = z.object({
    category: z.string(),
    categoryid: z.string(),
    contactemailaddress: z.string(),
    contactname: z.string(),
    contacttelephonenumber: z.string(),
    createuser: z.string(),
    date: z.string(),
    dateend: z.string(),
    dates: z.array(z.string()),
    datestart: z.string(),
    datetimecreated: z.string(),
    datetimeupdated: z.string(),
    description: z.string(),
    eventid: z.string(),
    feeinfo: z.string(),
    geometryPoiId: z.string(),
    id: z.string(),
    imageidlist: z.string(),
    images: z.array(eventImageSchema),
    infourl: z.string().url().or(z.literal('')),
    isallday: z.boolean(),
    isfree: z.boolean(),
    isrecurring: z.boolean(),
    isregresrequired: z.boolean(),
    latitude: z.number().nullable(),
    location: z.string(),
    longitude: z.number().nullable(),
    organizationname: z.string(),
    parkfullname: z.string(),
    portalname: z.string(),
    recurrencedateend: z.string(),
    recurrencedatestart: z.string(),
    recurrencerule: z.string(),
    regresinfo: z.string(),
    regresurl: z.string().url().or(z.literal('')),
    sitecode: z.string(),
    sitetype: z.string(),
    subjectname: z.string(),
    tags: z.array(z.string()),
    timeinfo: z.string(),
    times: z.array(eventTimeSchema),
    title: z.string(),
    types: z.array(z.string())
});

export const eventAPISchema = z.object({
    total: z.string(),
    errors: z.array(z.record(z.unknown())),
    data: z.array(eventSchema),
    dates: z.string(),
    pagenumber: z.string(),
    pagesize: z.string()
});

export type EventImage = z.infer<typeof eventImageSchema>;
export type EventTime = z.infer<typeof eventTimeSchema>;
export type Event = z.infer<typeof eventSchema>;
export type EventAPIResponse = z.infer<typeof eventAPISchema>;
