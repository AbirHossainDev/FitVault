"use client";

import { Search } from "lucide-react";

type WorkoutSearchProps = {
    value: string;
    onChange: (value: string) => void;
};

const WorkoutSearch = ({
    value,
    onChange,
}: WorkoutSearchProps) => {
    return (
        <div className="relative w-full">
            <Search
                size={18}
                strokeWidth={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search workouts..."
                aria-label="Search workouts"
                className="
          h-12 w-full rounded-xl
          border border-[#252a32]
          bg-[#11151b]
          pl-11 pr-4
          text-sm text-white
          outline-none
          placeholder:text-zinc-500
          transition
          focus:border-[#CCFF00]
          focus:ring-1
          focus:ring-[#CCFF00]
        "
            />
        </div>
    );
};

export default WorkoutSearch;