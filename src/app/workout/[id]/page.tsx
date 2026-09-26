import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import WorkoutActions from "@/components/WorkoutAction";
import { Workout } from "@/types/workout";

type PageProps = {
    params: Promise<{ id: string }>;
};

async function getWorkout(id: string): Promise<Workout | null> {
    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params;
    const workout = await getWorkout(id);

    if (!workout) {
        return {
            title: "Workout Not Found",
        };
    }

    return {
        title: workout.name,
        description: workout.description,
    };
}

export default async function WorkoutDetails({
    params,
}: PageProps) {
    const { id } = await params;
    const workout = await getWorkout(id);

    if (!workout) {
        notFound();
    }

    const categories = Array.isArray(workout.category)
        ? workout.category
        : workout.category
            ? [workout.category]
            : [];

    return (
        <main className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
                {/* Workout Image */}
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-[#272b32] bg-[#15181d] lg:sticky lg:top-24">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                {/* Workout Details */}
                <div>
                    {/* Categories */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {categories.map((item, index) => (
                            <span
                                key={`${item}-${index}`}
                                className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                        {workout.name}
                    </h1>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-6 text-[#9da3af] sm:text-base">
                        {workout.description}
                    </p>

                    {/* Specs */}
                    <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="rounded-xl border border-[#272b32] bg-[#15181d] p-4">
                            <p className="mb-1 text-xs uppercase text-gray-500">
                                Equipment
                            </p>
                            <p className="text-sm font-semibold sm:text-base">
                                {workout.equipment}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#272b32] bg-[#15181d] p-4">
                            <p className="mb-1 text-xs uppercase text-gray-500">
                                Difficulty
                            </p>
                            <p className="text-sm font-semibold capitalize sm:text-base">
                                {workout.difficulty}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#272b32] bg-[#15181d] p-4">
                            <p className="mb-1 text-xs uppercase text-gray-500">
                                Sets / Reps
                            </p>
                            <p className="text-sm font-semibold sm:text-base">
                                {workout.sets} × {workout.reps}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#272b32] bg-[#15181d] p-4">
                            <p className="mb-1 text-xs uppercase text-gray-500">
                                Duration
                            </p>
                            <p className="text-sm font-semibold sm:text-base">
                                {workout.duration} min
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#272b32] bg-[#15181d] p-4">
                            <p className="mb-1 text-xs uppercase text-gray-500">
                                Calories
                            </p>
                            <p className="text-sm font-semibold sm:text-base">
                                {workout.caloriesBurned} kcal
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#272b32] bg-[#15181d] p-4">
                            <p className="mb-1 text-xs uppercase text-gray-500">
                                Rating
                            </p>
                            <p className="text-sm font-semibold sm:text-base">
                                ⭐ {workout.rating}
                            </p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <section className="mb-8">
                        <h2 className="mb-5 text-xl font-black uppercase tracking-tight">
                            Instructions
                        </h2>

                        <ol className="space-y-4">
                            {workout.instructions.map((step, index) => (
                                <li
                                    key={`${step}-${index}`}
                                    className="flex items-start gap-3 text-sm leading-6 text-gray-300 sm:text-base"
                                >
                                    <span className="shrink-0 font-semibold text-white">
                                        {index + 1}.
                                    </span>

                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Actions */}
                    <WorkoutActions workout={workout} />
                </div>
            </div>
        </main>
    );
}