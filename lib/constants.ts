export const ATTORNEY = {
  name: "Büşra Nur Karakoç",
  office: "Büşra Nur Karakoç | Avukat & Arabulucu",
  title: "Avukat",
  heroHeadline: "Hukuki Süreçlerinizde Yanınızdayım",
  shortBio:
    "Bireysel ve kurumsal müvekkillerime şeffaf, kişiye özel ve sonuç odaklı hukuki danışmanlık sunuyorum.",
  aboutPreview:
    "Hukuk kariyerime başladığım günden bu yana, her müvekkilimin sadece bir dosya değil, kendine özgü bir hikayesi olduğuna inandım. Bireysel danışmanlıktan kurumsal hukuki süreçlere kadar geniş bir yelpazede, şeffaf iletişim ve titiz bir çalışma disipliniyle hareket ediyorum. Amacım, karmaşık hukuki süreçleri müvekkillerim için anlaşılır kılmak ve her aşamada yanlarında olmak. Bağımsız bir avukat olarak çalışmanın verdiği esneklikle, her davaya gereken zamanı ve özeni ayırabiliyorum. Deneyimlerimi sürekli güncel tutarak, değişen mevzuata en hızlı şekilde adapte olmayı önemsiyorum. Hedefim, uzun vadeli güvene dayalı bir avukat-müvekkil ilişkisi kurmak.",
  bio: "Bireyler ve işletmeler için kişiye özel, sonuç odaklı hukuki temsil sunuyorum. Bağımsız bir avukat olarak, her müvekkilimin tam ilgimi ve özverili uzmanlığımı almasını sağlıyorum.",
  photo: "/images/attorney-photo.jpg",
  heroImage: "/images/hero-background.jpg",
  address: "Mehmet Akif Ersoy Mah. 324 Cad. No: 2/B/37\nAnadolu 1919 Plaza\nYenimahalle/ANKARA",
  phone: "+90 531 662 66 76",
  barNumber: "Ankara Barosu - 12345",
  shortLocation: "Ankara, Anadolu Bulvarı",
  workingHours: "Pzt - Cum: 09:00 - 18:00",
};

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/hakkimda" },
  { label: "Faaliyet Alanları", href: "/uzmanlik-alanlari" },
  { label: "Makaleler", href: "/yayinlar" },
  { label: "İletişim", href: "/iletisim" },
];

// Footer link groups — split into personal/contact pages and content pages
export const FOOTER_LINKS_PERSONAL = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Kurumsal", href: "/hakkimda" },
  { label: "İletişim", href: "/iletisim" },
];

export const FOOTER_LINKS_CONTENT = [
  { label: "Faaliyet Alanları", href: "/uzmanlik-alanlari" },
  { label: "Makaleler", href: "/yayinlar" },
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/avukatbusrakarakoc",
  linkedin: "https://linkedin.com/in/büşra-nur-karakoç-776657430/",
  email: "av.busranurkarakoc@gmail.com",
  whatsapp: "https://wa.me/905316626676",
};

export const PRACTICE_AREAS = [
  { slug: "icra-iflas-hukuku", image: "/images/practice-areas/icra-iflas-hukuku.jpg" },
  { slug: "ceza-hukuku", image: "/images/practice-areas/ceza-hukuku.jpg" },
  { slug: "aile-hukuku", image: "/images/practice-areas/aile-hukuku.jpg" },
  { slug: "is-hukuku", image: "/images/practice-areas/is-hukuku.jpg" },
  { slug: "gayrimenkul-hukuku", image: "/images/practice-areas/gayrimenkul-hukuku.jpg" },
  { slug: "miras-hukuku", image: "/images/practice-areas/miras-hukuku.jpg" },
  { slug: "tuketici-hukuku", image: "/images/practice-areas/tuketici-hukuku.jpg" },
  { slug: "milletlerarasi-ozel-hukuk", image: "/images/practice-areas/milletlerarasi-ozel-hukuk.jpg" },
  { slug: "tazminat-hukuku", image: "/images/practice-areas/tazminat-hukuku.jpg" },
  { slug: "fikri-mulkiyet-hukuku", image: "/images/practice-areas/fikri-mulkiyet-hukuku.jpg" },
  { slug: "bilisim-hukuku", image: "/images/practice-areas/bilisim-hukuku.jpg" },
  { slug: "ticaret-hukuku", image: "/images/practice-areas/ticaret-hukuku.jpg" },
];
// Extends PRACTICE_AREAS with an "Other" option — used only for publication
// categorization (filter UI + future admin panel dropdown), not shown on the
// homepage or Uzmanlık Alanları page since it isn't a real practice area.
export const PUBLICATION_CATEGORIES = [
  ...PRACTICE_AREAS,
  { slug: "other", image: "/images/practice-areas/other.jpg" },
];

export const ABOUT_SECTIONS = [
  { key: "whoIAm", image: "/images/about-1.jpg" },
  { key: "principles", image: "/images/about-3.jpg" },
];

export const EXPERIENCE_TIMELINE = [
  {
    year: "2016",
    title: "Ankara Üniversitesi Hukuk Fakültesi",
    description: "Hukuk eğitimimi tamamlayarak lisans derecemi aldım.",
  },
  {
    year: "2017",
    title: "Ankara Barosu — Avukatlık Stajı",
    description: "Farklı hukuk bürolarında staj yaparak mesleki deneyimimin temellerini attım.",
  },
  {
    year: "2018",
    title: "Bağımsız Avukatlık",
    description: "Kendi büromu kurarak bireysel ve kurumsal müvekkillere hizmet vermeye başladım.",
  },
  {
    year: "2023",
    title: "Uzmanlaşma",
    description: "Ceza ve Aile Hukuku alanlarında yoğunlaşarak uzmanlığımı derinleştirdim.",
  },
];