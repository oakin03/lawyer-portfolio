export default function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-4">
      <div className="h-px flex-1 bg-neutral-200" />
      <div className="h-2 w-2 rotate-45 border border-burgundy/40" />
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}