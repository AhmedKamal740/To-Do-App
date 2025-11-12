let todoForm = document.querySelector("form");
let todoInput = document.getElementById("todo-input");
let todoListUL = document.getElementById("todoList");
let alltodos = getToods();

updateTodoList();
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});
function addTodo() {
  let todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    let todoObject = {
      text: todoText,
      comblated: false,
    };
    alltodos.push(todoObject);
    updateTodoList();
    saveData();
    todoInput.value = "";
  }
}
function updateTodoList() {
  todoListUL.innerHTML = "";
  alltodos.forEach((todo, todoIndex) => {
    todoItem = creatTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}
function creatTodoItem(todo, todoindex) {
  let todoId = "todo-" + todoindex;
  let todoLi = document.createElement("li");
  let todoText = todo.text;
  todoLi.className = "todo";
  todoLi.innerHTML = `
          <input type="checkbox" id="${todoId}" />
          <label class="custom-checkbox" for="${todoId}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="transparent"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </label>
          <label class="todo-text" for="${todoId}"> ${todoText} </label>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-color)"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
  `;

  let deleteButton = todoLi.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoTitem(todoindex);
  });
  let checkbox = todoLi.querySelector("input");
  checkbox.addEventListener("change", function () {
    alltodos[todoindex].comblated = checkbox.checked;
    saveData();
  });
  checkbox.checked = todo.comblated;
  return todoLi;
}
function saveData() {
  let data = JSON.stringify(alltodos);
  localStorage.setItem("tasks", data);
}
function getToods() {
  let todoTask = localStorage.getItem("tasks") || [];
  return JSON.parse(todoTask);
}
function deleteTodoTitem(todoindex) {
  alltodos = alltodos.filter((_, i) => i !== todoindex);
  saveData();
  updateTodoList();
}
