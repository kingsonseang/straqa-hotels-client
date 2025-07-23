"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Import X for close icon
import Image from "next/image";
import Link from "next/link"; // Use next/link for Next.js navigation
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils"; // Your utility for tailwind-merge
import type { Organisation } from "@/validators/organisation";

// Define navigation links centrally
const navLinks = [
  { path: "/", label: "Home" },
  { path: "/p", label: "Properties" }, // Changed to '/p' based on your example
];

export default function Header({
  logo,
  organisation,
}: {
  logo: string;
  organisation: Organisation;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex w-screen items-center justify-center p-4">
      {/* Increased z-index to 50, common for headers */}
      <div className="relative flex w-full container mx-auto items-center justify-between bg-white p-3 md:p-4 lg:px-6 rounded-full shadow-md shadow-[#00000012]">
        <Link href="/">
          <Image
            src={logo}
            alt={`${organisation.name} Logo`}
            width={100}
            height={60}
            className="h-12 object-contain object-left"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex pr-3 space-x-2 [&_a]:px-2 [&_a]:transition-colors [&_a]:ease-in [&_a]:duration-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "font-medium text-[var(--domain-color-heading)] hover:text-[var(--domain-color-dark-vibrant)]/80",
                {
                  "text-[var(--domain-color-dark-vibrant)]": isActiveLink(
                    link.path,
                  ),
                },
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button (visible only on mobile) */}
        <div className="md:hidden pr-2">
          {/** biome-ignore lint/a11y/useButtonType: exp */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle logic
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--domain-color-vibrant)]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              // Position fixed relative to viewport, covers full height below header
              className={cn(
                "fixed left-0 top-0 h-screen w-screen bg-white md:hidden", // Full screen overlay
                "flex flex-col pt-24 pb-6", // Padding to clear fixed header, plus bottom padding
                "z-40", // Lower z-index than the header itself (z-50) so header stays on top
              )}
            >
              <nav className="flex flex-col space-y-4 p-6 flex-grow">
                {" "}
                {/* flex-grow to take available space */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={`nav-link-key-${index + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }} // Slightly faster delay
                  >
                    <Link
                      href={link.path}
                      className={cn(
                        "block text-2xl font-semibold py-3 px-4 rounded-md transition-colors hover:bg-[var(--domain-color-vibrant)]/10 hover:text-[var(--domain-color-vibrant)] text-[var(--domain-color-heading)]",
                        {
                          "bg-[var(--domain-color-vibrant)] text-white":
                            isActiveLink(link.path),
                        },
                      )}
                      onClick={() => setIsMenuOpen(false)} // Close menu on click
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Optional: Add a footer or other content to mobile menu */}
              <div className="p-6 text-sm text-gray-500 border-t border-gray-100">
                {/* <p>&copy; {new Date().getFullYear()} {organisation.name}</p> */}
                {/* Add social media links or contact info here if desired */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
