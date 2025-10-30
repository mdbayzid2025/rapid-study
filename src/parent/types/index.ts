export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'classes' | 'events' | 'projects' | 'sports';
  title: string;
  description?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export type FilterCategory = 'all' | 'classes' | 'events' | 'projects' | 'sports';