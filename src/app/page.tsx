import Button from "@/components/ui/Button";
import { musaRestaurant } from "@/data/restaurant";

export default function Home() {
  const restaurant = musaRestaurant;

  return (
    <main className="min-h-screen bg-[#0B0B0A] text-[#F5F1E8]">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#C9A45C]">
            {restaurant.tagline}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            {restaurant.name}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#A7A29A] sm:text-lg">
            {restaurant.description}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/menu">Explore Menu</Button>

            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
