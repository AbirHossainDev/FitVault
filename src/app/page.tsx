import type { Metadata } from "next";

import Hero from "@/components/Hero";
import ProfessionalWorkoutList from "@/components/professional/ProfessionalWorkoutList";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0f12]">
      <Hero />
      <ProfessionalWorkoutList />
    </main>
  );
}