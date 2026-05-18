import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhoneShowcase from "@/components/PhoneShowcase";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-brand-bg">
      <Navbar />
      <Hero />
      <PhoneShowcase />
      <Services />
      <Portfolio />
      <Packages />
      <Contact />
      <Footer />
    </main>
  );
}
