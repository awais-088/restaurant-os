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

import { featuredDishes, reviews } from "@/data/home";

import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";
import Gallery from "@/models/Gallery";

export const dynamic = "force-dynamic";

export default async function Home() {
  const restaurant = musaRestaurant;

  await connectDB();

  const [deal, gallery] = await Promise.all([
    Deal.findOne({
      isActive: true,
    })
      .sort({
        sortOrder: 1,
        createdAt: -1,
      })
      .lean(),

    Gallery.find({
      isActive: true,
    })
      .sort({
        sortOrder: 1,
        createdAt: -1,
      })
      .limit(4)
      .lean(),
  ]);

  const featuredDeal = deal
    ? {
        id: deal._id.toString(),
        title: deal.title,
        description: deal.description,
        price: deal.price,
        badge: deal.badge,
        image: deal.image,
        isActive: deal.isActive,
        sortOrder: deal.sortOrder,
      }
    : null;

  const galleryItems = gallery.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    category: item.category,
    image: item.image,
  }));

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
