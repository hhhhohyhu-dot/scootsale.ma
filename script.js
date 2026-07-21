// Scooter Database
const scooters = {
    1: {
        name: "Tank M41 1000W",
        oldPrice: "6,899.00 DH",
        price: "6,099.00 DH",
        marque: "Ecoxtrem – M41 Tank Ultimate",
        couleur: "Bleu, Jaune, Noir, Orange, Vert",
        motor: "1 000 W nominale (pointe jusqu'à 2 000 W)",
        battery: "48 V 16 Ah",
        speed: "Environ 55 km/h",
        range: "Longue durée — jusqu'à 50-60 km",
        pneus: '11" tubeless Off-Road sur jantes 10"',
        suspensions: 'Avant et arrière en C "Z"',
        equipements: "Écran LED, clé de contact NFC, clignotants",
        images: [
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-01.webp",
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-02.webp",
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-03.webp",
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-04.webp",
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-05.webp"
        ]
    },
    2: {
        name: "Tank M41 Armored",
        oldPrice: "6,450.00 DH",
        price: "4,950.00 DH",
        marque: "Ecoxtrem – M41 Armored",
        couleur: "Noir, Rouge, Bleu",
        motor: "1 200 W nominale",
        battery: "48 V 15 Ah",
        speed: "Environ 60 km/h",
        range: "Jusqu'à 50 km",
        pneus: '11" tubeless Off-Road',
        suspensions: "Amortisseurs à ressort",
        equipements: "Écran LED, Double freins",
        images: [
            "https://jouet-maroc.com/images-clients/tank-m41/tank-3.jpg",
            "https://jouet-maroc.com/images-clients/tank-m41/tank-1.jpg",
            "https://jouet-maroc.com/images-clients/tank-m41/tank-4.jpg",
            "https://jouet-maroc.com/images-clients/tank-m41/tank-6.jpg"
        ]
    },
    3: {
        name: "Tank Ultimate 2000W",
        oldPrice: "7,500.00 DH",
        price: "6,499.00 DH",
        marque: "Ecoxtrem – M41 Ultimate",
        couleur: "Rouge, Noir, Blanc",
        motor: "2000 W nominale",
        battery: "48 V 16 Ah",
        speed: "Environ 68 km/h",
        range: "Jusqu'à 60 km",
        pneus: '11" tubeless',
        suspensions: "Suspension double C-type",
        equipements: "Phare LED, Clignotants",
        images: [
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-01.webp",
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-02.webp",
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-03.webp",
            "https://jouet-maroc.com/images/slider/trottinette-tank-m41-04.webp"
        ]
    },
    4: {
        name: "Tank Double Motor",
        oldPrice: "10,500.00 DH",
        price: "8,999.00 DH",
        marque: "Ecoxtrem – Double Moteur",
        couleur: "Noir, Jaune, Rouge",
        motor: "2x 1000 W (Pointe 4000 W)",
        battery: "52 V 20 Ah",
        speed: "Jusqu'à 99 km/h",
        range: "45-65 km",
        pneus: '11" Off-Road',
        suspensions: "Hydraulique avant/arrière",
        equipements: "Double contrôleur, freins à disque",
        images: [
            "https://jouet-maroc.com/images/slider2/m41-tank-double-moteur-01.webp",
            "https://jouet-maroc.com/images/slider2/m41-tank-double-moteur-02.webp",
            "https://jouet-maroc.com/images/slider2/m41-tank-double-moteur-03.webp",
            "https://jouet-maroc.com/images/slider2/m41-tank-double-moteur-04.webp",
            "https://jouet-maroc.com/images/slider2/m41-tank-double-moteur-10.webp"
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    
    // --- Theme Switcher Logic ---
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    
    // Check saved theme (Default to dark)
    let currentTheme = localStorage.getItem('scootsale-theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.className = 'ri-sun-line';
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.className = 'ri-moon-line';
    }
    
    themeBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            themeIcon.className = 'ri-moon-line';
            localStorage.setItem('scootsale-theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            themeIcon.className = 'ri-sun-line';
            localStorage.setItem('scootsale-theme', 'light');
        }
    });
    
    // --- Language Translation Logic ---
    const langBtn = document.getElementById('lang-btn');
    const currentLangText = document.getElementById('current-lang');
    
    // Check saved language (Default to Arabic)
    let currentLang = localStorage.getItem('scootsale-lang') || 'ar';
    
    function applyTranslations(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;
        
        // Update document dir and lang
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        currentLangText.textContent = lang.toUpperCase();
        
        // Update all text nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key]; // Using innerHTML to support <br> tags
            }
        });

        // Update all placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        
        // Update dynamic cart text
        if(cart.length === 0 && document.querySelector('.empty-cart-msg p')) {
            document.querySelector('.empty-cart-msg p').textContent = translations[lang]["cart_empty"];
        }
        
        // Save
        localStorage.setItem('scootsale-lang', lang);
    }
    
    // Initial apply
    applyTranslations(currentLang);
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'ar' : 'fr';
        applyTranslations(currentLang);
    });
    
    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });

    // --- Modal Logic ---
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-details-btn');
    
    const modalMainImg = document.getElementById('modal-main-img');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const data = scooters[id];
            
            // Populate Modal Data
            document.getElementById('modal-title').textContent = data.name;
            document.getElementById('modal-old-price').textContent = data.oldPrice;
            document.getElementById('modal-price').textContent = data.price;
            
            document.getElementById('modal-marque').textContent = data.marque;
            document.getElementById('modal-couleur').textContent = data.couleur;
            document.getElementById('modal-motor').textContent = data.motor;
            document.getElementById('modal-battery').textContent = data.battery;
            document.getElementById('modal-speed').textContent = data.speed;
            document.getElementById('modal-range').textContent = data.range;
            document.getElementById('modal-pneus').textContent = data.pneus;
            document.getElementById('modal-suspensions').textContent = data.suspensions;
            document.getElementById('modal-equipements').textContent = data.equipements;
            
            // Populate Images
            modalMainImg.src = data.images[0];
            modalThumbnails.innerHTML = ''; // clear previous
            
            data.images.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.classList.add('thumb-img');
                if(index === 0) img.classList.add('active');
                
                img.addEventListener('click', () => {
                    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
                    img.classList.add('active');
                    
                    modalMainImg.style.animation = 'none';
                    modalMainImg.offsetHeight; // trigger reflow
                    modalMainImg.style.animation = 'fadeIn 0.5s ease';
                    modalMainImg.src = imgSrc;
                });
                
                modalThumbnails.appendChild(img);
            });
            
            // Set data-id to modal buy now button
            document.getElementById('modal-buy-now').setAttribute('data-id', id);

            // Reset quantity to 1
            document.getElementById('qty-input').value = 1;
            
            // Set a random live viewer count between 20 and 150
            document.getElementById('live-count').textContent = Math.floor(Math.random() * 130) + 20;

            // Show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });

    // Quantity buttons
    document.getElementById('qty-minus').addEventListener('click', () => {
        let val = parseInt(document.getElementById('qty-input').value);
        if (val > 1) {
            document.getElementById('qty-input').value = val - 1;
        }
    });

    document.getElementById('qty-plus').addEventListener('click', () => {
        let val = parseInt(document.getElementById('qty-input').value);
        document.getElementById('qty-input').value = val + 1;
    });

    // Buy Now Buttons Logic
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            if(id && scooters[id]) {
                const data = scooters[id];
                // Check if this was triggered from the modal to include quantity
                let qtyText = "";
                if(e.target.id === 'modal-buy-now') {
                    const qty = document.getElementById('qty-input').value;
                    if(qty > 1) {
                        qtyText = ` (Quantité: ${qty})`;
                    }
                }
                const message = encodeURIComponent(`Bonjour! Je voudrais acheter ${data.name}${qtyText} au prix de ${data.price}. Est-il disponible ?`);
                window.open(`https://wa.me/212607436420?text=${message}`, '_blank');
            }
        });
    });

    // Add to cart action
    document.getElementById('modal-add-cart').addEventListener('click', () => {
        const id = document.getElementById('modal-buy-now').getAttribute('data-id');
        const qty = parseInt(document.getElementById('qty-input').value);
        if(id && scooters[id]) {
            const data = scooters[id];
            
            // check if already in cart
            const existingItem = cart.find(item => item.id === id);
            if(existingItem) {
                existingItem.qty += qty;
            } else {
                cart.push({
                    id: id,
                    name: data.name,
                    price: parseFloat(data.price.replace(/,/g, '').replace(' DH', '')),
                    qty: qty,
                    img: data.images[0]
                });
            }
            
            updateCartUI();
            
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
            
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
    
    // --- Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.6)';
        }
    });

    // --- Lightbox for Gallery ---
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.cursor = 'pointer'; // Make it obvious it's clickable
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if(img) {
                lightboxImg.src = img.src;
                lightboxModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // prevent background scrolling
            }
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Close lightbox if clicked outside the image
    lightboxModal.addEventListener('click', (e) => {
        if(e.target === lightboxModal) {
            lightboxModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // --- Cart System ---
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartCloseBtn = document.getElementById('cart-close');
    const cartBody = document.getElementById('cart-body');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartBadge = document.getElementById('cart-badge');
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');

    function toggleCart() {
        cartOverlay.classList.toggle('show');
        cartDrawer.classList.toggle('open');
    }

    cartIconBtn.addEventListener('click', toggleCart);
    cartCloseBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    function updateCartUI() {
        // Update badge
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartBadge.textContent = totalItems;

        // Render items
        if(cart.length === 0) {
            cartBody.innerHTML = `
                <div class="empty-cart-msg">
                    <i class="ri-shopping-cart-2-line"></i>
                    <p>${translations[currentLang]["cart_empty"]}</p>
                </div>
            `;
            cartTotalPrice.textContent = '0.00 DH';
            return;
        }

        let html = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            html += `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})} DH</div>
                        <div class="cart-item-qty">
                            <button class="cart-qty-btn" data-action="minus" data-index="${index}">-</button>
                            <span>${item.qty}</span>
                            <button class="cart-qty-btn" data-action="plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}"><i class="ri-delete-bin-line"></i></button>
                </div>
            `;
        });

        cartBody.innerHTML = html;
        cartTotalPrice.textContent = total.toLocaleString('en-US', {minimumFractionDigits: 2}) + ' DH';

        // Add listeners for dynamically created buttons
        document.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const action = e.target.getAttribute('data-action');
                if(action === 'plus') {
                    cart[index].qty++;
                } else if(action === 'minus') {
                    if(cart[index].qty > 1) {
                        cart[index].qty--;
                    }
                }
                updateCartUI();
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    // Checkout
    cartCheckoutBtn.addEventListener('click', () => {
        if(cart.length === 0) return;
        
        const isAr = currentLang === 'ar';
        let message = isAr ? "مرحباً! أود طلب ما يلي:\n\n" : "Bonjour! Je voudrais passer la commande suivante:\n\n";
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            message += `- ${item.qty}x ${item.name} (${item.price.toLocaleString('en-US')} DH) = ${itemTotal.toLocaleString('en-US')} DH\n`;
        });
        
        const totalText = isAr ? "المجموع" : "TOTAL";
        const availText = isAr ? "هل هذا متوفر؟" : "Est-ce disponible ?";
        
        message += `\n*${totalText}: ${total.toLocaleString('en-US', {minimumFractionDigits: 2})} DH*\n\n${availText}`;
        
        window.open(`https://wa.me/212607436420?text=${encodeURIComponent(message)}`, '_blank');
    });
});
