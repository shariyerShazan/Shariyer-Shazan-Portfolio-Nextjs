import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting detailed seed...");

  // 1. Admin User
  const hashedPassword = await bcrypt.hash("sjan*1293", 12);
  const user = await prisma.user.upsert({
    where: { email: "shariyershazan1@gmail.com" },
    update: {},
    create: {
      email: "shariyershazan1@gmail.com",
      password: hashedPassword,
    },
  });
  console.log(`✅ Admin user: ${user.email}`);

  // 2. Hero Section
  const hero = await prisma.hero.findFirst();
  if (!hero) {
    await prisma.hero.create({
      data: {
        heading: "I build digital<br/>products.",
        subheading: "Software Engineer",
        description: "Full-stack developer focused on performance and aesthetics.",
        image: "/images/hero-bg.png",
      }
    });
    console.log("✅ Seeded Hero section");
  }

  // 3. About Section
  const about = await prisma.about.findFirst();
  if (!about) {
    await prisma.about.create({
      data: {
        content: "Based in Dhaka, Bangladesh, I'm a full-stack developer with a sharp focus on clean architecture and performant interfaces. I treat code the way a craftsman treats their tools — with care, intentionality and constant refinement.",
        role: "Software Engineer",
        email: "shariyershazan1@gmail.com",
        phone: "+8801782213173",
        image: "/images/shazan.jpg"
      }
    });
    console.log("✅ Seeded About section");
  }

  // 4. Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "fls.tv<br/>Football Streaming Platform",
          description: "A premium, modern web application designed to deliver an immersive and cinematic football tracking and streaming experience.",
          image: "/images/fls.tv.png",
          liveLink: "https://flstv.vercel.app/",
          tags: ["Next.js 14", "React 19", "Framer Motion", "Tailwind CSS v3", "TypeScript"],
        },
        {
          title: "spylt<br/>Animated Milk Drink Brand Website",
          description: "Spylt is a fully animated and visually engaging website built for a fictional milk drink brand.",
          image: "/images/spylt.png",
          liveLink: "https://spylt.netlify.app/",
          tags: ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
        },
        {
          title: "Escrims<br/>Esports Tournament Platform",
          description: "A modern, full-featured esports tournament management platform built with React, TypeScript, and Firebase.",
          image: "/images/escrims.png",
          liveLink: "https://escrims.vercel.app/",
          tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
        }
      ],
    });
    console.log("✅ Seeded 3 projects");
  }

  // 5. Skills
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    await prisma.skill.createMany({
      data: [
        { name: "React / Next.js", category: "Frontend" },
        { name: "TypeScript", category: "Frontend" },
        { name: "Node.js / Express", category: "Backend" },
        { name: "SQL / PostgreSQL", category: "Backend" },
        { name: "Vercel / Netlify", category: "Infrastructure" },
        { name: "Figma", category: "Tools" },
      ],
    });
    console.log("✅ Seeded 6 skills");
  }

  // 6. Experience
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    await prisma.experience.createMany({
      data: [
        {
          company: "Freelance",
          role: "Full-Stack Developer",
          startDate: "2022",
          endDate: "Present",
          isCurrent: true,
          description: "Developed and shipped multiple high-performance web applications using the MERN & Next.js stack."
        }
      ]
    });
    console.log("✅ Seeded Experience");
  }

  // 7. Education
  const eduCount = await prisma.education.count();
  if (eduCount === 0) {
    await prisma.education.createMany({
      data: [
        {
          institution: "Dhaka Polytechnic Institute",
          degree: "Diploma in Computer Science",
          startDate: "2019",
          endDate: "2023",
          field: "Computer Engineering"
        }
      ]
    });
    console.log("✅ Seeded Education");
  }

  console.log("🎉 Detailed seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
