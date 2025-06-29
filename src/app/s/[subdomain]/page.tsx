import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";
import { getSubdomainMetadata } from "@/actions/subdomains";
import App from "@/frontend/app";
import { getOrgPalette } from "@/lib/palette";
import { protocol, rootDomain } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainMetadata(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: subdomainData.name,
    description: subdomainData.description,
    icons: {
      icon: `${protocol}://${rootDomain}/logos/${subdomain}/favicon.png`,
    },
  };
}

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainMetadata(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const logo = `${protocol}://${rootDomain}/logos/${subdomain}/logo.png`;

  const palette = await getOrgPalette(logo);

  // set up all color variables gotten from node vibrant
  return (
    <main
      className="bg-[var(--domain-color-vibrant)]/10 text-[var(--domain-color-body)] min-h-svh pt-44"
      style={
        {
          "--domain-color-vibrant": palette.vibrant,
          "--domain-color-muted": palette.muted,
          "--domain-color-light-vibrant": palette.lightVibrant,
          "--domain-color-dark-vibrant": palette.darkMuted,
          "--domain-color-light-muted": palette.lightMuted,
          "--domain-color-dark-muted": palette.darkMuted,
          "--domain-color-heading": palette.heading,
          "--domain-color-body": palette.body,
        } as React.CSSProperties
      }
    >
      <App logo={logo} organisation={subdomainData} />
    </main>
  );
}
