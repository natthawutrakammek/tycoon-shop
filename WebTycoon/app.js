// ==========================================
// VogueSphere Client-Side Application Core
// ==========================================

// 1. Supabase Initialization Config Configuration
// Replace these placeholders with your actual Supabase Project URL and Anon Key
const SUPABASE_URL = "https://kyelkjudkibrpagdskwn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZWxranVka2licnBhZ2Rza3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDYxMTksImV4cCI6MjA5NTcyMjExOX0.Tti8cmpLSi2bpcBzhlYRMpdawOhKrlDpJhTnL_C1mms";

let supabaseClient = null;
if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY") {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.warn("Supabase credentials are not configured. Please enter your credentials in app.js and admin.js.");
    console.log("Loading placeholder mock data for catalog preview...");
}

// 2. Bilingual Translations Dictionary
const translations = {
    th: {
        nav_catalog: "หน้าแรก",
        nav_about: "สินค้าทั้งหมด",
        nav_contact: "ติดต่อเรา",
        nav_admin: '<i class="fa-solid fa-user-shield"></i> ผู้ดูแลระบบ',
        hero_tagline: '<i class="fa-solid fa-sparkles"></i> สินค้ามาใหม่ประจำฤดูกาล',
        hero_title: 'ยกระดับ <br><span class="gradient-text">สไตล์ที่เป็นคุณ</span>',
        hero_description: 'สำรวจคอลเลกชันเสื้อผ้าพรีเมียมของเรา ออกแบบมาเพื่อความสบาย รังสรรค์เพื่อความหรูหรา และนิยามตัวตนของคุณ',
        hero_cta: 'สำรวจแค็ตตา​ล็อก <i class="fa-solid fa-arrow-down-long"></i>',
        hero_feat_name: 'เสื้อถัก Vogue พรีเมียม',
        collection_title: 'สินค้าทั้งหมดของเรา',
        collection_subtitle: 'ใช้ตัวกรองด้านล่างเพื่อปรับแต่งเส้นทางสไตล์ของคุณ',
        search_placeholder: 'ค้นหาเสื้อผ้า...',
        filter_category: '<i class="fa-solid fa-tags"></i> หมวดหมู่',
        filter_sort: '<i class="fa-solid fa-arrow-down-up-navigation"></i> เรียงตาม',
        filter_gender: '<i class="fa-solid fa-venus-mars"></i> เพศ:',
        option_all_cats: 'ทุกหมวดหมู่',
        option_sort_default: 'เริ่มต้น (ใหม่ล่าสุด)',
        option_sort_low: 'ราคา: ต่ำไปสูง',
        option_sort_high: 'ราคา: สูงไปต่ำ',
        option_sort_random: 'สุ่มลำดับ',
        gender_all: 'ทั้งหมด',
        gender_male: 'ชาย',
        gender_female: 'หญิง',
        gender_unisex: 'ยูนิเซ็กส์',
        empty_title: 'ไม่พบสินค้า',
        empty_desc: 'เราไม่พบสินค้าใดๆ ที่ตรงตามคำค้นหาหรือตัวกรองปัจจุบันของคุณ ลองปรับตัวกรองใหม่!',
        empty_btn: 'ล้างตัวกรองทั้งหมด',
        modal_colors: 'สีที่มีจำหน่าย',
        modal_selected_stock: 'สินค้าคงเหลือเฉพาะสีที่เลือก:',
        modal_total_stock: 'สินค้าคงเหลือรวมทุกสี:',
        modal_shipping: 'จัดส่งทั่วโลก',
        modal_returns: 'เปลี่ยนสินค้าได้ง่ายใน 30 วัน',
        contact_title: 'ติดต่อเรา',
        contact_desc: 'มีคำถามเกี่ยวกับขนาด วัสดุ หรือการสั่งทำพิเศษใช่หรือไม่? สามารถติดต่อเราผ่านช่องทางด้านล่างนี้ได้เลย',
        footer_copy: '&copy; 2026 VogueSphere. สงวนลิขสิทธิ์ รังสรรค์ขึ้นเพื่อความสง่างาม',

        // Dynamically generated UI labels
        badge_off: 'ลดพิเศษ',
        badge_sold_out: 'สินค้าหมด',
        badge_low_stock: 'สต็อกเหลือน้อย',
        total_stock_label: 'สต็อกรวม: ',
        details_btn: 'ดูรายละเอียด <i class="fa-solid fa-arrow-right"></i>',
        units_avail: 'มีสินค้าคงเหลือ {n} ชิ้น',
        out_of_stock: 'สินค้าหมดชั่วคราว',
        unlisted_stock: 'ไม่มีข้อมูลสต็อก',
        active_search_pill: 'คำค้น: "{q}"',
        active_cat_pill: 'หมวดหมู่: {c}',
        active_gender_pill: 'เพศ: {g}',
        promo_badge_text: 'โปรโมชัน {val} OFF'
    },
    en: {
        nav_catalog: "Home",
        nav_about: "All Products",
        nav_contact: "Contact",
        nav_admin: '<i class="fa-solid fa-user-shield"></i> Admin Portal',
        hero_tagline: '<i class="fa-solid fa-sparkles"></i> New Season Arrivals',
        hero_title: 'Elevate Your <br><span class="gradient-text">Signature Style</span>',
        hero_description: 'Explore our curated collection of premium garments. Designed for comfort, styled for luxury, and crafted to define who you are.',
        hero_cta: 'Explore Catalog <i class="fa-solid fa-arrow-down-long"></i>',
        hero_feat_name: 'Vogue Premium Knit',
        collection_title: 'The Collection',
        collection_subtitle: 'Use the filters below to customize your style journey.',
        search_placeholder: 'Search products...',
        filter_category: '<i class="fa-solid fa-tags"></i> Category',
        filter_sort: '<i class="fa-solid fa-arrow-down-up-navigation"></i> Sort By',
        filter_gender: '<i class="fa-solid fa-venus-mars"></i> Gender:',
        option_all_cats: 'All Categories',
        option_sort_default: 'Default (Newest)',
        option_sort_low: 'Price: Low to High',
        option_sort_high: 'Price: High to Low',
        option_sort_random: 'Random Order',
        gender_all: 'All',
        gender_male: 'Male',
        gender_female: 'Female',
        gender_unisex: 'Unisex',
        empty_title: 'No Items Found',
        empty_desc: "We couldn't find any products matching your current search or filters. Try adjusting them!",
        empty_btn: 'Clear All Filters',
        modal_colors: 'Available Colors',
        modal_selected_stock: 'Selected Color Stock:',
        modal_total_stock: 'Total Combined Stock:',
        modal_shipping: 'Worldwide Shipping',
        modal_returns: 'Easy 30-Day Exchange',
        contact_title: 'Get in Touch',
        contact_desc: 'Have questions about sizes, materials, or custom orders? Reach out to our concierge.',
        footer_copy: '&copy; 2026 VogueSphere. All Rights Reserved. Crafted for elegance.',

        // Dynamically generated UI labels
        badge_off: 'OFF',
        badge_sold_out: 'Sold Out',
        badge_low_stock: 'Low Stock',
        total_stock_label: 'Total Stock: ',
        details_btn: 'Details <i class="fa-solid fa-arrow-right"></i>',
        units_avail: '{n} units available',
        out_of_stock: 'Out of Stock',
        unlisted_stock: 'Variant stock unlisted',
        active_search_pill: 'Search: "{q}"',
        active_cat_pill: 'Category: {c}',
        active_gender_pill: 'Gender: {g}',
        promo_badge_text: '{val} Promotion'
    }
};

