"use client";

import Image from "next/image";
import type { Organisation } from "@/validators/organisation";
import Building from "../assets/buildings.svg";

export default function Footer({
  logo,
  organisation,
}: {
  logo: string;
  organisation: Organisation;
}) {
  return (
    <footer>
      <div>
        <Building className="text-black" />
      </div>
      <div className="bg-white">
        <div>
          <Image
            src={logo}
            alt={`${organisation.name} Logo`}
            width={200}
            height={160}
            className="h-32 object-contain object-left"
          />

          <p>{organisation?.description}</p>
        </div>
      </div>
    </footer>
  );
}
