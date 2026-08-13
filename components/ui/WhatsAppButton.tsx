import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={SOCIAL_LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan Yazın"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}