"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import WorkoutSearch from "./WorkoutSearch";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

type ProfessionalWorkoutLibraryProps = {
    workouts: Workout[];
};

const ProfessionalWorkoutLibrary = ({
    workouts,
}: ProfessionalWorkoutLibraryProps) => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredWorkouts = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return workouts.filter((workout) => {
            const categories = Array.isArray(workout.category)
                ? workout.category
                : workout.category
                    ? [workout.category]
                    : [];

            const matchesSearch =
                !searchText ||
                workout.name.toLowerCase().includes(searchText) ||
                workout.equipment.toLowerCase().includes(searchText) ||
                categories.some((category) =>
                    category.toLowerCase().includes(searchText)
                );

            const matchesCategory =
                selectedCategory === "All" ||
                categories.some(
                    (category) =>
                        category.toLowerCase() === selectedCategory.toLowerCase()
                );

            return matchesSearch && matchesCategory;
        });
    }, [workouts, search, selectedCategory]);

    const clearFilters = () => {
        setSearch("");
        setSelectedCategory("All");
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <WorkoutSearch
                    value={search}
                    onChange={setSearch}
                />

                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onChange={setSelectedCategory}
                />
            </div>

            {(search || selectedCategory !== "All") && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="text-xs font-semibold text-[#CCFF00] transition hover:text-white"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {filteredWorkouts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredWorkouts.map((workout) => (
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-[#252a32] bg-[#11151b] px-6 py-14 text-center">
                    <h3 className="text-lg font-bold text-white">
                        No workouts found
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                        Try another search or choose a different category.
                    </p>

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-5 rounded-full bg-[#CCFF00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#bdf000]"
                    >
                        Reset filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfessionalWorkoutLibrary;