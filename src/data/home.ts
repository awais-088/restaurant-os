import type {
  FeaturedDish,
  GalleryItem,
  RestaurantDeal,
  Review,
} from "@/types/content";

export const featuredDishes: FeaturedDish[] = [
  {
    id: "dish-1",
    name: "Chicken Handi",
    category: "Signature",
    description:
      "A rich and comforting Pakistani favorite, prepared for the table.",
    featured: true,
  },
  {
    id: "dish-2",
    name: "BBQ Platter",
    category: "From the Grill",
    description: "A generous selection of grilled favorites made for sharing.",
    featured: true,
  },
  {
    id: "dish-3",
    name: "Chicken Sulemani Karahi",
    category: "Desi Kitchen",
    description:
      "Bold flavors and traditional character in one of our featured dishes.",
    featured: true,
  },
];

export const featuredDeal: RestaurantDeal = {
  id: "deal-1",
  title: "Gather Around the Table",
  description:
    "Bring your family and friends together for a memorable dining experience.",
  badge: "MUSA SPECIAL",
};

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "The Dining Experience",
    category: "Interior",
  },
  {
    id: "gallery-2",
    title: "From Our Kitchen",
    category: "Food",
  },
  {
    id: "gallery-3",
    title: "Made for Sharing",
    category: "Dining",
  },
  {
    id: "gallery-4",
    title: "Moments at MUSA",
    category: "Experience",
  },
];

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Google Guest",
    rating: 5,
    text: "A welcoming place with a good variety of food and a pleasant dining atmosphere.",
    source: "Google",
  },
  {
    id: "review-2",
    name: "Google Guest",
    rating: 5,
    text: "The food selection and overall atmosphere make it a good place for family dining.",
    source: "Google",
  },
  {
    id: "review-3",
    name: "Google Guest",
    rating: 4,
    text: "A popular local spot with a wide range of dishes and a comfortable environment.",
    source: "Google",
  },
];
