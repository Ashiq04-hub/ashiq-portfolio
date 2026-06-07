import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhyHireMe } from "@/components/sections/WhyHireMe";
import { Projects } from "@/components/sections/Projects";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <WhyHireMe />
        <Projects />
      </main>
      <Footer />
    </>
  );
}