import Image from "next/image";

const Hero = () => {
  return (
    <section className="px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-12 lg:pt-8">
      <div
        className="
                    mx-auto
                    flex
                    max-w-[1140px]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#272b32]
                    bg-[#191c22]
                    lg:min-h-[598px]
                    lg:flex-row
                "
      >
        {/* Left Content */}
        <div
          className="
                        flex
                        w-full
                        flex-col
                        justify-center
                        px-6
                        py-12
                        sm:px-10
                        sm:py-14
                        lg:w-[58%]
                        lg:px-12
                        lg:py-16
                    "
        >
          {/* Eyebrow */}
          <p
            className="
                            mb-6
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wide
                            text-[#ccff00]
                            sm:text-xs
                        "
          >
            Workout Library
          </p>

          {/* Heading */}
          <h1
            className="
                            max-w-[560px]
                            text-[42px]
                            font-semibold
                            uppercase
                            leading-[1.08]
                            tracking-[-0.02em]
                            text-[#f1f3f5]
                            sm:text-5xl
                            md:text-[52px]
                            lg:text-[54px]
                        "
          >
            Train with intent. Log every set.
          </h1>

          {/* Description */}
          <p
            className="
                            mt-6
                            max-w-[500px]
                            text-sm
                            leading-6
                            text-[#a6adb8]
                            sm:text-base
                            sm:leading-6
                        "
          >
            FitLog is a dark, no-nonsense gym companion: pick a
            lift, lock it into today&apos;s plan, and watch the
            week&apos;s work add up.
          </p>

          {/* CTA */}
          <a
            href="#library"
            className="
                            mt-7
                            inline-flex
                            h-11
                            w-fit
                            items-center
                            justify-center
                            rounded-full
                            bg-[#ccff00]
                            px-5
                            text-sm
                            font-semibold
                            text-black
                            transition
                            hover:bg-[#baff00]
                        "
          >
            Browse Workouts
          </a>
        </div>

        {/* Image */}
        <div
          className="
                        relative
                        h-[330px]
                        w-full
                        sm:h-[410px]
                        md:h-[460px]
                        lg:h-auto
                        lg:min-h-[598px]
                        lg:w-[42%]
                    "
        >
          <Image
            src="/Images/banner.png"
            alt="FitLog workout illustration"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="
                            object-contain
                            object-center
                            lg:scale-[1.08]
                        "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;