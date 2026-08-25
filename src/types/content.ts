export type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  featured?: boolean;
  available?: boolean;
};

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
  price?: number;
  image?: string;
  badge?: string;
  isActive?: boolean;
  sortOrder?: number;
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

export type CartItem = MenuItem & {
  quantity: number;
};
