import { domAnimation, LazyMotion } from "framer-motion";

import BookingProvider from "./context/BookingProvider";
import Home from "./pages/Home";

function App() {
  return (
    // LazyMotion loads only the animation features we use, keeping the JS bundle small.
    <LazyMotion features={domAnimation} strict>
      <BookingProvider>
        <Home />
      </BookingProvider>
    </LazyMotion>
  );
}

export default App;
