// ==========================================
// VogueSphere Admin Control Center Core
// ==========================================

// 1. Supabase Initialization Config Configuration
// Replace these placeholders with your actual Supabase Project URL and Anon Key
const SUPABASE_URL = "https://kyelkjudkibrpagdskwn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZWxranVka2licnBhZ2Rza3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDYxMTksImV4cCI6MjA5NTcyMjExOX0.Tti8cmpLSi2bpcBzhlYRMpdawOhKrlDpJhTnL_C1mms";

let supabaseClient = null;
let currentSession = null;

if (SUPABASE_URL !== "YOUR_SUPABASE_URL" && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY") {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.warn("Supabase credentials are not configured. Dashboard is running in demo-evaluation mode.");
}

// 2. Bilingual Admin Translations Dictionary
const adminTranslations = {
    th: {
        auth_title: "VogueSphere",
        auth_subtitle: "พอร์ทัลจัดการแค็ตตา​ล็อก",
        auth_google: '<i class="fa-brands fa-google"></i> ลงชื่อเข้าใช้ด้วย Google',
        auth_back: '<i class="fa-solid fa-arrow-left"></i> กลับสู่หน้าแค็ตตา​ล็อกหลัก',

        denied_title: "ปฏิเสธการเข้าถึง",
        denied_desc: 'อีเมล <strong id="denied-email"></strong> ของคุณไม่ได้ลงทะเบียนในระบบในฐานะผู้ดูแลระบบ โปรดติดต่อเจ้าของระบบเพื่อขอสิทธิ์การเข้าถึง',
        denied_logout: "ลงชื่อออก / ใช้บัญชีอื่น",

        profile_role: "ผู้จัดการร้านค้า",
        logout: '<i class="fa-solid fa-right-from-bracket"></i> ลงชื่อออก',
        view_site: '<i class="fa-solid fa-eye"></i> ดูเว็บไซต์',

        tab_products: '<i class="fa-solid fa-shirt"></i> สินค้า',
        tab_variants: '<i class="fa-solid fa-palette"></i> สีและคลังสินค้า',
        tab_promotions: '<i class="fa-solid fa-tags"></i> โปรโมชัน',
        tab_settings: '<i class="fa-solid fa-sliders"></i> ตั้งค่าเว็บไซต์',
        tab_admins: '<i class="fa-solid fa-users-gear"></i> ผู้ดูแลระบบ',

        title_products: "จัดการสินค้าในแค็ตตา​ล็อก",
        title_variants: "จัดการสีและจำนวนสต็อกสินค้า",
        title_promotions: "จัดการส่วนลดและโปรโมชัน",
        title_settings: "ปรับแต่งข้อมูลการติดต่อ",
        title_admins: "บัญชีผู้ดูแลระบบที่ได้รับอนุญาต",

        search_products_placeholder: "ค้นหาสินค้า...",
        btn_new_product: '<i class="fa-solid fa-plus"></i> เพิ่มสินค้าใหม่',

        th_name: "ชื่อสินค้า",
        th_cat: "หมวดหมู่",
        th_gender: "เพศ",
        th_price: "ราคาเริ่มต้น",
        th_discount: "ส่วนลดปัจจุบัน",
        th_actions: "จัดการ",

        card_add_variant: '<i class="fa-solid fa-square-plus"></i> เพิ่มสีสินค้า',
        label_select_product: "เลือกสินค้าหลัก",
        label_color_name: "ชื่อสีสินค้า",
        label_stock_qty: "จำนวนสต็อก",
        label_variant_image: "รูปภาพสินค้า (อัปโหลดเข้า Supabase Storage)",
        file_select: '<i class="fa-solid fa-cloud-arrow-up"></i> เลือกไฟล์รูปภาพ',
        file_no_chosen: "ยังไม่ได้เลือกไฟล์",
        file_help: "รูปภาพจะถูกอัปโหลดไปยังหน่วยเก็บข้อมูลสาธารณะ `product-images` ของคุณ",
        preview_label: "ภาพตัวอย่างรูปที่อัปโหลด",
        btn_upload_save: '<i class="fa-solid fa-upload"></i> อัปโหลดและบันทึกข้อมูลสีสินค้า',

        card_active_variants: '<i class="fa-solid fa-palette"></i> สีและคลังสินค้าที่มีอยู่ในระบบ',
        option_all_prods: "แสดงสินค้าทั้งหมด",
        th_prod: "สินค้า",
        th_color: "สี",
        th_img: "รูปภาพ",
        th_stock: "จำนวนคงเหลือ",

        card_apply_promo: '<i class="fa-solid fa-percent"></i> ประยุกต์ใช้ส่วนลดพิเศษ',
        label_target_prod: "เลือกสินค้าเป้าหมาย",
        label_disc_type: "ประเภทส่วนลด",
        label_disc_value: "มูลค่าส่วนลด",
        opt_disc_none: "ไม่มี (ราคาปกติ)",
        opt_disc_none_opt: "-- เลือกประเภทส่วนลด --",
        opt_disc_pct: "คิดเป็นเปอร์เซ็นต์ (%)",
        opt_disc_fixed: "ลบเป็นจำนวนเงินตรงตัว ($)",
        btn_save_promo: '<i class="fa-solid fa-floppy-disk"></i> ประยุกต์ใช้ราคาโปรโมชัน',

        guideline_title: '<i class="fa-solid fa-circle-info"></i> คำแนะนำเกี่ยวกับโปรโมชัน',
        guideline_desc: '<ul><li><strong>ลดเป็นเปอร์เซ็นต์ (%):</strong> คำนวณเป็น <code>ราคาเริ่มต้น * (1 - มูลค่าส่วนลด/100)</code> ตัวอย่างเช่น ส่วนลด 15% สำหรับสินค้าราคา $100 จะขายที่ $85</li><li><strong>ลดเป็นเงินตรงตัว:</strong> หักออกจากราคาเริ่มต้นทันที: <code>ราคาเริ่มต้น - มูลค่าส่วนลด</code> ถ้าราคาติดลบ ระบบจะปัดขึ้นเป็น $0</li><li>ราคาโปรโมชันจะแสดงผลบนหน้าเว็บทันที ลูกค้าจะเห็นราคาเดิมที่ขีดฆ่าและป้ายส่วนลด</li><li>หากต้องการยกเลิกส่วนลด ให้ตั้งประเภทส่วนลดเป็น **ไม่มี (ราคาปกติ)**</li></ul>',

        card_edit_contact: '<i class="fa-solid fa-pen-to-square"></i> แก้ไขข้อมูลการติดต่อในส่วนท้ายเว็บ',
        settings_desc: "ระบุช่องทางติดต่อและที่ตั้งร้านเพื่อแสดงผลที่ส่วนล่างสุดของหน้าเว็บไซต์แค็ตตา​ล็อกหลัก รองรับการพิมพ์ข้อความธรรมดาหรือโครงสร้าง HTML",
        label_contact_html: "ข้อมูลการติดต่อ (ใช้โค้ด HTML ได้)",
        btn_save_settings: '<i class="fa-solid fa-floppy-disk"></i> บันทึกโครงสร้างการติดต่อ',

        card_admins_auth: '<i class="fa-solid fa-user-shield"></i> สิทธิ์เข้าถึงของผู้ดูแลระบบ',
        admins_desc: "เฉพาะอีเมลที่อยู่ในรายชื่อต่อไปนี้เท่านั้นที่สามารถเข้าสู่ระบบ VogueCenter เพื่อเพิ่ม/แก้ไขคลังเสื้อผ้าได้",
        label_admin_email: "ที่อยู่อีเมลผู้ดูแลระบบใหม่",
        btn_auth_email: '<i class="fa-solid fa-user-plus"></i> อนุมัติสิทธิ์เข้าใช้งาน',

        card_admins_dir: '<i class="fa-solid fa-users"></i> บัญชีรายชื่อผู้ดูแลระบบในระบบ',
        th_email: "อีเมลแอดเดรส",
        th_role: "ระดับสิทธิ์",
        th_remove: "ถอนสิทธิ์",

        crud_modal_new: "เพิ่มสินค้าในแค็ตตา​ล็อก",
        crud_modal_edit: "แก้ไขสินค้าในแค็ตตา​ล็อก",
        label_crud_title: "ชื่อสินค้า",
        label_crud_cat: "หมวดหมู่",
        label_crud_gender: "เพศ",
        label_crud_price: "ราคาเริ่มต้น ($ USD)",
        btn_cancel: "ยกเลิก",
        btn_save: "บันทึกข้อมูลสินค้า",

        gender_male: "ชาย",
        gender_female: "หญิง",
        gender_unisex: "ยูนิเซ็กส์",

        // Alerts & Statuses
        toast_success_auth: "เข้าสู่ระบบในฐานะผู้ดูแลระบบสำเร็จ",
        toast_signout: "ลงชื่อออกจากระบบแล้ว",
        toast_demo_auth: "โหมดทดสอบ: จำลองบัญชีผู้ดูแลระบบ",
        toast_demo_signout: "โหมดทดสอบ: ลงชื่อออกแล้ว",
        toast_data_fail: "เชื่อมต่อข้อมูลล้มเหลว",
        toast_save_prod: "บันทึกสินค้าเรียบร้อยแล้ว",
        toast_save_prod_fail: "บันทึกข้อมูลสินค้าล้มเหลว: {err}",
        toast_del_prod: "ลบสินค้าและแบบย่อยทั้งหมดเรียบร้อยแล้ว",
        toast_del_prod_fail: "ลบสินค้าล้มเหลว: {err}",
        toast_uploading: "กำลังอัปโหลดรูปภาพไปยัง Supabase...",
        toast_save_var: "บันทึกรายละเอียดสีย่อยสำเร็จแล้ว",
        toast_save_var_fail: "บันทึกข้อมูลสีย่อยล้มเหลว: {err}",
        toast_select_prod: "โปรดเลือกสินค้าเป้าหมาย",
        toast_invalid_stock: "จำนวนสต็อกไม่ถูกต้อง ต้องเป็น 0 หรือมากกว่า",
        toast_stock_update: "ปรับปรุงยอดคลังสินค้าสำเร็จแล้ว",
        toast_stock_fail: "ปรับปรุงยอดคลังสินค้าล้มเหลว: {err}",
        toast_del_var: "ลบแบบสีย่อยแล้ว",
        toast_del_var_fail: "ลบแบบสีย่อยล้มเหลว: {err}",
        toast_invalid_promo: "มูลค่าส่วนลดไม่ถูกต้อง",
        toast_promo_applied: "ประยุกต์ใช้ราคาโปรโมชันแล้ว",
        toast_promo_fail: "ประยุกต์ใช้ราคาโปรโมชันล้มเหลว: {err}",
        toast_settings_saved: "บันทึกข้อมูลการติดต่อแล้ว",
        toast_settings_fail: "บันทึกข้อมูลการติดต่อล้มเหลว: {err}",
        toast_admin_added: "ลงทะเบียนอีเมลผู้ดูแลระบบเรียบร้อย",
        toast_admin_fail: "ลงทะเบียนอีเมลผู้ดูแลระบบล้มเหลว: {err}",
        toast_revoke_self: "ปฏิเสธการดำเนินการ: คุณไม่สามารถถอนสิทธิ์อีเมลตัวเองได้!",
        toast_revoke: "ถอนสิทธิ์เรียบร้อยแล้ว",
        toast_revoke_fail: "ถอนสิทธิ์ล้มเหลว: {err}",
        prompt_stock: "แก้ไขจำนวนสินค้าคงเหลือสำหรับ {color}:",
        confirm_del_prod: "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้ถาวร? แบบย่อยทัังหมดจะถูกลบไปด้วย!",
        confirm_del_var: "คุณแน่ใจหรือไม่ว่าต้องการลบแบบสีย่อยนี้?",
        confirm_del_adm: "คุณแน่ใจหรือไม่ว่าต้องการถอนสิทธิ์ผู้ดูแลระบบของ {email}?"
    },
    en: {
        auth_title: "VogueSphere",
        auth_subtitle: "Catalog Dashboard Portal",
        auth_google: '<i class="fa-brands fa-google"></i> Sign In with Google',
        auth_back: '<i class="fa-solid fa-arrow-left"></i> Back to Main Catalog',

        denied_title: "Access Denied",
        denied_desc: 'Your email <strong id="denied-email"></strong> is not registered in the system as an administrator. Please contact the system owner to request access.',
        denied_logout: "Sign Out / Use Another Account",

        profile_role: "Store Manager",
        logout: '<i class="fa-solid fa-right-from-bracket"></i> Sign Out',
        view_site: '<i class="fa-solid fa-eye"></i> View Site',

        tab_products: '<i class="fa-solid fa-shirt"></i> Products',
        tab_variants: '<i class="fa-solid fa-palette"></i> Colors &amp; Stock',
        tab_promotions: '<i class="fa-solid fa-tags"></i> Promotions',
        tab_settings: '<i class="fa-solid fa-sliders"></i> Site Settings',
        tab_admins: '<i class="fa-solid fa-users-gear"></i> Admin Users',

        title_products: "Products Management",
        title_variants: "Colors &amp; Stock Variants",
        title_promotions: "Promotional Discounts Manager",
        title_settings: "Site Customization",
        title_admins: "Authorized Admins Registry",

        search_products_placeholder: "Search catalog products...",
        btn_new_product: '<i class="fa-solid fa-plus"></i> New Product',

        th_name: "Name",
        th_cat: "Category",
        th_gender: "Gender",
        th_price: "Base Price",
        th_discount: "Active Discount",
        th_actions: "Actions",

        card_add_variant: '<i class="fa-solid fa-square-plus"></i> Add Color Variant',
        label_select_product: "Select Product",
        label_color_name: "Color Name",
        label_stock_qty: "Stock Quantity",
        label_variant_image: "Variant Image (Supabase Storage)",
        file_select: '<i class="fa-solid fa-cloud-arrow-up"></i> Select Image File',
        file_no_chosen: "No file chosen",
        file_help: "Image will be uploaded to your public `product-images` storage bucket.",
        preview_label: "Upload Preview",
        btn_upload_save: '<i class="fa-solid fa-upload"></i> Upload &amp; Save Variant',

        card_active_variants: '<i class="fa-solid fa-palette"></i> Active Product Variants',
        option_all_prods: "Show All Products",
        th_prod: "Product",
        th_color: "Color",
        th_img: "Image",
        th_stock: "Stock",

        card_apply_promo: '<i class="fa-solid fa-percent"></i> Apply Promotion',
        label_target_prod: "Target Product",
        label_disc_type: "Discount Type",
        label_disc_value: "Discount Value",
        opt_disc_none: "None (No Discount)",
        opt_disc_none_opt: "-- Select Discount Type --",
        opt_disc_pct: "Percentage (%)",
        opt_disc_fixed: "Fixed Deduction ($)",
        btn_save_promo: '<i class="fa-solid fa-floppy-disk"></i> Apply Discount Parameters',

        guideline_title: '<i class="fa-solid fa-circle-info"></i> Promotions Guidance',
        guideline_desc: '<ul><li><strong>Percentage Discount:</strong> Calculates as <code>base_price * (1 - discount_value/100)</code>. For example, a 15% discount on a $100 product results in a $85 final cost.</li><li><strong>Fixed Discount:</strong> Directly subtracts the amount: <code>base_price - discount_value</code>. Max price will cap at $0 if discount exceeds the value.</li><li>Promotional prices are calculated instantly on the database. Users see original and slashed pricing badges.</li><li>Set the discount type to **None** to clear a product\'s current promotions.</li></ul>',

        card_edit_contact: '<i class="fa-solid fa-pen-to-square"></i> Edit Catalog Contact Details',
        settings_desc: "Customize the contact and location info displayed in the footer of your public storefront catalog. Supports plain text or full HTML formatting.",
        label_contact_html: "Contact Information (HTML Allowed)",
        btn_save_settings: '<i class="fa-solid fa-floppy-disk"></i> Save Layout Changes',

        card_admins_auth: '<i class="fa-solid fa-user-shield"></i> Authorized Admins',
        admins_desc: "Only emails present in this registry can log into VogueCenter and manage items.",
        label_admin_email: "New Admin Email Address",
        btn_auth_email: '<i class="fa-solid fa-user-plus"></i> Authorize Email',

        card_admins_dir: '<i class="fa-solid fa-users"></i> Admin User Directory',
        th_email: "Email Address",
        th_role: "Privilege Role",
        th_remove: "Remove",

        crud_modal_new: "New Catalog Product",
        crud_modal_edit: "Modify Catalog Product",
        label_crud_title: "Product Title",
        label_crud_cat: "Category",
        label_crud_gender: "Gender",
        label_crud_price: "Base Price ($ USD)",
        btn_cancel: "Cancel",
        btn_save: "Save Product",

        gender_male: "Male",
        gender_female: "Female",
        gender_unisex: "Unisex",

        // Alerts & Statuses
        toast_success_auth: "Successfully authenticated as Admin.",
        toast_signout: "Successfully signed out.",
        toast_demo_auth: "Demo Mode: Authenticated as Mock Admin.",
        toast_demo_signout: "Signed out from Demo session.",
        toast_data_fail: "Data sync failed.",
        toast_save_prod: "Product saved successfully.",
        toast_save_prod_fail: "Failed to write to Database: {err}",
        toast_del_prod: "Product and associated variants deleted.",
        toast_del_prod_fail: "Delete failed: {err}",
        toast_uploading: "Uploading variant image to Supabase...",
        toast_save_var: "Variant saved successfully.",
        toast_save_var_fail: "Failed to upload/save variant: {err}",
        toast_select_prod: "Please select a target product.",
        toast_invalid_stock: "Invalid stock value. Must be 0 or higher.",
        toast_stock_update: "Variant stock updated.",
        toast_stock_fail: "Update failed: {err}",
        toast_del_var: "Variant removed.",
        toast_del_var_fail: "Delete failed: {err}",
        toast_invalid_promo: "Invalid discount amount.",
        toast_promo_applied: "Promotion campaign applied.",
        toast_promo_fail: "DB Update failed: {err}",
        toast_settings_saved: "Footer details updated.",
        toast_settings_fail: "Update failed: {err}",
        toast_admin_added: "Admin successfully registered.",
        toast_admin_fail: "Failed to register admin: {err}",
        toast_revoke_self: "Access Denied: You cannot revoke your own privileges!",
        toast_revoke: "Access revoked.",
        toast_revoke_fail: "Revoke failed: {err}",
        prompt_stock: "Update stock count for {color}:",
        confirm_del_prod: "Are you sure you want to completely delete this product? All of its variants will also be removed!",
        confirm_del_var: "Are you sure you want to delete this specific color variant?",
        confirm_del_adm: "Are you sure you want to revoke system privileges for {email}?"
    }
};

