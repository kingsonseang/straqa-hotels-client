// src/data/demo.ts
import type { Organisation } from "@/validators/organisation";
import type { Apartment, Room } from "@/validators/property"; // Import all types

// --- Demo Property Data with Images ---

// Rooms
const demoRoom1: Room = {
  id: "room-uuid-001",
  name: "Standard Double Room",
  description: "Cozy room with a comfortable double bed and private bathroom.",
  pricePerNight: 50.0,
  amenities: ["WiFi", "AC", "TV", "Desk"],
  images: [
    "https://picsum.photos/id/10/800/600", // Lorem Picsum placeholder
    "https://picsum.photos/id/100/800/600",
    "https://picsum.photos/id/101/800/600",
  ],
  type: "room",
  beds: 1,
  bathroomType: "private",
  maxOccupancy: 2,
  isAvailable: true,
};

const demoRoom2: Room = {
  id: "room-uuid-002",
  name: "Deluxe Twin Room",
  description:
    "Spacious room with two single beds, modern amenities, and city views.",
  pricePerNight: 75.0,
  amenities: ["WiFi", "AC", "Balcony", "Mini Bar"],
  images: [
    "https://picsum.photos/id/1015/800/600",
    "https://picsum.photos/id/1016/800/600",
    "https://picsum.photos/id/1018/800/600",
  ],
  type: "room",
  beds: 2,
  bathroomType: "private",
  maxOccupancy: 3,
  isAvailable: true,
};

const demoRoom3: Room = {
  id: "room-uuid-003",
  name: "Economy Single Room",
  description: "Budget-friendly room for solo travelers, shared bathroom.",
  pricePerNight: 30.0,
  amenities: ["WiFi", "Fan"],
  images: [
    "https://picsum.photos/id/102/800/600",
    "https://picsum.photos/id/103/800/600",
    "https://picsum.photos/id/1056/800/600",
  ],
  type: "room",
  beds: 1,
  bathroomType: "shared",
  maxOccupancy: 1,
  isAvailable: true,
};

const demoRoom4: Room = {
  id: "room-uuid-004",
  name: "Family Suite",
  description:
    "Two connecting rooms, ideal for families, with a large private bathroom.",
  pricePerNight: 120.0,
  amenities: ["WiFi", "AC", "Two TVs", "Sofa Bed", "Private Balcony"],
  images: [
    "https://picsum.photos/id/1043/800/600",
    "https://picsum.photos/id/1044/800/600",
    "https://picsum.photos/id/1045/800/600",
  ],
  type: "room",
  beds: 3, // E.g., 1 King, 1 Twin, 1 Sofa bed
  bathroomType: "private",
  maxOccupancy: 5,
  isAvailable: false, // Example of unavailable property
};

// Apartments
const demoApartment1: Apartment = {
  id: "apt-uuid-001",
  name: "Executive One-Bedroom Apartment",
  description:
    "Spacious apartment with a separate living area, fully equipped kitchen, and city views.",
  pricePerNight: 150.0,
  amenities: [
    "WiFi",
    "AC",
    "Full Kitchen",
    "Laundry Facilities",
    "Gym Access",
    "Smart TV",
  ],
  images: [
    "https://picsum.photos/id/1048/1200/800", // Wider aspect for apts
    "https://picsum.photos/id/1049/1200/800",
    "https://picsum.photos/id/1050/1200/800",
    "https://picsum.photos/id/1051/1200/800",
  ],
  type: "apartment",
  bedrooms: 1,
  bathrooms: 1,
  totalRooms: 3, // Living room, kitchen, bedroom
  squareFootage: 750, // sq ft
  isAvailable: true,
};

const demoApartment2: Apartment = {
  id: "apt-uuid-002",
  name: "Studio Loft with City View",
  description:
    "Modern open-plan studio with compact kitchen, loft bed, and panoramic city views.",
  pricePerNight: 90.0,
  amenities: ["WiFi", "Kitchenette", "Smart TV", "High Ceilings"],
  images: [
    "https://picsum.photos/id/106/1200/800",
    "https://picsum.photos/id/107/1200/800",
    "https://picsum.photos/id/1071/1200/800",
  ],
  type: "apartment",
  bedrooms: 0, // Studio
  bathrooms: 1,
  squareFootage: 400, // sq ft
  isAvailable: true,
};

