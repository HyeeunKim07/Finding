// script.js
document
  .getElementById("lostFoundForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const itemName = document.getElementById("itemName").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const lostDate = document.getElementById("lostDate").value;

    const item = {
      name: itemName,
      description: itemDescription,
      date: lostDate,
    };

    try {
      const response = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        document.getElementById("lostFoundForm").reset();
        openTab(null, "list");
        await renderItems(); // 수정: 새로고침 후 목록 업데이트
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

async function renderItems() {
  try {
    const response = await fetch("http://localhost:3000/api/items");
    const items = await response.json();
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - ${item.description} (분실 날짜: ${item.date})`;
      itemList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  if (evt) {
    evt.currentTarget.className += " active";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("defaultOpen").click();
  renderItems();
});
