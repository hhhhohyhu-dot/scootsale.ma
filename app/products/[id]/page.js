"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart, Zap, Gauge, Battery, Scale, ShieldCheck, Box, Settings, Play, Camera } from "lucide-react";
import styles from "./ProductDetails.module.css";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");
  const [is360Open, setIs360Open] = useState(false);
  const { addToCart } = useCart();

  if (!product) return <div className="container" style={{padding: '150px 0', textAlign: 'center'}}><h2>Product not found: {resolvedParams?.id}</h2></div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.premiumName || product.title,
      price: product.price,
      image: product.images[0]
    });
  };

  return (
    <main className={styles.section}>
      <div className="container">
        
        <div className={styles.layout}>
          {/* Gallery & 360 Viewer */}
          <motion.div 
            className={styles.gallery}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={styles.mainImage}>
              <img src={product.images[activeImage]} alt={product.premiumName} />
              <button className={styles.viewer360Btn} onClick={() => setIs360Open(true)}>
                <Camera size={18} /> 360° View
              </button>
            </div>
            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnail} ${activeImage === idx ? styles.active : ""}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`${product.brand} view ${idx + 1}`} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div 
            className={styles.info}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={styles.brand}>{product.brand}</div>
            <h1 className={styles.title}>{product.premiumName}</h1>
            
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#ffb400" : "transparent"} stroke={i < Math.floor(product.rating) ? "#ffb400" : "#555"} />
                ))}
              </div>
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.price}>
                {product.discount > 0 && (
                  <span className={styles.oldPrice}>{(product.price / (1 - product.discount / 100)).toFixed(0)} MAD</span>
                )}
                {product.price.toLocaleString()} MAD
              </div>
            </div>

            <p className={styles.description}>{product.longDescription}</p>

            <div className={styles.specsPreview}>
              <div className={styles.specItem}>
                <Gauge className={styles.specIcon} size={24} />
                <div className={styles.specText}>
                  <span>Top Speed</span>
                  <strong>{product.specs.maxSpeed}</strong>
                </div>
              </div>
              <div className={styles.specItem}>
                <Zap className={styles.specIcon} size={24} />
                <div className={styles.specText}>
                  <span>Max Range</span>
                  <strong>{product.specs.ridingRange}</strong>
                </div>
              </div>
              <div className={styles.specItem}>
                <Battery className={styles.specIcon} size={24} />
                <div className={styles.specText}>
                  <span>Battery</span>
                  <strong>{product.specs.batteryVoltage} {product.specs.batteryCapacity}</strong>
                </div>
              </div>
              <div className={styles.specItem}>
                <Scale className={styles.specIcon} size={24} />
                <div className={styles.specText}>
                  <span>Weight</span>
                  <strong>{product.specs.scooterWeight}</strong>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button className={styles.wishlistBtn}>
                <Heart size={24} />
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <ShieldCheck size={18} color="var(--color-accent)" /> 1 Year Official Warranty Included
            </div>
          </motion.div>
        </div>

        {/* Cinematic Video Section */}
        {product.videoUrl && (
          <div className={styles.videoSection}>
            <iframe 
              src={product.videoUrl} 
              title="Scooter Video" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Tabs for Exhaustive Specs, Performance, Safety */}
        <div className={styles.tabs}>
          <div className={styles.tabList}>
            <div className={`${styles.tab} ${activeTab === "specs" ? styles.active : ""}`} onClick={() => setActiveTab("specs")}>Technical Specs</div>
            <div className={`${styles.tab} ${activeTab === "performance" ? styles.active : ""}`} onClick={() => setActiveTab("performance")}>Performance & Battery</div>
            <div className={`${styles.tab} ${activeTab === "safety" ? styles.active : ""}`} onClick={() => setActiveTab("safety")}>Safety & Features</div>
            <div className={`${styles.tab} ${activeTab === "reviews" ? styles.active : ""}`} onClick={() => setActiveTab("reviews")}>Customer Reviews</div>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "specs" && (
              <table className={styles.fullSpecsTable}>
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <th style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {activeTab === "performance" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3>Performance Breakdown</h3>
                <p><strong>Motors:</strong> {product.specs.motorPower} (Peak: {product.specs.peakMotorPower})</p>
                <p><strong>Top Speed:</strong> {product.specs.maxSpeed}</p>
                <p><strong>Hill Climbing:</strong> {product.specs.climbingAngle}</p>
                
                <h3 style={{ marginTop: '20px' }}>Battery System</h3>
                <p><strong>Capacity:</strong> {product.specs.batteryCapacity} ({product.specs.batteryVoltage})</p>
                <p><strong>Range:</strong> {product.specs.ridingRange} under optimal conditions.</p>
                <p><strong>Charging Time:</strong> {product.specs.chargingTime}</p>
              </div>
            )}
            
            {activeTab === "safety" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3>Safety & Electronics</h3>
                <p><strong>Braking System:</strong> {product.specs.brakingSystem}</p>
                <p><strong>Suspension:</strong> {product.specs.suspension}</p>
                <p><strong>Lighting:</strong> {product.specs.lightingSystem}</p>
                <p><strong>Waterproofing:</strong> {product.specs.waterproofRating}</p>
                <p><strong>Additional Safety:</strong> {product.specs.safetyFeatures}</p>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div>
                <h3>Customer Reviews ({product.reviews})</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
                  <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)'}}>{product.rating}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#ffb400' }}>
                       {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "#ffb400" : "transparent"} stroke="#ffb400" />)}
                    </div>
                    <span>Based on verified buyers</span>
                  </div>
                </div>
                <p>Detailed review system will be integrated here.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 360 Viewer Modal */}
      <AnimatePresence>
        {is360Open && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIs360Open(false)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.closeModalBtn} onClick={() => setIs360Open(false)}>X Close</button>
              <h2 style={{ marginBottom: '20px' }}>360° Interactive Viewer</h2>
              <p>Drag to rotate the {product.brand} {product.model}</p>
              <div style={{ width: '80%', height: '60%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', marginTop: '20px' }}>
                 <Camera size={48} color="#555" />
                 <span style={{ marginLeft: '10px', color: '#555' }}>[360 Viewer Plugin Placeholder]</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
