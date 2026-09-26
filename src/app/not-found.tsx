import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-5 text-white">
            <div className="text-center">

                <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-lime-400">
                    FITLOG
                </p>

                <h1 className="text-7xl font-black tracking-tight sm:text-8xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold">
                    PAGE NOT FOUND
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                    The page you are looking for does not exist or may have been moved.
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-block rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
                >
                    Back to Home
                </Link>

            </div>
        </main>
    );
};

export default NotFound;