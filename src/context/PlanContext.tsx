"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { Workout } from "@/types/workout";
import { getWorkouts } from "@/lib/api";

type CompletionHistoryItem = {
    id: string;
    name: string;
    date: string;
    duration: number;
    calories: number;
};

type StoredCompletionHistoryItem = {
    id: string;
    name?: string;
    date: string;
    duration: number;
    calories: number;
};

type PlanContextType = {
    plan: Workout[];
    saved: Workout[];
    completed: string[];
    completionHistory: CompletionHistoryItem[];
    hydrated: boolean;

    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;

    removeFromPlan: (id: string) => void;
    removeFromSaved: (id: string) => void;

    markAsDone: (id: string) => void;
    undoAsDone: (id: string) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

const getStoredData = <T,>(key: string, fallback: T): T => {
    if (typeof window === "undefined") {
        return fallback;
    }

    try {
        const stored = localStorage.getItem(key);

        if (!stored) {
            return fallback;
        }

        return JSON.parse(stored) as T;
    } catch {
        return fallback;
    }
};

const getTodayKey = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const PlanProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [completed, setCompleted] = useState<string[]>([]);
    const [completionHistory, setCompletionHistory] = useState<
        CompletionHistoryItem[]
    >([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            const storedPlan = getStoredData<Workout[]>(
                "fitlog-plan",
                []
            );

            const storedSaved = getStoredData<Workout[]>(
                "fitlog-saved",
                []
            );

            const storedCompleted = getStoredData<string[]>(
                "fitlog-completed",
                []
            );

            const storedCompletedDate =
                getStoredData<string | null>(
                    "fitlog-completed-date",
                    null
                );

            const storedHistory =
                getStoredData<StoredCompletionHistoryItem[]>(
                    "fitlog-completion-history",
                    []
                );

            const today = getTodayKey();

            // ভ্যালুগুলো রিড করার সময় সংখ্যা নিশ্চিত করা হচ্ছে যাতে 0 বা NaN না আসে
            const sanitizedPlan = storedPlan.map((item) => ({
                ...item,
                duration: Number(item.duration) || 0,
                caloriesBurned: Number(item.caloriesBurned) || 0,
            }));

            setPlan(sanitizedPlan);
            setSaved(storedSaved);

            setCompleted(
                storedCompletedDate === today
                    ? storedCompleted
                    : []
            );

            setCompletionHistory(
                storedHistory.map((item) => ({
                    id: item.id,
                    name: item.name ?? "",
                    date: item.date,
                    duration: Number(item.duration) || 0,
                    calories: Number(item.calories) || 0,
                }))
            );

            setHydrated(true);
        }, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-plan",
            JSON.stringify(plan)
        );
    }, [plan, hydrated]);

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-saved",
            JSON.stringify(saved)
        );
    }, [saved, hydrated]);

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-completed",
            JSON.stringify(completed)
        );

        localStorage.setItem(
            "fitlog-completed-date",
            getTodayKey()
        );
    }, [completed, hydrated]);

    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(
            "fitlog-completion-history",
            JSON.stringify(completionHistory)
        );
    }, [completionHistory, hydrated]);

    useEffect(() => {
        if (!hydrated) return;

        const hasMissingNames = completionHistory.some(
            (item) => !item.name
        );

        if (!hasMissingNames) return;

        let cancelled = false;

        const migrateHistory = async () => {
            try {
                const workouts = await getWorkouts();

                if (cancelled) return;

                const workoutMap = new Map(
                    workouts.map((workout) => [
                        String(workout.id),
                        workout,
                    ])
                );

                setCompletionHistory((currentHistory) =>
                    currentHistory.map((item) => {
                        if (item.name) {
                            return item;
                        }

                        const workout = workoutMap.get(
                            String(item.id)
                        );

                        return {
                            ...item,
                            name:
                                workout?.name ??
                                "Workout completed",
                        };
                    })
                );
            } catch {
                if (cancelled) return;

                setCompletionHistory((currentHistory) =>
                    currentHistory.map((item) => ({
                        ...item,
                        name:
                            item.name ||
                            "Workout completed",
                    }))
                );
            }
        };

        migrateHistory();

        return () => {
            cancelled = true;
        };
    }, [hydrated, completionHistory]);

    /*
     * Add workout to today's plan.
     * ৫টি কার্ডের লিমিট এখান থেকে চিরতরে সরিয়ে দেওয়া হয়েছে।
     */
    const addToPlan = (workout: Workout) => {
        setPlan((currentPlan) => {
            const alreadyExists = currentPlan.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return currentPlan;
            }

            const sanitizedWorkout = {
                ...workout,
                duration: Number(workout.duration) || 0,
                caloriesBurned: Number(workout.caloriesBurned) || 0,
            };

            return [...currentPlan, sanitizedWorkout];
        });
    };

    const addToSaved = (workout: Workout) => {
        setSaved((currentSaved) => {
            const alreadyExists = currentSaved.some(
                (item) => item.id === workout.id
            );

            if (alreadyExists) {
                return currentSaved;
            }

            return [...currentSaved, workout];
        });
    };

    const removeFromPlan = (id: string) => {
        setPlan((currentPlan) =>
            currentPlan.filter(
                (item) => item.id !== id
            )
        );

        setCompleted((currentCompleted) =>
            currentCompleted.filter(
                (itemId) => itemId !== id
            )
        );
    };

    const removeFromSaved = (id: string) => {
        setSaved((currentSaved) =>
            currentSaved.filter(
                (item) => item.id !== id
            )
        );
    };

    const markAsDone = (id: string) => {
        const today = getTodayKey();

        setCompleted((currentCompleted) => {
            if (currentCompleted.includes(id)) {
                return currentCompleted;
            }

            return [...currentCompleted, id];
        });

        setPlan((currentPlan) => {
            const workout = currentPlan.find(
                (item) => item.id === id
            );

            if (!workout) {
                return currentPlan;
            }

            setCompletionHistory((currentHistory) => {
                const alreadyRecorded = currentHistory.some(
                    (item) =>
                        item.id === id &&
                        item.date === today
                );

                if (alreadyRecorded) {
                    return currentHistory;
                }

                return [
                    ...currentHistory,
                    {
                        id: workout.id,
                        name: workout.name,
                        date: today,
                        duration: Number(workout.duration) || 0,
                        calories: Number(workout.caloriesBurned) || 0,
                    },
                ];
            });

            return currentPlan;
        });
    };

    const undoAsDone = (id: string) => {
        const today = getTodayKey();

        setCompleted((currentCompleted) =>
            currentCompleted.filter(
                (itemId) => itemId !== id
            )
        );

        setCompletionHistory((currentHistory) =>
            currentHistory.filter(
                (item) =>
                    !(
                        item.id === id &&
                        item.date === today
                    )
            )
        );
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                saved,
                completed,
                completionHistory,
                hydrated,

                addToPlan,
                addToSaved,

                removeFromPlan,
                removeFromSaved,

                markAsDone,
                undoAsDone,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "usePlan must be used inside PlanProvider"
        );
    }

    return context;
};