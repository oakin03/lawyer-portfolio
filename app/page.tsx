import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProfileSummary from "@/components/sections/ProfileSummary";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProfileSummary />
      <Footer />
    </main>
  );
}