import TodoItem from "../TodoItem/TodoItem";
const TodoList = ({ todoLists, handleTodo, updateTodo }) => {
  return (
    <ul id="todoUl" className="w-full">
      {todoLists &&
        todoLists.map(({ id, attributes }) => {
          return (
            <TodoItem
              attributes={attributes}
              id={id}
              handleTodo={handleTodo}
              updateTodo={updateTodo}
            />
          );
        })}
    </ul>
  );
};
export default TodoList;
