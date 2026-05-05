import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-brand-bg">
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Work />
      <Services />
      <Footer />
    </main>
  );
}
