import { getWorkouts } from "@/lib/api";
import ProfessionalWorkoutLibrary from "./ProfessionalWorkoutLibrary";

const ProfessionalWorkoutList = async () => {
    const workouts = await getWorkouts();

    return (
        <section
            id="library"
            className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
            <div className="mb-8">
                <p className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                    THE LIBRARY
                </p>

                <p className="mt-2 text-sm text-gray-400">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            <ProfessionalWorkoutLibrary
                workouts={workouts}
            />
        </section>
    );
};

export default ProfessionalWorkoutList;