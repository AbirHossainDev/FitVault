import { Workout } from "@/types/workout";

const API = "https://api.abcz.workers.dev/api/fitlog";

type ApiWorkout = Omit<Workout, "id" | "category"> & {
  id: string | number;
  muscleGroups: string[];
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
    category: workout.muscleGroups,
  }));
}