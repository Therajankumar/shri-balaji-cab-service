import {
  FaCity,
  FaClock,
  FaMapMarkedAlt,
  FaPlaneDeparture,
  FaRoute,
  FaRupeeSign,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";

import { responsiveImage } from "../lib/images";

export const navLinks = [
  { title: "Home", id: "home" },
  { title: "Services", id: "services" },
  { title: "Fleet", id: "fleet" },
  { title: "Why Us", id: "why-us" },
  { title: "Reviews", id: "testimonials" },
  { title: "Contact", id: "contact" },
];

export const tripTypes = [
  { id: "local", label: "Local", icon: FaCity },
  { id: "airport", label: "Airport", icon: FaPlaneDeparture },
  { id: "outstation", label: "Outstation", icon: FaRoute },
];

export const heroHighlights = [
  { icon: FaClock, text: "24×7 Service" },
  { icon: FaPlaneDeparture, text: "Airport Transfers" },
  { icon: FaMapMarkedAlt, text: "All India Permit" },
  { icon: FaShieldAlt, text: "Safe Journey" },
];

export const stats = [
  { value: "1000+", title: "Happy Customers" },
  { value: "5+", title: "Vehicle Types" },
  { value: "24×7", title: "Support" },
  { value: "All India", title: "Permit" },
];

export const services = [
  {
    title: "Airport Pickup & Drop",
    desc: "Reliable airport transfers with punctual pickups and comfortable rides.",
    image: responsiveImage("services/airport"),
    tripType: "airport",
  },
  {
    title: "Local City Rides",
    desc: "Affordable local travel within Faridabad and Delhi NCR.",
    image: responsiveImage("services/local"),
    tripType: "local",
  },
  {
    title: "Outstation Trips",
    desc: "Enjoy hassle-free journeys across India with experienced drivers.",
    image: responsiveImage("services/outstation"),
    tripType: "outstation",
  },
  {
    title: "Safe & Reliable Service",
    desc: "Professional drivers, sanitized vehicles and 24×7 customer support.",
    image: responsiveImage("services/reliable"),
  },
];

export const fleet = [
  {
    name: "Maruti Dzire",
    category: "Sedan",
    seats: "4 + 1 Seater",
    idealFor: "City rides & airport transfers",
    image: responsiveImage("fleet/dezire"),
  },
  {
    name: "Maruti Ertiga",
    category: "MUV",
    seats: "6 + 1 Seater",
    idealFor: "Small families & group travel",
    image: responsiveImage("fleet/ertiga"),
  },
  {
    name: "Toyota Innova Crysta",
    category: "Premium MUV",
    seats: "6 + 1 Seater",
    idealFor: "Comfortable long-distance trips",
    image: responsiveImage("fleet/innova-crysta"),
  },
  {
    name: "Kia Carens",
    category: "MUV",
    seats: "6 + 1 Seater",
    idealFor: "Family outings & outstation",
    image: responsiveImage("fleet/kia-carens"),
  },
  {
    name: "Tempo Traveller",
    category: "Group Van",
    seats: "9 / 12 / 16 Seater",
    idealFor: "Large groups, weddings & tours",
    image: responsiveImage("fleet/tempo-traveller"),
  },
];

export const features = [
  {
    icon: FaUserShield,
    title: "Safe & Trusted",
    desc: "Experienced drivers with customer safety as the highest priority.",
  },
  {
    icon: FaClock,
    title: "24×7 Available",
    desc: "Book your cab anytime for local, airport, or outstation travel.",
  },
  {
    icon: FaRupeeSign,
    title: "Affordable Pricing",
    desc: "Transparent pricing with no hidden charges.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "All India Permit",
    desc: "Travel anywhere across India with reliable and comfortable rides.",
  },
];

export const bookingHighlights = [
  "Clean Vehicles",
  "Professional Drivers",
  "Affordable Pricing",
  "24×7 Support",
];

export const testimonials = [
  {
    name: "Amit Sharma",
    city: "Faridabad",
    review:
      "Very professional service. The cab arrived on time, the driver was polite, and the journey was comfortable. Highly recommended!",
  },
  {
    name: "Priya Verma",
    city: "Delhi",
    review:
      "Booked an airport pickup at 4 AM. The driver reached before time and the ride was smooth. Excellent experience.",
  },
  {
    name: "Rahul Singh",
    city: "Gurugram",
    review:
      "Affordable pricing with clean vehicles. I booked an Innova Crysta for a family trip and everything was perfect.",
  },
];
