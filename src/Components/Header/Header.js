import Form from "../Form/Form";
import Btn from "../Btn/Btn";
const SUBMIT_BTN = {
  id: "makeTodo",
  className: "m-1",
  type: "submit",
  title: "Enter",
  name: "submit",
};
const BTN_DATA = [
  {
    id: "checkAll",
    className: "m-1",
    type: "button",
    title: "All",
    name: "check",
  },
  {
    id: "filterCheck",
    className: "m-1",
    type: "button",
    title: "Filter",
    name: "filter",
  },
];
const Header = ({
  addTodo,
  getUserTodo,
  todoLists,
  setIsEdit,
  isEdit,
  userInput,
  setUserInput,
  editedId,
  updateTodo,
}) => {
  const makeTodo = (e) => {
    e.preventDefault();
    if (!checkBlank(userInput)) {
      alert("내용을 입력해주세요");
      setUserInput("");
    } else {
      if (!isEdit) {
        let newTodo = {
          userId: JSON.parse(localStorage.getItem("USER")).userId,
          task: userInput,
          isCompleted: false,
          taskId: Date.now(),
        };
        let body = { data: { ...newTodo } };
        addTodo(body);
        newTodo = "";
        setUserInput("");
      } else {
        let updatedTodo = {
          userId: JSON.parse(localStorage.getItem("USER")).userId,
          task: userInput,
          isCompleted: false,
          taskId: editedId,
        };
        let body = { data: { ...updatedTodo } };
        console.log(body);
        updateTodo(body);
        setUserInput("");
        setIsEdit(false);
      }
    }
  };

  const checkBlank = (strings) => {
    if (strings.trim().length === 0) {
      return false;
    }
    return strings;
  };

  return (
    <header className="flex items-center justify-between mx-auto max-w-3xl p-5 border-b-2 border-b-[#9ca3af]">
      <Form
        makeTodo={makeTodo}
        setUserInput={setUserInput}
        userInput={userInput}
      >
        <Btn children={SUBMIT_BTN} handleTodo={makeTodo} />
      </Form>
      <div id="btn-box" className="flex items-center justify-evenly">
        {BTN_DATA?.map((data) => (
          <Btn children={data} />
        ))}
      </div>
    </header>
  );
};

export default Header;
