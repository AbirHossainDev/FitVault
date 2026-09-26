"use client";

import { useEffect, useState } from "react";

import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types/workout";

const API = "https://api.abcz.workers.dev/api/fitlog";

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchWorkouts = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await fetch(API);

                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }

                const data: Workout[] = await response.json();

                if (isMounted) {
                    setWorkouts(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Unable to load workouts. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchWorkouts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section
            id="library"
            className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
            <div className="mb-10">
                <p className="text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                    THE LIBRARY
                </p>

                <p className="mt-2 text-sm text-gray-400">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            {isLoading ? (
                <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-[#272b32] bg-[#15181d]">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-[#CCFF00]" />

                        <p className="text-sm text-gray-400">
                            Loading workouts...
                        </p>
                    </div>
                </div>
            ) : error ? (
                <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-red-500/20 bg-[#15181d] px-5">
                    <div className="text-center">
                        <p className="text-sm text-red-400">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-xl bg-[#CCFF00] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#b8e600]"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            ) : workouts.length === 0 ? (
                <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-[#272b32] bg-[#15181d]">
                    <p className="text-sm text-gray-400">
                        No workouts found.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {workouts.map((workout) => (
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default WorkoutList;