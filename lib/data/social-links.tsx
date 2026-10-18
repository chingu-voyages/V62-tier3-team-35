import { MessageCircle, Send, Mail } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface GetSocialLinksParams {
  encodedUrl: string;
  message: string;
}

export function getSocialLinks({
  encodedUrl,
  message,
}: GetSocialLinksParams): SocialLink[] {
  return [
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${message}`,
      icon: <Send className="size-5" />,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${message}%20${encodedUrl}`,
      icon: <MessageCircle className="size-5" />,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <span className="text-xl font-bold">f</span>,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${message}`,
      icon: <span className="text-lg font-semibold">𝕏</span>,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <span className="text-sm font-bold">in</span>,
    },
    {
      name: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${message}`,
      icon: <span className="text-lg font-bold">r/</span>,
    },
    {
      name: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${message}`,
      icon: <span className="text-xl font-bold">P</span>,
    },
    {
      name: "Email",
      href: `mailto:?subject=${message}&body=${message}%0A${encodedUrl}`,
      icon: <Mail className="size-5" />,
    },
  ];
}
