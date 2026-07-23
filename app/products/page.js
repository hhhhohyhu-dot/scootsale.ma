"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./Products.module.css";
import { products as allProducts } from "@/data/products";

// ─── derive unique brands from actual data ─────────────────────────
const ALL_BRANDS = [...new Set(allProducts.map(p => p.brand))].sort();

// ─── price range boundaries ────────────────────────────────────────
const MIN_PRICE = Math.min(...allProducts.map(p => p.price));
const MAX_PRICE = Math.max(...allProducts.map(p => p.price));

// ─── parse maxSpeed string "105 km/h (65 mph)" → number ───────────
function parseSpeed(product) {
  const raw = product.specs?.maxSpeed || "0";
  const match = raw.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// ─── FilterSection collapsible block ──────────────────────────────
function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.filterGroup}>
      <button className={styles.filterTitle} onClick={() => setOpen(o => !o)}>
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function ProductsPage() {
  const [sort, setSort] = useState("recommended");
  const [brands, setBrands] = useState([]);
  const [speedRange, setSpeedRange] = useState("all"); // "all" | "under60" | "60plus" | "100plus"
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile

  const activeFilterCount = [
    brands.length > 0,
    speedRange !== "all",
    inStockOnly,
    maxPrice < MAX_PRICE,
  ].filter(Boolean).length;

  const toggleBrand = (brand) => {
    setBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAll = () => {
    setBrands([]);
    setSpeedRange("all");
    setInStockOnly(false);
    setMaxPrice(MAX_PRICE);
    setSort("recommended");
  };

  // ─── Apply filters + sort ────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Brand filter
    if (brands.length > 0) {
      list = list.filter(p => brands.includes(p.brand));
    }

    // Speed filter
    if (speedRange === "under60") list = list.filter(p => parseSpeed(p) < 60);
    if (speedRange === "60plus") list = list.filter(p => parseSpeed(p) >= 60 && parseSpeed(p) < 100);
    if (speedRange === "100plus") list = list.filter(p => parseSpeed(p) >= 100);

    // Stock filter
    if (inStockOnly) list = list.filter(p => p.inStock !== false && p.stockCount > 0);

    // Price filter
    list = list.filter(p => {
      const effective = p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
      return effective <= maxPrice;
    });

    // Sort
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "reviews") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [brands, speedRange, inStockOnly, maxPrice, sort]);

  // ─── Sidebar content (shared between desktop and mobile drawer)
  const Sidebar = (
    <aside className={styles.filters}>
      <div className={styles.filterHeader}>
        <span className={styles.filterHeading}>
          <SlidersHorizontal size={18} /> Filters
          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
          )}
        </span>
        {activeFilterCount > 0 && (
          <button className={styles.clearAll} onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      {/* ─── Brand ─────────────────────────────────────────────── */}
      <FilterSection title="Brand">
        <div className={styles.optionList}>
          {ALL_BRANDS.map(brand => (
            <label key={brand} className={styles.filterOption}>
              <input
                type="checkbox"
                className={styles.filterCheckbox}
                checked={brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span className={styles.checkMark} />
              {brand}
              <span className={styles.filterCount}>
                ({allProducts.filter(p => p.brand === brand).length})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* ─── Price Range ────────────────────────────────────────── */}
      <FilterSection title="Max Price (MAD)">
        <div className={styles.priceSliderWrap}>
          <div className={styles.priceDisplay}>
            <span>{MIN_PRICE.toLocaleString()} MAD</span>
            <strong className={styles.priceValue}>{maxPrice.toLocaleString()} MAD</strong>
          </div>
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={1000}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className={styles.priceSlider}
          />
        </div>
      </FilterSection>

      {/* ─── Top Speed ──────────────────────────────────────────── */}
      <FilterSection title="Top Speed">
        {[
          { label: "All speeds", value: "all" },
          { label: "Up to 60 km/h", value: "under60" },
          { label: "60 – 100 km/h", value: "60plus" },
          { label: "100+ km/h", value: "100plus" },
        ].map(opt => (
          <label key={opt.value} className={styles.filterOption}>
            <input
              type="radio"
              name="speed"
              className={styles.filterRadio}
              checked={speedRange === opt.value}
              onChange={() => setSpeedRange(opt.value)}
            />
            <span className={styles.radioMark} />
            {opt.label}
          </label>
        ))}
      </FilterSection>

      {/* ─── Availability ───────────────────────────────────────── */}
      <FilterSection title="Availability">
        <label className={styles.filterOption}>
          <input
            type="checkbox"
            className={styles.filterCheckbox}
            checked={inStockOnly}
            onChange={e => setInStockOnly(e.target.checked)}
          />
          <span className={styles.checkMark} />
          In Stock only
        </label>
      </FilterSection>
    </aside>
  );

  return (
    <main>
      <header className={styles.pageHeader}>
        {/* ── Animated speed lines ── */}
        <div className={styles.speedLines}>
          {[...Array(14)].map((_, i) => (
            <span key={i} className={styles.speedLine} style={{ '--i': i }} />
          ))}
        </div>

        {/* ── Particle sparks ── */}
        <div className={styles.particles}>
          {[...Array(18)].map((_, i) => (
            <span key={i} className={styles.particle} style={{ '--i': i }} />
          ))}
        </div>

        {/* ── Glowing ground trail ── */}
        <div className={styles.groundTrail} />

        {/* ── Scooter image riding across ── */}
        <div className={styles.scooterWrap}>
          <div className={styles.motionBlur} />
          <img
            src="/images/products/kaabo_wolf_king_gtr.png"
            alt="Premium Scooter"
            className={styles.ridingScooter}
          />
          <div className={styles.wheelGlow} />
        </div>

        {/* ── Text content ── */}
        <div className={`container ${styles.headerContent}`}>
          <motion.div
            className={styles.headerBadge}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            ⚡ 10 Premium Models
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className={styles.title}
          >
            All <span>Scooters</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={styles.description}
          >
            Browse our full collection of premium electric scooters.
          </motion.p>
        </div>
      </header>


      <section className={styles.content}>
        <div className={`container ${styles.layout}`}>

          {/* Desktop Sidebar */}
          <div className={styles.sidebarDesktop}>{Sidebar}</div>

          {/* Mobile Sidebar Drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  className={styles.mobileOverlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  className={styles.mobileSidebar}
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  <button className={styles.closeMobile} onClick={() => setSidebarOpen(false)}>
                    <X size={22} />
                  </button>
                  {Sidebar}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products area */}
          <div className={styles.productsArea}>
            <div className={styles.controls}>
              <button className={styles.mobileFilterBtn} onClick={() => setSidebarOpen(true)}>
                <SlidersHorizontal size={18} />
                Filters
                {activeFilterCount > 0 && (
                  <span className={styles.filterBadge}>{activeFilterCount}</span>
                )}
              </button>

              <span className={styles.resultCount}>
                {filteredProducts.length === 0
                  ? "No scooters match your filters"
                  : `Showing ${filteredProducts.length} scooter${filteredProducts.length !== 1 ? "s" : ""}`}
              </span>

              <select
                className={styles.sortSelect}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className={styles.activeChips}>
                {brands.map(b => (
                  <span key={b} className={styles.chip}>
                    {b} <button onClick={() => toggleBrand(b)}><X size={12} /></button>
                  </span>
                ))}
                {speedRange !== "all" && (
                  <span className={styles.chip}>
                    Speed: {speedRange === "under60" ? "< 60 km/h" : speedRange === "60plus" ? "60–100 km/h" : "100+ km/h"}
                    <button onClick={() => setSpeedRange("all")}><X size={12} /></button>
                  </span>
                )}
                {inStockOnly && (
                  <span className={styles.chip}>
                    In Stock <button onClick={() => setInStockOnly(false)}><X size={12} /></button>
                  </span>
                )}
                {maxPrice < MAX_PRICE && (
                  <span className={styles.chip}>
                    ≤ {maxPrice.toLocaleString()} MAD
                    <button onClick={() => setMaxPrice(MAX_PRICE)}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  className={styles.emptyState}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className={styles.emptyIcon}>🛴</span>
                  <h3>No scooters found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                  <button className={styles.clearBtn} onClick={clearAll}>Clear All Filters</button>
                </motion.div>
              ) : (
                <motion.div
                  className={styles.grid}
                  key={filteredProducts.map(p => p.id).join("-")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
