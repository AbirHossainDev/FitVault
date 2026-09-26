import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

import { Workout } from "@/types/workout";

type Props = {
    workout: Workout;
};

const WorkoutCard = ({ workout }: Props) => {
    const categories = Array.isArray(workout.category)
        ? workout.category
        : workout.category
            ? [workout.category]
            : [];

    return (
        <Link
            href={`/workout/${workout.id}`}
            className="group block"
        >
            <div className="cursor-pointer overflow-hidden rounded-[24px] border border-[#1F2937] bg-[#111827] transition-all duration-300 hover:-translate-y-1 hover:border-[#CCFF00]">
                {/* Image */}
                <div className="relative h-[190px] w-full">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Category Pills */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {categories.map((item, index) => (
                            <span
                                key={`${item}-${index}`}
                                className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold uppercase leading-tight text-white">
                        {workout.name}
                    </h2>

                    {/* Equipment */}
                    <p className="mt-2 text-sm text-gray-400">
                        {workout.equipment}
                    </p>

                    {/* Divide */}
                    <div className="my-4 border-t border-[#1F2937]" />

                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <Clock3 size={14} />
                            <span>{workout.duration} min</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Flame size={14} />
                            <span>{workout.caloriesBurned} cal</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Star size={14} />
                            <span>{workout.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;