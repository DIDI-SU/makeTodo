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
const TodoItem = ({ attributes, handleTodo, deleteId }) => {
  const { isCompleted, task, userId } = attributes;
  return (
    <li className="todo-item-list" draggable="true" id={userId}>
      <div className="todo-item-div">
        <input className=" mx-2" type="checkbox" checked={isCompleted} />
        <div id="todo-text">{task}</div>
      </div>
      <div id={deleteId}>
        {TODO_BTN?.map((data) => (
          <Btn children={data} handleTodo={handleTodo} />
        ))}
      </div>
    </li>
  );
};

export default TodoItem;
