// src/app/properties/actions.ts
"use server";

import { z } from "zod"; // Import z from Zod
import { demoOrg } from "@/demo/organisation"; // Import your demo data
import { type Property, PropertySchema } from "@/validators/property";

/**
 * Retrieves a list of all properties from all organizations.
 * In a real application, this would fetch from a database.
 * @returns A Promise resolving to an array of Property objects.
 */
export async function getAllProperties(): Promise<Property[]> {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allProperties: Property[] = [];
  for (const org of demoOrg) {
    if (org.properties) {
      allProperties.push(...org.properties);
    }
  }

  // Optional: Validate data before returning using Zod
  const validatedProperties = z.array(PropertySchema).parse(allProperties);

  return validatedProperties;
}

/**
 * Retrieves a random selection of properties.
 * In a real application, you might add filters or pagination.
 * @param count The number of random properties to retrieve (defaults to 3).
 * @returns A Promise resolving to an array of random Property objects.
 */
export async function getRandomProperties(
  count: number = 3,
): Promise<Property[]> {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allAvailableProperties = (await getAllProperties()).filter(
    (p) => p.isAvailable,
  );

  if (allAvailableProperties.length === 0) {
    return [];
  }

  // Shuffle the array and take the first 'count' elements
  const shuffled = allAvailableProperties.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Retrieves a property by its ID.
 * @param id The ID of the property to retrieve.
 * @returns A Promise resolving to the Property object or null if not found.
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const allProperties = await getAllProperties();
  const property = allProperties.find((p) => p.id === id);

  // Optional: Validate property if found
  if (property) {
    return PropertySchema.parse(property);
  }

  return null;
}

/**
 * Retrieves all properties belonging to a specific organization.
 * @param orgId The ID of the organization.
 * @returns A Promise resolving to an array of Property objects for that organization.
 */
export async function getPropertiesByOrganization(
  orgId: string,
): Promise<Property[]> {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  const organization = demoOrg.find((org) => org.id === orgId);

  if (!organization || !organization.properties) {
    return [];
  }

  // Optional: Validate data before returning using Zod
  const validatedProperties = z
    .array(PropertySchema)
    .parse(organization.properties);

  return validatedProperties;
}
