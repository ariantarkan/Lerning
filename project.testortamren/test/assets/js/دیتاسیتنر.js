function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModalBtn(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

function closeModal(event, element) {
  if (event.target === element) {
    element.classList.remove("active");
  }
}
// باز و بسته کردن سایدبار در حالت موبایل
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("open");
}

// بستن سایدبار وقتی روی محتوای اصلی کلیک می‌شود (در موبایل)
document.querySelector(".main-content").addEventListener("click", function (e) {
  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector(".sidebar");
    // اگر روی دکمه منو کلیک نشده بود سایدبار را ببند
    if (
      !e.target.closest(".mobile-menu-btn") &&
      sidebar.classList.contains("open")
    ) {
      sidebar.classList.remove("open");
    }
  }
});
