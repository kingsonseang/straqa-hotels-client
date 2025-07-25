import { notFound } from "next/navigation";
import { getSubdomainMetadata } from "@/actions/subdomains";
import Footer from "@/frontend/navigation/footer";
import Header from "@/frontend/navigation/header";
import Home from "@/frontend/pages/home";
import { protocol, rootDomain } from "@/lib/utils";

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

  return (
    <>
      <Header logo={logo} organisation={subdomainData} />
      <Home organisation={subdomainData} />
      <Footer logo={logo} organisation={subdomainData} />
    </>
  );
}