// 3. State Management Models
const AdminState = {
    products: [],
    variants: [],
    admins: [],
    siteSettings: '',
    currentUser: null,
    activeTab: 'products-tab',
    lang: 'th' // Default language is TH
};

// 4. Demo Mocks Fallbacks for Visual Preview (If Supabase is unconfigured)
const mockAdmins = [
    { id: "adm-1", email: "manager@voguesphere.com", role: "Manager" },
    { id: "adm-2", email: "owner@voguesphere.com", role: "Owner" }
];

const mockProducts = [
    { id: "p1", name: "Premium Tailored Overcoat", name_th: "เสื้อโค้ทเทเลอร์สุดพรีเมียม", category: "Outerwear", category_th: "เสื้อนอก", gender: "Unisex", base_price: 245.00, discount_type: "percentage", discount_value: 15.00 },
    { id: "p2", name: "Vogue Cotton Knit Crew", name_th: "เสื้อยืดถักคอกลม Vogue Cotton", category: "Shirts", category_th: "เสื้อเชิ้ต", gender: "Male", base_price: 85.00, discount_type: "none", discount_value: 0 },
    { id: "p3", name: "Modern Silk Pleated Dress", name_th: "ชุดเดรสผ้าไหมจับจีบโมเดิร์น", category: "Dresses", category_th: "ชุดเดรส", gender: "Female", base_price: 180.00, discount_type: "fixed", discount_value: 30.00 },
    { id: "p4", name: "Everyday Relaxed Linen Pants", name_th: "กางเกงผ้าลินินทรงหลวมสำหรับทุกวัน", category: "Pants", category_th: "กางเกง", gender: "Male", base_price: 95.00, discount_type: "none", discount_value: 0 }
];

const mockVariants = [
    { id: "v1", product_id: "p1", color_name: "Tan Camel", color_name_th: "สีน้ำตาลอูฐ", stock_quantity: 12, image_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80" },
    { id: "v2", product_id: "p1", color_name: "Charcoal Grey", color_name_th: "สีเทาชาโคล", stock_quantity: 8, image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" },
    { id: "v3", product_id: "p2", color_name: "Olive Green", color_name_th: "สีเขียวมะกอก", stock_quantity: 20, image_url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=120&q=80" },
    { id: "v4", product_id: "p3", color_name: "Crimson Red", color_name_th: "สีแดงคริมสัน", stock_quantity: 6, image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" }
];

const mockContactHtml = `<h3>Contact Us</h3><p>Email: contact@premiumthreads.com</p><p>Phone: +1 (555) 019-2834</p><p>Address: 123 Fashion Blvd, Suite 400, New York, NY</p>`;

// 5. Life Cycle Handlers
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Fetch saved language
    const savedLang = localStorage.getItem('lang') || 'th';
    AdminState.lang = savedLang;
    document.documentElement.setAttribute('lang', savedLang);

    setupTheme();
    setupTabNavigation();
    setupLanguageToggle();

    if (supabaseClient) {
        await monitorAuth();
    } else {
        initDemoMode();
    }
});

// 6. Auth Monitor Engine
async function monitorAuth() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) {
        showToast(adminTranslations[AdminState.lang].toast_data_fail, "error");
        return;
    }

    handleAuthChange(session);

    supabaseClient.auth.onAuthStateChange((_event, session) => {
        handleAuthChange(session);
    });

    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            
            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) {
                alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            } else {
                window.location.href = 'admin.html';
            }
        });
    }

    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('logout-denied-btn').addEventListener('click', handleLogout);
}

