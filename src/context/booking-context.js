import { createContext, useContext } from "react";

export const BookingContext = createContext({
  prefill: { nonce: 0 },
  startBooking: () => {},
});

export function useBooking() {
  return useContext(BookingContext);
}
