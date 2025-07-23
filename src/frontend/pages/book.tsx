"use client";

import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/frontend/components/ui/button";
import { Calendar as CalendarComponent } from "@/frontend/components/ui/calendar";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/frontend/components/ui/popover";
import { Textarea } from "@/frontend/components/ui/textarea";
import type { CreateBooking } from "@/validators/booking";
import type { Organisation } from "@/validators/organisation";
import type { Property } from "@/validators/property";

interface BookProps {
  property: Property;
  organisation: Organisation;
}

export default function Book({ property, organisation }: BookProps) {
  const [formData, setFormData] = useState<Partial<CreateBooking>>({
    propertyId: property.id,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    guests: 1,
    specialRequests: "",
  });
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;
  const totalAmount = nights * property.pricePerNight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return;

    setIsSubmitting(true);

    const bookingData: CreateBooking = {
      ...(formData as Required<Omit<CreateBooking, "checkIn" | "checkOut">>),
      checkIn,
      checkOut,
    };

    try {
      // Here you would normally make an API call to create the booking
      console.log("Booking data:", bookingData);

      // Generate a mock booking ID and redirect to booking details
      const bookingId = crypto.randomUUID();
      window.location.href = `/booking/${bookingId}`;
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateBooking,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Back Navigation */}
      <div>
        <Link
          href={`/p/${property.id}`}
          className="flex items-center gap-2 text-[var(--domain-color-vibrant)] hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Back to property</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Property Summary */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-[var(--domain-color-heading)]">
            Complete Your Booking
          </h1>

          {/* Property Card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="aspect-[4/3] relative">
              {property.images?.[0] && (
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {property.name}
              </h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-2" />
                <span>{organisation.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ₦{property.pricePerNight.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal">
                    /night
                  </span>
                </div>
                {property.type === "apartment" && (
                  <div className="text-sm text-gray-600">
                    {property.bedrooms} bed • {property.bathrooms} bath
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {checkIn && checkOut && nights > 0 && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">
                    {format(checkIn, "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">
                    {format(checkOut, "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {nights} night{nights > 1 ? "s" : ""}
                  </span>
                  <span className="font-medium">
                    ₦{(nights * property.pricePerNight).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Booking Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkin">Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkIn
                        ? format(checkIn, "MMM dd, yyyy")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout">Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkOut
                        ? format(checkOut, "MMM dd, yyyy")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => date <= (checkIn || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max={property.type === "room" ? property.maxOccupancy : 8}
                  value={formData.guests || 1}
                  onChange={(e) =>
                    handleInputChange("guests", parseInt(e.target.value))
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Guest Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Guest Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="guestName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="guestName"
                    type="text"
                    value={formData.guestName || ""}
                    onChange={(e) =>
                      handleInputChange("guestName", e.target.value)
                    }
                    className="pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestEmail">Email</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={formData.guestEmail || ""}
                  onChange={(e) =>
                    handleInputChange("guestEmail", e.target.value)
                  }
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestPhone">Phone Number</Label>
                <Input
                  id="guestPhone"
                  type="tel"
                  value={formData.guestPhone || ""}
                  onChange={(e) =>
                    handleInputChange("guestPhone", e.target.value)
                  }
                  placeholder="+234 xxx xxx xxxx"
                  required
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">
                Special Requests (Optional)
              </Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests || ""}
                onChange={(e) =>
                  handleInputChange("specialRequests", e.target.value)
                }
                placeholder="Any special requests or requirements..."
                className="min-h-[100px]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[var(--domain-color-vibrant)] hover:bg-[var(--domain-color-dark-vibrant)] text-white"
              disabled={
                !checkIn ||
                !checkOut ||
                !formData.guestName ||
                !formData.guestEmail ||
                !formData.guestPhone ||
                isSubmitting
              }
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isSubmitting
                ? "Processing..."
                : `Book Now - ₦${totalAmount.toLocaleString()}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
