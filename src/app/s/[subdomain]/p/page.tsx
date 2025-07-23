import { notFound } from "next/navigation";
import { getSubdomainMetadata } from "@/actions/subdomains";
import FilterProperty from "@/frontend/components/features/filter-property";
import Footer from "@/frontend/navigation/footer";
import Header from "@/frontend/navigation/header";
import { protocol, rootDomain } from "@/lib/utils";

export default async function PropertiesPage({
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

  return (
    <>
      <Header logo={logo} organisation={subdomainData} />
      <div className="max-w-7xl mx-auto space-y-10 px-4">
        <div id="___hero" className="text-center space-y-3">
          <h1 className="text-[var(--domain-color-heading)] font-semibold text-4xl lg:text-5xl xl:text-6xl">
            Our Properties
          </h1>
          <p className="lg:text-lg text-balance">
            Discover all our available accommodations and find the perfect place
            for your stay.
          </p>
        </div>

        <FilterProperty initialData={subdomainData.properties || []} />
      </div>
      <Footer logo={logo} organisation={subdomainData} />
    </>
  );
}
