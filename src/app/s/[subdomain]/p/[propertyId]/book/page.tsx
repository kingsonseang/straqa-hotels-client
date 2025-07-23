import { notFound } from "next/navigation";
import { getSubdomainMetadata } from "@/actions/subdomains";
import Footer from "@/frontend/navigation/footer";
import Header from "@/frontend/navigation/header";
import Book from "@/frontend/pages/book";
import { protocol, rootDomain } from "@/lib/utils";

export default async function BookingPage({
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
  const property = subdomainData.properties?.find((p) => p.id === propertyId);

  if (!property) {
    notFound();
  }

  return (
    <>
      <Header logo={logo} organisation={subdomainData} />
      <Book property={property} organisation={subdomainData} />
      <Footer logo={logo} organisation={subdomainData} />
    </>
  );
}
