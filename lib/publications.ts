export type Publication = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string; // matches a PRACTICE_AREAS slug — image is derived from there, not stored here
  date: string;
};

// Placeholder data — this function will later be replaced with a Supabase query,
// e.g. `const { data } = await supabase.from("publications").select("*")`.
// The page components below only depend on this function's return shape,
// so swapping the implementation won't require changing the UI code.
export async function getPublications(): Promise<Publication[]> {
  return [
    {
      slug: "bosanma-surecinde-bilinmesi-gerekenler",
      title: "Boşanma Sürecinde Bilinmesi Gerekenler",
      excerpt: "Anlaşmalı ve çekişmeli boşanma arasındaki farklar, süreç ve haklarınız.",
      content:
        "Boşanma süreci, taraflar için hem hukuki hem duygusal açıdan zorlu bir dönemdir. Anlaşmalı boşanmada taraflar mal paylaşımı, velayet ve nafaka konularında uzlaşmış olur ve süreç görece hızlı ilerler. Çekişmeli boşanmada ise mahkeme, tarafların sunduğu delillere göre karar verir ve süreç daha uzun sürebilir.",
      category: "aile-hukuku",
      date: "2026-03-15",
    },
    {
      slug: "is-sozlesmesi-feshinde-haklariniz",
      title: "İş Sözleşmesi Feshinde Haklarınız",
      excerpt: "Haksız fesih durumunda kıdem, ihbar tazminatı ve işe iade süreci.",
      content:
        "İş sözleşmesinin işveren tarafından haksız şekilde feshedilmesi durumunda, çalışanın kıdem tazminatı, ihbar tazminatı ve işe iade davası açma hakları bulunmaktadır. Bu süreçte sürelerin kaçırılmaması büyük önem taşır.",
      category: "is-hukuku",
      date: "2026-02-02",
    },
    {
      slug: "miras-paylasiminda-sik-yasanan-uyusmazliklar",
      title: "Miras Paylaşımında Sık Yaşanan Uyuşmazlıklar",
      excerpt: "Mirastan mal kaçırma iddiaları ve tenkis davası süreci.",
      content:
        "Miras paylaşımı sürecinde en sık karşılaşılan uyuşmazlıklardan biri, mirasbırakanın mal varlığını belirli mirasçılardan kaçırdığı iddiasıdır. Bu durumda tenkis davası açılarak, saklı paylı mirasçıların haklarının korunması sağlanabilir.",
      category: "miras-hukuku",
      date: "2026-01-10",
    },
  ];
}
// Will later become a direct DB query by slug (e.g. `.eq("slug", slug).single()`),
// which is more efficient than fetching everything and filtering in memory —
// but the function signature/return shape stays the same, so the page code won't change.
export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  const all = await getPublications();
  return all.find((p) => p.slug === slug) ?? null;
}