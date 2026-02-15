// Default Product Data (Seed)
const defaultProducts = [
    {
        id: 1,
        name: "Blue Kandyan Silk Saree",
        category: "saree",
        originalPrice: 28000,
        sellingPrice: 22500,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
        badge: "New Arrival"
    },
    {
        id: 2,
        name: "Golden Stiletto Heels",
        category: "shoe",
        originalPrice: 9500,
        sellingPrice: 7200,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 3,
        name: "Floral Summer Frock",
        category: "dress",
        originalPrice: 12000,
        sellingPrice: 8900,
        image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop",
        badge: "Hot"
    },
    {
        id: 4,
        name: "Embroidered Jacket Piece",
        category: "jacket",
        originalPrice: 5500,
        sellingPrice: 4200,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
        badge: null
    },
    {
        id: 5,
        name: "Red Wedding Saree",
        category: "saree",
        originalPrice: 45000,
        sellingPrice: 38500,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop",
        badge: "Premium"
    },
    {
        id: 6,
        name: "Black Evening Gown",
        category: "dress",
        originalPrice: 18000,
        sellingPrice: 14500,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        badge: null
    },
    {
        id: 7,
        name: "Crystal Bridal Heels",
        category: "shoe",
        originalPrice: 15000,
        sellingPrice: 12800,
        image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop",
        badge: "Limited"
    },
    {
        id: 8,
        name: "Silk Mix Jacket Material",
        category: "jacket",
        originalPrice: 4800,
        sellingPrice: 3500,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
        badge: null
    },
    {
        id: 9,
        name: "Cotton Daily Wear Saree",
        category: "saree",
        originalPrice: 8500,
        sellingPrice: 6900,
        image: "https://images.unsplash.com/photo-1594235216669-7033503f1937?q=80&w=800&auto=format&fit=crop",
        badge: null
    },
    {
        id: 10,
        name: "Casual Wedge Shoes",
        category: "shoe",
        originalPrice: 6500,
        sellingPrice: 4800,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
        badge: null
    }
];

// --- Data Management (LocalStorage) ---

function getProducts() {
    const stored = localStorage.getItem('sapna_products');
    if (stored) {
        return JSON.parse(stored);
    } else {
        // Initialize with default data if empty
        localStorage.setItem('sapna_products', JSON.stringify(defaultProducts));
        return defaultProducts;
    }
}

function saveProducts(products) {
    localStorage.setItem('sapna_products', JSON.stringify(products));
    window.dispatchEvent(new Event('storage')); // Notify other tabs
}

function addProduct(product) {
    const products = getProducts();
    // Generate new ID
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    product.id = newId;
    products.unshift(product); // Add to top
    saveProducts(products);
    return newId;
}

function updateProduct(updatedProduct) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        saveProducts(products);
        return true;
    }
    return false;
}

function deleteProduct(id) {
    const products = getProducts();
    const newProducts = products.filter(p => p.id !== id);
    saveProducts(newProducts);
}

// --- Display Logic ---

function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const products = getProducts();
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    document.getElementById('product-count').textContent = filtered.length;

    grid.innerHTML = filtered.map(product => `
        <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 group">
            <div class="relative h-80 overflow-hidden">
                <img src="${product.image}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="${product.name}" onerror="this.src='https://placehold.co/600x800?text=No+Image'">
                ${product.badge ? `<span class="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">${product.badge}</span>` : ''}
                <button onclick="addToCart(${product.id})" class="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <i data-lucide="shopping-bag" class="w-5 h-5 text-gray-600"></i>
                </button>
                <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300">
                    <button onclick="addToCart(${product.id})" class="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-xl hover:bg-[#D4AF37] transition-colors">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <p class="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">${product.category}</p>
                </div>
                <h3 class="font-bold text-lg mb-4 text-gray-800 line-clamp-1">${product.name}</h3>
                <div class="flex flex-col">
                    <span class="text-gray-400 line-through text-xs mb-1">Original Price: LKR ${Number(product.originalPrice).toLocaleString()}</span>
                    <div class="flex items-end justify-between">
                        <span class="text-2xl font-bold text-black font-['Outfit']">LKR ${Number(product.sellingPrice).toLocaleString()}</span>
                        <div class="flex text-yellow-400">
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current text-gray-200"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

function filterCategory(cat) {
    // Update active UI
    document.querySelectorAll('.category-chip').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('border-gray-200');
        btn.classList.remove('bg-black', 'text-white');
    });

    const activeBtn = document.getElementById(`cat-${cat}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.classList.add('bg-black', 'text-white');
    }

    renderProducts(cat);
}

