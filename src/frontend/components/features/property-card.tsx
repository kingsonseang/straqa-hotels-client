"use client";

import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/validators/property";
import Money from "../../assets/money.svg";

export interface PropertyCardProps {
  to: string;
  property: Property;
  maxImages?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  to,
  property,
  maxImages = 3,
}) => {
  const { name: title, description, images } = property;
  const visibleImages = images?.slice(0, maxImages) || [];
  const remainingCount = (images?.length || 0) - maxImages;

  return (
    <Link
      href={to}
      className="bg-white rounded-2xl shadow-sm transition-all duration-300 overflow-hidden group grid lg:grid-cols-2"
    >
      <div className="flex gap-2 p-2">
        {/* First image - takes 2/3 width */}
        {visibleImages[0] && (
          <div className="flex-2 relative overflow-hidden rounded-md">
            <Image
              width={250}
              height={250}
              src={visibleImages[0]}
              alt={``}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Right column - takes 1/3 width, stacked images */}
        {visibleImages.length > 1 && (
          <div className="flex-1 flex flex-col gap-2">
            {/* Second image - top half */}
            {visibleImages[1] && (
              <div className="flex-1 relative overflow-hidden rounded-md">
                <Image
                  width={250}
                  height={250}
                  src={visibleImages[1]}
                  alt={``}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Third image - bottom half with remainder count */}
            {visibleImages[2] && (
              <div className="flex-1 relative overflow-hidden rounded-md">
                <Image
                  width={250}
                  height={250}
                  src={visibleImages[2]}
                  alt={``}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Remainder count overlay */}
                {remainingCount > 0 && (
                  <div className="absolute inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center">
                    <div className="flex items-center space-x-1 text-white">
                      <span className="text-lg font-semibold">
                        +{remainingCount}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 md:gap-6 p-4">
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="text-xl font-bold text-[var(--domaain-color-heading)]">
            {title}
          </h3>

          <p className="text-sm leading-relaxed line-clamp-3">{description}</p>
        </div>

        {/* Right side - Price */}
        <div className="text-sm flex items-center gap-1">
          <Money />
          <div className="">
            ₦{property.pricePerNight.toLocaleString()}/Night
          </div>
        </div>
      </div>
    </Link>
  );
};
