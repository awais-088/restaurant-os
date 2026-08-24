import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";

import Hero from "@/components/website/Hero";
import Experience from "@/components/website/Experience";
import FeaturedDishes from "@/components/website/FeaturedDishes";
import FeaturedDeal from "@/components/website/FeaturedDeal";
import Story from "@/components/website/Story";
import GalleryPreview from "@/components/website/GalleryPreview";
import ReviewsPreview from "@/components/website/ReviewsPreview";
import Location from "@/components/website/Location";

import { musaRestaurant } from "@/data/restaurant";
import {
  featuredDishes,
  featuredDeal,
  galleryItems,
  reviews,
} from "@/data/home";

export default function Home() {
  const restaurant = musaRestaurant;

  return (
    <>
      <Navbar restaurant={restaurant} />

      <main>
        <Hero restaurant={restaurant} />

        <Experience />

        <FeaturedDishes dishes={featuredDishes} />

        <FeaturedDeal deal={featuredDeal} whatsapp={restaurant.whatsapp} />

        <Story restaurant={restaurant} />

        <GalleryPreview items={galleryItems} />

        <ReviewsPreview reviews={reviews} />

        <Location restaurant={restaurant} />
      </main>

      <Footer restaurant={restaurant} />

      <MobileActionBar restaurant={restaurant} />
    </>
  );
}
