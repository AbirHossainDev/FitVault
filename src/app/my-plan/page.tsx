"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
    Check,
    Clock3,
    Flame,
    RotateCcw,
    Star,
    Trash2,
    X,
} from "lucide-react";

import { toast } from "react-toastify";

import Loading from "@/components/Loading";
import { usePlan } from "@/context/PlanContext";

type SortOption = "duration" | "calories" | "rating";
type ActiveTab = "plan" | "saved";

const MyPlanPage = () => {
    const {
        plan,
        saved,
        completed,
        hydrated,
        markAsDone,
        undoAsDone,
        removeFromPlan,
        removeFromSaved,
    } = usePlan();

    const [activeTab, setActiveTab] = useState<ActiveTab>("plan");
    const [sortBy, setSortBy] = useState<SortOption>("duration");

    // পেজ লোড বা হ্যাশ চেঞ্জের সময় চেক করবে Saved এ যেতে হবে কিনা
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === "#saved") {
                setActiveTab("saved");
            } else {
                setActiveTab("plan");
            }
        };

        checkHash();
        window.addEventListener("hashchange", checkHash);
        return () => window.removeEventListener("hashchange", checkHash);
    }, []);

    if (!hydrated) {
        return <Loading />;
    }

    const currentList = activeTab === "plan" ? plan : saved;

    const totalExercises = currentList.length;

    const totalMinutes = currentList.reduce(
        (total, workout) => total + (Number(workout.duration) || 0),
        0
    );

    const totalCalories = currentList.reduce(
        (total, workout) =>
            total + (Number(workout.caloriesBurned) || 0),
        0
    );

    const sortedWorkouts = [...currentList].sort(
        (a, b) => {
            if (sortBy === "duration") {
                return Number(b.duration || 0) - Number(a.duration || 0);
            }

            if (sortBy === "calories") {
                return (
                    Number(b.caloriesBurned || 0) -
                    Number(a.caloriesBurned || 0)
                );
            }

            return Number(b.rating || 0) - Number(a.rating || 0);
        }
    );

    const handleClearAll = () => {
        if (currentList.length === 0) {
            return;
        }

        if (activeTab === "plan") {
            currentList.forEach((workout) => {
                removeFromPlan(workout.id);
            });

            toast.success("All workouts removed from today's plan");
        } else {
            currentList.forEach((workout) => {
                removeFromSaved(workout.id);
            });

            toast.success("All saved workouts removed");
        }
    };

    return (
        <main className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white sm:px-6 sm:py-9 lg:px-8">
            <div className="mx-auto max-w-[1060px]">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                        My Plan
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                        Manage your daily workout plan and saved items.
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-9 grid grid-cols-1 overflow-hidden rounded-2xl border border-zinc-800 bg-[#1a1d23] sm:grid-cols-3">
                    <div className="border-b border-zinc-800 p-5 sm:border-b-0 sm:border-r sm:p-6">
                        <p className="text-xs text-zinc-400 sm:text-sm">
                            Exercises
                        </p>

                        <p className="mt-2 text-3xl font-black text-lime-400 sm:text-4xl">
                            {totalExercises}
                        </p>
                    </div>

                    <div className="border-b border-zinc-800 p-5 sm:border-b-0 sm:border-r sm:p-6">
                        <p className="text-xs text-zinc-400 sm:text-sm">
                            Minutes
                        </p>

                        <p className="mt-2 text-3xl font-black text-white sm:text-4xl">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="p-5 sm:p-6">
                        <p className="text-xs text-zinc-400 sm:text-sm">
                            Calories
                        </p>

                        <p className="mt-2 text-3xl font-black text-white sm:text-4xl">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* Tabs + Sort */}
                <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    {/* Tabs */}
                    <div className="flex w-fit rounded-xl border border-zinc-800 bg-[#1a1d23] p-1">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTab("plan");
                                window.history.replaceState(null, "", "/my-plan");
                            }}
                            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                activeTab === "plan"
                                    ? "bg-[#111318] text-lime-400"
                                    : "text-zinc-500 hover:text-white"
                            }`}
                        >
                            Today&apos;s Plan

                            <span
                                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                                    activeTab === "plan"
                                        ? "bg-lime-400 text-black"
                                        : "bg-zinc-700 text-zinc-300"
                                }`}
                            >
                                {plan.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setActiveTab("saved");
                                window.history.replaceState(null, "", "/my-plan");
                            }}
                            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                activeTab === "saved"
                                    ? "bg-[#111318] text-lime-400"
                                    : "text-zinc-500 hover:text-white"
                            }`}
                        >
                            Saved

                            <span
                                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                                    activeTab === "saved"
                                        ? "border border-zinc-500 bg-transparent text-white"
                                        : "bg-zinc-700 text-zinc-300"
                                }`}
                            >
                                {saved.length}
                            </span>
                        </button>
                    </div>

                    {/* Sort + Clear All */}
                    {currentList.length > 0 && (
                        <div className="flex w-full flex-col gap-2 sm:w-[220px]">
                            <label
                                htmlFor="sort"
                                className="text-sm text-white"
                            >
                                Sort By
                            </label>

                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(
                                        event.target.value as SortOption
                                    )
                                }
                                className="h-10 w-full rounded-xl border border-zinc-700 bg-[#111318] px-3 text-sm text-white outline-none transition focus:border-lime-400"
                            >
                                <option value="duration" className="bg-[#111318]">
                                    Duration
                                </option>
                                <option value="calories" className="bg-[#111318]">
                                    Calories
                                </option>
                                <option value="rating" className="bg-[#111318]">
                                    Rating
                                </option>
                            </select>

                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-500/50 bg-red-500/10 text-xs font-bold text-red-400 transition hover:border-red-500 hover:bg-red-500/20 hover:text-red-300"
                            >
                                <Trash2 size={14} />
                                {activeTab === "plan"
                                    ? "Clear All"
                                    : "Remove All"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Empty State / Workout List */}
                {currentList.length === 0 ? (
                    <div className="flex min-h-[195px] items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-[#1a1d23]">
                        <div className="px-5 text-center">
                            <h2 className="text-base font-black uppercase tracking-wide text-white sm:text-lg">
                                Nothing Here Yet
                            </h2>

                            <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
                                {activeTab === "plan"
                                    ? "Browse the library and add a lift to get today moving."
                                    : "Save a workout from the library and it will appear here."}
                            </p>

                            <Link
                                href="/"
                                className="mt-5 inline-block rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300"
                            >
                                Go to workouts
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedWorkouts.map((workout) => {
                            const isCompleted =
                                activeTab === "plan" &&
                                completed.includes(workout.id);

                            return (
                                <div
                                    key={workout.id}
                                    className={`rounded-2xl border bg-[#1a1d23] p-4 transition ${
                                        isCompleted
                                            ? "border-lime-400/40"
                                            : "border-zinc-800"
                                    }`}
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                        <div className="relative h-[110px] w-full shrink-0 overflow-hidden rounded-xl sm:h-[120px] md:w-[138px]">
                                            <Image
                                                src={workout.image}
                                                alt={workout.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 138px"
                                                className={`object-cover ${
                                                    isCompleted
                                                        ? "opacity-60"
                                                        : ""
                                                }`}
                                            />

                                            {isCompleted && (
                                                <div className="absolute right-2 top-2 rounded-full bg-lime-400 px-2 py-1 text-[10px] font-bold text-black">
                                                    Done
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h2 className="truncate text-lg font-black uppercase leading-tight text-white">
                                                {workout.name}
                                            </h2>

                                            <p className="mt-1 text-sm text-zinc-400">
                                                {workout.equipment}
                                            </p>

                                            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock3
                                                        size={14}
                                                        className="text-lime-400"
                                                    />
                                                    {workout.duration} min
                                                </span>

                                                <span className="flex items-center gap-1.5">
                                                    <Flame
                                                        size={14}
                                                        className="text-lime-400"
                                                    />
                                                    {workout.caloriesBurned} kcal
                                                </span>

                                                <span className="flex items-center gap-1.5">
                                                    <Star
                                                        size={14}
                                                        className="text-lime-400"
                                                    />
                                                    {workout.rating}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 flex-wrap items-center gap-2 md:flex-nowrap">
                                            <Link
                                                href={`/workout/${workout.id}`}
                                                className="rounded-full border border-zinc-400 px-4 py-2 text-xs font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
                                            >
                                                View Details
                                            </Link>

                                            {activeTab === "plan" && (
                                                <>
                                                    {isCompleted ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                undoAsDone(
                                                                    workout.id
                                                                )
                                                            }
                                                            className="flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-400/20"
                                                        >
                                                            <RotateCcw
                                                                size={14}
                                                            />
                                                            Undo Done
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                markAsDone(
                                                                    workout.id
                                                                )
                                                            }
                                                            className="flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-lime-300"
                                                        >
                                                            <Check
                                                                size={14}
                                                            />
                                                            Mark as Done
                                                        </button>
                                                    )}
                                                </>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (
                                                        activeTab === "plan"
                                                    ) {
                                                        removeFromPlan(
                                                            workout.id
                                                        );
                                                    } else {
                                                        removeFromSaved(
                                                            workout.id
                                                        );
                                                    }
                                                }}
                                                className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyPlanPage;