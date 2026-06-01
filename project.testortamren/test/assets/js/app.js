// ==========================================
// ۱. توابع سراسری برای اعمال تم و زبان
// ==========================================
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    
    // تغییر متن‌ها در کل صفحه
    document.querySelectorAll("[data-fa][data-en]").forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // تغییر placeholder اینپوت‌ها (در صورت وجود)
    document.querySelectorAll("input[data-fa][data-en]").forEach(input => {
        input.placeholder = input.getAttribute(`data-${lang}`);
    });
}

// ==========================================
// ۲. اجرا هنگام لود شدن همه صفحات
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // گرفتن مقادیر ذخیره شده از مرورگر
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLang = localStorage.getItem("language") || "fa";

    // اعمال تم و زبان روی صفحه‌ای که لود شده
    applyTheme(savedTheme);
    applyLanguage(savedLang);

    // ------------------------------------------
    // تنظیمات مربوط به صفحه تنظیمات (اگر کاربر در این صفحه باشد)
    // ------------------------------------------
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        // تنظیم وضعیت دکمه بر اساس تم فعلی
        darkModeToggle.checked = (savedTheme === "dark");
        
        // گوش دادن به تغییر دکمه دارک مود
        darkModeToggle.addEventListener("change", (e) => {
            const newTheme = e.target.checked ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }

    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
        // تنظیم زبان در منوی کشویی
        languageSelect.value = savedLang;
        
        // گوش دادن به تغییر زبان
        languageSelect.addEventListener("change", (e) => {
            const newLang = e.target.value;
            localStorage.setItem("language", newLang);
            applyLanguage(newLang);
        });
    }

    // ------------------------------------------
    // کدهای منوی موبایل (sidebar)
    // ------------------------------------------
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarBackdrop = document.getElementById("sidebarBackdrop");

    if (menuToggleBtn && sidebar && sidebarBackdrop) {
        function toggleMenu() {
            sidebar.classList.toggle("open");
            sidebarBackdrop.classList.toggle("open");
        }
        menuToggleBtn.addEventListener("click", toggleMenu);
        sidebarBackdrop.addEventListener("click", toggleMenu);
    }
});

// ==========================================
// ۳. توابع مربوط به پاپ‌آپ‌ها (باید در دسترس کلیدهای HTML باشند)
// ==========================================
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.classList.add("active");
};

window.closeModals = function() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
};

window.saveData = function(type) {
    alert(type + " ذخیره شد.");
    closeModals();
};

// ==========================================
// ۴. همگام‌سازی لحظه‌ای بین چند تب مرورگر (تکمیلی)
// ==========================================
window.addEventListener("storage", (event) => {
    if (event.key === "theme") {
        applyTheme(event.newValue);
        const toggle = document.getElementById("darkModeToggle");
        if (toggle) toggle.checked = (event.newValue === "dark");
    }
    if (event.key === "language") {
        applyLanguage(event.newValue);
        const select = document.getElementById("languageSelect");
        if (select) select.value = event.newValue;
    }
});
