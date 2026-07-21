import re

html_path = 'c:\\Users\\zorga\\scootsale.ma\\index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = [
    (r'<a href="#hero">Home</a>', r'<a href="#hero" data-i18n="nav_home">Home</a>'),
    (r'<a href="#products">Scooters</a>', r'<a href="#products" data-i18n="nav_scooters">Scooters</a>'),
    (r'<a href="#compare">Compare</a>', r'<a href="#compare" data-i18n="nav_compare">Compare</a>'),
    (r'<a href="#features">Features</a>', r'<a href="#features" data-i18n="nav_features">Features</a>'),
    (r'<a href="#reviews">Reviews</a>', r'<a href="#reviews" data-i18n="nav_reviews">Reviews</a>'),
    (r'<a href="#faq">FAQ</a>', r'<a href="#faq" data-i18n="nav_faq">FAQ</a>'),
    (r'Contact Us</a>', r'Contact Us</a>'.replace('Contact Us', '<span data-i18n="nav_contact">Contact Us</span>')),
    
    (r'<h1 class="reveal-up">Ride the Future</h1>', r'<h1 class="reveal-up" data-i18n="hero_title">Ride the Future</h1>'),
    (r'<p class="reveal-up delay-1">Discover powerful electric scooters with premium quality, fast delivery and warranty.</p>', r'<p class="reveal-up delay-1" data-i18n="hero_desc">Discover powerful electric scooters with premium quality, fast delivery and warranty.</p>'),
    (r'Shop Now</a>', r'Shop Now</a>'.replace('Shop Now', '<span data-i18n="hero_shop">Shop Now</span>')),
    (r'Contact on WhatsApp</a>', r'Contact on WhatsApp</a>'.replace('Contact on WhatsApp', '<span data-i18n="hero_whatsapp">Contact on WhatsApp</span>')),
    (r'<span>Scroll Down</span>', r'<span data-i18n="hero_scroll">Scroll Down</span>'),
    
    (r'<h2 class="section-title">Our Premium Scooters</h2>', r'<h2 class="section-title" data-i18n="sec_scooters">Our Premium Scooters</h2>'),
    (r'<div class="product-badge">New</div>', r'<div class="product-badge" data-i18n="badge_new">New</div>'),
    (r'<div class="product-badge discount">-10%</div>', r'<div class="product-badge discount" data-i18n="badge_discount">-10%</div>'),
    (r'<div class="product-badge hot">Hot</div>', r'<div class="product-badge hot" data-i18n="badge_hot">Hot</div>'),
    (r'<div class="product-badge premium">Premium</div>', r'<div class="product-badge premium" data-i18n="badge_premium">Premium</div>'),
    (r'>Buy Now</button>', r' data-i18n="btn_buy">Buy Now</button>'),
    (r'>View Details</button>', r' data-i18n="btn_view">View Details</button>'),
    
    (r'<span class="spec-label">Marque / Modèle :</span>', r'<span class="spec-label" data-i18n="modal_brand">Marque / Modèle :</span>'),
    (r'<span class="spec-label">Couleur :</span>', r'<span class="spec-label" data-i18n="modal_color">Couleur :</span>'),
    (r'<span class="spec-label">Puissance :</span>', r'<span class="spec-label" data-i18n="modal_power">Puissance :</span>'),
    (r'<span class="spec-label">Batterie :</span>', r'<span class="spec-label" data-i18n="modal_battery">Batterie :</span>'),
    (r'<span class="spec-label">Vitesse maximale :</span>', r'<span class="spec-label" data-i18n="modal_speed">Vitesse maximale :</span>'),
    (r'<span class="spec-label">Autonomie :</span>', r'<span class="spec-label" data-i18n="modal_range">Autonomie :</span>'),
    (r'<span class="spec-label">Pneus :</span>', r'<span class="spec-label" data-i18n="modal_tires">Pneus :</span>'),
    (r'<span class="spec-label">Suspensions :</span>', r'<span class="spec-label" data-i18n="modal_susp">Suspensions :</span>'),
    (r'<span class="spec-label">Équipements :</span>', r'<span class="spec-label" data-i18n="modal_equip">Équipements :</span>'),
    
    (r'id="modal-add-cart">Ajouter au panier</button>', r'id="modal-add-cart" data-i18n="modal_add_cart">Ajouter au panier</button>'),
    (r'id="modal-buy-now">Commander Maintenant</button>', r'id="modal-buy-now" data-i18n="modal_order_now">Commander Maintenant</button>'),
    (r'<span class="live-text">personnes regardent ce produit</span>', r'<span class="live-text" data-i18n="modal_live_text">personnes regardent ce produit</span>'),
    (r'EN DIRECT</span>', r'<span data-i18n="modal_live_badge">EN DIRECT</span></span>'),
    
    (r'<h2 class="section-title text-white">Compare Models</h2>', r'<h2 class="section-title text-white" data-i18n="sec_compare">Compare Models</h2>'),
    (r'<th>Feature</th>', r'<th data-i18n="comp_feature">Feature</th>'),
    (r'<td>Motor Power</td>', r'<td data-i18n="comp_motor">Motor Power</td>'),
    (r'<td>Battery</td>', r'<td data-i18n="comp_batt">Battery</td>'),
    (r'<td>Max Speed</td>', r'<td data-i18n="comp_speed">Max Speed</td>'),
    (r'<td>Range</td>', r'<td data-i18n="comp_range">Range</td>'),
    (r'<td>Suspension</td>', r'<td data-i18n="comp_susp">Suspension</td>'),
    (r'<td>Brakes</td>', r'<td data-i18n="comp_brakes">Brakes</td>'),
    (r'<td>Tires</td>', r'<td data-i18n="comp_tires">Tires</td>'),
    
    (r'<h2 class="section-title">Why Choose Us</h2>', r'<h2 class="section-title" data-i18n="sec_features">Why Choose Us</h2>'),
    (r'<h3>Fast Delivery</h3>', r'<h3 data-i18n="feat1_title">Fast Delivery</h3>'),
    (r'<p>Express shipping across all cities in Morocco.</p>', r'<p data-i18n="feat1_desc">Express shipping across all cities in Morocco.</p>'),
    (r'<h3>Official Warranty</h3>', r'<h3 data-i18n="feat2_title">Official Warranty</h3>'),
    (r'<p>All our scooters come with an official 1-year warranty.</p>', r'<p data-i18n="feat2_desc">All our scooters come with an official 1-year warranty.</p>'),
    (r'<h3>Secure Payment</h3>', r'<h3 data-i18n="feat3_title">Secure Payment</h3>'),
    (r'<p>100% secure payment methods, including cash on delivery.</p>', r'<p data-i18n="feat3_desc">100% secure payment methods, including cash on delivery.</p>'),
    (r'<h3>Premium Support</h3>', r'<h3 data-i18n="feat4_title">Premium Support</h3>'),
    (r'<p>24/7 dedicated customer support to help you anytime.</p>', r'<p data-i18n="feat4_desc">24/7 dedicated customer support to help you anytime.</p>'),
    (r'<h3>High Performance</h3>', r'<h3 data-i18n="feat5_title">High Performance</h3>'),
    (r'<p>Unmatched power and speed for thrill-seekers.</p>', r'<p data-i18n="feat5_desc">Unmatched power and speed for thrill-seekers.</p>'),
    (r'<h3>Original Products</h3>', r'<h3 data-i18n="feat6_title">Original Products</h3>'),
    (r'<p>We guarantee 100% authentic and original scooters.</p>', r'<p data-i18n="feat6_desc">We guarantee 100% authentic and original scooters.</p>'),
    
    (r'<h2 class="section-title text-white">Image Gallery</h2>', r'<h2 class="section-title text-white" data-i18n="sec_gallery">Image Gallery</h2>'),
    (r'<h2 class="section-title">What Our Customers Say</h2>', r'<h2 class="section-title" data-i18n="sec_reviews">What Our Customers Say</h2>'),
    (r'<h2 class="section-title text-white">Frequently Asked Questions</h2>', r'<h2 class="section-title text-white" data-i18n="sec_faq">Frequently Asked Questions</h2>'),
    
    (r'<h2 class="section-title">Get In Touch</h2>', r'<h2 class="section-title" data-i18n="sec_contact">Get In Touch</h2>'),
    (r'class="link">Chat with us</a>', r'class="link" data-i18n="contact_wa">Chat with us</a>'),
    (r'class="link">Follow us</a>', r'class="link" data-i18n="contact_ig">Follow us</a>'),
    (r'<p>Mon - Sat, 9am - 6pm</p>', r'<p data-i18n="contact_phone">Mon - Sat, 9am - 6pm</p>'),
    (r'<h3>Send us a message</h3>', r'<h3 data-i18n="contact_form_title">Send us a message</h3>'),
    (r'placeholder="Full Name"', r'placeholder="Full Name" data-i18n-placeholder="form_name"'),
    (r'placeholder="Email Address"', r'placeholder="Email Address" data-i18n-placeholder="form_email"'),
    (r'placeholder="Phone Number"', r'placeholder="Phone Number" data-i18n-placeholder="form_phone"'),
    (r'placeholder="Your Message"', r'placeholder="Your Message" data-i18n-placeholder="form_msg"'),
    (r'<button type="submit" class="btn btn-primary btn-block">Send Message</button>', r'<button type="submit" class="btn btn-primary btn-block" data-i18n="form_submit">Send Message</button>'),
    
    (r'<div class="footer-about" style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--color-light-gray);">\n                        <strong>Product/service</strong><br>\n                        ⚡ La Référence des Trottinettes Électriques<br>\n                        💰 Vente • Achat • Dépôt-Vente<br>\n                        🔎 Nous Trouvons le Modèle Qu'il Vous Faut<br>\n                        📲 WhatsApp ☎️: 0607436420<br>\n                        📍 Settat\n                    </div>', r'<div class="footer-about" style="margin-bottom: 1.5rem; line-height: 1.8; color: var(--color-light-gray);" data-i18n="footer_desc">\n                        <strong>Product/service</strong><br>\n                        ⚡ La Référence des Trottinettes Électriques<br>\n                        💰 Vente • Achat • Dépôt-Vente<br>\n                        🔎 Nous Trouvons le Modèle Qu'il Vous Faut<br>\n                        📲 WhatsApp ☎️: 0607436420<br>\n                        📍 Settat\n                    </div>'),
    (r'<h3>Quick Links</h3>', r'<h3 data-i18n="footer_links_title">Quick Links</h3>'),
    (r'<h3>Categories</h3>', r'<h3 data-i18n="footer_cat_title">Categories</h3>'),
    (r'<h3>Newsletter</h3>', r'<h3 data-i18n="footer_news_title">Newsletter</h3>'),
    (r'<p>Subscribe to receive updates, access to exclusive deals, and more.</p>', r'<p data-i18n="footer_news_desc">Subscribe to receive updates, access to exclusive deals, and more.</p>'),
    (r'<p>&copy; 2026 ScootSale.ma. All rights reserved.</p>', r'<p data-i18n="footer_rights">&copy; 2026 ScootSale.ma. All rights reserved.</p>'),
    
    (r'<h2>Votre Panier</h2>', r'<h2 data-i18n="cart_title">Votre Panier</h2>'),
    (r'<p>Votre panier est vide.</p>', r'<p data-i18n="cart_empty">Votre panier est vide.</p>'),
    (r'<span>Total:</span>', r'<span data-i18n="cart_total">Total:</span>'),
    (r' Commander sur WhatsApp\n            </button>', r' <span data-i18n="cart_checkout">Commander sur WhatsApp</span>\n            </button>'),
    (r'Ajouté au panier avec succès !</div>', r'<span data-i18n="toast_added">Ajouté au panier avec succès !</span></div>'),
]

for old, new in replacements:
    html = html.replace(old, new)

# Add translations script before script.js
html = html.replace('<script src="script.js"></script>', '<script src="translations.js"></script>\\n    <script src="script.js"></script>')

# Add language switcher in navbar
lang_switcher = '''            <div class="lang-switch" id="lang-btn">
                <i class="ri-global-line"></i> <span id="current-lang">FR</span>
            </div>'''
html = html.replace('<div class="mobile-menu-btn">', f'{lang_switcher}\\n            <div class="mobile-menu-btn">')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
