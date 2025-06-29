/** biome-ignore-all lint/performance/noImgElement: Allow img */
"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type React from "react";
import { useDeferredValue, useMemo, useState } from "react";
import type { Property } from "@/validators/property";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input"; // Shadcn input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // Shadcn select components
import { PropertyCard } from "./property-card";

// Define filter types
interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  type?: Property["type"]; // 'room' | 'apartment'
  minBeds?: number; // Specific for rooms/apartments
  minBedrooms?: number; // Specific for apartments
}

export default function FilterProperty({
  initialData,
}: {
  initialData: Property[];
}) {
  const [filters, setFilters] = useState<PropertyFilter>({});
  const deferredFilters = useDeferredValue(filters); // Defer filter updates for performance

  const [ref] = useAutoAnimate();

  // Use useMemo to re-filter data only when initialData or deferredFilters change
  const filteredData = useMemo(() => {
    let currentData = initialData;

    // Apply min/max price filter
    if (deferredFilters.minPrice !== undefined) {
      currentData = currentData.filter(
        (p) => p.pricePerNight >= (deferredFilters.minPrice || 0),
      );
    }
    if (deferredFilters.maxPrice !== undefined) {
      currentData = currentData.filter(
        (p) => p.pricePerNight <= (deferredFilters.maxPrice || Infinity),
      );
    }

    // Apply type filter
    if (deferredFilters.type) {
      currentData = currentData.filter((p) => p.type === deferredFilters.type);
    }

    // Apply minBeds filter (for rooms)
    if (deferredFilters.minBeds !== undefined) {
      currentData = currentData.filter((p) => {
        if (p.type === "room") {
          return p.beds >= (deferredFilters.minBeds || 0);
        }
        return true; // Ignore for apartments
      });
    }

    // Apply minBedrooms filter (for apartments)
    if (deferredFilters.minBedrooms !== undefined) {
      currentData = currentData.filter((p) => {
        if (p.type === "apartment") {
          return p.bedrooms >= (deferredFilters.minBedrooms || 0);
        }
        return true; // Ignore for rooms
      });
    }

    return currentData;
  }, [initialData, deferredFilters]);

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max",
  ) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      [type === "min" ? "minPrice" : "maxPrice"]: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      type: value === "all" ? undefined : (value as Property["type"]),
    }));
  };

  const handleMinBedsChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      minBeds: value === "" ? undefined : Number(value),
    }));
  };

  const handleMinBedroomsChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      minBedrooms: value === "" ? undefined : Number(value),
    }));
  };

  return (
    <div className="pt-8 pb-16 space-y-10">
      <div>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl xl:text-3xl">
              Find whats suitable for you
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-wrap items-center justify-center lg:grid grid-cols-4 gap-4">
            {/* Property Type Select */}
            <Select
              onValueChange={handleTypeChange}
              value={filters.type || "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="room">Room</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
              </SelectContent>
            </Select>
            {/* Min Price Input */}
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice ?? ""}
              onChange={(e) => handlePriceChange(e, "min")}
              className="w-full"
            />
            {/* Max Price Input */}
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice ?? ""}
              onChange={(e) => handlePriceChange(e, "max")}
              className="w-full"
            />
            {/* Min Beds/Bedrooms Select based on selected type or general */}
            {(!filters.type || filters.type === "room") && (
              <Select
                onValueChange={handleMinBedsChange}
                value={filters.minBeds?.toString() || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Min Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Beds</SelectItem>
                  <SelectItem value="1">1+ Bed</SelectItem>
                  <SelectItem value="2">2+ Beds</SelectItem>
                  <SelectItem value="3">3+ Beds</SelectItem>
                </SelectContent>
              </Select>
            )}
            {(!filters.type || filters.type === "apartment") && (
              <Select
                onValueChange={handleMinBedroomsChange}
                value={filters.minBedrooms?.toString() || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Min Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Bedrooms</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1+ Bedroom</SelectItem>
                  <SelectItem value="2">2+ Bedrooms</SelectItem>
                  <SelectItem value="3">3+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            )}
            {/* Search Button - Filters apply automatically on input change, so this might be redundant unless you want a manual trigger */}
            <Button className="rounded-full bg-[var(--domain-color-dark-vibrant)] h-12 px-8">
              Search Properties
            </Button>
          </CardContent>
        </Card>
      </div>

      <div ref={ref} className="grid lg:grid-cols-2 gap-4 w-full">
        {filteredData.map((property) => (
          <PropertyCard
            key={property.id}
            to={`/p/${property?.id}`}
            property={property}
            maxImages={3}
          />
        ))}
      </div>
    </div>
  );
}
