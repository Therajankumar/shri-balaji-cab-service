import { useCallback, useMemo, useState } from "react";

import { BookingContext } from "./booking-context";

export const BOOKING_FORM_ID = "book";

// Lets any "Book" button (fleet card, service card, navbar...) pre-fill the
// hero booking form and scroll the visitor to it.
export default function BookingProvider({ children }) {
  const [prefill, setPrefill] = useState({ nonce: 0 });

  const startBooking = useCallback((details = {}) => {
    setPrefill((prev) => ({ ...details, nonce: prev.nonce + 1 }));
    document
      .getElementById(BOOKING_FORM_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const value = useMemo(() => ({ prefill, startBooking }), [prefill, startBooking]);

  return <BookingContext value={value}>{children}</BookingContext>;
}