async function handleAuthChange(session) {
    if (session) {
        currentSession = session;
        AdminState.currentUser = session.user;

        const isUserAdmin = await verifyAdminStatus(session.user.email);

        if (isUserAdmin) {
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('denied-container').classList.add('hidden');
            document.getElementById('dashboard-container').classList.remove('hidden');
            document.getElementById('admin-user-email').textContent = session.user.email;

            showToast(adminTranslations[AdminState.lang].toast_success_auth, "success");
            await initDashboard();
        } else {
            document.getElementById('login-container').classList.add('hidden');
            document.getElementById('dashboard-container').classList.add('hidden');

            document.getElementById('denied-email').textContent = session.user.email;
            document.getElementById('denied-container').classList.remove('hidden');
        }
    } else {
        currentSession = null;
        AdminState.currentUser = null;
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('dashboard-container').classList.add('hidden');
        document.getElementById('denied-container').classList.add('hidden');
    }
    updateUILocalization();
}

async function verifyAdminStatus(email) {
    try {
        const { data, error } = await supabaseClient
            .from('admin_users')
            .select('email')
            .eq('email', email.trim().toLowerCase());

        if (error) throw error;
        return data && data.length > 0;
    } catch (e) {
        console.error("Failed to verify admin status on DB:", e);
        return false;
    }
}

async function handleLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    } else {
        initDemoMode(true);
    }
    showToast(adminTranslations[AdminState.lang].toast_signout, "info");
}

// 7. Demo Simulator for Local Evaluation
function initDemoMode(forceLogout = false) {
    console.log("Running local admin emulator. Creating mock triggers...");

    const mockEmail = "manager@voguesphere.com";

    const tryLogin = () => {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('dashboard-container').classList.remove('hidden');
        document.getElementById('admin-user-email').textContent = mockEmail;
        showToast(adminTranslations[AdminState.lang].toast_demo_auth, "success");

        AdminState.products = [...mockProducts];
        AdminState.variants = [...mockVariants];
        AdminState.admins = [...mockAdmins];
        AdminState.siteSettings = mockContactHtml;

        initDashboardViews();
    };

    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            tryLogin();
        };
    }
    document.getElementById('logout-btn').onclick = () => {
        document.getElementById('dashboard-container').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
        showToast(adminTranslations[AdminState.lang].toast_demo_signout, "info");
    };

    document.getElementById('logout-denied-btn').onclick = () => {
        document.getElementById('denied-container').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
    };

    if (!forceLogout) {
        tryLogin();
    }
    updateUILocalization();
}

// 8. Core Dashboard Control & Populate
async function initDashboard() {
    await fetchDashboardData();
    initDashboardViews();
}

async function fetchDashboardData() {
    try {
        const { data: dbProducts } = await supabaseClient.from('products').select('*');
        AdminState.products = dbProducts || [];

        const { data: dbVariants } = await supabaseClient.from('product_variants').select('*');
        AdminState.variants = dbVariants || [];

        const { data: dbAdmins } = await supabaseClient.from('admin_users').select('*');
        AdminState.admins = dbAdmins || [];

        const { data: dbSettings } = await supabaseClient.from('site_settings').select('*').eq('id', 'default').single();
        AdminState.siteSettings = dbSettings ? dbSettings.contact_info : '';
    } catch (e) {
        console.error("Dashboard failed to retrieve records:", e);
        showToast(adminTranslations[AdminState.lang].toast_data_fail, "error");
    }
}

