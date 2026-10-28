import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";

import { contact } from "@/data/portfolio";

export const socials = [
  { label: "Email", href: `mailto:${contact.email}`, icon: Mail, external: false },
  { label: "Instagram", href: contact.instagram, icon: Instagram, external: true },
  { label: "LinkedIn", href: contact.linkedin, icon: Linkedin, external: true },
  { label: "WhatsApp", href: contact.whatsapp, icon: MessageCircle, external: true },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container-cinema flex flex-col items-start justify-between gap-6 py-8 sm:flex-row sm:items-center">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
          © {year} Dilshad Khan. All rights reserved.
        </p>
        <ul className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-500 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
