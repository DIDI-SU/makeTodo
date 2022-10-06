const Form = ({ makeTodo, children, setUserInput, userInput }) => {
  return (
    <form id="makeTodo" className="w-4/5" onSubmit={(e) => makeTodo(e)}>
      <input
        className="w-full"
        type="text"
        placeholder="오늘의 할일을 적어주세요"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      {children}
    </form>
  );
};

export default Form;
