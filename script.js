// script.js
// Product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://via.placeholder.com/300x200/4CAF50/white?text=Wireless+Headphones",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://via.placeholder.com/300x200/2196F3/white?text=Smart+Watch",
        description: "Feature-rich smartwatch with health monitoring."
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 49.99,
        image: "https://via.placeholder.com/300x200/FF9800/white?text=Laptop+Stand",
        description: "Ergonomic laptop stand for better posture."
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const customerCount = document.getElementById('customer-count');
const productCount = document.getElementById('product-count');
const ctaButton = document.getElementById('cta-button');

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    animateStats();
    setupEventListeners();
});

// Load products dynamically
function loadProducts() {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Animate statistics counter
function animateStats() {
    animateCounter(customerCount, 0, 10000, 2000);
    animateCounter(productCount, 0, 500, 1500);
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Event listeners for interactivity
function setupEventListeners() {
    ctaButton.addEventListener('click', function() {
        // Smooth scroll to products section
        document.getElementById('products').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(51, 51, 51, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#333';
            header.style.backdropFilter = 'none';
        }
    });

    // Product card hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.style.cursor = 'pointer';
        }
    });
}

// Additional dynamic feature: Random product highlight
function highlightRandomProduct() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => card.style.border = 'none');
    
    const randomIndex = Math.floor(Math.random() * cards.length);
    cards[randomIndex].style.border = '3px solid #4CAF50';
    
    setTimeout(highlightRandomProduct, 3000);
}

// Start random highlighting after page loads
window.addEventListener('load', highlightRandomProduct);
