export const ATTORNEY = {
  name: "Büşra Karakoç",
  office: "Karakoç Hukuk Bürosu",
  title: "Avukat",
  heroHeadline: "Hukuki Süreçlerinizde Yanınızdayım",
  shortBio:
    "Bireysel ve kurumsal müvekkillerime şeffaf, kişiye özel ve sonuç odaklı hukuki danışmanlık sunuyorum.",
  aboutPreview:
    "Hukuk kariyerime başladığım günden bu yana, her müvekkilimin sadece bir dosya değil, kendine özgü bir hikayesi olduğuna inandım. Bireysel danışmanlıktan kurumsal hukuki süreçlere kadar geniş bir yelpazede, şeffaf iletişim ve titiz bir çalışma disipliniyle hareket ediyorum. Amacım, karmaşık hukuki süreçleri müvekkillerim için anlaşılır kılmak ve her aşamada yanlarında olmak. Bağımsız bir avukat olarak çalışmanın verdiği esneklikle, her davaya gereken zamanı ve özeni ayırabiliyorum. Deneyimlerimi sürekli güncel tutarak, değişen mevzuata en hızlı şekilde adapte olmayı önemsiyorum. Hedefim, uzun vadeli güvene dayalı bir avukat-müvekkil ilişkisi kurmak.",
  bio: "Bireyler ve işletmeler için kişiye özel, sonuç odaklı hukuki temsil sunuyorum. Bağımsız bir avukat olarak, her müvekkilimin tam ilgimi ve özverili uzmanlığımı almasını sağlıyorum.",
  photo: "/images/attorney-photo.jpg",
  heroImage: "/images/hero-background.jpg",
  address: "Atatürk Bulvarı No: 123, Çankaya / Ankara",
  phone: "+90 500 000 00 00",
  barNumber: "Ankara Barosu - 12345",
};

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Uzmanlık Alanları", href: "/uzmanlik-alanlari" },
  { label: "Yayınlar", href: "/yayinlar" },
  { label: "İletişim", href: "/iletisim" },
];

// Footer link groups — split into personal/contact pages and content pages
export const FOOTER_LINKS_PERSONAL = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "İletişim", href: "/iletisim" },
];

export const FOOTER_LINKS_CONTENT = [
  { label: "Uzmanlık Alanları", href: "/uzmanlik-alanlari" },
  { label: "Yayınlar", href: "/yayinlar" },
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/eithan03",
  linkedin: "https://linkedin.com/in/burkay-orkun-akin",
  email: "oakin03@gmail.com",
  whatsapp: "https://wa.me/905000000000",
};

export const PRACTICE_AREAS = [
  { title: "Ceza Hukuku", image: "/images/practice-areas/ceza-hukuku.jpg" },
  { title: "Aile Hukuku", image: "/images/practice-areas/aile-hukuku.jpg" },
  { title: "İcra ve İflas Hukuku", image: "/images/practice-areas/icra-iflas-hukuku.jpg" },
  { title: "İş Hukuku", image: "/images/practice-areas/is-hukuku.jpg" },
  { title: "Ticaret Hukuku", image: "/images/practice-areas/ticaret-hukuku.jpg" },
  { title: "Gayrimenkul Hukuku", image: "/images/practice-areas/gayrimenkul-hukuku.jpg" },
  { title: "Miras Hukuku", image: "/images/practice-areas/miras-hukuku.jpg" },
  { title: "Sözleşmeler Hukuku", image: "/images/practice-areas/sozlesmeler-hukuku.jpg" },
];

export const ABOUT_SECTIONS = [
  {
    title: "Kim Olduğum",
    text: ATTORNEY.aboutPreview,
    image: "/images/about-1.jpg",
    imagePosition: "left" as const,
  },
  {
    title: "Çalışma Prensiplerim",
    text: "Her müvekkilimle açık ve dürüst bir iletişim kurmayı önemsiyorum. Hukuki süreçleri anlaşılır bir dilde aktarmak, beklentileri net bir şekilde yönetmek ve her aşamada ulaşılabilir olmak temel prensiplerim arasında. Amacım sadece bir dava kazanmak değil, müvekkillerimin bu süreci güvenle atlatmasını sağlamak.",
    image: "/images/about-3.jpg",
    imagePosition: "right" as const,
  },
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