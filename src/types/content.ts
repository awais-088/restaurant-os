export type FeaturedDish = {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
};

export type RestaurantDeal = {
  id: string;
  title: string;
  description: string;
  price?: string;
  image?: string;
  badge?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image?: string;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  source?: string;
};
