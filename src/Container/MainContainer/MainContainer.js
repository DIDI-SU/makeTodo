const MainContainer = ({ children }) => {
  return (
    <section id="todoList" className="todo-section">
      {children}
    </section>
  );
};

export default MainContainer;
