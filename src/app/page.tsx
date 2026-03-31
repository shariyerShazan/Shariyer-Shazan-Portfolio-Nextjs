import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollCard from "@/components/ScrollCard";
import Marquee from "@/components/Marquee";
import Works from "@/components/Works";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BottomBar from "@/components/BottomBar";

export default function Home() {
  return (
    <div>
      <Loader />

      <div id="site" className="m-12">
        <Navbar />
        <Hero />
        <ScrollCard />
        <Marquee />
        <Works />
        <Process />
        <About />
        <Contact />
      </div>

      <BottomBar />
    </div>
  );
}
