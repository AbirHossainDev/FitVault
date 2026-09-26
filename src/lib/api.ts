import { Workout } from "@/types/workout";

const API = "https://api.api-store.workers.dev/api/fitlog";

type ApiWorkout = {
  id: string | number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data: ApiWorkout[] = await res.json();

  return data.map((workout) => ({
    ...workout,
    id: String(workout.id),
    title: workout.name, 
    category: workout.muscleGroups,
  }));
}