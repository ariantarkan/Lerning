// --- Modal Functions ---
const openModal = (modal) => {
  if (modal) modal.classList.add("visible");
};
const closeModal = (modal) => {
  if (modal) modal.classList.remove("visible");
};

// Close buttons generic logic
document.querySelectorAll(".modal-overlay .close-btn").forEach((btn) => {
  btn.addEventListener("click", (e) =>
    closeModal(e.target.closest(".modal-overlay")),
  );
});
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
});

// --- Add User Modal ---
document
  .getElementById("addUserBtn")
  .addEventListener("click", () =>
    openModal(document.getElementById("addUserModal")),
  );

// --- View Details Modal ---
const viewDetailsModal = document.getElementById("viewDetailsModal");
const modalUserName = document.getElementById("modalUserName");
const modalUserEmail = document.getElementById("modalUserEmail");

document.querySelectorAll(".action-btn.view").forEach((button) => {
  button.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    modalUserName.textContent = btn.getAttribute("data-name");
    modalUserEmail.textContent = btn.getAttribute("data-email");
    openModal(viewDetailsModal);
  });
});

// --- Message Modals Logic ---
const messageTypeModal = document.getElementById("messageTypeModal");
const sendDiscountModal = document.getElementById("sendDiscountModal");
const sendErrorModal = document.getElementById("sendErrorModal");

document.querySelectorAll(".action-btn.message").forEach((button) => {
  button.addEventListener("click", () => openModal(messageTypeModal));
});

document.getElementById("btnSendDiscount").addEventListener("click", () => {
  closeModal(messageTypeModal);
  openModal(sendDiscountModal);
});

document.getElementById("btnSendError").addEventListener("click", () => {
  closeModal(messageTypeModal);
  openModal(sendErrorModal);
});

// --- Ban User Modal Logic ---
const banUserModal = document.getElementById("banUserModal");
const banModalTitle = document.getElementById("banModalTitle");

// فقط برای دکمه‌هایی که کلاس ban دارند این کد اجرا می‌شود
document.querySelectorAll(".action-btn.ban").forEach((button) => {
  button.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const userName = btn.getAttribute("data-name");
    banModalTitle.textContent = "بن کردن کاربر: " + userName;
    openModal(banUserModal);
  });
});

// --- Unban Logic & Toast Notification ---
const toastContainer = document.getElementById("toastContainer");

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";

  toast.innerHTML = `
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>${message}</span>
              <div class="toast-progress"></div>
          `;

  toastContainer.appendChild(toast);

  // Trigger CSS transition
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    // Wait for transition to finish before removing element
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 5000);
}

// گوش دادن به کلیک روی دکمه‌های رفع بن (کلاس unban)
document.querySelectorAll(".action-btn.unban").forEach((button) => {
  button.addEventListener("click", (e) => {
    const userName = e.currentTarget.getAttribute("data-name");
    showToast(`کاربر ${userName} با موفقیت رفع بن شد.`);
  });
});

// --- Search and Filter Logic ---
const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const statusFilter = document.getElementById("statusFilter");
const tableRows = document.querySelectorAll("#usersTableBody tr");

function filterTable() {
  const searchTerm = searchInput.value.toLowerCase();
  const roleVal = roleFilter.value;
  const statusVal = statusFilter.value;

  tableRows.forEach((row) => {
    const name = row.querySelector(".user-name").textContent.toLowerCase();
    const email = row.querySelector(".user-email").textContent.toLowerCase();
    const role = row.querySelector(".role-cell").textContent.trim();
    const status = row.querySelector(".status-cell").textContent.trim();

    const matchSearch = name.includes(searchTerm) || email.includes(searchTerm);
    const matchRole = roleVal === "all" || role === roleVal;
    const matchStatus = statusVal === "all" || status === statusVal;

    if (matchSearch && matchRole && matchStatus) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterTable);
roleFilter.addEventListener("change", filterTable);
statusFilter.addEventListener("change", filterTable);

// --- Mobile Menu Toggle ---
const menuToggleBtn = document.getElementById("menuToggleBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

menuToggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");
});

sidebarOverlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
});

// --- Role Modals Logic ---
const roleBtn = document.getElementById("roleBtn");
const mainRoleModal = document.getElementById("mainRoleModal");
const createRoleModal = document.getElementById("createRoleModal");
const assignRoleModal = document.getElementById("assignRoleModal");
const revokeRoleModal = document.getElementById("revokeRoleModal");

// باز کردن پاپ‌آپ اصلی رول
if (roleBtn) {
  roleBtn.addEventListener("click", () => openModal(mainRoleModal));
}

// دکمه‌های داخل پاپ‌آپ اصلی
document.getElementById("btnCreateRole").addEventListener("click", () => {
  closeModal(mainRoleModal);
  openModal(createRoleModal);
});

document.getElementById("btnAssignRole").addEventListener("click", () => {
  closeModal(mainRoleModal);
  openModal(assignRoleModal);
});

document.getElementById("btnDeleteRole").addEventListener("click", () => {
  closeModal(mainRoleModal);
  openModal(revokeRoleModal);
});

// عملکرد سرچ برای مودال‌های رول
function setupRoleSearch(inputId, tbodyId) {
  const searchInput = document.getElementById(inputId);
  const tbody = document.getElementById(tbodyId);

  if (searchInput && tbody) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();
      const rows = tbody.querySelectorAll("tr");

      rows.forEach((row) => {
        const textContent = row.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
}

// فعال‌سازی سرچ
setupRoleSearch("searchAssignRole", "assignRoleResults");
setupRoleSearch("searchRevokeRole", "revokeRoleResults");
