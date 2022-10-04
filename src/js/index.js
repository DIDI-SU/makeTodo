"use strict";
const todoForm = document.querySelector("#makeTodo");
const todoInput = todoForm.querySelector("input");
//todoList
const todoListBox = document.querySelector("section");
const todoUl = todoListBox.querySelector("ul");
let isEdit = false;
let todoList = [];
let editedId = "";
//todo저장
const saveTodo = () => {
    localStorage.setItem("TODO", JSON.stringify(todoList));
};
const todoItems = localStorage.getItem("TODO");
//todo빈값확인
const checkStirings = (text) => {
    if (text.trim().length === 0) {
        return true;
    }
    return false;
};
//make todo
// 리턴이 없어서 void인건가?
const sumbitTodo = (e) => {
    e.preventDefault();
    const task = todoInput.value;
    if (checkStirings(task)) {
        alert("내용을 입력해주세요");
        todoInput.value = "";
    }
    else {
        if (!isEdit) {
            const newTodo = { id: Date.now(), task: task, isDone: false };
            todoList.push(newTodo);
            todoInput.value = "";
            saveTodo();
            paintTodo(todoList);
        }
        else {
            updateTodo(task);
        }
    }
};
//renderTodo
//경우
//1. 새로 만들어지는 경우 => 전체가 다시 필요는 없어 : 그러면 이경우는 제외해도 ㅇㅋ?
//2. 수정되는 경우
//3. 삭제 되는 경우
//4. 순번이 바뀌는 경우
//어차피 지금 리스트를 리턴해주니까 그냥 받아서  렌더랑 같이해도 갠춘을것 같음
const paintTodo = (todoLists) => {
    todoUl.innerHTML = "";
    todoLists.forEach((item) => {
        const { id, isDone, task } = item;
        return (todoUl.innerHTML += `<li class="todo-item-list"  id=${id}>
      <div class="todo-item-div">
        <input class=" mx-2" type="checkbox" ${isDone && "checked"}  onclick="completeTodo(this)"/>
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
const updateReadyTodo = (e) => {
    var _a;
    isEdit = true;
    const parentElements = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const getTodo = parentElements === null || parentElements === void 0 ? void 0 : parentElements.querySelector("#todo-text");
    todoInput.value = getTodo.innerText;
    editedId = parentElements.id;
};
//todo update
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
todoForm.addEventListener("submit", sumbitTodo);
