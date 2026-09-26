"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

type Props = {
    workout: Workout;
};

const WorkoutActions = ({ workout }: Props) => {
    const {
        plan,
        saved,
        addToPlan,
        addToSaved,
    } = usePlan();

    const isInPlan = plan.some(
        (item) => item.id === workout.id
    );

    const isSaved = saved.some(
        (item) => item.id === workout.id
    );

    const planIsFull = plan.length >= 5;

    const handlePlan = () => {
        if (isInPlan) {
            toast.info("This workout is already in today's plan.");
            return;
        }

        if (planIsFull) {
            toast.warning(
                "Today's plan is full. Maximum 5 workouts allowed."
            );
            return;
        }

        addToPlan(workout);

        toast.success("Added to today's plan");
    };

    const handleSaved = () => {
        if (isSaved) {
            toast.info("This workout is already saved.");
            return;
        }

        addToSaved(workout);

        toast.success("Workout saved for later");
    };

    return (
        <div className="flex w-full flex-col gap-3">
            {/* Add to Plan */}
            <button
                type="button"
                onClick={handlePlan}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 sm:w-auto ${isInPlan
                        ? "bg-[#668000] text-black"
                        : "bg-[#ccff00] text-black hover:bg-[#bdf000]"
                    }`}
            >
                <CalendarPlus size={16} strokeWidth={2} />

                <span>
                    {isInPlan
                        ? "Already in today's plan"
                        : "Add to today's plan"}
                </span>
            </button>

            {/* Save */}
            <button
                type="button"
                onClick={handleSaved}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-all duration-200 sm:w-auto ${isSaved
                        ? "border-[#777] bg-transparent text-white"
                        : "border-white/80 bg-transparent text-white hover:border-[#ccff00] hover:text-[#ccff00]"
                    }`}
            >
                <Bookmark
                    size={16}
                    strokeWidth={2}
                    fill={isSaved ? "currentColor" : "none"}
                />

                <span>
                    {isSaved ? "Saved for later" : "Save for later"}
                </span>
            </button>
        </div>
    );
};

export default WorkoutActions;