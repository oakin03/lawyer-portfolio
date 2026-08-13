import Image from "next/image";

type PageBannerProps = {
  image: string;
  title: string;
  subtitle: string;
};

export default function PageBanner({ image, title, subtitle }: PageBannerProps) {
  return (
    <section className="relative flex h-64 w-full items-end overflow-hidden sm:h-80">
      <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[#2a1f1a]/70" />

      <div className="absolute bottom-6 end-6 sm:bottom-10 sm:end-10">
        <Image
          src="/images/logo-white.png"
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 sm:h-10 sm:w-10"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 sm:px-10 sm:pb-12">
        <h1 className="font-bold uppercase tracking-[0.15em] text-white text-xs sm:text-sm">{title}</h1>
        <p className="mt-3 max-w-3xl text-neutral-200 text-3xl sm:text-4xl">{subtitle}</p>
      </div>
    </section>
  );
}