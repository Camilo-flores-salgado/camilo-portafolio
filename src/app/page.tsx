import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-svh flex-col">
      <Header />
      <Hero />
      <SelectedWork />
      <About />
      <Contact />
    </main>
  );
}
