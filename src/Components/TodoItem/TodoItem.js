import Btn from "../Btn/Btn";
import { LoadingContext } from "../../Context/LoadingContext";
import { useContext, useState } from "react";
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
const TodoItem = ({ attributes, handleTodo, id, updateTodo }) => {
  const { editedId, setEditedId } = useContext(LoadingContext);
  const { isCompleted, task } = attributes;
  const [isDone, setIsDone] = useState(isCompleted);

  const handleDone = (ids) => {
    setEditedId(ids);
    if (parseInt(editedId) === parseInt(ids)) {
      setIsDone((prve) => !prve);
      let updatedTodo = {
        userId: JSON.parse(localStorage.getItem("USER")).userId,
        task: task,
        isCompleted: !isDone,
        taskId: editedId,
      };
      let body = { data: { ...updatedTodo } };
      updateTodo(body);
    }
  };

  return (
    <li className="todo-item-list" draggable="true" id={id}>
      <div className="todo-item-div">
        <input
          className=" mx-2"
          type="checkbox"
          checked={isDone}
          onChange={(e) => {
            handleDone(e.target.parentNode.parentNode.id);
          }}
        />
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
