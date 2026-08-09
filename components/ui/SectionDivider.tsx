export default function SectionDivider() {
  return (
    <div className="bg-cream-light py-2">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4">
        <div className="h-px flex-1 bg-neutral-300" />
        <div className="h-2.5 w-2.5 rotate-45 border border-burgundy bg-burgundy/10" />
        <div className="h-px flex-1 bg-neutral-300" />
      </div>
    </div>
  );
}