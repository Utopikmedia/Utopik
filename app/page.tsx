import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
      <Services />
      <Portfolio />
      <Packages />
      <Contact />
      <Footer />
    </main>
  );
}
