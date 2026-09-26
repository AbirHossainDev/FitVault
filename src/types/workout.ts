export interface Workout {
  id: string;
  name: string;
  category: string[] | string;
  image: string;
  description: string;
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  sets: number;
  reps: string;
  instructions: string[];
}