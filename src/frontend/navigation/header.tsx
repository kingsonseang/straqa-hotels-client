"use client";

import Image from "next/image";
import { NavLink } from "react-router";
import type { Organisation } from "@/validators/organisation";

export default function Header({
  logo,
  organisation,
}: {
  logo: string;
  organisation: Organisation;
}) {
  return (
    <header className="fixed top-4 left-0 right-0 w-screen flex items-center justify-center p-4">
      <div className="flex items-center justify-between w-full container mx-auto bg-white py-4 px-6 rounded-full shadow shadow-[#00000012]">
        <Image
          src={logo}
          alt={`${organisation.name} Logo`}
          width={100}
          height={60}
          className="h-12 object-contain object-left"
        />

        <nav className="[&_a]:px-2 [&_a]:transition-colors [&_a]:ease-in [&_a]:duration-100 pr-3 space-x-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[var(--domain-color-vibrant)]"
                : "text-[var(--domain-color-heading)]"
            }
            viewTransition
          >
            Home
          </NavLink>
          <NavLink
            to="/p"
            className={({ isActive }) =>
              isActive
                ? "text-[var(--domain-color-vibrant)]"
                : "text-[var(--domain-color-heading)]"
            }
            viewTransition
          >
            Properties
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
