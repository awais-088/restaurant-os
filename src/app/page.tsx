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
import { featuredDishes, galleryItems, reviews } from "@/data/home";

import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";

export const dynamic = "force-dynamic";

export default async function Home() {
  const restaurant = musaRestaurant;

  await connectDB();

  const deal = await Deal.findOne({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
      createdAt: -1,
    })
    .lean();

  const featuredDeal = deal
    ? {
        id: deal._id.toString(),
        title: deal.title,
        description: deal.description,
        price: deal.price,
        badge: deal.badge || undefined,
        image: deal.image || undefined,
      }
    : null;

  return (
    <>
      <Navbar restaurant={restaurant} />

      <main>
        <Hero restaurant={restaurant} />

        <Experience />

        <FeaturedDishes dishes={featuredDishes} />

        {featuredDeal && (
          <FeaturedDeal deal={featuredDeal} whatsapp={restaurant.whatsapp} />
        )}

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
