import FilterProperty from "@/frontend/components/features/filter-property";
import type { Organisation } from "@/validators/organisation";

export default function Home({ organisation }: { organisation: Organisation }) {
  return (
    <div className="max-w-7xl mx-auto space-y-10 px-4">
      <div id="___hero" className="text-center space-y-3">
        <h1 className="text-[var(--domain-color-heading)] font-semibold text-4xl lg:text-5xl xl:text-6xl">
          About us
        </h1>
        <p
          className="lg:text-lg text-balance"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: set editor html data
          dangerouslySetInnerHTML={{ __html: organisation.description || "" }}
        />
      </div>

      <FilterProperty initialData={organisation.properties || []} />
    </div>
  );
}
