const todoForm = document.querySelector("#makeTodo");
const todoInput = todoForm.querySelector("input");
//todoList
const todoListBox = document.querySelector("#todoList");
const todoUl = todoListBox.querySelector("#todoUl");
//heratBtn
const btnBox = document.querySelector("#btn-box");
//doneCounter
const doneSection = document.querySelector("#done-section");

let editedId = "";
let todoList = [];
let isEdit = false;
let count = 0;
let ul = "";

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
      paintTodo(todoList);
      saveTodo();
    } else updateTodo(inputString);
  }
};

const paintTodo = (todoLists) => {
  const counterP = doneSection.querySelector("#count");
  todoUl.innerHTML = "";
  todoLists.forEach(({ id, task, isDone }) => {
    return (todoUl.innerHTML += `
  <li class="todo-item-list" id="${id}" draggable="true" >
      <div class="todo-item-div">
        <input class=" mx-2" type="checkbox" ${
          isDone && "checked"
        }  onclick="completeTodo(this)"/>
        <div id="todo-text" class="${isDone && "todo-text-div"}">${task}</div>
      </div>
    <div>
    <button onclick="updateReadyTodo(this)" type="button" >📝</button>
    <button onclick="deleteTodo(this)"  type="button">❌</button>
    </div>
    </li>`);
  });

  let copyArray = [...todoLists];
  let length = copyArray.filter(({ isDone }) => isDone === true).length;
  counterP.innerText = length + "개";
};

if (todoItems !== null) {
  let storageItems = JSON.parse(localStorage.getItem("todo"));
  todoList = storageItems;
  paintTodo(todoList);
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
  paintTodo(todoList);
};

//delete
const deleteTodo = (e) => {
  const { parentElement } = e;
  const { id } = e.parentElement.parentElement;
  parentElement.parentElement.remove();
  todoList = todoList.filter((item) => item.id !== parseInt(id));
  saveTodo();
  paintTodo(todoList);
};

//todoList전체 완료 혹은 전체 취소
const btnHandler = (e) => {
  const { id } = e.target;
  if (id === "checkAll") {
    todoList.forEach((item) => (item.isDone = true));
  } else {
    todoList.sort((a, b) => b.isDone - a.isDone);
  }
  saveTodo();
  paintTodo(todoList);
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
  paintTodo(todoList);
};

//filter

todoForm.addEventListener("submit", makeTodo);
btnBox.addEventListener("click", btnHandler);
