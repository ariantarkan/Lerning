const modal = document.getElementById("replyModal");

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

// بستن پاپ آپ با کلیک بیرون از باکس
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

