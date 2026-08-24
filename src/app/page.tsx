import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/website/Hero";
import Experience from "@/components/website/Experience";
import { musaRestaurant } from "@/data/restaurant";

export default function Home() {
  const restaurant = musaRestaurant;

  return (
    <>
      <Navbar restaurant={restaurant} />

      <main>
        <Hero restaurant={restaurant} />

        <Experience />
      </main>
    </>
  );
}
