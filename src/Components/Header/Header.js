import Form from "../Form/Form";
import Btn from "../Btn/Btn";
import { useState } from "react";
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
  todoLists,
  setTodoLists,
  isEdit,
  userInput,
  setUserInput,
  editedId,
}) => {
  const makeTodo = (e) => {
    e.preventDefault();
    if (!checkBlank(userInput)) {
      alert("내용을 입력해주세요");
      setUserInput("");
    } else {
      if (!isEdit) {
        setTodoLists((prve) => [
          {
            id: Date.now(),
            task: userInput,
            isDone: false,
          },
          ...prve,
        ]);
        setUserInput("");
      } else {
        setTodoLists(
          todoLists.map((item) => {
            if (item.id === editedId) {
              return {
                ...item,
                task: userInput,
                isDone: item.isDone,
              };
            } else {
              return item;
            }
          })
        );
        setUserInput("");
        isEdit(false);
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
        <Btn children={SUBMIT_BTN} />
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
