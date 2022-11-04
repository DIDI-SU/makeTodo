import Form from "../Form/Form";
import Btn from "../Btn/Btn";
import { LoadingContext } from "../../Context/LoadingContext";
import { useContext } from "react";
const SUBMIT_BTN = {
  id: "makeTodo",
  className: "m-1",
  type: "submit",
  title: "Enter",
  name: "submit",
};

const Header = ({
  setIsEdit,
  isEdit,
  userInput,
  setUserInput,
  updateTodo,
  createTodo,
}) => {
  const { editedId } = useContext(LoadingContext);

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
        createTodo(body);
        setUserInput("");
      } else {
        let updatedTodo = {
          userId: JSON.parse(localStorage.getItem("USER")).userId,
          task: userInput,
          isCompleted: false,
          taskId: editedId,
        };
        let body = { data: { ...updatedTodo } };
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
    <header className="flex items-center justify-around mx-auto max-w-3xl p-5 border-b-2 border-b-[#9ca3af]">
      <Form
        makeTodo={makeTodo}
        setUserInput={setUserInput}
        userInput={userInput}
      >
        <Btn children={SUBMIT_BTN} handleTodo={makeTodo} />
      </Form>
    </header>
  );
};

export default Header;
