"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    const [menuOpen, setMenuOpen] = useState(false);

    const isWorkoutPage =
        pathname === "/" || pathname.startsWith("/workout/");

    const isMyPlanPage = pathname === "/my-plan";

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 h-[66px] border-b border-[#17191d] bg-[#0d0f12]/95 backdrop-blur">
            <nav className="relative mx-auto flex h-full w-full max-w-[1295px] items-center px-4 sm:px-5">
                {/* Mobile Menu Button */}
                <button
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="mr-4 flex items-center justify-center text-[#d8d9dc] md:hidden"
                >
                    {menuOpen ? (
                        <X size={21} strokeWidth={2} />
                    ) : (
                        <Menu size={21} strokeWidth={2} />
                    )}
                </button>

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center gap-2"
                    aria-label="FitLog Home"
                >
                    <Image
                        src="/Images/logo.png"
                        alt="FitLog logo"
                        width={24}
                        height={24}
                        className="h-6 w-auto object-contain"
                    />

                    <span className="text-[16px] font-bold tracking-[-0.3px] text-[#f2f2f2] sm:text-[17px]">
                        FITLOG
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
                    <Link
                        href="/"
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${isWorkoutPage
                                ? "bg-[#17210d] text-[#ccff00]"
                                : "text-[#999ca3] hover:text-white"
                            }`}
                    >
                        Workout
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${isMyPlanPage
                                ? "bg-[#17210d] text-[#ccff00]"
                                : "text-[#999ca3] hover:text-white"
                            }`}
                    >
                        My Plan
                    </Link>
                </div>

                {/* Desktop Counters */}
                <div className="ml-auto hidden items-center gap-6 md:flex">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-xs font-medium text-[#d0d1d4] transition hover:text-white"
                    >
                        <span>Plan</span>

                        <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold leading-none text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-xs font-medium text-[#d0d1d4] transition hover:text-white"
                    >
                        <span>Saved</span>

                        <span className="flex h-[21px] min-w-[21px] items-center justify-center rounded-full border border-[#777b82] px-1.5 text-[11px] font-bold leading-none text-white">
                            {saved.length}
                        </span>
                    </Link>
                </div>

                {/* Mobile Counters */}
                <div className="ml-auto flex items-center gap-4 md:hidden">
                    <Link
                        href="/my-plan"
                        aria-label={`Today's plan: ${plan.length}`}
                        className="flex items-center gap-2 text-[12px] font-semibold text-[#d0d1d4]"
                    >
                        <span>Plan</span>

                        <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold leading-none text-black">
                            {plan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        aria-label={`Saved workouts: ${saved.length}`}
                        className="flex items-center gap-2 text-[12px] font-semibold text-[#d0d1d4]"
                    >
                        <span>Saved</span>

                        <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full border border-[#777b82] px-1.5 text-[11px] font-bold leading-none text-white">
                            {saved.length}
                        </span>
                    </Link>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute left-3 top-[62px] z-[60] w-[208px] overflow-hidden rounded-2xl border border-[#292c32] bg-[#1a1d23] shadow-2xl md:hidden">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className={`block px-4 py-3.5 text-[13px] font-medium transition ${isWorkoutPage
                                    ? "text-[#ccff00]"
                                    : "text-[#e5e7eb] hover:bg-[#22252b]"
                                }`}
                        >
                            Workouts
                        </Link>

                        <Link
                            href="/my-plan"
                            onClick={closeMenu}
                            className={`block px-4 py-3.5 text-[13px] font-medium transition ${isMyPlanPage
                                    ? "text-[#ccff00]"
                                    : "text-[#e5e7eb] hover:bg-[#22252b]"
                                }`}
                        >
                            My Plan
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;