// Simple Cart Count (Session only)
function addToCart(id) {
    let count = parseInt(sessionStorage.getItem('cartCount') || '0');
    count++;
    sessionStorage.setItem('cartCount', count);
    updateCartCount();

    // Optional: Show toast
    alert('Item added to cart!');
}

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = sessionStorage.getItem('cartCount') || '0';
}

// --- Company Info Management ---
const defaultCompanyInfo = {
    companyName: "SAPNA",
    companyHighlight: "SAREE",
    logoUrl: "",
    aboutTitle: "Woven with Love & Tradition",
    aboutDesc: "Founded in 1995, Sapna Saree Center has been a pioneer in bringing the finest ethnic wear to Sri Lanka. We believe every saree tells a story.",
    aboutLongDesc: "At Sapna Saree Center, we handpick every item in our collection. From the intricate threads of our Kanchipuram silk to the stitching of our designer dresses, quality is non-negotiable. \n\nWe started as a small boutique and have grown into a multi-category fashion destination, now offering luxury footwear, party wear, and exclusive dress materials.",
    address: "123 Main Street, \nGalle Road, Colombo, Sri Lanka",
    phone1: "+94 11 234 5678",
    phone2: "+94 77 123 4567",
    email1: "hello@sapnasaree.lk",
    email2: "support@sapnasaree.lk",
    experienceYears: "25+",
    customerCount: "50k+"
};

function getCompanyInfo() {
    const stored = localStorage.getItem('sapna_info');
    // Merge with default to ensure new fields exist if localstorage is old
    return stored ? { ...defaultCompanyInfo, ...JSON.parse(stored) } : defaultCompanyInfo;
}

function saveCompanyInfo(info) {
    localStorage.setItem('sapna_info', JSON.stringify(info));
    window.dispatchEvent(new Event('storage'));
}

function renderCompanyInfo() {
    const info = getCompanyInfo();

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    };

    // --- Logo Rendering ---
    const logoContainers = document.querySelectorAll('.brand-logo-container');
    logoContainers.forEach(container => {
        if (info.logoUrl && info.logoUrl.trim() !== "") {
            // Render Image
            container.innerHTML = `<img src="${info.logoUrl}" alt="${info.companyName}" class="h-10 w-auto object-contain">`;
        } else {
            // Render Default Text Style
            // Check context for text color (footer vs nav)
            const isFooter = container.classList.contains('text-white'); // Simple heuristic based on classes we will add
            const textColor = isFooter ? 'text-white' : 'text-gray-900';

            container.innerHTML = `
                <div class="w-10 h-10 bg-black flex items-center justify-center rounded-full">
                    <span class="text-white font-bold text-xl">${info.companyName.charAt(0)}</span>
                </div>
                <span class="text-2xl font-bold tracking-tighter ${textColor}">${info.companyName} <span class="text-[#D4AF37]">${info.companyHighlight}</span></span>
            `;
        }
    });

    // About Page
    setText('about-title', info.aboutTitle);
    setText('about-hero-desc', info.aboutDesc);
    setText('about-main-desc', info.aboutLongDesc);
    setText('stat-years', info.experienceYears);
    setText('stat-customers', info.customerCount);

    // Contact Details
    setText('contact-address', info.address);
    setText('contact-phone', `${info.phone1}\n${info.phone2}`);
    setText('contact-email', `${info.email1}\n${info.email2}`);

    // Footer specific
    setText('footer-address', info.address);
    setText('footer-phone', info.phone1);
    setText('footer-email', info.email1);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category') || 'all';

    renderProducts(categoryFilter);
    filterCategory(categoryFilter);
    updateCartCount();
    renderCompanyInfo(); // Load company info
});
