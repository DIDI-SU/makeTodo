const TodoList = ({ children }) => {
  return (
    <section id="todoList" className="todo-section">
      <ul id="todoUl" className="w-full">
        {children}
      </ul>
    </section>
  );
};
export default TodoList;
