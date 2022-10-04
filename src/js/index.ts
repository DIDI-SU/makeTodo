//인터페이스로 받아줄 todo를 만들어 주면 되지 않을까?
//인터페이스하고 타입의 차이가뭐지
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
let todoList: object[] = [];

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
    const newTodo: Validate = { id: Date.now(), task: task, isDone: false };
    todoList.push(newTodo);
    todoInput.value = "";
    paintTodo(todoList);
  }
};

//renderTodo
//경우
//1. 새로 만들어지는 경우 => 전체가 다시 필요는 없어 : 그러면 이경우는 제외해도 ㅇㅋ?
//2. 수정되는 경우
//3. 삭제 되는 경우
//4. 순번이 바뀌는 경우
//어차피 지금 리스트를 리턴해주니까 그냥 받아서  렌더랑 같이해도 갠춘을것 같음

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

todoForm.addEventListener("submit", sumbitTodo);
