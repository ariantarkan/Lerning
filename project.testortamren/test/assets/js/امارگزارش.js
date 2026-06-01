document.addEventListener("DOMContentLoaded", () => {
  // --- منطق سایدبار موبایل ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  function toggleSidebar() {
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
  }

  if (mobileMenuBtn && sidebarOverlay) {
    mobileMenuBtn.addEventListener("click", toggleSidebar);
    sidebarOverlay.addEventListener("click", toggleSidebar);
  }

  // 1. منطق فیلتر و جستجوی محصولات
  const searchInput = document.getElementById("productSearchInput");
  const productItems = document.querySelectorAll("#productList li");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase();
    productItems.forEach((item) => {
      const productName = item
        .querySelector(".product-name")
        .textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // 2. منطق تغییر بازه زمانی و دیتای فیک
  const timeFilterButtons = document.querySelectorAll(".time-filter button");
  const dummyData = {
    daily: {
      todayRevenue: "۱۲,۴۵۰,۰۰۰",
      monthRevenue: "۳۱۰,۸۰۰,۰۰۰",
      avgDaily: "۸,۲۰۰,۰۰۰",
      totalOrders: "۱,۴۲۰",
    },
    weekly: {
      todayRevenue: "۹۵,۰۰۰,۰۰۰",
      monthRevenue: "۳۱۰,۸۰۰,۰۰۰",
      avgDaily: "۱۳,۵۷۰,۰۰۰",
      totalOrders: "۱,۴۲۰",
    },
    monthly: {
      todayRevenue: "۳۱۰,۸۰۰,۰۰۰",
      monthRevenue: "۳۱۰,۸۰۰,۰۰۰",
      avgDaily: "۱۰,۳۶۰,۰۰۰",
      totalOrders: "۱,۴۲۰",
    },
    yearly: {
      todayRevenue: "۳,۵۰۰,۰۰۰,۰۰۰",
      monthRevenue: "۳,۵۰۰,۰۰۰,۰۰۰",
      avgDaily: "۹,۵۸۹,۰۰۰",
      totalOrders: "۱۸,۵۰۰",
    },
  };

  const kpiElements = {
    todayRevenue: document.getElementById("kpi-today-revenue"),
    monthRevenue: document.getElementById("kpi-month-revenue"),
    avgDaily: document.getElementById("kpi-avg-daily"),
    totalOrders: document.getElementById("kpi-total-orders"),
  };

  function updateKpiCards(range) {
    const data = dummyData[range];
    const todayRevenueTitle = document.querySelector(".kpi-card.card-1 h4");

    if (range === "daily") todayRevenueTitle.textContent = "درآمد امروز";
    else if (range === "weekly")
      todayRevenueTitle.textContent = "درآمد ۷ روز اخیر";
    else if (range === "monthly")
      todayRevenueTitle.textContent = "درآمد ۳۰ روز اخیر";
    else if (range === "yearly")
      todayRevenueTitle.textContent = "درآمد سال جاری";

    Object.keys(kpiElements).forEach((key) => {
      const element = kpiElements[key];
      element.style.opacity = "0";
      setTimeout(() => {
        element.innerHTML = `${data[key]} <small>${key === "totalOrders" ? "عدد" : "تومان"}</small>`;
        element.style.opacity = "1";
      }, 200);
    });
  }

  timeFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      timeFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      updateKpiCards(button.dataset.range);
    });
  });

  // 3. منطق خروجی اکسل (بدون کتابخانه خارجی)
  const exportExcelBtn = document.getElementById("exportExcelBtn");

  exportExcelBtn.addEventListener("click", () => {
    let csvContent = "\uFEFF"; // BOM

    // ---- استخراج داده های آمار کلیدی ----
    csvContent += "آمار کلیدی\n";
    csvContent += "عنوان,مقدار\n";

    const kpiCards = document.querySelectorAll(".kpi-card");
    kpiCards.forEach((card) => {
      const title = card.querySelector("h4").textContent.trim();
      const value = card
        .querySelector("p")
        .textContent.replace(/\s+/g, " ")
        .trim();
      csvContent += `"${title}","${value}"\n`;
    });
    csvContent += "\n";

    // --- استخراج داده های نمودار روند درآمد ---
    const activeRange = document
      .querySelector(".time-filter button.active")
      .textContent.trim();
    csvContent += `نمودار روند درآمد (${activeRange})\n`;
    csvContent += "بازه زمانی,درآمد (تومان)\n";

    const chartMockData = [
      { label: "بخش ۱", value: "۱,۵۰۰,۰۰۰" },
      { label: "بخش ۲", value: "۳,۲۰۰,۰۰۰" },
      { label: "بخش ۳", value: "۲,۸۰۰,۰۰۰" },
      { label: "بخش ۴", value: "۵,۴۰۰,۰۰۰" },
      { label: "بخش ۵", value: "۴,۹۰۰,۰۰۰" },
    ];

    chartMockData.forEach((row) => {
      csvContent += `"${row.label}","${row.value}"\n`;
    });
    csvContent += "\n";

    // ---- استخراج داده های محصولات پرفروش ----
    csvContent += "پرفروش ترین محصولات\n";
    csvContent += "نام محصول,تعداد فروش,توضیحات (سود)\n";

    productItems.forEach((item) => {
      if (item.style.display !== "none") {
        const productName = item
          .querySelector(".product-name")
          .textContent.trim();
        const quantity = item.querySelector("strong").textContent.trim();
        const tooltip = item.getAttribute("data-tooltip").trim();
        csvContent += `"${productName}","${quantity}","${tooltip}"\n`;
      }
    });

    // ساخت فایل دانلود
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "گزارش_فروش_و_درآمد.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
