export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
};

export type OpeningHour = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  slug: string;

  tagline?: string;
  description?: string;

  logo?: string;
  heroImage?: string;

  phone?: string;
  whatsapp?: string;
  email?: string;

  address?: string;

  latitude?: number;
  longitude?: number;

  openingHours?: OpeningHour[];

  socialLinks?: SocialLinks;
};
