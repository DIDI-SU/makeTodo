import TodoItem from "../TodoItem/TodoItem";
const TodoList = ({ todoLists, handleTodo, isDone, setIsDone }) => {
  return (
    <ul id="todoUl" className="w-full">
      {todoLists &&
        todoLists.map(({ id, attributes }) => {
          return (
            <TodoItem
              attributes={attributes}
              id={id}
              handleTodo={handleTodo}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          );
        })}
    </ul>
  );
};
export default TodoList;