// 3. Application State Model
const AppState = {
    products: [],          // Raw products list
    variants: [],          // Raw variants list
    categories: [],        // Extracted list of unique categories
    filters: {
        search: '',
        category: 'all',
        gender: 'all'
    },
    sort: 'default',
    selectedProduct: null, // Product selected for detail view
    selectedColor: '',     // Currently active color swatch in modal
    lang: 'th'             // Default language is TH
};

// Mock data to enable high-fidelity preview without immediate backend setup
const mockProducts = [
    { id: "p1", name: "Premium Tailored Overcoat", name_th: "เสื้อโค้ทเทเลอร์สุดพรีเมียม", category: "Outerwear", category_th: "เสื้อนอก", gender: "Unisex", base_price: 245.00, discount_type: "percentage", discount_value: 15.00 },
    { id: "p2", name: "Vogue Cotton Knit Crew", name_th: "เสื้อยืดถักคอกลม Vogue Cotton", category: "Shirts", category_th: "เสื้อเชิ้ต", gender: "Male", base_price: 85.00, discount_type: "none", discount_value: 0 },
    { id: "p3", name: "Modern Silk Pleated Dress", name_th: "ชุดเดรสผ้าไหมจับจีบโมเดิร์น", category: "Dresses", category_th: "ชุดเดรส", gender: "Female", base_price: 180.00, discount_type: "fixed", discount_value: 30.00 },
    { id: "p4", name: "Everyday Relaxed Linen Pants", name_th: "กางเกงผ้าลินินทรงหลวมสำหรับทุกวัน", category: "Pants", category_th: "กางเกง", gender: "Male", base_price: 95.00, discount_type: "percentage", discount_value: 10.00 },
    { id: "p5", name: "Urban Leather Chelsea Boots", name_th: "รองเท้าบูทหนังเชลซีสไตล์เออร์เบิน", category: "Shoes", category_th: "รองเท้า", gender: "Unisex", base_price: 210.00, discount_type: "none", discount_value: 0 },
    { id: "p6", name: "Minimalist Ribbed Cardigan", name_th: "คาร์ดิแกนผ้าถักร่องมินิมอล", category: "Outerwear", category_th: "เสื้อนอก", gender: "Female", base_price: 110.00, discount_type: "percentage", discount_value: 20.00 }
];