function initDashboardViews() {
    renderProductsTable();
    renderVariantsTable();
    renderAdminsTable();
    populateProductDropdowns();

    let header = "", email = "", phone = "", address = "";
    const match = AdminState.siteSettings.match(/<!-- JSON:(.*?) -->/);
    if (match) {
        try {
            const data = JSON.parse(match[1]);
            header = data.header || "";
            email = data.email || "";
            phone = data.phone || "";
            address = data.address || "";
        } catch (e) { }
    }

    const settingsHeaderEl = document.getElementById('settings-header');
    if (settingsHeaderEl) settingsHeaderEl.value = header;
    const settingsEmailEl = document.getElementById('settings-email');
    if (settingsEmailEl) settingsEmailEl.value = email;
    const settingsPhoneEl = document.getElementById('settings-phone');
    if (settingsPhoneEl) settingsPhoneEl.value = phone;
    const settingsAddressEl = document.getElementById('settings-address');
    if (settingsAddressEl) settingsAddressEl.value = address;

    setupActionListeners();
    updateUILocalization();
}

// Navigation Tabs Handler
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    const sections = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');

            AdminState.activeTab = targetId;
            syncTabHeaderTitle();
        });
    });
}

function syncTabHeaderTitle() {
    const headerTitle = document.getElementById('current-tab-title');
    const titleMap = {
        'products-tab': 'title_products',
        'variants-tab': 'title_variants',
        'promotions-tab': 'title_promotions',
        'settings-tab': 'title_settings',
        'admins-tab': 'title_admins'
    };
    const key = titleMap[AdminState.activeTab];
    headerTitle.innerHTML = adminTranslations[AdminState.lang][key];
}

// 9. View Renderers (Tables Generation)

