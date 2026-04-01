/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Timeline from "@/components/Timeline";
import prisma from "@/lib/db";

async function getData() {
  const [hero, about, projects, skills, experience, education] = await Promise.all([
    prisma.hero.findFirst(),
    prisma.about.findFirst(),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.skill.findMany(),
    prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
    prisma.education.findMany({ orderBy: { startDate: 'desc' } }),
  ]);

  return {
    hero,
    about,
    projects,
    skills,
    experience,
    education,
  };
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black">
      <Loader />

      <div id="site" className="m-[clamp(12px,2vw,48px)]">
        <Navbar />
        
        <Hero heroData={data.hero} />
        
        <ScrollCard 
          text={data.about?.content?.split(".")[0] + "." || "Building digital systems with precision and purpose."} 
        />
        
        <Marquee />
        
        <Works projects={data.projects} />
        
        <Timeline 
          experience={data.experience as any} 
          education={data.education as any} 
        />
        
        <Process />
        
        <About 
          aboutData={data.about} 
          skills={data.skills as any} 
        />
        
        <Contact aboutData={data.about} />
      </div>

      <BottomBar />
    </div>
  );
}