const demoApartment3: Apartment = {
  id: "apt-uuid-003",
  name: "Luxury Two-Bedroom Penthouse",
  description:
    "Exclusive penthouse with two bedrooms, multiple bathrooms, private terrace, and premium finishes.",
  pricePerNight: 350.0,
  amenities: [
    "Private Terrace",
    "Jacuzzi",
    "Gourmet Kitchen",
    "Concierge Service",
    "Sound System",
  ],
  images: [
    "https://picsum.photos/id/1060/1200/800",
    "https://picsum.photos/id/1061/1200/800",
    "https://picsum.photos/id/1062/1200/800",
    "https://picsum.photos/id/1063/1200/800",
    "https://picsum.photos/id/1065/1200/800",
  ],
  type: "apartment",
  bedrooms: 2,
  bathrooms: 2.5, // 2 full, 1 half
  totalRooms: 5,
  squareFootage: 1800, // sq ft
  isAvailable: true,
};

const demoApartment4: Apartment = {
  id: "apt-uuid-004",
  name: "Garden View Duplex",
  description:
    "Charming two-story apartment with a private garden access, ideal for long stays.",
  pricePerNight: 220.0,
  amenities: ["Private Garden", "Dishwasher", "Fireplace", "Pet-Friendly"],
  images: [
    "https://picsum.photos/id/1070/1200/800",
    "https://picsum.photos/id/1071/1200/800",
    "https://picsum.photos/id/1072/1200/800",
  ],
  type: "apartment",
  bedrooms: 2,
  bathrooms: 2,
  totalRooms: 4,
  squareFootage: 1200,
  isAvailable: true,
};

export const demoOrg: Organisation[] = [
  {
    id: "49aa6aa7-c84b-4157-a59f-412e7acca2f8",
    name: "Demo Org",
    subdomain: "demo",
    description: "A placeholder organization for demonstration purposes.",
    properties: [],
    socialMedia: {},
    contact: {},
  },
  {
    id: "0c688f6b-72bc-4b3f-83fb-2da5c1c01577",
    name: "Vintage Residence",
    subdomain: "vintage-residence",
    description:
      "At Vintage residence, we help you find more than just a space, we help you find a place to belong. Whether you're looking for a short stay or a long-term rental, our curated selection of homes, apartments, and serviced spaces are designed to fit your lifestyle and budget. With a deep understanding of the local market and a commitment to comfort, transparency, and prompt service, we make the process simple, reliable, and stress-free. <br/>From weekend getaways to your next forever home, we’ve got the keys.",
    properties: [
      demoRoom1,
      demoRoom2,
      demoRoom3,
      demoRoom4,
      demoApartment1,
      demoApartment2,
      demoApartment3,
      demoApartment4,
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/vintage_residence/",
      linkedIn: "https://www.linkedin.com/company/vintage-residence/",
      whatsapp: "https://wa.me/2348076456361",
      facebook: "https://www.facebook.com/VintageResidence/",
    },
    contact: {
      phone: "+2348076456361",
      email: "bookings@vintage-residence.straqa.me",
      address: "123 Vintage St, Port Harcourt, Rivers State",
    },
  },
  {
    id: "b4afd695-ed69-4c89-8811-9ca6d5451372",
    name: "Mayfair Hotels and Suites",
    subdomain: "mayfair-hotels",
    description:
      "A luxurious escape with top-notch amenities and exceptional service.",
    properties: [demoRoom1, demoRoom2, demoApartment1], // Example properties for Mayfair
    socialMedia: {
      instagram: "https://www.instagram.com/mayfairhotels/",
    },
    contact: {
      phone: "+2349012345678",
      email: "info@mayfairhotels.com",
    },
  },
  {
    id: "810a581f-e701-4471-ae43-45b021963283",
    name: "Totes Place",
    subdomain: "totes-place",
    description: "Your go-to spot for cozy stays and memorable experiences.",
    properties: [demoRoom3, demoApartment2], // Example properties for Totes Place
    socialMedia: {
      facebook: "https://www.facebook.com/totesplace/",
    },
    contact: {
      phone: "+2347098765432",
    },
  },
];
