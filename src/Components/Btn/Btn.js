const Btn = ({ children }) => {
  const { id, className, type, title } = children;
  return (
    <button id={id} className={className} type={type}>
      {title}
    </button>
  );
};

export default Btn;
