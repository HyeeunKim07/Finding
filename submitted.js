// submitted.js
document.addEventListener("DOMContentLoaded", function () {
  const item = JSON.parse(localStorage.getItem("lostItem"));

  if (item) {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.description} (분실 날짜: ${item.date})`;

    document.getElementById("itemList").appendChild(listItem);
  }
});

function goBack() {
  window.location.href = "index.html";
}