const mockVariants = [
    { id: "v1", product_id: "p1", color_name: "Tan Camel", color_name_th: "สีน้ำตาลอูฐ", stock_quantity: 12, image_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80" },
    { id: "v2", product_id: "p1", color_name: "Charcoal Grey", color_name_th: "สีเทาชาโคล", stock_quantity: 8, image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
    { id: "v3", product_id: "p2", color_name: "Olive Green", color_name_th: "สีเขียวมะกอก", stock_quantity: 20, image_url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80" },
    { id: "v4", product_id: "p2", color_name: "Midnight Navy", color_name_th: "สีน้ำเงินมิดไนท์", stock_quantity: 0, image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80" },
    { id: "v5", product_id: "p3", color_name: "Crimson Red", color_name_th: "สีแดงคริมสัน", stock_quantity: 6, image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
    { id: "v6", product_id: "p3", color_name: "Blush Pink", color_name_th: "สีชมพูบลัช", stock_quantity: 14, image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" },
    { id: "v7", product_id: "p4", color_name: "Sandy Beige", color_name_th: "สีครีมเบจทราย", stock_quantity: 18, image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
    { id: "v8", product_id: "p5", color_name: "Espresso Brown", color_name_th: "สีน้ำตาลเอสเปรสโซ", stock_quantity: 5, image_url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80" },
    { id: "v9", product_id: "p5", color_name: "Sleek Black", color_name_th: "สีดำขลับ", stock_quantity: 9, image_url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80" },
    { id: "v10", product_id: "p6", color_name: "Cream White", color_name_th: "สีขาวครีม", stock_quantity: 0, image_url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&q=80" },
    { id: "v11", product_id: "p6", color_name: "Slate Grey", color_name_th: "สีเทาสเลท", stock_quantity: 15, image_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80" }
];

const mockContactInfoTH = `
    <div class="contact-card glass-effect">
        <i class="fa-solid fa-envelope"></i>
        <h3>ช่องทางอีเมล</h3>
        <p>support@voguesphere.com</p>
        <p>concierge@voguesphere.com</p>
    </div>
    <div class="contact-card glass-effect">
        <i class="fa-solid fa-phone"></i>
        <h3>สายตรงที่ปรึกษาสไตล์</h3>
        <p>+1 (800) 555-0199 (จันทร์-ศุกร์)</p>
        <p>+1 (800) 555-0245 (ฝ่ายดูแลวีไอพี)</p>
    </div>
    <div class="contact-card glass-effect">
        <i class="fa-solid fa-location-dot"></i>
        <h3>ห้องโชว์รูมสตรีท</h3>
        <p>450 ฟิฟท์ อเวนิว ชั้น 12</p>
        <p>นิวยอร์ก รัฐนิวยอร์ก 10018</p>
    </div>
`;

const mockContactInfoEN = `
    <div class="contact-card glass-effect">
        <i class="fa-solid fa-envelope"></i>
        <h3>Email Channels</h3>
        <p>support@voguesphere.com</p>
        <p>concierge@voguesphere.com</p>
    </div>
    <div class="contact-card glass-effect">
        <i class="fa-solid fa-phone"></i>
        <h3>Direct Styling Line</h3>
        <p>+1 (800) 555-0199 (Mon-Fri)</p>
        <p>+1 (800) 555-0245 (VIP Support)</p>
    </div>
    <div class="contact-card glass-effect">
        <i class="fa-solid fa-location-dot"></i>
        <h3>Showroom Atelier</h3>
        <p>450 Fifth Avenue, Floor 12</p>
        <p>New York, NY 10018</p>
    </div>
`;

// 4. Application Lifecycle Handlers
document.addEventListener("DOMContentLoaded", () => {
    // 1. Fetch current language preference
    const savedLang = localStorage.getItem('lang') || 'th';
    AppState.lang = savedLang;

    initApp();
    setupTheme();
    setupLanguageToggle();
});

async function initApp() {
    await fetchData();
    extractCategories();
    populateCategoryDropdown();
    setupEventListeners();
    updateUILocalization(); // localize static elements
    renderHeroProduct();
    renderProducts();
}

// Fetch database records from Supabase or Fallback onto high-fidelity mocks
async function fetchData() {
    if (supabaseClient) {
        try {
            // Fetch Products
            const { data: dbProducts, error: pError } = await supabaseClient
                .from('products')
                .select('*');

            if (pError) throw pError;
            AppState.products = dbProducts || [];

            // Fetch Product Variants
            const { data: dbVariants, error: vError } = await supabaseClient
                .from('product_variants')
                .select('*');

            if (vError) throw vError;
            AppState.variants = dbVariants || [];

            // Fetch Contact Site Info Settings
            const { data: siteSettings, error: sError } = await supabaseClient
                .from('site_settings')
                .select('contact_info')
                .eq('id', 'default')
                .single();

            if (!sError && siteSettings) {
                // Settings contact info is HTML and will render as is
                document.getElementById('contact-info-content').innerHTML = siteSettings.contact_info;
            } else {
                document.getElementById('contact-info-content').innerHTML = AppState.lang === 'th' ? mockContactInfoTH : mockContactInfoEN;
            }
        } catch (error) {
            console.error("Database query failed, loading mock parameters:", error);
            loadMockData();
        }
    } else {
        loadMockData();
    }
}

function loadMockData() {
    AppState.products = mockProducts;
    AppState.variants = mockVariants;
    document.getElementById('contact-info-content').innerHTML = AppState.lang === 'th' ? mockContactInfoTH : mockContactInfoEN;
}

// Helper to calculate final promotional pricing
function calculateDiscountPrice(basePrice, type, val) {
    if (!type || type === 'none' || val <= 0) return null;
    let finalVal = basePrice;
    if (type === 'percentage') {
        finalVal = basePrice * (1 - (val / 100));
    } else if (type === 'fixed') {
        finalVal = basePrice - val;
    }
    return Math.max(0, finalVal);
}

// Generate unique categories dynamically from products table
function extractCategories() {
    const cats = AppState.products.map(p => AppState.lang === 'th' ? (p.category_th || p.category) : p.category);
    AppState.categories = ['all', ...new Set(cats)];
}

function populateCategoryDropdown() {
    const select = document.getElementById('category-filter');
    if (!select) return;

    // Reset to "All Categories" default
    select.innerHTML = `<option value="all" data-translate="option_all_cats">${translations[AppState.lang].option_all_cats}</option>`;

    AppState.categories.forEach(cat => {
        if (cat !== 'all') {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            select.appendChild(opt);
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        AppState.filters.search = e.target.value.trim().toLowerCase();
        renderProducts();
        renderActiveFilters();
    });

    // Category Filter
    document.getElementById('category-filter').addEventListener('change', (e) => {
        AppState.filters.category = e.target.value;
        renderProducts();
        renderActiveFilters();
    });

    // Sort Select
    document.getElementById('sort-select').addEventListener('change', (e) => {
        AppState.sort = e.target.value;
        renderProducts();
    });

    // Gender Filter Badges
    document.querySelectorAll('.gender-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            document.querySelectorAll('.gender-badge').forEach(b => b.classList.remove('active'));
            badge.classList.add('active');
            AppState.filters.gender = badge.getAttribute('data-gender');
            renderProducts();
            renderActiveFilters();
        });
    });

    // Reset Filters Empty Button
    document.getElementById('reset-filters-btn').addEventListener('click', resetAllFilters);

    // Modal close hooks
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') closeModal();
    });

    // ESC key close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function resetAllFilters() {
    document.getElementById('search-input').value = '';
    AppState.filters.search = '';

    document.getElementById('category-filter').value = 'all';
    AppState.filters.category = 'all';

    document.querySelectorAll('.gender-badge').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.gender-badge').forEach(b => {
        if (b.getAttribute('data-gender') === 'all') b.classList.add('active');
    });
    AppState.filters.gender = 'all';

    AppState.sort = 'default';
    document.getElementById('sort-select').value = 'default';

    renderProducts();
    renderActiveFilters();
}

function renderActiveFilters() {
    const container = document.getElementById('active-filters');
    container.innerHTML = '';

    const hasActiveFilters = AppState.filters.search || AppState.filters.category !== 'all' || AppState.filters.gender !== 'all';
    if (!hasActiveFilters) return;

    if (AppState.filters.search) {
        const text = translations[AppState.lang].active_search_pill.replace('{q}', AppState.filters.search);
        createFilterPill(container, text, () => {
            document.getElementById('search-input').value = '';
            AppState.filters.search = '';
            renderProducts();
            renderActiveFilters();
        });
    }

    if (AppState.filters.category !== 'all') {
        const text = translations[AppState.lang].active_cat_pill.replace('{c}', AppState.filters.category);
        createFilterPill(container, text, () => {
            document.getElementById('category-filter').value = 'all';
            AppState.filters.category = 'all';
            renderProducts();
            renderActiveFilters();
        });
    }

    if (AppState.filters.gender !== 'all') {
        const genderText = translations[AppState.lang]['gender_' + AppState.filters.gender.toLowerCase()];
        const text = translations[AppState.lang].active_gender_pill.replace('{g}', genderText);
        createFilterPill(container, text, () => {
            document.querySelectorAll('.gender-badge').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.gender-badge').forEach(b => {
                if (b.getAttribute('data-gender') === 'all') b.classList.add('active');
            });
            AppState.filters.gender = 'all';
            renderProducts();
            renderActiveFilters();
        });
    }
}

function createFilterPill(parent, labelText, onRemove) {
    const pill = document.createElement('span');
    pill.className = 'active-filter-pill glass-effect';
    pill.innerHTML = `${labelText} <i class="fa-solid fa-circle-xmark"></i>`;
    pill.querySelector('i').addEventListener('click', onRemove);
    parent.appendChild(pill);
}

// 5. Products Rendering Engine

// Render Hero Product
function renderHeroProduct() {
    if (!AppState.products || AppState.products.length === 0) return;

    // Get newest product (sort by created_at desc)
    const sortedProducts = [...AppState.products].sort((a, b) => b.created_at ? new Date(b.created_at) - new Date(a.created_at) : 0);
    const newestProduct = sortedProducts[0];

    const nameNode = document.getElementById('hero-product-name');
    const priceNode = document.getElementById('hero-product-price');
    const imgContainer = document.getElementById('hero-img-container');
    const heroCard = document.getElementById('hero-dynamic-card');

    if (nameNode && priceNode && imgContainer && newestProduct) {
        const prodName = AppState.lang === 'th' ? (newestProduct.name_th || newestProduct.name) : newestProduct.name;
        nameNode.textContent = prodName;

        const finalPrice = calculateDiscountPrice(newestProduct.base_price, newestProduct.discount_type, newestProduct.discount_value) || newestProduct.base_price;
        priceNode.textContent = `$${finalPrice.toFixed(2)}`;

        if (newestProduct.image_url) {
            imgContainer.innerHTML = `<img src="${newestProduct.image_url}" alt="${prodName}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-sm);">`;
        }

        // Add click listener to open details modal
        if (heroCard) {
            heroCard.style.cursor = 'pointer';
            heroCard.onclick = () => openDetailsModal(newestProduct.id);
        }
    }
}

// Render Main Product Catalog Grid
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');

    // Filter Products
    let filtered = AppState.products.filter(product => {
        const nameText = AppState.lang === 'th' ? (product.name_th || product.name) : product.name;
        const catText = AppState.lang === 'th' ? (product.category_th || product.category) : product.category;

        const matchesSearch = nameText.toLowerCase().includes(AppState.filters.search) ||
            catText.toLowerCase().includes(AppState.filters.search);

        // Select logic for category matching
        let matchesCategory = false;
        if (AppState.filters.category === 'all') {
            matchesCategory = true;
        } else {
            const currentCat = AppState.lang === 'th' ? (product.category_th || product.category) : product.category;
            matchesCategory = currentCat === AppState.filters.category;
        }

        const matchesGender = AppState.filters.gender === 'all' || product.gender === AppState.filters.gender;
        return matchesSearch && matchesCategory && matchesGender;
    });

    // Sort Products
    if (AppState.sort === 'price-low') {
        filtered.sort((a, b) => {
            const finalA = calculateDiscountPrice(a.base_price, a.discount_type, a.discount_value) || a.base_price;
            const finalB = calculateDiscountPrice(b.base_price, b.discount_type, b.discount_value) || b.base_price;
            return finalA - finalB;
        });
    } else if (AppState.sort === 'price-high') {
        filtered.sort((a, b) => {
            const finalA = calculateDiscountPrice(a.base_price, a.discount_type, a.discount_value) || a.base_price;
            const finalB = calculateDiscountPrice(b.base_price, b.discount_type, b.discount_value) || b.base_price;
            return finalB - finalA;
        });
    } else if (AppState.sort === 'random') {
        filtered.sort(() => Math.random() - 0.5);
    } else {
        filtered.sort((a, b) => b.created_at ? new Date(b.created_at) - new Date(a.created_at) : 0);
    }

    // Toggle Empty State view
    if (filtered.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    } else {
        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');
    }

    grid.innerHTML = '';

    // Generate Dynamic Catalog Cards
    filtered.forEach(product => {
        const pVariants = AppState.variants.filter(v => v.product_id === product.id);
        const totalStock = pVariants.reduce((sum, v) => sum + v.stock_quantity, 0);

        // Calculate prices
        const discountPrice = calculateDiscountPrice(product.base_price, product.discount_type, product.discount_value);
        const priceHTML = discountPrice
            ? `<span class="discount-price">$${discountPrice.toFixed(2)}</span>
               <span class="original-price">$${product.base_price.toFixed(2)}</span>`
            : `<span class="price-regular">$${product.base_price.toFixed(2)}</span>`;

        // Determine main image
        let mainImg = product.image_url || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80"; // fallback global
        if (pVariants.length > 0) {
            const withStock = pVariants.find(v => v.stock_quantity > 0);
            mainImg = withStock ? withStock.image_url : pVariants[0].image_url;
        }

        const card = document.createElement('article');
        card.className = 'product-card glass-effect';
        card.id = `product-card-${product.id}`;

        // Localized product details
        const prodName = AppState.lang === 'th' ? (product.name_th || product.name) : product.name;
        const prodCat = AppState.lang === 'th' ? (product.category_th || product.category) : product.category;
        const localizedGender = translations[AppState.lang]['gender_' + product.gender.toLowerCase()] || product.gender;

        // Create badges based on discount and stock
        let badgeHTML = `<span class="product-badge gender">${localizedGender}</span>`;
        badgeHTML += `<span class="product-badge category">${prodCat}</span>`;

        if (product.discount_type && product.discount_type !== 'none' && product.discount_value > 0) {
            const valText = product.discount_type === 'percentage' ? `${product.discount_value}%` : `$${product.discount_value}`;
            const promoText = `${valText} ${translations[AppState.lang].badge_off}`;
            badgeHTML += `<span class="product-badge discount">${promoText}</span>`;
        }
        if (totalStock === 0) {
            badgeHTML += `<span class="product-badge out-of-stock">${translations[AppState.lang].badge_sold_out}</span>`;
        } else if (totalStock < 5) {
            badgeHTML += `<span class="product-badge low-stock">${translations[AppState.lang].badge_low_stock}</span>`;
        }

        // Swatches HTML
        let swatchesHTML = '';
        if (pVariants.length > 0) {
            pVariants.forEach((v, index) => {
                const colorHex = v.color_hex || getColorHexFromName(v.color_name);
                const isActive = (v.image_url === mainImg) ? 'active' : '';
                const colorDisplayName = AppState.lang === 'th' ? (v.color_name_th || v.color_name) : v.color_name;

                swatchesHTML += `
                    <button class="swatch-btn ${isActive}" 
                            style="background-color: ${colorHex};" 
                            title="${colorDisplayName}"
                            data-img="${v.image_url}"
                            data-variant-id="${v.id}"
                            data-product-id="${product.id}"
                            aria-label="Color ${colorDisplayName}"></button>
                `;
            });
        }

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img id="card-img-${product.id}" src="${mainImg}" alt="${prodName}">
                <div class="card-badges">${badgeHTML}</div>
            </div>
            <div class="card-info">
                <div class="card-info-top">
                    <h3>${prodName}</h3>
                    <div class="price-container">${priceHTML}</div>
                    <div class="swatch-group">${swatchesHTML}</div>
                </div>
                <div class="card-actions">
                    <span class="total-stock-count">${translations[AppState.lang].total_stock_label}<span id="card-stock-${product.id}">${totalStock}</span></span>
                    <button class="details-trigger-btn" onclick="openDetailsModal('${product.id}')">
                        ${translations[AppState.lang].details_btn}
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    setupCardSwatchesInteractivity();
}

// Swatches on cards instantly swap images upon hover or click
function setupCardSwatchesInteractivity() {
    document.querySelectorAll('.product-card .swatch-btn').forEach(btn => {
        const updateCardImage = () => {
            const pId = btn.getAttribute('data-product-id');
            const imgUrl = btn.getAttribute('data-img');
            const cardImg = document.getElementById(`card-img-${pId}`);

            if (cardImg && imgUrl) {
                cardImg.src = imgUrl;
                const cardNode = document.getElementById(`product-card-${pId}`);
                cardNode.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        };

        btn.addEventListener('mouseenter', updateCardImage);
        btn.addEventListener('click', updateCardImage);
    });
}

// Approximate common garment names to HEX colors
function getColorHexFromName(colorName) {
    const colors = {
        'tan': '#D2B48C', 'camel': '#C19A6B', 'tan camel': '#C19A6B',
        'black': '#111827', 'sleek black': '#000000', 'midnight black': '#0A0A0A',
        'white': '#F9FAFB', 'cream': '#FDFBF7', 'cream white': '#FCF6EB',
        'grey': '#6B7280', 'gray': '#6B7280', 'charcoal': '#374151', 'charcoal grey': '#2F3E46', 'slate grey': '#5A6372',
        'red': '#EF4444', 'crimson': '#DC2626', 'crimson red': '#B91C1C',
        'blue': '#3B82F6', 'navy': '#1E3A8A', 'midnight navy': '#0A192F', 'indigo': '#6366F1',
        'green': '#10B981', 'olive': '#556B2F', 'olive green': '#4B5320',
        'pink': '#EC4899', 'blush': '#FBCFE8', 'blush pink': '#F8B3C9',
        'beige': '#F5F5DC', 'sandy beige': '#E1C699', 'espresso': '#3B2F2F', 'espresso brown': '#4E3629'
    };
    const key = colorName.toLowerCase().trim();
    return colors[key] || '#8B5CF6';
}

// 6. Details Modal Operations
window.openDetailsModal = function (productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;

    AppState.selectedProduct = product;
    const variants = AppState.variants.filter(v => v.product_id === productId);

    // Localize elements in modal details
    const prodName = AppState.lang === 'th' ? (product.name_th || product.name) : product.name;
    const prodCat = AppState.lang === 'th' ? (product.category_th || product.category) : product.category;
    const localizedGender = translations[AppState.lang]['gender_' + product.gender.toLowerCase()] || product.gender;

    document.getElementById('modal-gender-tag').textContent = localizedGender;
    document.getElementById('modal-category-tag').textContent = prodCat;
    document.getElementById('modal-product-name').textContent = prodName;

    // Calculate promotions
    const discountPrice = calculateDiscountPrice(product.base_price, product.discount_type, product.discount_value);
    const discPriceNode = document.getElementById('modal-discount-price');
    const origPriceNode = document.getElementById('modal-original-price');
    const discBadgeNode = document.getElementById('modal-discount-badge');

    if (discountPrice) {
        discPriceNode.textContent = `$${discountPrice.toFixed(2)}`;
        origPriceNode.textContent = `$${product.base_price.toFixed(2)}`;
        origPriceNode.classList.remove('hidden');

        const valText = product.discount_type === 'percentage' ? `${product.discount_value}%` : `$${product.discount_value}`;
        discBadgeNode.textContent = translations[AppState.lang].promo_badge_text.replace('{val}', valText);
        discBadgeNode.classList.remove('hidden');
    } else {
        discPriceNode.textContent = `$${product.base_price.toFixed(2)}`;
        origPriceNode.classList.add('hidden');
        discBadgeNode.classList.add('hidden');
    }

    // Combined total stock count
    const totalStock = variants.reduce((sum, v) => sum + v.stock_quantity, 0);
    document.getElementById('modal-total-stock').textContent = totalStock;

    // Render swatches in modal
    const swatchesContainer = document.getElementById('modal-color-swatches');
    swatchesContainer.innerHTML = '';

    if (variants.length > 0) {
        variants.forEach((v, index) => {
            const colorHex = v.color_hex || getColorHexFromName(v.color_name);
            const swatch = document.createElement('button');
            swatch.className = `swatch-btn ${index === 0 ? 'active' : ''}`;
            swatch.style.backgroundColor = colorHex;

            const colorDisplayName = AppState.lang === 'th' ? (v.color_name_th || v.color_name) : v.color_name;
            swatch.title = colorDisplayName;
            swatch.setAttribute('aria-label', `Color ${colorDisplayName}`);

            // Onclick handler for changing details variants details
            swatch.onclick = () => {
                swatchesContainer.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('active'));
                swatch.classList.add('active');

                // Swap main image
                document.getElementById('modal-main-img').src = v.image_url;

                // Update stock number details for this specific variant
                const specificStockNode = document.getElementById('modal-variant-stock');

                if (v.stock_quantity > 0) {
                    specificStockNode.textContent = translations[AppState.lang].units_avail.replace('{n}', v.stock_quantity);
                    specificStockNode.style.color = v.stock_quantity < 5 ? 'var(--color-warning)' : 'var(--color-success)';
                } else {
                    specificStockNode.textContent = translations[AppState.lang].out_of_stock;
                    specificStockNode.style.color = 'var(--color-danger)';
                }
            };

            swatchesContainer.appendChild(swatch);
        });

        // Trigger click on first swatch to load main modal content
        swatchesContainer.children[0].click();
    } else {
        document.getElementById('modal-main-img').src = product.image_url || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80";
        document.getElementById('modal-variant-stock').textContent = translations[AppState.lang].unlisted_stock;
        document.getElementById('modal-variant-stock').style.color = 'var(--text-muted)';
    }

    // Open overlay
    const overlay = document.getElementById('product-modal');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // stop background scroll
};

function closeModal() {
    const overlay = document.getElementById('product-modal');
    if (!overlay.classList.contains('hidden')) {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// 7. Bilingual UI Updates (Dynamic Translation Switcher)
function setupLanguageToggle() {
    const toggleBtn = document.getElementById('lang-toggle');
    if (!toggleBtn) return;

    // Set initial text based on loaded lang
    toggleBtn.innerHTML = `<i class="fa-solid fa-language"></i> ${AppState.lang === 'th' ? 'EN' : 'TH'}`;

    toggleBtn.addEventListener('click', () => {
        const nextLang = AppState.lang === 'th' ? 'en' : 'th';
        AppState.lang = nextLang;
        localStorage.setItem('lang', nextLang);

        // Update toggle label
        toggleBtn.innerHTML = `<i class="fa-solid fa-language"></i> ${nextLang === 'th' ? 'EN' : 'TH'}`;
        document.documentElement.setAttribute('lang', nextLang);

        // Update UI
        updateUILocalization();
        extractCategories();
        populateCategoryDropdown();
        renderProducts();
        renderActiveFilters();

        // Also reload mock data if Supabase is unconfigured to swap contact HTML
        if (!supabaseClient) {
            document.getElementById('contact-info-content').innerHTML = nextLang === 'th' ? mockContactInfoTH : mockContactInfoEN;
        }
    });
}

function updateUILocalization() {
    const lang = AppState.lang;

    // Loop through elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key] !== undefined) {
            // Check if element is an input tag
            if (el.tagName === 'INPUT') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
}

// 8. Premium Theme Controller
function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateThemeIcon(nextTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}
