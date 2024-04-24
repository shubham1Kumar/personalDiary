const addBtn = document.querySelector("#sumbit");
const clearBtn = document.querySelector("#clear");
const warning = document.querySelector("#warning");
let titleInput = document.querySelector("#title");
let memoInput = document.querySelector("#memo");
const dltBtn = document.querySelector("#dlt");
const historyContainer = document.querySelector("#memos");

// Create title as a date
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const fullDate = `${day}-${month}-${year}`;
titleInput.value = fullDate;

function showWarning() {
  warning.style.display = "flex";
  setTimeout(() => {
    warning.style.display = "none";
  }, 2500);
}

addBtn.addEventListener("click", () => {
  if (memoInput.value != "") {
    location.reload();
    saveTitle();
    saveMsg();
    createHistory();
  } else {
    showWarning();
  }
});

// Retrieve existing data from localStorage or initialize empty arrays
var arrOfTitle = JSON.parse(localStorage.getItem("arrOfMemo")) || [];
var arrOfMsg = JSON.parse(localStorage.getItem("arrOfMsg")) || [];

function saveTitle() {
  let title = titleInput.value;
  let titleIndex = arrOfTitle.findIndex((item) => item.title === title);
  if (titleIndex === -1) {
    arrOfTitle.push({ title: title });
    localStorage.setItem("arrOfMemo", JSON.stringify(arrOfTitle));
  }
}

function saveMsg() {
  let msg = memoInput.value;
  let dateIndex = arrOfTitle.findIndex(
    (item) => item.title === titleInput.value
  );
  if (dateIndex !== -1) {
    let msgIndex = arrOfMsg.findIndex((item, index) => index === dateIndex);
    if (msgIndex !== -1) {
      // If data already exists for the same date, overwrite it
      arrOfMsg[msgIndex] = { msg: msg };
    } else {
      arrOfMsg.push({ msg: msg });
    }
    localStorage.setItem("arrOfMsg", JSON.stringify(arrOfMsg));
  }
}

function createHistory() {
  let title = titleInput.value;
  // Check if an element with the same inner text (full date) already exists
  let existingElements = document.querySelectorAll(".memoo");
  let alreadyExists = Array.from(existingElements).some(
    (el) => el.textContent === title
  );
  if (!alreadyExists) {
    let newEl = document.createElement("div");
    newEl.classList.add("memoo");
    newEl.textContent = title;
    historyContainer.appendChild(newEl);
  }
}

dltBtn.addEventListener("click", () => {
  let title = titleInput.value;
  for (let i = 0; i < arrOfTitle.length; i++) {
    if (title == arrOfTitle[i].title) {
      arrOfMsg.splice(i, 1);
      arrOfTitle.splice(i, 1);
    }
  }
  localStorage.setItem("arrOfMemo", JSON.stringify(arrOfTitle));
  localStorage.setItem("arrOfMsg", JSON.stringify(arrOfMsg));
  location.reload();
});

var newEl;

window.addEventListener("load", () => {
  if (arrOfTitle.length > 0) {
    arrOfTitle.forEach((title) => {
      newEl = document.createElement("div");
      newEl.classList.add("memoo");
      newEl.textContent = title.title;
      historyContainer.appendChild(newEl);
    });

    // Now that child divs are added, attach event listener
    let childDivs = historyContainer.children;
    childDivs = Array.from(childDivs);
    childDivs.forEach((childDiv, index) => {
      childDiv.addEventListener("click", () => {
        let titleArr = JSON.parse(localStorage.getItem("arrOfMemo"));
        let msgArr = JSON.parse(localStorage.getItem("arrOfMsg"));
        let title = titleArr[index].title;
        let msg = msgArr[index].msg;
        titleInput.value = title;
        memoInput.value = msg;
        closeSideBar();
      });
    });
  }
});

const iconDiv = document.querySelector("#icon");
const sideBar = document.querySelector("aside");
const closeIcon = document.querySelector("#close");
iconDiv.addEventListener("click", () => {
  // Toggle the sidebar display state
  sideBar.classList.remove("closeSideBarClass");  

  sideBar.style.display = "block";
});

closeIcon.addEventListener("click", closeSideBar);

function closeSideBar() {
  sideBar.classList.add("closeSideBarClass");  

}