// Render Tab 1: Products Table
function renderProductsTable(filterText = '') {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';

    const filtered = AdminState.products.filter(p => {
        const titleText = AdminState.lang === 'th' ? (p.name_th || p.name) : p.name;
        return titleText.toLowerCase().includes(filterText.toLowerCase());
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No products registered.</td></tr>`;
        return;
    }

    filtered.forEach(p => {
        let promoText = `<span style="color: var(--text-muted);">${AdminState.lang === 'th' ? 'ไม่มีส่วนลด' : 'None'}</span>`;
        if (p.discount_type && p.discount_type !== 'none' && p.discount_value > 0) {
            const badgeLabel = AdminState.lang === 'th' ? 'ลดพิเศษ' : 'OFF';
            promoText = p.discount_type === 'percentage'
                ? `<span class="product-badge discount">${p.discount_value}% ${badgeLabel}</span>`
                : `<span class="product-badge discount">$${p.discount_value} ${badgeLabel}</span>`;
        }

        const prodName = AdminState.lang === 'th' ? (p.name_th || p.name) : p.name;
        const prodCat = AdminState.lang === 'th' ? (p.category_th || p.category) : p.category;
        const localizedGender = adminTranslations[AdminState.lang]['gender_' + p.gender.toLowerCase()] || p.gender;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${prodName}</strong></td>
            <td>${prodCat}</td>
            <td>${localizedGender}</td>
            <td>$${p.base_price.toFixed(2)}</td>
            <td>${promoText}</td>
            <td>
                <div class="action-btn-group">
                    <button class="action-btn edit" title="Edit details" onclick="triggerEditProduct('${p.id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="action-btn delete" title="Delete Product" onclick="triggerDeleteProduct('${p.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Populate product selections on dropdown lists
function populateProductDropdowns() {
    const vSelect = document.getElementById('variant-product-select');
    const pSelect = document.getElementById('promo-product-select');
    const fSelect = document.getElementById('filter-variants-product');

    const optHTML = AdminState.products.map(p => {
        const name = AdminState.lang === 'th' ? (p.name_th || p.name) : p.name;
        return `<option value="${p.id}">${name}</option>`;
    }).join('');

    const labelSelect = adminTranslations[AdminState.lang].label_select_product;
    const labelTarget = adminTranslations[AdminState.lang].label_target_prod;
    const labelAllProds = adminTranslations[AdminState.lang].option_all_prods;

    vSelect.innerHTML = `<option value="">-- ${labelSelect} --</option>${optHTML}`;
    pSelect.innerHTML = `<option value="">-- ${labelTarget} --</option>${optHTML}`;
    fSelect.innerHTML = `<option value="all">${labelAllProds}</option>${optHTML}`;
}

// Render Tab 2: Variants Table
function renderVariantsTable(selectedProductId = 'all') {
    const tbody = document.querySelector('#variants-table tbody');
    tbody.innerHTML = '';

    let filtered = AdminState.variants;
    if (selectedProductId !== 'all') {
        filtered = AdminState.variants.filter(v => v.product_id === selectedProductId);
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No variants registered for selection.</td></tr>`;
        return;
    }

    filtered.forEach(v => {
        const prod = AdminState.products.find(p => p.id === v.product_id);
        const prodName = prod ? (AdminState.lang === 'th' ? (prod.name_th || prod.name) : prod.name) : 'Unknown Product';
        const colorName = AdminState.lang === 'th' ? (v.color_name_th || v.color_name) : v.color_name;

        const imgNode = v.image_url
            ? `<img src="${v.image_url}" alt="${colorName}">`
            : `<i class="fa-solid fa-image" style="font-size: 2rem; color: var(--text-muted)"></i>`;

        const tr = document.createElement('tr');
        const hexDisplay = v.color_hex ? `<span style="display:inline-block; width:12px; height:12px; background:${v.color_hex}; border-radius:50%; margin-right:8px; vertical-align:middle; border:1px solid #fff;"></span>` : '';
        tr.innerHTML = `
            <td>${prodName}</td>
            <td><strong>${hexDisplay}${colorName}</strong></td>
            <td>${imgNode}</td>
            <td><strong>${v.stock_quantity}</strong> units</td>
            <td>
                <div class="action-btn-group">
                    <button class="action-btn edit" title="Quick edit stock" onclick="triggerQuickStockEdit('${v.id}')">
                        <i class="fa-solid fa-hashtag"></i>
                    </button>
                    <button class="action-btn delete" title="Delete Variant" onclick="triggerDeleteVariant('${v.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Render Tab 5: Admin Users Table
function renderAdminsTable() {
    const tbody = document.querySelector('#admins-table tbody');
    tbody.innerHTML = '';

    if (AdminState.admins.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">No administrative email directory recorded.</td></tr>`;
        return;
    }

    AdminState.admins.forEach(adm => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${adm.email}</td>
            <td><span class="product-badge category" style="background: rgba(99, 102, 241, 0.15)">${adm.role || 'Admin'}</span></td>
            <td>
                <button class="action-btn delete" title="Revoke Privilege" onclick="triggerRevokeAdmin('${adm.id}', '${adm.email}')">
                    <i class="fa-solid fa-user-minus"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 10. CRUD Event Actions & Database Triggers

function setupActionListeners() {
    document.getElementById('admin-search-products').oninput = (e) => {
        renderProductsTable(e.target.value);
    };

    document.getElementById('filter-variants-product').onchange = (e) => {
        renderVariantsTable(e.target.value);
    };

    document.getElementById('btn-add-product').onclick = () => {
        document.getElementById('crud-modal-title').textContent = adminTranslations[AdminState.lang].crud_modal_new;
        document.getElementById('product-crud-form').reset();
        document.getElementById('crud-product-id').value = '';

        const fileDisplay = document.getElementById('crud-file-name-display');
        const previewContainer = document.getElementById('crud-product-preview-container');
        const previewImg = document.getElementById('crud-product-upload-preview');
        if (fileDisplay) fileDisplay.textContent = adminTranslations[AdminState.lang].file_no_chosen || "ยังไม่ได้เลือกไฟล์";
        if (previewContainer) previewContainer.classList.add('hidden');
        if (previewImg) previewImg.src = "";

        document.getElementById('product-crud-modal').classList.remove('hidden');
    };

    document.getElementById('close-crud-modal-btn').onclick = closeCrudModal;
    document.getElementById('btn-cancel-product').onclick = closeCrudModal;

    document.getElementById('product-crud-form').onsubmit = handleSaveProduct;
    document.getElementById('variant-form').onsubmit = handleSaveVariant;
    document.getElementById('promo-form').onsubmit = handleApplyPromotion;
    document.getElementById('settings-form').onsubmit = handleSaveSiteSettings;
    document.getElementById('add-admin-form').onsubmit = handleAddAdmin;

    const colorHexInput = document.getElementById('variant-color-hex');
    const colorHexDisplay = document.getElementById('variant-color-hex-display');
    if (colorHexInput && colorHexDisplay) {
        colorHexInput.oninput = (e) => {
            colorHexDisplay.textContent = e.target.value.toUpperCase();
        };
    }

    const fileInput = document.getElementById('variant-image');
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        const display = document.getElementById('file-name-display');
        const preview = document.getElementById('variant-upload-preview');
        const container = document.getElementById('variant-preview-container');

        if (file) {
            display.textContent = file.name;
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.src = event.target.result;
                container.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            display.textContent = adminTranslations[AdminState.lang].file_no_chosen;
            container.classList.add('hidden');
        }
    };

    const crudFileInput = document.getElementById('crud-product-image');
    if (crudFileInput) {
        crudFileInput.onchange = (e) => {
            const file = e.target.files[0];
            const display = document.getElementById('crud-file-name-display');
            const preview = document.getElementById('crud-product-upload-preview');
            const container = document.getElementById('crud-product-preview-container');

            if (file) {
                display.textContent = file.name;
                const reader = new FileReader();
                reader.onload = (event) => {
                    preview.src = event.target.result;
                    container.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            } else {
                display.textContent = adminTranslations[AdminState.lang].file_no_chosen || "ยังไม่ได้เลือกไฟล์";
                container.classList.add('hidden');
            }
        };
    }
}

function closeCrudModal() {
    document.getElementById('product-crud-modal').classList.add('hidden');
}

// Save/Edit Product
async function handleSaveProduct(e) {
    e.preventDefault();

    const btnSubmit = document.getElementById('btn-save-product');
    const originalBtnText = btnSubmit.innerHTML;

    const pId = document.getElementById('crud-product-id').value;
    const name = document.getElementById('crud-product-name').value;
    const category = document.getElementById('crud-product-category').value;
    const gender = document.getElementById('crud-product-gender').value;
    const base_price = parseFloat(document.getElementById('crud-product-price').value);
    const fileInput = document.getElementById('crud-product-image');
    const file = fileInput ? fileInput.files[0] : null;

    // Support Thai translation keys in payload
    const payload = {
        name,
        category,
        gender,
        base_price
    };

    // If writing in Thai, let's also fill in the _th suffixes so index.html loads them
    if (AdminState.lang === 'th') {
        payload.name_th = name;
        payload.category_th = category;
    }

    if (supabaseClient) {
        try {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังบันทึกรูปภาพ...';

            if (file) {
                showToast(adminTranslations[AdminState.lang].toast_uploading || "Uploading image...", "info");

                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_product.${fileExt}`;
                const filePath = `products/${fileName}`;

                const { data: uploadData, error: uploadErr } = await supabaseClient.storage
                    .from('product-images')
                    .upload(filePath, file);

                if (uploadErr) throw uploadErr;

                const { data } = supabaseClient.storage.from('product-images').getPublicUrl(filePath);
                if (data && data.publicUrl) {
                    payload.image_url = data.publicUrl;
                }
            }

            if (pId) {
                const { error } = await supabaseClient.from('products').update(payload).eq('id', pId);
                if (error) throw error;
                showToast(adminTranslations[AdminState.lang].toast_save_prod, "success");
            } else {
                const { error } = await supabaseClient.from('products').insert([payload]);
                if (error) throw error;
                showToast(adminTranslations[AdminState.lang].toast_save_prod, "success");
            }
            await fetchDashboardData();
            initDashboardViews();
            closeCrudModal();
        } catch (err) {
            showToast(adminTranslations[AdminState.lang].toast_save_prod_fail.replace('{err}', err.message), "error");
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalBtnText;
        }
    } else {
        if (file) {
            payload.image_url = document.getElementById('crud-product-upload-preview').src;
        }
        if (pId) {
            const index = AdminState.products.findIndex(p => p.id === pId);
            AdminState.products[index] = { ...AdminState.products[index], ...payload };
            showToast("Demo Mode: Product details updated.", "success");
        } else {
            payload.id = 'p-' + Date.now();
            payload.discount_type = 'none';
            payload.discount_value = 0;
            if (!payload.image_url) {
                payload.image_url = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80";
            }
            AdminState.products.push(payload);
            showToast("Demo Mode: Product created successfully.", "success");
        }
        initDashboardViews();
        closeCrudModal();
    }
}

// Edit Product details trigger modal
window.triggerEditProduct = function (pId) {
    const product = AdminState.products.find(p => p.id === pId);
    if (!product) return;

    document.getElementById('crud-modal-title').textContent = adminTranslations[AdminState.lang].crud_modal_edit;
    document.getElementById('crud-product-id').value = product.id;

    // Fill text based on active lang
    const name = AdminState.lang === 'th' ? (product.name_th || product.name) : product.name;
    const cat = AdminState.lang === 'th' ? (product.category_th || product.category) : product.category;

    document.getElementById('crud-product-name').value = name;
    document.getElementById('crud-product-category').value = cat;
    document.getElementById('crud-product-gender').value = product.gender;
    document.getElementById('crud-product-price').value = product.base_price;

    const fileDisplay = document.getElementById('crud-file-name-display');
    const previewContainer = document.getElementById('crud-product-preview-container');
    const previewImg = document.getElementById('crud-product-upload-preview');

    if (product.image_url) {
        if (fileDisplay) fileDisplay.textContent = "ใช้รูปภาพเดิม";
        if (previewImg) previewImg.src = product.image_url;
        if (previewContainer) previewContainer.classList.remove('hidden');
    } else {
        if (fileDisplay) fileDisplay.textContent = adminTranslations[AdminState.lang].file_no_chosen || "ยังไม่ได้เลือกไฟล์";
        if (previewImg) previewImg.src = "";
        if (previewContainer) previewContainer.classList.add('hidden');
    }

    document.getElementById('product-crud-modal').classList.remove('hidden');
};

// Delete Product
window.triggerDeleteProduct = async function (pId) {
    if (!confirm(adminTranslations[AdminState.lang].confirm_del_prod)) return;

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient.from('products').delete().eq('id', pId);
            if (error) throw error;
            showToast(adminTranslations[AdminState.lang].toast_del_prod, "success");
            await fetchDashboardData();
            initDashboardViews();
        } catch (e) {
            showToast(adminTranslations[AdminState.lang].toast_del_prod_fail.replace('{err}', e.message), "error");
        }
    } else {
        AdminState.products = AdminState.products.filter(p => p.id !== pId);
        AdminState.variants = AdminState.variants.filter(v => v.product_id !== pId);
        showToast("Demo Mode: Deleted product and variants.", "success");
        initDashboardViews();
    }
};

// Save Product Variant & Image Upload
async function handleSaveVariant(e) {
    e.preventDefault();

    const pId = document.getElementById('variant-product-select').value;
    const color = document.getElementById('variant-color').value.trim();
    const colorHex = document.getElementById('variant-color-hex').value;
    const stock = parseInt(document.getElementById('variant-stock').value);
    const file = document.getElementById('variant-image').files[0];

    if (!pId) {
        showToast(adminTranslations[AdminState.lang].toast_select_prod, "error");
        return;
    }

    if (supabaseClient) {
        try {
            let uploadedUrl = null;

            if (file) {
                showToast(adminTranslations[AdminState.lang].toast_uploading, "info");

                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_variant.${fileExt}`;
                const filePath = `variants/${fileName}`;

                const { data: uploadData, error: uploadErr } = await supabaseClient.storage
                    .from('product-images')
                    .upload(filePath, file);

                if (uploadErr) throw uploadErr;

                const { data } = supabaseClient.storage.from('product-images').getPublicUrl(filePath);
                uploadedUrl = data.publicUrl;
            }

            const payload = {
                product_id: pId,
                color_name: color,
                color_hex: colorHex,
                stock_quantity: stock
            };

            if (AdminState.lang === 'th') {
                payload.color_name_th = color;
            }
            if (uploadedUrl) payload.image_url = uploadedUrl;

            const { error } = await supabaseClient.from('product_variants').upsert([payload]);
            if (error) throw error;

            showToast(adminTranslations[AdminState.lang].toast_save_var, "success");

            document.getElementById('variant-form').reset();
            document.getElementById('file-name-display').textContent = adminTranslations[AdminState.lang].file_no_chosen;
            document.getElementById('variant-preview-container').classList.add('hidden');

            await fetchDashboardData();
            initDashboardViews();
        } catch (err) {
            showToast(adminTranslations[AdminState.lang].toast_save_var_fail.replace('{err}', err.message), "error");
        }
    } else {
        let dummyImg = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=120&q=80";
        if (file) {
            dummyImg = document.getElementById('variant-upload-preview').src;
        }

        const payload = {
            id: 'v-' + Date.now(),
            product_id: pId,
            color_name: color,
            color_hex: colorHex,
            stock_quantity: stock,
            image_url: dummyImg
        };

        if (AdminState.lang === 'th') {
            payload.color_name_th = color;
        }

        const matchIndex = AdminState.variants.findIndex(v => v.product_id === pId && v.color_name.toLowerCase() === color.toLowerCase());
        if (matchIndex >= 0) {
            AdminState.variants[matchIndex].stock_quantity = stock;
            if (file) AdminState.variants[matchIndex].image_url = dummyImg;
            showToast("Demo Mode: Existing color variant stock updated.", "success");
        } else {
            AdminState.variants.push(payload);
            showToast("Demo Mode: New color variant created.", "success");
        }

        document.getElementById('variant-form').reset();
        document.getElementById('file-name-display').textContent = adminTranslations[AdminState.lang].file_no_chosen;
        document.getElementById('variant-preview-container').classList.add('hidden');

        initDashboardViews();
    }
}

// Quick Stock Edit
window.triggerQuickStockEdit = async function (vId) {
    const variant = AdminState.variants.find(v => v.id === vId);
    if (!variant) return;

    const color = AdminState.lang === 'th' ? (variant.color_name_th || variant.color_name) : variant.color_name;
    const promptText = adminTranslations[AdminState.lang].prompt_stock.replace('{color}', color);

    const newStock = prompt(promptText, variant.stock_quantity);
    if (newStock === null) return;
    const stockVal = parseInt(newStock);

    if (isNaN(stockVal) || stockVal < 0) {
        showToast(adminTranslations[AdminState.lang].toast_invalid_stock, "error");
        return;
    }

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('product_variants')
                .update({ stock_quantity: stockVal })
                .eq('id', vId);

            if (error) throw error;
            showToast(adminTranslations[AdminState.lang].toast_stock_update, "success");
            await fetchDashboardData();
            initDashboardViews();
        } catch (e) {
            showToast(adminTranslations[AdminState.lang].toast_stock_fail.replace('{err}', e.message), "error");
        }
    } else {
        const index = AdminState.variants.findIndex(v => v.id === vId);
        AdminState.variants[index].stock_quantity = stockVal;
        showToast("Demo Mode: Stock adjusted.", "success");
        initDashboardViews();
    }
};

// Delete Variant
window.triggerDeleteVariant = async function (vId) {
    if (!confirm(adminTranslations[AdminState.lang].confirm_del_var)) return;

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient.from('product_variants').delete().eq('id', vId);
            if (error) throw error;
            showToast(adminTranslations[AdminState.lang].toast_del_var, "success");
            await fetchDashboardData();
            initDashboardViews();
        } catch (e) {
            showToast(adminTranslations[AdminState.lang].toast_del_var_fail.replace('{err}', e.message), "error");
        }
    } else {
        AdminState.variants = AdminState.variants.filter(v => v.id !== vId);
        showToast("Demo Mode: Variant removed.", "success");
        initDashboardViews();
    }
};

