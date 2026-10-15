import BookingCTA from "../components/BookingCTA";
import Contact from "../components/Contact";
import Fleet from "../components/Fleet";
import FloatingCall from "../components/FloatingCall";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HeroStats from "../components/HeroStats";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroStats />
        <Services />
        <Fleet />
        <WhyChooseUs />
        <BookingCTA />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
