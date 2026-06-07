import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Skills } from "@/components/sections/Skills";
import { Tools } from "@/components/sections/Tools";

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Skills />
        <Tools />
      </main>
      <Footer />
    </>
  );
}