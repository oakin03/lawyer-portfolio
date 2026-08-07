import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import PracticeAreas from "@/components/sections/PracticeAreas";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SectionDivider />
      <AboutPreview />
      <SectionDivider />
      <PracticeAreas />
      <Footer />
    </main>
  );
}