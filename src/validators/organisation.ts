import z from "zod/v4";

export type Slug = `${Lowercase<string>}`;

export const organisationSchema = z.object({
  id: z.string(),
  name: z.string(),
  subdomain: z.string(),
});

export type Organisation = Omit<
  z.infer<typeof organisationSchema>,
  "subdomain"
> & {
  subdomain: Slug;
};
