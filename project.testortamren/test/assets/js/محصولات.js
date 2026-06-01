let selectedFilesArray = [];
let currentContainerId = "imagePreviewContainer";

function openModal(id) {
  document.getElementById(id).style.display = "flex";
  if (id === "addModal") {
    goToStep(1);
    selectedFilesArray = [];
    document.getElementById("imagePreviewContainer").innerHTML = "";
    document.getElementById("imageInput").value = "";
    currentContainerId = "imagePreviewContainer";
  } else if (id === "editModal") {
    currentContainerId = "editImagePreviewContainer";
  }
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function goToStep(stepNumber) {
  document.getElementById("addStep1").style.display = "none";
  document.getElementById("addStep2").style.display = "none";
  document.getElementById("addStep3").style.display = "none";
  document.getElementById("addStep" + stepNumber).style.display = "block";
}

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

function previewImages(event) {
  const newFiles = Array.from(event.target.files);
  selectedFilesArray = selectedFilesArray.concat(newFiles);
  if (selectedFilesArray.length > 10) {
    alert("حداکثر می‌توانید ۱۰ تصویر انتخاب کنید.");
    selectedFilesArray = selectedFilesArray.slice(0, 10);
  }
  renderPreviews();
  event.target.value = "";
}

function renderPreviews() {
  const container = document.getElementById(currentContainerId);
  container.innerHTML = "";
  selectedFilesArray.forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const div = document.createElement("div");
      div.className = "preview-item";
      const isChecked = i === 0 ? "checked" : "";
      if (i === 0) div.classList.add("selected");
      div.innerHTML = `
                      <img src="${e.target.result}" alt="پیش‌نمایش">
                      <input type="radio" name="primaryImage_${currentContainerId}" value="${i}" ${isChecked} onchange="updatePrimaryImage(this)">
                      <span class="remove-img" onclick="removeFile(${i})">&times;</span>
                  `;
      container.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

function removeFile(index) {
  selectedFilesArray.splice(index, 1);
  renderPreviews();
}
function updatePrimaryImage(radioBtn) {
  const container = document.getElementById(currentContainerId);
  container.querySelectorAll(".preview-item").forEach((item) => {
    item.classList.remove("selected");
  });
  radioBtn.parentElement.classList.add("selected");
}

function applyDiscount() {
  const pNum = document.getElementById("discProductNum").value;
  const newPrice = document.getElementById("discPrice").value;
  const days = document.getElementById("discDays").value;

  if (!pNum || !newPrice || !days) {
    alert("لطفاً تمامی فیلدهای تخفیف را پر کنید!");
    return;
  }

  const tbody = document.getElementById("productTableBody");
  const rows = tbody.querySelectorAll("tr");
  const index = parseInt(pNum) - 1;

  if (index >= 0 && index < rows.length) {
    const targetRow = rows[index];
    const priceCell = targetRow.querySelector(".price-cell");

    const currentMainSpan = priceCell.querySelector(".main-price");
    const oldPriceValue = currentMainSpan
      ? currentMainSpan.innerText
      : priceCell.innerText;

    priceCell.innerHTML = `
                  <span class="old-price">${oldPriceValue}</span>
                  <span class="discount-price">${newPrice} تومان</span>
                  <span class="discount-days">${days} روز زمان باقیست</span>
              `;

    closeModal("discountModal");
    document.getElementById("discProductNum").value = "";
    document.getElementById("discPrice").value = "";
    document.getElementById("discDays").value = "";
  } else {
    alert("محصولی با این شماره ردیف یافت نشد!");
  }
}
// تابع باز و بسته کردن سایدبار در موبایل
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("open");
}
