import { notFound } from "next/navigation";
import { getSubdomainMetadata } from "@/actions/subdomains";
import Footer from "@/frontend/navigation/footer";
import Header from "@/frontend/navigation/header";
import Property from "@/frontend/pages/property";
import { protocol, rootDomain } from "@/lib/utils";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ subdomain: string; propertyId: string }>;
}) {
  const { subdomain, propertyId } = await params;
  const subdomainData = await getSubdomainMetadata(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const logo = `${protocol}://${rootDomain}/logos/${subdomain}/logo.png`;

  return (
    <>
      <Header logo={logo} organisation={subdomainData} />
      <Property
        properties={subdomainData.properties || []}
        propertyId={propertyId}
      />
      <Footer logo={logo} organisation={subdomainData} />
    </>
  );
}
