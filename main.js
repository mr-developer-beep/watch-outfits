// main.js - Main Website JavaScript for Watch & Outfits

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentSlide = 0;
let products = [];

// DOM Elements
const cartCountElement = document.querySelector('.cart-count');
const productGrid = document.querySelector('.product-grid');
const sliderContainer = document.querySelector('.slider');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadSliders();
    updateCartCount();
    setupEventListeners();
    setupServiceWorker();
});

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        // Default products for demo
        products = [
            {
                id: 1,
                name: "Classic Chronograph",
                description: "Elegant chronograph watch with leather strap",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                category: "men-watches",
                color: "Black",
                details: "Water resistant, Swiss movement, genuine leather strap"
            },
            {
                id: 2,
                name: "Diamond Necklace",
                description: "18K gold necklace with diamond pendant",
                price: 899.99,
                image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                category: "women-jewelry",
                color: "Gold",
                details: "18K gold, 0.5 carat diamond, 18-inch chain"
            },
            {
                id: 3,
                name: "Smart Watch Pro",
                description: "Advanced smartwatch with health tracking",
                price: 399.99,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                category: "men-watches",
                color: "Silver",
                details: "Heart rate monitor, GPS, 7-day battery life"
            },
            {
                id: 4,
                name: "Pearl Earrings",
                description: "Elegant pearl earrings with silver setting",
                price: 199.99,
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                category: "women-jewelry",
                color: "White",
                details: "Freshwater pearls, sterling silver, French hooks"
            }
        ];
        renderProducts();
    }
}

// Load sliders from JSON
async function loadSliders() {
    try {
        const response = await fetch('data/sliders.json');
        const sliders = await response.json();
        renderSliders(sliders);
        startSliderAutoPlay();
    } catch (error) {
        console.error('Error loading sliders:', error);
        // Default sliders
        const defaultSliders = [
            {
                id: 1,
                title: "Premium Watches Collection",
                description: "Discover our exclusive collection of luxury watches for men and women",
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                link: "#watches"
            },
            {
                id: 2,
                title: "Elegant Jewelry",
                description: "Fine jewelry pieces for every occasion",
                image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                link: "#jewelry"
            },
            {
                id: 3,
                title: "New Arrivals",
                description: "Check out our latest additions to the collection",
                image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                link: "#categories"
            }
        ];
        renderSliders(defaultSliders);
        startSliderAutoPlay();
    }
}

// Render sliders
function renderSliders(sliders) {
    if (!sliderContainer) return;
    
    sliderContainer.innerHTML = '';
    
    sliders.forEach(slider => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.style.backgroundImage = `url('${slider.image}')`;
        slideElement.innerHTML = `
            <div class="slide-content">
                <h2>${slider.title}</h2>
                <p>${slider.description}</p>
                <button class="btn-add-to-cart" onclick="window.location.href='${slider.link}'">Shop Now</button>
            </div>
        `;
        sliderContainer.appendChild(slideElement);
    });
    
    updateSliderPosition();
}

// Render products
function renderProducts() {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="product-color">${product.color}</span>
                    <span class="product-category">${product.category}</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productElement);
    });
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    if (!cartCountElement) return;
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Slider functions
function updateSliderPosition() {
    if (!sliderContainer) return;
    
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    currentSlide = (currentSlide + 1) % slides.length;
    updateSliderPosition();
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSliderPosition();
}

function startSliderAutoPlay() {
    setInterval(nextSlide, 5000);
}

// Setup event listeners
function setupEventListeners() {
    // Cart toggle
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }
    
    // Slider controls
    const nextBtn = document.querySelector('.slider-controls .slider-next');
    const prevBtn = document.querySelector('.slider-controls .slider-prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Category filter
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            if (category) {
                filterProductsByCategory(category);
            }
        });
    });
    
    // Install button
    const installBtn = document.querySelector('.install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', installApp);
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

function filterProductsByCategory(category) {
    const filteredProducts = products.filter(product => 
        product.category === category || 
        product.category.includes(category)
    );
    
    if (productGrid) {
        productGrid.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <span class="product-color">${product.color}</span>
                        <span class="product-category">${product.category}</span>
                    </div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productElement);
        });
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #e50914;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// PWA Installation
let deferredPrompt;

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                const installBtn = document.querySelector('.install-btn');
                if (installBtn) {
                    installBtn.style.display = 'none';
                }
            }
            deferredPrompt = null;
        });
    }
}

// Service Worker Setup
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #e50914;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Make functions available globally
window.addToCart = addToCart;
window.toggleCart = toggleCart;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.installApp = installApp;
