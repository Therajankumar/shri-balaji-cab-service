import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroStats from "../components/HeroStats";
import Services from "../components/Services";
import Fleet from "../components/Fleet";
import WhyChooseUs from "../components/WhyChooseUs";
import BookingCTA from "../components/BookingCTA";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingCall from "../components/FloatingCall";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroStats />
      <Services />
      <Fleet/>
      <WhyChooseUs/>
      <BookingCTA/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <FloatingCall/>
    </>
  );
}