import TodoItem from "../TodoItem/TodoItem";
const TodoList = ({ todoLists, handleTodo }) => {
  return (
    <ul id="todoUl" className="w-full">
      {todoLists &&
        todoLists.map(({ id, attributes }) => {
          return (
            <TodoItem
              attributes={attributes}
              deleteId={id}
              handleTodo={handleTodo}
            />
          );
        })}
    </ul>
  );
};
export default TodoList;
