import Header from "./Components/Header/Header";
import Main from "./pages/Main/Main";
import { useState, useEffect } from "react";

function App() {
  //임시 로그인
  useEffect(() => {
    localStorage.setItem("USER", JSON.stringify({ userId: 1, isLogin: true }));
  }, []);

  const [todoLists, setTodoLists] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedId, setEditedId] = useState(0);

  useEffect(() => {
    getUserTodo();
  }, []);

  async function getUserTodo() {
    let data = await fetch(`${process.env.REACT_APP_BACKEND}api/to-dos`);
    let userData = await data.json();
    setTodoLists(userData.data);
  }
  console.log(todoLists);
  async function addTodo(body) {
    await fetch(`${process.env.REACT_APP_BACKEND}api/to-dos`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    getUserTodo();
  }

  async function deleteTodo(id) {
    await fetch(`${process.env.REACT_APP_BACKEND}api/to-dos/${id}`, {
      method: "DELETE",
    });
    getUserTodo();
  }

  async function updateTodo(body) {
    await fetch(`${process.env.REACT_APP_BACKEND}api/to-dos/${editedId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    getUserTodo();
  }

  const handleTodo = (e) => {
    const { name } = e.target;
    if (name === "delete") {
      const { id } = e.target.parentNode;
      deleteTodo(id);
      getUserTodo();
    } else if (name === "edit") {
      const { id } = e.target.parentNode;
      setUserInput(
        todoLists.find((item) => item.id === parseInt(id)).attributes.task
      );
      setIsEdit(true);
      setEditedId(parseInt(id));
    }
  };

  return (
    <>
      <Header
        userInput={userInput}
        setUserInput={setUserInput}
        getUserTodo={getUserTodo}
        todoLists={todoLists}
        addTodo={addTodo}
        updateTodo={updateTodo}
        // setTodoLists={setTodoLists}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editedId={editedId}
      />
      <Main todoLists={todoLists} handleTodo={handleTodo} />
    </>
  );
}

export default App;
