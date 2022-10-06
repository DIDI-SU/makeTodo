import Form from "../Form/Form";
import Btn from "../Btn/Btn";
import { useEffect, useState } from "react";
const SUBMIT_BTN = {
  id: "makeTodo",
  className: "m-1",
  type: "submit",
  title: "Enter",
};
const BTN_DATA = [
  { id: "checkAll", className: "m-1", type: "button", title: "All" },
  { id: "filterCheck", className: "m-1", type: "button", title: "Filter" },
];
const Header = () => {
  const [userInput, setUserInput] = useState("");
  const [todoLists, setTodoLists] = useState([]);

  const makeTodo = (e) => {
    e.preventDefault();
    if (!checkBlank(userInput)) {
      alert("내용을 입력해주세요");
      setUserInput("");
    } else {
      setTodoLists((prve) => [
        {
          id: Date.now(),
          task: userInput,
          isDone: false,
        },
        ...prve,
      ]);
      setUserInput("");
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
      <div className="flex items-center justify-evenly w-4/5">
        <h2 className="text-3xl font-bold text-[#3D4451]">ToDo :</h2>
        <Form
          makeTodo={makeTodo}
          setUserInput={setUserInput}
          userInput={userInput}
        >
          <Btn children={SUBMIT_BTN} />
        </Form>
      </div>
      <div id="btn-box" className="flex items-center justify-evenly">
        {BTN_DATA?.map((data) => (
          <Btn children={data} />
        ))}
      </div>
    </header>
  );
};

export default Header;
