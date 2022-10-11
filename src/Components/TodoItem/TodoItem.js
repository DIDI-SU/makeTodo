import Btn from "../Btn/Btn";

const TODO_BTN = [
  { id: "editBtn", type: "button", className: "", title: "📝", name: "edit" },
  {
    id: "deleteBtn",
    type: "button",
    className: "",
    title: "❌",
    name: "delete",
  },
];
const TodoItem = ({ id, task, isDone, handleTodo }) => {
  return (
    <li className="todo-item-list" draggable="true" id={id}>
      <div className="todo-item-div">
        <input className=" mx-2" type="checkbox" checked={isDone} />
        <div id="todo-text">{task}</div>
      </div>
      <div>
        {TODO_BTN?.map((data) => (
          <Btn children={data} handleTodo={handleTodo} />
        ))}
      </div>
    </li>
  );
};

export default TodoItem;
