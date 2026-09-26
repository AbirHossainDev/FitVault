import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-[#17191d] bg-[#191c22]">
      <div
        className="
          mx-auto flex max-w-[1320px]
          flex-col items-center justify-center
          gap-4 px-4 py-6
          sm:px-6
          md:flex-row md:justify-between
          md:gap-6 md:py-7
          lg:px-10
        "
      >
        {/* Logos */}
        <div className="flex shrink-0 items-center gap-2">
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
        </div>

        {/* Copyr */}
        <p
          className="
            max-w-full
            text-center text-[11px] leading-5 text-zinc-500
            sm:text-xs
            md:text-right md:text-sm
          "
        >
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;