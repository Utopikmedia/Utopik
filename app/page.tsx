import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-brand-bg">
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <Contact />
      <Footer />
    </main>
  );
}
