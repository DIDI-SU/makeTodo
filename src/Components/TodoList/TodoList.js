const TodoList = ({ children }) => {
  return (
    <section id="todoList" class="todo-section">
      <ul id="todoUl" class="w-full">
        {children}
      </ul>
    </section>
  );
};
export default TodoList;
