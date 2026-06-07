import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <About />
        <Education />
      </main>
      <Footer />
    </>
  );
}