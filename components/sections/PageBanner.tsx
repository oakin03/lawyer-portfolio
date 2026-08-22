import Image from "next/image";

type PageBannerProps = {
  image: string;
  title: string;
  subtitle: string;
};

export default function PageBanner({ image, title, subtitle }: PageBannerProps) {
  return (
    <section className="relative flex h-64 w-full items-end overflow-hidden bg-[#2a1f1a] sm:h-80 [@media(max-height:500px)]:!h-40">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover [@media(max-height:500px)]:!object-contain"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#2a1f1a]/70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 text-center sm:px-10 sm:pb-12 sm:text-left [@media(max-height:500px)]:!pb-3">
        <h1 className="font-bold uppercase tracking-[0.15em] text-white text-xs sm:text-sm [@media(max-height:500px)]:!text-[10px]">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-200 text-xl sm:mx-0 sm:max-w-3xl sm:text-4xl [@media(max-height:500px)]:!mt-1 [@media(max-height:500px)]:!text-sm">
          {subtitle}
        </p>
      </div>
    </section>
  );
}