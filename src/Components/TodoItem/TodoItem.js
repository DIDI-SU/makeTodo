import Btn from "../Btn/Btn";

const TODO_BTN = [
  { id: "editBtn", type: "button", className: "", title: "📝" },
  { id: "deleteBtn", type: "button", className: "", title: "❌" },
];
const TodoItem = () => {
  return (
    <li class="todo-item-list" draggable="true">
      <div class="todo-item-div">
        <input class=" mx-2" type="checkbox" />
        <div id="todo-text"></div>
      </div>
      <div>
        {TODO_BTN?.map((data) => (
          <Btn children={data} />
        ))}
      </div>
    </li>
  );
};

export default TodoItem;
