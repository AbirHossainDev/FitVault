"use client";

import { useEffect, useState } from "react";

const RefreshLoader = () => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const navigation = performance.getEntriesByType(
            "navigation"
        )[0] as PerformanceNavigationTiming | undefined;

        if (navigation?.type !== "reload") {
            return;
        }

        const showTimer = setTimeout(() => {
            setShowLoader(true);
        }, 50);

        const hideTimer = setTimeout(() => {
            setShowLoader(false);
        }, 700);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!showLoader) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0f12]">
            <div className="flex flex-col items-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400" />

                <p className="mt-4 text-sm text-zinc-400">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default RefreshLoader;