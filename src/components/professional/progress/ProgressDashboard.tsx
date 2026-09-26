"use client";

import { useMemo } from "react";
import {
    CheckCircle2,
    Clock3,
    Flame,
    Trophy,
} from "lucide-react";

import { usePlan } from "@/context/PlanContext";

const DAILY_TARGET = 5;

const ProgressDashboard = () => {
    const { plan, completed } = usePlan();

    const completedWorkouts = useMemo(
        () =>
            plan.filter((workout) =>
                completed.includes(workout.id)
            ),
        [plan, completed]
    );

    const completedCount = Math.min(
        completedWorkouts.length,
        DAILY_TARGET
    );

    const totalMinutes = useMemo(
        () =>
            completedWorkouts.reduce(
                (total, workout) =>
                    total + workout.duration,
                0
            ),
        [completedWorkouts]
    );

    const totalCalories = useMemo(
        () =>
            completedWorkouts.reduce(
                (total, workout) =>
                    total + workout.caloriesBurned,
                0
            ),
        [completedWorkouts]
    );

    const completionRate = Math.min(
        Math.round(
            (completedCount / DAILY_TARGET) * 100
        ),
        100
    );

    const stats = [
        {
            label: "Completed",
            value: completedCount,
            suffix: ` / ${DAILY_TARGET}`,
            icon: CheckCircle2,
        },
        {
            label: "Minutes",
            value: totalMinutes,
            suffix: " min",
            icon: Clock3,
        },
        {
            label: "Calories",
            value: totalCalories,
            suffix: " cal",
            icon: Flame,
        },
        {
            label: "Progress",
            value: completionRate,
            suffix: "%",
            icon: Trophy,
        },
    ];

    return (
        <section className="rounded-3xl border border-[#252a32] bg-[#11151b] p-5 sm:p-7 lg:p-8">
            {/* Header */}
            <div>
                <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFF00] text-black">
                        <Trophy
                            size={17}
                            strokeWidth={2.5}
                        />
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#CCFF00]">
                        Progress Dashboard
                    </span>
                </div>

                <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                    Track Your Progress
                </h2>

                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                    Complete 5 workouts to finish today&apos;s goal.
                </p>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-[#252a32] bg-[#0d0f12] p-4"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[10px] font-medium uppercase text-zinc-500">
                                    {stat.label}
                                </span>

                                <Icon
                                    size={14}
                                    className="text-[#CCFF00]"
                                    strokeWidth={2}
                                />
                            </div>

                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-white sm:text-3xl">
                                    {stat.value}
                                </span>

                                <span className="text-[10px] text-zinc-500">
                                    {stat.suffix}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Progress */}
            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                        Today&apos;s completion
                    </span>

                    <span className="text-[10px] font-bold text-[#CCFF00]">
                        {completionRate}%
                    </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#252a32]">
                    <div
                        className="h-full rounded-full bg-[#CCFF00] transition-all duration-500"
                        style={{
                            width: `${completionRate}%`,
                        }}
                    />
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500">
                    <span>
                        {completedCount} of {DAILY_TARGET} completed
                    </span>

                    {completionRate === 100 && (
                        <span className="font-bold text-[#CCFF00]">
                            Daily goal completed!
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProgressDashboard;