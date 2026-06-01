// جستجو و فیلتر
function filterData() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const statusValue = document.getElementById("statusFilter").value;
  const rows = document.querySelectorAll(".list-row");

  rows.forEach((row) => {
    const textContent = row.innerText.toLowerCase();
    const rowStatus = row.getAttribute("data-status");

    const matchSearch = textContent.includes(searchValue);
    const matchStatus = statusValue === "all" || rowStatus === statusValue;

    if (matchSearch && matchStatus) {
      row.style.display = ""; // نمایش اگر تطابق داشت
    } else {
      row.style.display = "none"; // مخفی اگر تطابق نداشت
    }
  });
}

// توابع پاپ آپ (مشاهده)
const modal = document.getElementById("ticketModal");

function openModal(userName, userMsg, adminMsg) {
  document.getElementById("modalTitle").innerText = "مشاهده تیکت: " + userName;
  document.getElementById("modalUserMsg").innerText = userMsg;
  document.getElementById("modalAdminMsg").innerText = adminMsg;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function closeModalOutside(event) {
  if (event.target === modal) {
    closeModal();
  }
}

// توابع سایدبار موبایل
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}