// Apply Promotions
async function handleApplyPromotion(e) {
    e.preventDefault();

    const pId = document.getElementById('promo-product-select').value;
    const type = document.getElementById('promo-discount-type').value;
    const val = parseFloat(document.getElementById('promo-discount-value').value);

    if (!pId) {
        showToast(adminTranslations[AdminState.lang].toast_select_prod, "error");
        return;
    }

    if (type !== 'none' && (isNaN(val) || val < 0)) {
        showToast(adminTranslations[AdminState.lang].toast_invalid_promo, "error");
        return;
    }

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('products')
                .update({
                    discount_type: type,
                    discount_value: type === 'none' ? 0 : val
                })
                .eq('id', pId);

            if (error) throw error;
            showToast(adminTranslations[AdminState.lang].toast_promo_applied, "success");
            await fetchDashboardData();
            initDashboardViews();
        } catch (err) {
            showToast(adminTranslations[AdminState.lang].toast_promo_fail.replace('{err}', err.message), "error");
        }
    } else {
        const index = AdminState.products.findIndex(p => p.id === pId);
        AdminState.products[index].discount_type = type;
        AdminState.products[index].discount_value = type === 'none' ? 0 : val;
        showToast("Demo Mode: Promotion applied to product details.", "success");
        initDashboardViews();
    }
}

