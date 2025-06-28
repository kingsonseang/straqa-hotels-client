"use server";

import { demoOrg } from "@/demo/organisation";

// get orgaisation by event or subdomain metadata
export async function getSubdomainMetadata(subdomain: string) {
  return demoOrg.find((org) => org.subdomain === subdomain);
}
