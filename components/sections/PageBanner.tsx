import Image from "next/image";

type PageBannerProps = {
  image: string;
  title: string;
  subtitle: string;
};

export default function PageBanner({ image, title, subtitle }: PageBannerProps) {
  return (
    <section className="relative flex h-80 w-full items-center overflow-hidden sm:h-[420px]">
      <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[#2a1f1a]/70" />

        {/* Small logo, bottom-right corner */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10">
        <Image
            src="/images/logo-white.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 sm:h-10 sm:w-10"
        />
        </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-xl text-neutral-200">{subtitle}</p>
      </div>
    </section>
  );
}