// Edit Footer Layout Info Settings
async function handleSaveSiteSettings(e) {
    e.preventDefault();
    const header = document.getElementById('settings-header').value;
    const email = document.getElementById('settings-email').value;
    const phone = document.getElementById('settings-phone').value;
    const address = document.getElementById('settings-address').value;

    const jsonData = JSON.stringify({ header, email, phone, address });
    const formattedAddress = address.replace(/\n/g, '<br>');

    const info = `<!-- JSON:${jsonData} -->
<div style="width: 100%; text-align: center; margin-bottom: 10px;">
    <h3 style="font-size: 1.5rem; color: var(--accent-primary);">${header}</h3>
</div>
<div class="contact-card glass-effect">
    <i class="fa-solid fa-envelope"></i>
    <h3>อีเมล (Email)</h3>
    <p>${email}</p>
</div>
<div class="contact-card glass-effect">
    <i class="fa-solid fa-phone"></i>
    <h3>โทรศัพท์ (Phone)</h3>
    <p>${phone}</p>
</div>
<div class="contact-card glass-effect">
    <i class="fa-solid fa-location-dot"></i>
    <h3>ที่อยู่ (Address)</h3>
    <p>${formattedAddress}</p>
</div>`;

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('site_settings')
                .upsert([{ id: 'default', contact_info: info }]);

            if (error) throw error;
            showToast(adminTranslations[AdminState.lang].toast_settings_saved, "success");
            await fetchDashboardData();
        } catch (err) {
            showToast(adminTranslations[AdminState.lang].toast_settings_fail.replace('{err}', err.message), "error");
        }
    } else {
        AdminState.siteSettings = info;
        showToast("Demo Mode: Settings changes cached locally.", "success");
    }
}

// Add Admin User Authorize
async function handleAddAdmin(e) {
    e.preventDefault();
    const email = document.getElementById('admin-email-input').value.trim().toLowerCase();

    if (!email) return;

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient
                .from('admin_users')
                .insert([{ email: email, role: 'admin' }]);

            if (error) throw error;
            showToast(adminTranslations[AdminState.lang].toast_admin_added, "success");
            document.getElementById('add-admin-form').reset();
            await fetchDashboardData();
            initDashboardViews();
        } catch (err) {
            showToast(adminTranslations[AdminState.lang].toast_admin_fail.replace('{err}', err.message), "error");
        }
    } else {
        AdminState.admins.push({
            id: 'adm-' + Date.now(),
            email: email,
            role: 'Admin'
        });
        showToast("Demo Mode: Admin email registered.", "success");
        document.getElementById('add-admin-form').reset();
        initDashboardViews();
    }
}

// Revoke Admin Privilege
window.triggerRevokeAdmin = async function (admId, email) {
    if (email === AdminState.currentUser?.email || email === 'manager@voguesphere.com') {
        showToast(adminTranslations[AdminState.lang].toast_revoke_self, "error");
        return;
    }

    const confirmText = adminTranslations[AdminState.lang].confirm_del_adm.replace('{email}', email);
    if (!confirm(confirmText)) return;

    if (supabaseClient) {
        try {
            const { error } = await supabaseClient.from('admin_users').delete().eq('id', admId);
            if (error) throw error;
            showToast(adminTranslations[AdminState.lang].toast_revoke, "success");
            await fetchDashboardData();
            initDashboardViews();
        } catch (err) {
            showToast(adminTranslations[AdminState.lang].toast_revoke_fail.replace('{err}', err.message), "error");
        }
    } else {
        AdminState.admins = AdminState.admins.filter(a => a.id !== admId);
        showToast("Demo Mode: Access revoked.", "success");
        initDashboardViews();
    }
};

// 11. Bilingual UI Updates (Dynamic Translation Switcher)
function setupLanguageToggle() {
    const toggleBtn = document.getElementById('admin-lang-toggle');
    if (!toggleBtn) return;

    toggleBtn.innerHTML = `<i class="fa-solid fa-language"></i> ${AdminState.lang === 'th' ? 'EN' : 'TH'}`;

    toggleBtn.onclick = () => {
        const nextLang = AdminState.lang === 'th' ? 'en' : 'th';
        AdminState.lang = nextLang;
        localStorage.setItem('lang', nextLang);

        toggleBtn.innerHTML = `<i class="fa-solid fa-language"></i> ${nextLang === 'th' ? 'EN' : 'TH'}`;
        document.documentElement.setAttribute('lang', nextLang);

        updateUILocalization();
        syncTabHeaderTitle();

        // Re-render components with translated categories, genders, etc.
        renderProductsTable();
        renderVariantsTable();
        renderAdminsTable();
        populateProductDropdowns();
    };
}

function updateUILocalization() {
    const lang = AdminState.lang;

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (adminTranslations[lang] && adminTranslations[lang][key] !== undefined) {
            if (el.tagName === 'INPUT') {
                el.placeholder = adminTranslations[lang][key];
            } else {
                el.innerHTML = adminTranslations[lang][key];
            }
        }
    });
}

// Custom Toast notification generator
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-exclamation';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Set up UI theme selector
function setupTheme() {
    const btn = document.getElementById('admin-theme-toggle');
    if (!btn) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#admin-theme-toggle i');
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}
