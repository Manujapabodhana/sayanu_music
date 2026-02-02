import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSystem from "@/components/AboutSystem";
import Stats from "@/components/Stats";
import Mission from "@/components/Mission";
import Journey from "@/components/Journey";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <Hero />
      <AboutSystem />
      <Mission />
      <Stats />
      <Journey />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  );
}
