import About from "@/components/About";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";

// Contact llega en el próximo prompt.
export default function Home() {
  return (
    <main className="flex min-h-svh flex-col">
      <Header />
      <Hero />
      <SelectedWork />
      <About />
    </main>
  );
}
