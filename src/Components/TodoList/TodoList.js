import TodoItem from "../TodoItem/TodoItem";
const TodoList = ({ todoLists, handleTodo }) => {
  return (
    <ul id="todoUl" className="w-full">
      {todoLists.map(({ id, task, isDone }) => {
        return (
          <TodoItem
            id={id}
            task={task}
            isDone={isDone}
            key={id + "test"}
            handleTodo={handleTodo}
          />
        );
      })}
    </ul>
  );
};
export default TodoList;
