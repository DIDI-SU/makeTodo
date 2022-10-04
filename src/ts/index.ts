interface Validate {
  id: number | object;
  task: string;
  isDone: boolean;
}

const todoForm: HTMLFormElement = document.querySelector("#makeTodo")!;
const todoInput: HTMLInputElement = todoForm.querySelector("input")!;
//todoList
const todoListBox = document.querySelector("section") as HTMLElement;
const todoUl = todoListBox.querySelector("ul") as HTMLUListElement;
let isEdit = false;
let todoList: object[] = [];
let editedId: string = "";
//todo저장
const saveTodo = () => {
  localStorage.setItem("TODO", JSON.stringify(todoList));
};
const todoItems = localStorage.getItem("TODO");

//todo빈값확인
const checkStirings = (text: string): boolean | void => {
  if (text.trim().length === 0) {
    return true;
  }
  return false;
};

//make todo
// 리턴이 없어서 void인건가?
const sumbitTodo = (e: Event): object[] | void => {
  e.preventDefault();
  const task = todoInput.value;
  if (checkStirings(task)) {
    alert("내용을 입력해주세요");
    todoInput.value = "";
  } else {
    if (!isEdit) {
      const newTodo: Validate = { id: Date.now(), task: task, isDone: false };
      todoList.push(newTodo);
      todoInput.value = "";
      saveTodo();
      paintTodo(todoList);
    } else {
      updateTodo(task);
    }
  }
};

//renderTodo
const paintTodo = (todoLists: object[]) => {
  todoUl.innerHTML = "";
  todoLists.forEach((item: any) => {
    const { id, isDone, task } = item;
    return (todoUl.innerHTML += `<li class="todo-item-list"  id=${id}>
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
};

if (todoItems) {
  let storageItems = JSON.parse(todoItems);
  todoList = storageItems;
  paintTodo(storageItems);
}

//버튼눌러서 updtae 준비하기
//todo update ready
const updateReadyTodo = (e: Node) => {
  isEdit = true;
  const parentElements = e.parentElement?.parentElement as HTMLLIElement;
  const getTodo = parentElements?.querySelector("#todo-text") as HTMLDivElement;
  todoInput.value = getTodo.innerText;
  editedId = parentElements.id;
};

//todo update
const updateTodo = (text: string) => {
  todoList.forEach((item: any) => {
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
const deleteTodo = (e: Node) => {
  const parentElements = e.parentElement?.parentElement as HTMLLIElement;
  parentElements.remove();
  todoList = todoList.filter(
    (item: any) => item.id !== parseInt(parentElements.id)
  );
  saveTodo();
};

todoForm.addEventListener("submit", sumbitTodo);
