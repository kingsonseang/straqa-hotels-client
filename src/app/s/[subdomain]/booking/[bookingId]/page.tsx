import { notFound } from "next/navigation";
import { getSubdomainMetadata } from "@/actions/subdomains";
import Footer from "@/frontend/navigation/footer";
import Header from "@/frontend/navigation/header";
import BookingDetails from "@/frontend/pages/booking-details";
import { protocol, rootDomain } from "@/lib/utils";

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ subdomain: string; bookingId: string }>;
}) {
  const { subdomain, bookingId } = await params;
  const subdomainData = await getSubdomainMetadata(subdomain);

  if (!subdomainData) {
    notFound();
  }

  const logo = `${protocol}://${rootDomain}/logos/${subdomain}/logo.png`;

  return (
    <>
      <Header logo={logo} organisation={subdomainData} />
      <BookingDetails bookingId={bookingId} organisation={subdomainData} />
      <Footer logo={logo} organisation={subdomainData} />
    </>
  );
}
