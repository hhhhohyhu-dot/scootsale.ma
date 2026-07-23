import Hero from "@/components/Hero/Hero";
import TrustBadges from "@/components/TrustBadges/TrustBadges";
import ProductSection from "@/components/ProductSection/ProductSection";
import Reviews from "@/components/Reviews/Reviews";
import FAQ from "@/components/FAQ/FAQ";
import Contact from "@/components/Contact/Contact";
import { products } from "@/data/products";

export default function Home() {
  // Filter products for different sections
  const bestSellers = products.filter(p => p.badges?.includes("Best Seller"));
  const latestModels = products.filter(p => p.badges?.includes("Latest Model"));
  const topRated = products.filter(p => p.badges?.includes("Top Rated") || p.rating >= 4.9);
  const luxury = products.filter(p => p.badges?.includes("Luxury Performance") || p.price >= 40000);

  return (
    <main>
      <Hero />
      <TrustBadges />
      
      <div id="products">
        <ProductSection 
          title="Best Sellers" 
          subtitle="Customer Favorites" 
          products={bestSellers} 
          bg="darkBg" 
        />
        
        <ProductSection 
          title="Latest Models" 
          subtitle="New Arrivals" 
          products={latestModels} 
          bg="surfaceBg" 
        />
        
        <ProductSection 
          title="Top Rated" 
          subtitle="Highest Reviewed" 
          products={topRated} 
          bg="darkBg" 
        />

        <ProductSection 
          title="Luxury Performance" 
          subtitle="Ultimate Power" 
          products={luxury} 
          bg="surfaceBg" 
        />
      </div>

      <Reviews />
      <FAQ />
      <Contact />
    </main>
  );
}
