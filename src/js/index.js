const todoForm = document.querySelector("#makeTodo");
const todoInput = todoForm.querySelector("input");
const todoListBox = document.querySelector("#todoList");
const todoBtn = document.querySelector(".makeToDoBtn");
const updateBtn = document.querySelector("#update");
let isReady = false;
const todoList = [];

//todo빈값방지
const checkBlank = (strings) => {
  if (strings.trim().length === 0) {
    return false;
  }
  return strings;
};

//todo입력
const makeTodo = (event) => {
  event.preventDefault();
  const inputString = todoInput.value;
  if (!checkBlank(inputString)) {
    alert("내용을 입력해주세요");
    todoInput.value = "";
  } else {
    todoInput.value = "";
    const newTodo = {
      id: Date.now(),
      task: inputString,
      isDone: false,
    };
    todoList.push(newTodo);
    showTodo(newTodo);
  }
};

//만든 todo 보여주기
const showTodo = (newTodo) => {
  const div = document.createElement("div");
  div.id = newTodo.id;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const input = document.createElement("input");
  input.value = newTodo.task;
  input.type = "text";
  input.id = "todoItem";
  input.addEventListener("click", updateTodo);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "삭제";
  deleteBtn.addEventListener("click", deleteTodo);
  div.appendChild(checkbox);
  div.appendChild(input);
  div.appendChild(deleteBtn);
  todoListBox.append(div);
};

//todo update
const updateTodo = (e) => {
  const { parentElement } = e.target;
  const { id } = parentElement;
  const updateTodos = parentElement.querySelector("#todoItem").value;
  let todoItem = todoList.find((item) => item.id === parseInt(id));
  todoItem.task = updateTodos;
};

//delete
const deleteTodo = (e) => {
  const { parentElement } = e.target;
  const { id } = e.target.parentElement;
  parentElement.remove();
  //apix경우
  todoList.filter((item) => item.id !== parseInt(id));
};

todoForm.addEventListener("submit", makeTodo);
todoBtn.addEventListener("click", makeTodo);
