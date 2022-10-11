const Btn = ({ children, handleTodo }) => {
  const { id, className, type, title, name } = children;
  return (
    <button
      name={name}
      id={id}
      className={className}
      type={type}
      key={id + 1}
      onClick={(e) => handleTodo(e)}
    >
      {title}
    </button>
  );
};

export default Btn;
