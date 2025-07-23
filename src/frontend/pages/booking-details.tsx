"use client";

import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/frontend/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/frontend/components/ui/card";
import type { Booking } from "@/validators/booking";
import type { Organisation } from "@/validators/organisation";

interface BookingDetailsProps {
  bookingId: string;
  organisation: Organisation;
}

export default function BookingDetails({
  bookingId,
  organisation,
}: BookingDetailsProps) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock booking data - in real app, this would come from API
  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock booking data
      const mockBooking: Booking = {
        id: bookingId,
        propertyId: organisation.properties?.[0]?.id || "",
        guestName: "John Doe",
        guestEmail: "john.doe@example.com",
        guestPhone: "+234 901 234 5678",
        checkIn: new Date(Date.now() + 86400000), // Tomorrow
        checkOut: new Date(Date.now() + 259200000), // 3 days from now
        guests: 2,
        totalAmount: 150000,
        status: "confirmed",
        specialRequests:
          "Please prepare late check-in. Arrival expected around 10 PM.",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setBooking(mockBooking);
      setLoading(false);
    };

    fetchBooking();
  }, [bookingId, organisation.properties]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--domain-color-vibrant)]"></div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Not Found
          </h1>
          <p className="text-gray-600">
            The booking you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const property = organisation.properties?.find(
    (p) => p.id === booking.propertyId,
  );
  const nights = Math.ceil(
    (booking.checkOut.getTime() - booking.checkIn.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      case "completed":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Back Navigation */}
      <div>
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--domain-color-vibrant)] hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[var(--domain-color-heading)]">
          Booking Confirmation
        </h1>
        <p className="text-gray-600">
          Booking ID:{" "}
          <span className="font-mono font-medium">{booking.id}</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(booking.status)}
                Booking Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
              >
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </div>
              <p className="text-gray-600 mt-3">
                {booking.status === "confirmed" &&
                  "Your booking has been confirmed! You'll receive check-in instructions closer to your arrival date."}
                {booking.status === "pending" &&
                  "Your booking is being processed. You'll receive confirmation shortly."}
                {booking.status === "cancelled" &&
                  "This booking has been cancelled."}
                {booking.status === "completed" &&
                  "Thank you for your stay! We hope you enjoyed your time with us."}
              </p>
            </CardContent>
          </Card>

          {/* Property Details */}
          {property && (
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                    {property.images?.[0] && (
                      <Image
                        src={property.images[0]}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={16} className="mr-2" />
                      <span>{organisation.name}</span>
                    </div>
                    {property.type === "apartment" && (
                      <div className="text-sm text-gray-600">
                        {property.bedrooms} bedroom
                        {property.bedrooms > 1 ? "s" : ""} •{" "}
                        {property.bathrooms} bathroom
                        {property.bathrooms > 1 ? "s" : ""}
                      </div>
                    )}
                    {property.type === "room" && (
                      <div className="text-sm text-gray-600">
                        {property.beds} bed{property.beds > 1 ? "s" : ""} • Max{" "}
                        {property.maxOccupancy} guest
                        {property.maxOccupancy > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Stay Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar
                    className="text-[var(--domain-color-vibrant)]"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-medium">
                      {format(booking.checkIn, "EEEE, MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar
                    className="text-[var(--domain-color-vibrant)]"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-medium">
                      {format(booking.checkOut, "EEEE, MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users
                  className="text-[var(--domain-color-vibrant)]"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600">Guests</p>
                  <p className="font-medium">
                    {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock
                  className="text-[var(--domain-color-vibrant)]"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">
                    {nights} night{nights > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Special Requests
                  </p>
                  <p className="text-gray-600">{booking.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User
                  className="text-[var(--domain-color-vibrant)]"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600">Guest Name</p>
                  <p className="font-medium">{booking.guestName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  className="text-[var(--domain-color-vibrant)]"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{booking.guestEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  className="text-[var(--domain-color-vibrant)]"
                  size={20}
                />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{booking.guestPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Rate per night</span>
                <span className="font-medium">
                  ₦{property?.pricePerNight.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {nights} night{nights > 1 ? "s" : ""}
                </span>
                <span className="font-medium">
                  ₦{(nights * (property?.pricePerNight || 0)).toLocaleString()}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total Paid</span>
                <span>₦{booking.totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Booking Info */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Booked on</p>
                <p className="font-medium">
                  {format(booking.createdAt, "MMM dd, yyyy 'at' h:mm a")}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Last updated</p>
                <p className="font-medium">
                  {format(booking.updatedAt, "MMM dd, yyyy 'at' h:mm a")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {booking.status === "confirmed" && (
            <div className="space-y-3">
              <Button
                className="w-full bg-[var(--domain-color-vibrant)] hover:bg-[var(--domain-color-dark-vibrant)] text-white"
                onClick={() => window.print()}
              >
                Print Confirmation
              </Button>
              <Button variant="outline" className="w-full">
                Contact Host
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
