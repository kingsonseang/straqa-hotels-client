import z from "zod/v4";

export type Slug = `${Lowercase<string>}`;

export const organisationSchema = z.object({
  id: z.string(),
  name: z.string(),
  subdomain: z.string(),
  description: z.string(),
  properties: z.any().array().optional(),
  socialMedia: z.record(z.string(), z.string()),
  contact: z.record(z.string(), z.string()),
});

export type Organisation = Omit<
  z.infer<typeof organisationSchema>,
  "subdomain"
> & {
  subdomain: Slug;
};
