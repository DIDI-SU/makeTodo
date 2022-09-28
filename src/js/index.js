const todoForm = document.querySelector("#makeTodo");
const todoInput = todoForm.querySelector("input");
const todoListBox = document.querySelector("#todoList");
const todoUl = todoListBox.querySelector("#todoUl");
const todoItem = todoUl.querySelector(".todo-item-div");
const todoBtn = document.querySelector(".makeToDoBtn");
let editedId = "";
let todoList = [];
let isEdit = false;
let editedText = "";
const todoItems = localStorage.getItem("todo") || null;

//todo저장
const saveTodo = () => {
  localStorage.setItem("todo", JSON.stringify(todoList));
};

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
  if (!isEdit) {
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
      saveTodo();
      showTodo(newTodo);
    }
  } else update(inputString);
};

//만든 todo 보여주기
const showTodo = (newTodo) => {
  const { task, id, isDone } = newTodo;
  const todoComponent = `<li class="todo-item-list"  id=${id}>
  <div class="todo-item-div">
    <input type="checkbox" ${isDone && "checked"} />
    <div class="todo-text-div">${task}</div>
  </div>
<div>
<button onclick="updateTodo(this)" >📝</button>
<button onclick="deleteTodo(this)" >❌</button>
</div>
</li>`;
  todoUl.innerHTML += todoComponent;
};

//이전todo 보여줌
if (todoItems !== null) {
  let storageItems = JSON.parse(localStorage.getItem("todo"));
  todoList = storageItems;
  storageItems.forEach(showTodo);
}

//todo update ready
const updateTodo = (e) => {
  isEdit = true;
  const { parentElement } = e;
  const { id } = e.parentElement.parentElement;
  const getTodo = e.parentElement.parentElement.querySelector(".todo-text-div");
  e.parentElement.parentElement.style.backgroundColor = "#EBECF0";
  todoInput.value = getTodo.innerHTML;
  editedId = id;
};

const update = (text) => {
  let copyList = [...todoList];
  copyList.forEach((item) => {
    if (item.id === parseInt(editedId)) {
      item.task = text;
    }
  });
  isEdit = false;
  todoList = copyList;
  todoInput.value = "";
  saveTodo();
  history.go(0);
};

//delete
const deleteTodo = (e) => {
  const { parentElement } = e;
  const { id } = e.parentElement.parentElement;
  parentElement.parentElement.remove();
  todoList = todoList.filter((item) => item.id !== parseInt(id));
  saveTodo();
};

todoForm.addEventListener("submit", makeTodo);
todoForm.addEventListener("submit", makeTodo);

todoBtn.addEventListener("click", makeTodo);
