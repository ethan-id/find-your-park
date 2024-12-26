import {z} from 'zod';

// Base schemas for common structures
const CoordinateSchema = z.tuple([z.number(), z.number()]);
const MultiPolygonCoordinatesSchema = z.array(z.array(z.array(CoordinateSchema)));
const MultiLineStringCoordinatesSchema = z.array(z.array(CoordinateSchema));

// Designation schema
const DesignationSchema = z.object({
    name: z.string(),
    description: z.string(),
    abbreviation: z.string(),
    id: z.string().uuid()
});

// Alias schema
const AliasSchema = z.object({
    parkId: z.string().uuid(),
    current: z.boolean(),
    name: z.string(),
    id: z.string().uuid()
});

// Geometry schema
const GeometrySchema = z.object({
    type: z.literal('MultiPolygon').or(z.literal('MultiLineString')),
    coordinates: MultiPolygonCoordinatesSchema.or(MultiLineStringCoordinatesSchema)
});

// Feature schema
const FeatureSchema = z.object({
    type: z.literal('Feature'),
    id: z.string().uuid(),
    geometry: GeometrySchema,
    properties: z.object({
        alternateName: z.string(),
        designationId: z.string().uuid(),
        designation: DesignationSchema,
        aliases: z.array(AliasSchema),
        name: z.string()
    })
});

// Root response schema
const BoundsAPIResponseSchema = z.object({
    type: z.literal('FeatureCollection'),
    features: z.array(FeatureSchema)
});

// Inferred TypeScript types
type Coordinate = z.infer<typeof CoordinateSchema>;
type MultiPolygonCoordinates = z.infer<typeof MultiPolygonCoordinatesSchema>;
type Designation = z.infer<typeof DesignationSchema>;
type Alias = z.infer<typeof AliasSchema>;
type Geometry = z.infer<typeof GeometrySchema>;
type Feature = z.infer<typeof FeatureSchema>;
type BoundsAPIResponse = z.infer<typeof BoundsAPIResponseSchema>;

export {
    BoundsAPIResponseSchema,
    FeatureSchema,
    GeometrySchema,
    DesignationSchema,
    AliasSchema,
    CoordinateSchema,
    MultiPolygonCoordinatesSchema,
    // Types
    type BoundsAPIResponse,
    type Feature,
    type Geometry,
    type Designation,
    type Alias,
    type Coordinate,
    type MultiPolygonCoordinates
};
