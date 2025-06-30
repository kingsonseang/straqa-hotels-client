// src/validators/organisation.ts
import { z } from "zod";
// Assuming PropertySchema is defined in a separate file like 'src/validators/property.ts'
import { PropertySchema } from "./property"; // Adjust path as needed

export type Slug = `${Lowercase<string>}`;

export const organisationSchema = z.object({
  id: z.string().uuid(), // Added .uuid() for stricter ID validation
  name: z.string().min(1, "Organisation name is required"),
  subdomain: z.string().min(1, "Subdomain is required"),
  description: z.string().optional(),
  // properties: z.any().array().optional(), // Replace this line
  properties: z.array(PropertySchema).optional(), // Now strongly typed
  socialMedia: z.record(z.string(), z.string()).optional(), // Made optional if it can be empty
  contact: z.record(z.string(), z.string()).optional(), // Made optional
  // New: Add rooms and apartments explicitly if you want separate lists for better organization
  // rooms: z.array(RoomSchema).optional(),
  // apartments: z.array(ApartmentSchema).optional(),
  // Or keep properties as a general list and filter on frontend
});

export type Organisation = Omit<
  z.infer<typeof organisationSchema>,
  "subdomain"
> & {
  subdomain: Slug;
};
