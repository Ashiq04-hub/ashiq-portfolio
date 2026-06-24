import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Ashiq Alsinawi | Junior Software Engineer",
  description:
    "Junior Software Engineer and Computer Science student at Arellano University. I build clean, scalable full-stack web applications.",
  openGraph: {
    title: "Ashiq Alsinawi | Junior Software Engineer",
    description:
      "Junior Software Engineer and Computer Science student at Arellano University. I build clean, scalable full-stack web applications.",
    url: "https://ashiq-portfolio-ten.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
