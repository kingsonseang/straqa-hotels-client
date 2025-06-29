import Filter from "@/components/features/filter-companies";
import type { Organisation } from "@/validators/organisation";

export default function Home({ organisation }: { organisation: Organisation }) {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div id="___hero" className="text-center space-y-3">
        <h1 className="text-[var(--domain-color-heading)] font-semibold text-4xl lg:text-5xl xl:text-6xl">
          About us
        </h1>
        <p className="lg:text-lg">{organisation.description}</p>
      </div>

      <Filter />
    </div>
  );
}
