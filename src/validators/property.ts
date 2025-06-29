// Assuming this is in a file like 'src/validators/room.ts' or 'src/validators/property.ts'
import { z } from "zod";

// Base schema for common property details (could be extended for apartments/rooms)
export const PropertyBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  pricePerNight: z.number().positive(),
  amenities: z.array(z.string()).optional(), // e.g., ['WiFi', 'AC', 'Parking']
  images: z.array(z.string().url()).optional(), // Array of image URLs
  isAvailable: z.boolean().default(true),
});

export const RoomSchema = PropertyBaseSchema.extend({
  type: z.literal("room"), // Discriminator
  beds: z.number().int().positive(),
  bathroomType: z.enum(["private", "shared"]).optional(),
  maxOccupancy: z.number().int().positive(),
  // Add room-specific fields if needed
});

export const ApartmentSchema = PropertyBaseSchema.extend({
  type: z.literal("apartment"), // Discriminator
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  totalRooms: z.number().int().positive().optional(), // e.g., living room, kitchen
  squareFootage: z.number().positive().optional(), // in square feet or meters
  // Add apartment-specific fields if needed
});

// Union type for all possible property types
export const PropertySchema = z.union([RoomSchema, ApartmentSchema]);

export type Room = z.infer<typeof RoomSchema>;
export type Apartment = z.infer<typeof ApartmentSchema>;
export type Property = z.infer<typeof PropertySchema>;
