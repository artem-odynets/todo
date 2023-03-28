const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

if (localStorage.getItem("tasksHTML")) {
  tasksList.innerHTML = localStorage.getItem("tasksHTML");
}

/* FUNCTION */

function checkEmptyList() {
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  } else {
    emptyList.classList.remove("none");
  }
}

function addTask(event) {
  event.preventDefault();

  const valueInput = taskInput.value;

  const tasksHTML = `<li class="list-group-item d-flex justify-content-between task-item">
<span class="task-title">${valueInput}</span>
<div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
    </button>
    <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
</div>
</li>`;

  taskInput.value = "";
  taskInput.focus();

  tasksList.insertAdjacentHTML("beforeend", tasksHTML);
  checkEmptyList();
  saveHTML();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".list-group-item");
  parentNode.remove();

  checkEmptyList();
  saveHTML();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");
  const ff = parentNode
    .querySelector(".task-title")
    .classList.toggle("task-title--done");

  saveHTML();
}
function saveHTML() {
  localStorage.setItem("tasksHTML", tasksList.innerHTML);
}



 

