const Loading = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-4 text-white">
            <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-[#CCFF00]" />

                <p className="text-sm text-zinc-400">
                    Loading…
                </p>
            </div>
        </main>
    );
};

export default Loading;