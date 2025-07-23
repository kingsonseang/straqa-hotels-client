import { z } from "zod";

export const BookingSchema = z.object({
  id: z.string().uuid(),
  propertyId: z.string().uuid(),
  guestName: z.string().min(2, "Guest name must be at least 2 characters"),
  guestEmail: z.string().email("Invalid email address"),
  guestPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.number().int().positive().min(1, "Must have at least 1 guest"),
  totalAmount: z.number().positive(),
  status: z
    .enum(["pending", "confirmed", "cancelled", "completed"])
    .default("pending"),
  specialRequests: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const CreateBookingSchema = BookingSchema.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  totalAmount: true,
});

export type Booking = z.infer<typeof BookingSchema>;
export type CreateBooking = z.infer<typeof CreateBookingSchema>;
