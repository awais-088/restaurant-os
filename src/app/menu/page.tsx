import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import MenuExperience from "@/components/menu/MenuExperience";

import { musaRestaurant } from "@/data/restaurant";
import { menuCategories, menuItems } from "@/data/menu";

export const metadata = {
  title: "Menu | MUSA Cafe & Restaurant",
  description: "Explore the menu at MUSA Cafe & Restaurant in Layyah.",
};

export default function MenuPage() {
  return (
    <>
      <Navbar restaurant={musaRestaurant} />

      <main className="min-h-screen bg-brand-bg pt-[76px]">
        <section className="border-b border-white/5 py-24 sm:py-32">
          <Container>
            <SectionHeading
              eyebrow="The MUSA Menu"
              title="Good food deserves a proper introduction."
              description="Explore our selection of Pakistani favorites, BBQ, fast food, pizza, pasta, steaks and beverages."
              align="center"
            />
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container>
            <MenuExperience
              categories={menuCategories}
              items={menuItems}
              whatsapp={musaRestaurant.whatsapp}
            />
          </Container>
        </section>
      </main>

      <Footer restaurant={musaRestaurant} />

      <MobileActionBar restaurant={musaRestaurant} />
    </>
  );
}
