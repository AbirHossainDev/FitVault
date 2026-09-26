"use client";

type CategoryFilterProps = {
    selectedCategory: string;
    onChange: (category: string) => void;
};

const categories = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Core",
    "Full Body",
];

const CategoryFilter = ({
    selectedCategory,
    onChange,
}: CategoryFilterProps) => {
    return (
        <div className="flex w-full gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onChange(category)}
                        className={`
              shrink-0 rounded-full px-4 py-2
              text-xs font-semibold
              transition-all duration-200
              ${isActive
                                ? "bg-[#CCFF00] text-black"
                                : "border border-[#2a2f37] bg-[#11151b] text-zinc-400 hover:border-[#CCFF00] hover:text-[#CCFF00]"
                            }
            `}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryFilter;