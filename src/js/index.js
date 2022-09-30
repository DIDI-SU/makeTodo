const todoForm = document.querySelector("#makeTodo");
const todoInput = todoForm.querySelector("input");
//todoList
const todoListBox = document.querySelector("#todoList");
const todoUl = todoListBox.querySelector("#todoUl");
const checkedBox = todoUl.querySelectorAll("#checkedbox");
const todoItem = todoUl.querySelector(".todo-item-div");
//heratBtn
const btnBox = document.querySelector("#btn-box");
const todoBtn = btnBox.querySelector("#makeToDoBtn");
const checkedAll = btnBox.querySelector("#checkAll");
const filterBtn = btnBox.querySelector("#filterCheck");

const todoCount = document.querySelector("#todoCount");

let editedId = "";
let todoList = [];
let isEdit = false;

const todoItems = JSON.parse(localStorage.getItem("todo")) || null;

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
  if (!checkBlank(inputString)) {
    alert("내용을 입력해주세요");
    todoInput.value = "";
  } else {
    if (!isEdit) {
      todoInput.value = "";
      const newTodo = {
        id: Date.now(),
        task: inputString,
        isDone: false,
      };
      todoList.push(newTodo);
      showTodo(newTodo);
      saveTodo();
    } else updateTodo(inputString);
  }
};

const renderTodo = (todoLists) => {
  todoUl.innerHTML = "";
  console.log(todoLists);
  todoLists.forEach(({ id, task, isDone }) => {
    return (todoUl.innerHTML += `<li class="todo-item-list"  id=${id}>
    <div class="todo-item-div">
      <input class=" mx-2" type="checkbox" ${
        isDone && "checked"
      }  onclick="completeTodo(this)"/>
      <div class="${isDone && "todo-text-div"}">${task}</div>
    </div>
  <div>
  <button onclick="updateReadyTodo(this)" type="button" >📝</button>
  <button onclick="deleteTodo(this)"  type="button">❌</button>
  </div>
  </li>`);
  });
};

//만든 todo 보여주기
const showTodo = (newTodos) => {
  const { id, task, isDone } = newTodos;
  let todoComponent = `<li class="todo-item-list"  id=${id}>
    <div class="todo-item-div">
      <input class=" mx-2" type="checkbox" ${
        isDone && "checked"
      }  onclick="completeTodo(this)"/>
      <div id="todo-text"  class="${isDone && "todo-text-div"}">${task}</div>
    </div>
  <div>
  <button onclick="updateReadyTodo(this)" type="button" >📝</button>
  <button onclick="deleteTodo(this)"  type="button">❌</button>
  </div>
  </li>`;

  todoUl.innerHTML += todoComponent;
};

if (todoItems !== null) {
  let storageItems = JSON.parse(localStorage.getItem("todo"));
  todoList = storageItems;
  storageItems.forEach(showTodo);
}

//todo update ready
const updateReadyTodo = (e) => {
  isEdit = true;
  const { id } = e.parentElement.parentElement;
  const getTodo = e.parentElement.parentElement.querySelector("#todo-text");

  e.parentElement.parentElement.style.backgroundColor = "#EBECF0";
  todoInput.value = getTodo.innerHTML;
  editedId = id;
};

const updateTodo = (text) => {
  todoList.forEach((item) => {
    if (item.id === parseInt(editedId)) {
      item.task = text;
    }
  });
  isEdit = false;
  editedId = "";
  todoInput.value = "";
  saveTodo();
  renderTodo(todoList);
};

//delete
const deleteTodo = (e) => {
  const { parentElement } = e;
  const { id } = e.parentElement.parentElement;
  parentElement.parentElement.remove();
  todoList = todoList.filter((item) => item.id !== parseInt(id));
  saveTodo();
};

//todoList전체 완료 혹은 전체 취소
const checkAll = () => {
  todoList.forEach((item) => (item.isDone = true));
  saveTodo();
  renderTodo(todoList);
};

//todo 일부 체크 기능
const completeTodo = (e) => {
  const { id } = e.parentElement.parentElement;
  todoList.forEach((item) => {
    if (item.id === parseInt(id)) {
      item.isDone = !item.isDone;
    }
  });
  saveTodo();
  renderTodo(todoList);
};

//filter
const filterTodo = () => {
  todoList.sort((a, b) => b.isDone - a.isDone);
  saveTodo();
  renderTodo(todoList);
};

todoForm.addEventListener("submit", makeTodo);
todoForm.addEventListener("submit", makeTodo);
todoBtn.addEventListener("click", makeTodo);
checkedAll.addEventListener("click", checkAll);
filterBtn.addEventListener("click", filterTodo);
