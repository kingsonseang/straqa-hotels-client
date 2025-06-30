"use client";

import Image from "next/image";
import { Link } from "react-router";
import type { Organisation } from "@/validators/organisation";
import Building from "../assets/buildings.svg";
import straqaLogo from "../assets/straqa-logo.png";

export default function Footer({
  logo,
  organisation,
}: {
  logo: string;
  organisation: Organisation;
}) {
  return (
    <footer>
      <div className="relative -z-1">
        <Building className="text-[var(--domain-color-light-vibrant)] -mb-8 mx-auto w-full max-w-4xl" />
      </div>
      <div className="relative bg-white z-10 px-4 py-10">
        <div className="mx-auto container space-y-12">
          <div className="grid lg:grid-cols-6 xl:grid-cols-7 gap-8">
            <div className="col-span-3">
              <Image
                src={logo}
                alt={`${organisation.name} Logo`}
                width={200}
                height={160}
                className="h-20 lg:h-32 object-contain object-left"
              />

              <p
                className="text-balance max-lg:hidden"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: set editor html data
                dangerouslySetInnerHTML={{
                  __html: organisation.description || "",
                }}
              />
            </div>

            <div className="grid grid-cols-2 lg:col-start-5 col-span-3 lg:flex justify-evenly gap-6">
              <div className="space-y-3">
                <h2 className="font-semibold text-xl lg:text-2xl text-[var(--domain-color-heading)]">
                  Company
                </h2>

                <div className="grid gap-3">
                  <Link to="/">Home</Link>
                  <Link to="/p">Properties</Link>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-semibold text-xl lg:text-2xl text-[var(--domain-color-heading)]">
                  Social media
                </h2>

                <div className="grid gap-3">
                  {Object.entries(organisation.socialMedia || {}).map(
                    ([key, value]) => (
                      <Link
                        key={key}
                        to={value}
                        target="__blank"
                        className="capitalize"
                      >
                        {key}
                      </Link>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-semibold text-xl lg:text-2xl text-[var(--domain-color-heading)]">
                  Contact
                </h2>

                <div className="grid gap-3">
                  {Object.entries(organisation.contact || {}).map(
                    ([key, value]) => (
                      <Link
                        key={key}
                        to={value}
                        target="__blank"
                        className="capitalize"
                      >
                        {key}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-between items-center max-md:text-sm">
            <p>©All rights reserved.</p>

            <div className="flex gap-2 items-center">
              <p>Powered by</p>
              <Link to="https://straqa.com">
                <Image
                  src={straqaLogo}
                  alt="Straqa Logo"
                  width={120}
                  height={40}
                  className="h-6 lg:h-8 object-contain w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
