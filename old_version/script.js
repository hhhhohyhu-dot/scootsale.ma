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
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'ri-close-line';
                } else {
                    icon.className = 'ri-menu-4-line';
                }
            }
        });

        // Close menu when clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'ri-menu-4-line';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'ri-menu-4-line';
            }
        });
    }

    // --- Theme Switcher Logic ---
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    
    // Check saved theme (Default to dark)
    let currentTheme = localStorage.getItem('_mohamed_z__-theme') || 'dark';
    
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
            localStorage.setItem('_mohamed_z__-theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            themeIcon.className = 'ri-sun-line';
            localStorage.setItem('_mohamed_z__-theme', 'light');
        }
    });
    
    // --- Language Translation Logic ---
    const langBtn = document.getElementById('lang-btn');
    const currentLangText = document.getElementById('current-lang');
    
    // Check saved language (Default to Arabic)
    let currentLang = localStorage.getItem('_mohamed_z__-lang') || 'ar';
    
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
        localStorage.setItem('_mohamed_z__-lang', lang);
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
    
    let activeScooterId = 1;
    let selectedColor = "";
    const colorMap = {
        "Bleu": "#00a8ff", "Jaune": "#ffb800", "Noir": "#121212", 
        "Orange": "#ff7f11", "Vert": "#2ed573", "Rouge": "#ff3838", "Blanc": "#ffffff"
    };

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            activeScooterId = id;
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
            
            // 1. Populate Color Pills (Feature 1)
            const colorPillsContainer = document.getElementById('modal-color-pills');
            if (colorPillsContainer) {
                colorPillsContainer.innerHTML = '';
                const colors = data.couleur.split(', ');
                selectedColor = colors[0];
                colors.forEach((color, idx) => {
                    const pill = document.createElement('div');
                    pill.className = `color-pill ${idx === 0 ? 'active' : ''}`;
                    pill.style.backgroundColor = colorMap[color] || '#ccc';
                    pill.setAttribute('title', color);
                    pill.addEventListener('click', () => {
                        colorPillsContainer.querySelectorAll('.color-pill').forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                        selectedColor = color;
                    });
                    colorPillsContainer.appendChild(pill);
                });
            }

            // Reset accessories (Feature 1)
            const accCheckboxes = document.querySelectorAll('.acc-checkbox');
            accCheckboxes.forEach(cb => cb.checked = false);

            function updateModalPrice() {
                let accTotal = 0;
                accCheckboxes.forEach(cb => {
                    if (cb.checked) {
                        accTotal += parseFloat(cb.getAttribute('data-price'));
                    }
                });
                const qty = parseInt(document.getElementById('qty-input').value) || 1;
                const currentBasePrice = parseFloat(data.price.replace(/,/g, '').replace(' DH', '').replace(' MAD', ''));
                const totalPrice = (currentBasePrice + accTotal) * qty;
                document.getElementById('modal-price').textContent = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ' DH';
            }

            // Remove old listeners to avoid multiple binding, and bind fresh
            accCheckboxes.forEach(cb => {
                cb.onchange = updateModalPrice;
            });

            // Populate Images & Indicators (Feature 4)
            modalMainImg.src = data.images[0];
            modalThumbnails.innerHTML = ''; // clear previous
            
            // Add dots indicators wrapper
            let dotsWrapper = document.getElementById('modal-carousel-dots');
            if (!dotsWrapper) {
                dotsWrapper = document.createElement('div');
                dotsWrapper.id = 'modal-carousel-dots';
                dotsWrapper.className = 'carousel-indicators';
                modalThumbnails.parentNode.insertBefore(dotsWrapper, modalThumbnails.nextSibling);
            }
            dotsWrapper.innerHTML = '';

            let currentImgIdx = 0;
            
            function changeModalImage(idx) {
                currentImgIdx = idx;
                const imgSrc = data.images[idx];
                modalMainImg.style.animation = 'none';
                modalMainImg.offsetHeight; // trigger reflow
                modalMainImg.style.animation = 'fadeIn 0.5s ease';
                modalMainImg.src = imgSrc;
                
                // Update active thumbnail
                const thumbs = modalThumbnails.querySelectorAll('img');
                thumbs.forEach((t, i) => {
                    if (i === idx) t.classList.add('active');
                    else t.classList.remove('active');
                });

                // Update active dot
                const dots = dotsWrapper.querySelectorAll('.carousel-dot');
                dots.forEach((d, i) => {
                    if (i === idx) d.classList.add('active');
                    else d.classList.remove('active');
                });
            }

            data.images.forEach((imgSrc, index) => {
                // Thumbnail
                const img = document.createElement('img');
                img.src = imgSrc;
                img.classList.add('thumb-img');
                if(index === 0) img.classList.add('active');
                img.addEventListener('click', () => changeModalImage(index));
                modalThumbnails.appendChild(img);

                // Indicator dot
                const dot = document.createElement('div');
                dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => changeModalImage(index));
                dotsWrapper.appendChild(dot);
            });

            // Touch Swipe / Drag Events for Main Image (Feature 4)
            let touchStartX = 0;
            let touchEndX = 0;

            modalMainImg.ontouchstart = (e) => {
                touchStartX = e.changedTouches[0].screenX;
            };
            modalMainImg.ontouchend = (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            };
            modalMainImg.onmousedown = (e) => {
                touchStartX = e.screenX;
            };
            modalMainImg.onmouseup = (e) => {
                touchEndX = e.screenX;
                handleSwipe();
            };

            function handleSwipe() {
                const diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 50) { // minimum threshold
                    if (diff > 0) { // swiped right
                        let prevIdx = currentImgIdx - 1;
                        if (prevIdx < 0) prevIdx = data.images.length - 1;
                        changeModalImage(prevIdx);
                    } else { // swiped left
                        let nextIdx = currentImgIdx + 1;
                        if (nextIdx >= data.images.length) nextIdx = 0;
                        changeModalImage(nextIdx);
                    }
                }
            }
            
            // Set data-id to modal buy now button
            document.getElementById('modal-buy-now').setAttribute('data-id', id);

            // Reset quantity to 1
            document.getElementById('qty-input').value = 1;
            
            // Set a random live viewer count between 20 and 150
            document.getElementById('live-count').textContent = Math.floor(Math.random() * 130) + 20;

            // Bind quantity controls to update price
            document.getElementById('qty-minus').onclick = () => {
                let val = parseInt(document.getElementById('qty-input').value);
                if (val > 1) {
                    document.getElementById('qty-input').value = val - 1;
                    updateModalPrice();
                }
            };
            document.getElementById('qty-plus').onclick = () => {
                let val = parseInt(document.getElementById('qty-input').value);
                document.getElementById('qty-input').value = val + 1;
                updateModalPrice();
            };
            
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
                window.open(`https://wa.me/212679409398?text=${message}`, '_blank');
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

    // Checkout (Integrated with Feature 5 Invoice modal)
    cartCheckoutBtn.addEventListener('click', () => {
        if(cart.length === 0) return;
        
        // Map cart items format to openInvoice format
        const invoiceItems = cart.map(item => ({
            name: item.name,
            qty: item.qty,
            price: item.price,
            color: null,
            accessories: []
        }));
        
        openInvoice(invoiceItems);
        
        // Close cart drawer
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }

    // Trigger counters when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }

    // --- Countdown Timer ---
    function startCountdown() {
        // Set countdown to 3 days from now (resets each visit to always show urgency)
        let endDate = localStorage.getItem('_mohamed_z__-countdown-end');
        const now = new Date().getTime();
        
        if (!endDate || parseInt(endDate) < now) {
            // Set new countdown: 3 days from now
            endDate = now + (3 * 24 * 60 * 60 * 1000);
            localStorage.setItem('_mohamed_z__-countdown-end', endDate);
        } else {
            endDate = parseInt(endDate);
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const diff = endDate - now;

            if (diff <= 0) {
                // Reset countdown
                const newEnd = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
                localStorage.setItem('_mohamed_z__-countdown-end', newEnd);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const cdDays = document.getElementById('cd-days');
            const cdHours = document.getElementById('cd-hours');
            const cdMinutes = document.getElementById('cd-minutes');
            const cdSeconds = document.getElementById('cd-seconds');

            if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
            if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
            if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
            if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    startCountdown();


    /* ==========================================================================
       NEW PREMIUM FEATURES LOGIC
       ========================================================================== */

    // 1. Scroll Progress Bar (Feature 10)
    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    // 2. Magnetic Buttons Effect (Feature 10)
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-whatsapp, .whatsapp-float');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 3. Range & Fuel Savings Calculator (Feature 2)
    const commuteSlider = document.getElementById('commute-slider');
    const commuteVal = document.getElementById('commute-val');
    const calcGasVal = document.getElementById('calc-gas-val');
    const calcElecVal = document.getElementById('calc-elec-val');
    const calcSavingsVal = document.getElementById('calc-savings-val');
    const calcRecModel = document.getElementById('calc-rec-model');

    function calculateSavings() {
        if (!commuteSlider) return;
        const distance = parseInt(commuteSlider.value);
        commuteVal.textContent = distance + ' km';

        // Calculations
        // Average Moroccan fuel price ~ 14.50 MAD/L, average consumption 7L/100km
        const dailyGasCost = distance * 2 * (7 / 100) * 14.50; 
        // Electricity cost: Lydec tariff ~ 1.20 MAD/kWh, average consumption 1.5 kWh per 100km
        const dailyElecCost = distance * 2 * (1.5 / 100) * 1.20;
        const dailySavings = dailyGasCost - dailyElecCost;
        const annualSavings = dailySavings * 300; // 300 riding days/year

        calcGasVal.textContent = dailyGasCost.toFixed(2) + ' DH';
        calcElecVal.textContent = dailyElecCost.toFixed(2) + ' DH';
        calcSavingsVal.textContent = annualSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' DH';

        // Recommend model
        let recommended = "Tank M41 1000W";
        if (distance >= 50) {
            recommended = "Tank Double Motor";
        } else if (distance >= 30) {
            recommended = "Tank Ultimate 2000W";
        } else if (distance >= 15) {
            recommended = "Tank M41 Armored";
        }
        calcRecModel.textContent = recommended;
    }

    if (commuteSlider) {
        commuteSlider.addEventListener('input', calculateSavings);
        calculateSavings(); // Initial run
    }

    // 4. Product Filtering & Sorting (Feature 7)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const priceFilterSlider = document.getElementById('price-filter-slider');
    const priceSliderValue = document.getElementById('price-slider-value');
    const productSortSelect = document.getElementById('product-sort-select');
    const productGrid = document.getElementById('product-cards-container');

    let activeCategory = 'all';
    let maxPriceLimit = 10000;

    function applyFiltersAndSort() {
        if (!productGrid) return;
        const cards = Array.from(productGrid.querySelectorAll('.product-card'));
        
        cards.forEach(card => {
            const price = parseFloat(card.getAttribute('data-price'));
            const category = card.getAttribute('data-category');

            const categoryMatch = activeCategory === 'all' || category === activeCategory;
            const priceMatch = price <= maxPriceLimit;

            if (categoryMatch && priceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Sort cards
        const sortVal = productSortSelect ? productSortSelect.value : 'default';
        if (sortVal !== 'default') {
            cards.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                const speedA = parseFloat(a.getAttribute('data-speed'));
                const speedB = parseFloat(b.getAttribute('data-speed'));

                if (sortVal === 'price-asc') return priceA - priceB;
                if (sortVal === 'price-desc') return priceB - priceA;
                if (sortVal === 'speed-desc') return speedB - speedA;
                return 0;
            });

            cards.forEach(card => productGrid.appendChild(card));
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-filter');
            applyFiltersAndSort();
        });
    });

    if (priceFilterSlider) {
        priceFilterSlider.addEventListener('input', () => {
            maxPriceLimit = parseInt(priceFilterSlider.value);
            priceSliderValue.textContent = maxPriceLimit.toLocaleString() + ' DH';
            applyFiltersAndSort();
        });
    }

    if (productSortSelect) {
        productSortSelect.addEventListener('change', applyFiltersAndSort);
    }

    // 5. FAQ Search Bar (Feature 6)
    const faqSearchInput = document.getElementById('faq-search-input');
    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                if (question.includes(query) || answer.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 6. Interactive Model Comparison Table column hover (Feature 9)
    const compareTable = document.querySelector('.compare-table');
    if (compareTable) {
        const cells = compareTable.querySelectorAll('th, td');
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', () => {
                const colIndex = cell.cellIndex;
                if (colIndex > 0) { // Don't highlight the labels column
                    const rows = compareTable.querySelectorAll('tr');
                    rows.forEach(row => {
                        const c = row.cells[colIndex];
                        if (c) c.classList.add('highlighted-col');
                    });
                }
            });
            cell.addEventListener('mouseleave', () => {
                const colIndex = cell.cellIndex;
                if (colIndex > 0) {
                    const rows = compareTable.querySelectorAll('tr');
                    rows.forEach(row => {
                        const c = row.cells[colIndex];
                        if (c) c.classList.remove('highlighted-col');
                    });
                }
            });
        });
    }

    // 7. Interactive Review Submission Drawer (Feature 8)
    const toggleReviewBtn = document.getElementById('toggle-review-form');
    const reviewFormWrapper = document.getElementById('review-form-wrapper');
    const starSelector = document.getElementById('star-rating-selector');
    const reviewForm = document.getElementById('customer-review-form');
    const testimonialGrid = document.querySelector('.testimonial-grid');

    let selectedRating = 5;

    if (toggleReviewBtn) {
        toggleReviewBtn.addEventListener('click', () => {
            reviewFormWrapper.classList.toggle('open');
            const isEn = document.documentElement.lang !== 'ar' && document.documentElement.lang !== 'fr';
            const isFr = document.documentElement.lang === 'fr';
            toggleReviewBtn.textContent = reviewFormWrapper.classList.contains('open') 
                ? (isEn ? "Hide Form" : (isFr ? "Masquer le formulaire" : "إخفاء الاستمارة")) 
                : (isEn ? "Write a Review" : (isFr ? "Écrire un Avis" : "كتابة تقييم"));
        });
    }

    if (starSelector) {
        const stars = starSelector.querySelectorAll('i');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.getAttribute('data-value'));
                stars.forEach(s => {
                    const val = parseInt(s.getAttribute('data-value'));
                    if (val <= selectedRating) {
                        s.classList.add('active');
                        s.style.color = '#ffb800';
                    } else {
                        s.classList.remove('active');
                        s.style.color = 'rgba(255, 255, 255, 0.2)';
                    }
                });
            });
        });
        // Initial active stars
        stars.forEach(s => s.classList.add('active'));
    }

    function addReviewCard(review, animate = false) {
        if (!testimonialGrid) return;
        
        const card = document.createElement('div');
        card.className = `testimonial-card glass reveal-up active ${animate ? 'new-review-animate' : ''}`;
        
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += i < review.rating ? '<i class="ri-star-fill"></i>' : '<i class="ri-star-line"></i>';
        }

        card.innerHTML = `
            <div class="stars">${starsHtml}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="customer">
                <div class="avatar">${review.name.charAt(0).toUpperCase()}</div>
                <div>
                    <h4>${review.name}</h4>
                    <span>${review.city}</span>
                </div>
            </div>
        `;
        
        if (animate) {
            testimonialGrid.prepend(card);
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            testimonialGrid.appendChild(card);
        }
    }

    // Load review from local storage
    let localReviews = JSON.parse(localStorage.getItem('_mohamed_z__-user-reviews') || '[]');
    localReviews.forEach(r => addReviewCard(r));

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rev-name').value;
            const city = document.getElementById('rev-city').value;
            const text = document.getElementById('rev-text').value;

            const newReview = { rating: selectedRating, name, city, text };
            localReviews.push(newReview);
            localStorage.setItem('_mohamed_z__-user-reviews', JSON.stringify(localReviews));

            addReviewCard(newReview, true);
            
            // Reset form
            reviewForm.reset();
            reviewFormWrapper.classList.remove('open');
            if (toggleReviewBtn) {
                const isEn = document.documentElement.lang !== 'ar' && document.documentElement.lang !== 'fr';
                const isFr = document.documentElement.lang === 'fr';
                toggleReviewBtn.textContent = isEn ? "Write a Review" : (isFr ? "Écrire un Avis" : "كتابة تقييم");
            }
        });
    }

    // 8. Social Proof Toast (Feature 3)
    const names = ["Yassine", "Rachid", "Othmane", "Chaimae", "Nisrine", "Amine", "Mehdi", "Meriem", "Ghita", "Hamza", "Khalid", "Salma"];
    const citiesList = ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan", "Settat"];
    const modelsList = ["Tank M41 1000W", "Tank M41 Armored", "Tank Ultimate 2000W", "Tank Double Motor"];

    const toastEl = document.getElementById('purchase-social-toast');
    const toastText = document.getElementById('purchase-social-text');

    function showRandomToast() {
        if (!toastEl || !toastText) return;
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCity = citiesList[Math.floor(Math.random() * citiesList.length)];
        const randomModel = modelsList[Math.floor(Math.random() * modelsList.length)];
        const randomTime = Math.floor(Math.random() * 50) + 5;

        const isAr = document.documentElement.lang === 'ar';
        const isFr = document.documentElement.lang === 'fr';

        let textText = ``;
        if (isAr) {
            textText = `قام <strong>${randomName}</strong> من مدينة <strong>${randomCity}</strong> بشراء <strong>${randomModel}</strong> ⚡ منذ ${randomTime} دقائق.`;
            toastEl.style.left = 'auto';
            toastEl.style.right = '24px';
        } else if (isFr) {
            textText = `<strong>${randomName}</strong> de <strong>${randomCity}</strong> a acheté <strong>${randomModel}</strong> ⚡ il y a ${randomTime} min.`;
            toastEl.style.left = '24px';
            toastEl.style.right = 'auto';
        } else {
            textText = `<strong>${randomName}</strong> from <strong>${randomCity}</strong> purchased <strong>${randomModel}</strong> ⚡ ${randomTime} mins ago.`;
            toastEl.style.left = '24px';
            toastEl.style.right = 'auto';
        }

        toastText.innerHTML = textText;
        toastEl.classList.add('show');

        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 6000);
    }

    // Show first toast after 8 seconds, then repeat every 35 seconds
    setTimeout(() => {
        showRandomToast();
        setInterval(showRandomToast, 35000);
    }, 8000);

    // 9. Premium Checkout Invoice Modal & WhatsApp (Feature 5)
    const invoiceModal = document.getElementById('checkout-invoice-modal');
    const invoiceDetailsList = document.getElementById('invoice-details-list');
    const confirmInvoiceBtn = document.getElementById('confirm-invoice-checkout');
    const closeInvoiceBtn = document.getElementById('close-invoice-btn');
    
    let currentInvoiceMessage = "";

    function openInvoice(items) {
        if (!invoiceModal || !invoiceDetailsList) return;
        invoiceDetailsList.innerHTML = '';
        
        let subtotal = 0;
        let invoiceText = "";
        
        const isAr = document.documentElement.lang === 'ar';
        const isFr = document.documentElement.lang === 'fr';
        
        // Header in message
        invoiceText += isAr ? "*طلب جديد من _mohamed_z__* 🚀\n\n" : "*Nouvelle Commande _mohamed_z__* 🚀\n\n";

        items.forEach(item => {
            const itemBasePrice = item.price * item.qty;
            subtotal += itemBasePrice;
            
            // Build item display in Modal
            const itemRow = document.createElement('div');
            itemRow.className = 'invoice-row';
            itemRow.innerHTML = `
                <div>
                    <strong>${item.name}</strong> x${item.qty}
                    ${item.color ? `<br><small style="color: #aaa;">Couleur: ${item.color}</small>` : ''}
                </div>
                <strong>${itemBasePrice.toLocaleString('en-US', {minimumFractionDigits: 2})} DH</strong>
            `;
            invoiceDetailsList.appendChild(itemRow);
            
            // Build item text for WhatsApp
            invoiceText += `• *${item.name}* x${item.qty}`;
            if (item.color) {
                invoiceText += ` (Couleur: ${item.color})`;
            }
            invoiceText += `\n  S/Total: ${itemBasePrice.toLocaleString('en-US', {minimumFractionDigits: 2})} DH\n`;

            if (item.accessories && item.accessories.length > 0) {
                item.accessories.forEach(acc => {
                    const accCost = acc.price * item.qty;
                    subtotal += accCost;
                    
                    const accRow = document.createElement('div');
                    accRow.className = 'invoice-row';
                    accRow.style.paddingLeft = '1.5rem';
                    accRow.style.fontSize = '0.85rem';
                    accRow.style.color = '#aaa';
                    accRow.innerHTML = `
                        <span>+ ${acc.name}</span>
                        <span>${accCost.toLocaleString('en-US', {minimumFractionDigits: 2})} DH</span>
                    `;
                    invoiceDetailsList.appendChild(accRow);
                    
                    invoiceText += `  + _${acc.name}_ (+${accCost.toLocaleString('en-US', {minimumFractionDigits: 2})} DH)\n`;
                });
            }
        });
        
        // Shipping Row (Free delivery)
        const shippingRow = document.createElement('div');
        shippingRow.className = 'invoice-row';
        shippingRow.style.color = '#2ed573';
        shippingRow.innerHTML = `
            <span>${isAr ? "التوصيل" : "Livraison"}</span>
            <strong>${isAr ? "مجاني" : "GRATUITE"}</strong>
        `;
        invoiceDetailsList.appendChild(shippingRow);
        invoiceText += isAr ? `• *التوصيل*: مجاني 🚚\n` : `• *Livraison*: GRATUITE 🚚\n`;

        // Total Row
        const totalRow = document.createElement('div');
        totalRow.className = 'invoice-row total-row';
        totalRow.innerHTML = `
            <span><strong>Total:</strong></span>
            <strong>${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})} DH</strong>
        `;
        invoiceDetailsList.appendChild(totalRow);
        invoiceText += `\n*TOTAL: ${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})} DH*`;
        
        currentInvoiceMessage = encodeURIComponent(invoiceText);
        invoiceModal.classList.add('show');
    }

    if (closeInvoiceBtn) {
        closeInvoiceBtn.addEventListener('click', () => {
            invoiceModal.classList.remove('show');
        });
    }

    if (confirmInvoiceBtn) {
        confirmInvoiceBtn.addEventListener('click', () => {
            window.open(`https://wa.me/212679409398?text=${currentInvoiceMessage}`, '_blank');
            invoiceModal.classList.remove('show');
        });
    }

    // Connect modal Buy Now button (Feature 1 Customizer details + Feature 5 Invoice)
    const modalBuyNowBtn = document.getElementById('modal-buy-now');
    if (modalBuyNowBtn) {
        modalBuyNowBtn.addEventListener('click', () => {
            const qty = parseInt(document.getElementById('qty-input').value) || 1;
            const data = scooters[activeScooterId];
            const accs = [];
            const accCheckboxes = document.querySelectorAll('.acc-checkbox');
            accCheckboxes.forEach(cb => {
                if (cb.checked) {
                    const isAr = document.documentElement.lang === 'ar';
                    const isFr = document.documentElement.lang === 'fr';
                    const name = isAr ? cb.getAttribute('data-name-ar') : (isFr ? cb.getAttribute('data-name-fr') : cb.getAttribute('data-name-en'));
                    accs.push({
                        name: name,
                        price: parseFloat(cb.getAttribute('data-price'))
                    });
                }
            });
            const scooterPrice = parseFloat(data.price.replace(/,/g, '').replace(' DH', '').replace(' MAD', ''));

            openInvoice([{
                name: data.name,
                qty: qty,
                price: scooterPrice,
                color: selectedColor,
                accessories: accs
            }]);
            
            // Close details modal
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    // Hijack card buy now buttons to open invoice
    const cardsBuyNow = document.querySelectorAll('.buy-now-btn');
    cardsBuyNow.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            if (id && scooters[id]) {
                const data = scooters[id];
                const scooterPrice = parseFloat(data.price.replace(/,/g, '').replace(' DH', '').replace(' MAD', ''));
                openInvoice([{
                    name: data.name,
                    qty: 1,
                    price: scooterPrice,
                    color: null,
                    accessories: []
                }]);
            }
        });
    });
});
