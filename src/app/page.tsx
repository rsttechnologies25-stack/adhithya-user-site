import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutUs from "@/components/home/AboutUs";
import Timeline from "@/components/home/Timeline";
import FounderQuote from "@/components/home/FounderQuote";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <FeaturedProducts />
      <AboutUs />
      <Timeline />
      <FounderQuote />
      <Testimonials />
    </>
  );
}
