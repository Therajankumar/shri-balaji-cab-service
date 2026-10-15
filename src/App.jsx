import BookingProvider from "./context/BookingProvider";
import Home from "./pages/Home";

function App() {
  return (
    <BookingProvider>
      <Home />
    </BookingProvider>
  );
}

export default App;
