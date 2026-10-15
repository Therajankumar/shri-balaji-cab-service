import { render } from "@testing-library/react";
import { domAnimation, LazyMotion } from "framer-motion";

import BookingProvider from "../context/BookingProvider";

// Render a component with the same providers the real app uses.
export function renderWithProviders(ui) {
  return render(
    <LazyMotion features={domAnimation}>
      <BookingProvider>{ui}</BookingProvider>
    </LazyMotion>
  );
}

export const validBooking = {
  tripType: "airport",
  pickup: "Sector 15, Faridabad",
  drop: "IGI Airport T3",
  date: "2026-12-01",
  time: "05:30",
  vehicle: "Maruti Dzire",
  name: "Test User",
  phone: "98765 43210",
  email: "test@example.com",
  message: "2 bags",
};
