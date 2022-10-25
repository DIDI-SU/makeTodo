const Btn = ({ children, handleTodo }) => {
  const { className, type, title, name, id } = children;

  return (
    <button
      name={name}
      key={id}
      className={className}
      type={type}
      onClick={(e) => handleTodo(e)}
    >
      {title}
    </button>
  );
};

export default Btn;
