import Header from "./Components/Header/Header";
import Main from "./pages/Main/Main";
import { useState, useEffect } from "react";

function App() {
  //임시 로그인
  useEffect(() => {
    localStorage.setItem("USER", JSON.stringify({ userId: 1, isLogin: true }));
  }, []);

  const user = JSON.parse(localStorage.getItem("USER"));

  const [todoLists, setTodoLists] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedId, setEditedId] = useState(0);

  async function getUserTodo() {
    let data = await fetch(`${process.env.REACT_APP_BACKEND}api/to-dos`);
    let userData = await data.json();
    setTodoLists(userData.data);
  }

  useEffect(() => {
    getUserTodo();
  }, []);

  async function deleteTodo(id) {
    await fetch(`${process.env.REACT_APP_BACKEND}api/to-dos/${id}`, {
      method: "DELETE",
    });
    console.log(todoLists);
  }

  async function updateTodo(id) {
    const oldTodo = todoLists.find((item) => parseInt(item.userId) === id);
    let data = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        id: oldTodo.id,
        title: oldTodo.title,
        completed: oldTodo.completed,
        userId: oldTodo.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  const handleTodo = (e) => {
    const { name } = e.target;
    if (name === "delete") {
      const { id } = e.target.parentNode;
      deleteTodo(id);
      getUserTodo();
    } else if (name === "edit") {
      const { id } = e.target.parentNode.parentNode;

      setUserInput(todoLists.find((item) => item.id === parseInt(id)).title);
      setIsEdit(true);
      setEditedId(parseInt(id));
    }
  };

  return (
    <>
      <Header
        userInput={userInput}
        setUserInput={setUserInput}
        todoLists={todoLists}
        updateTodo={updateTodo}
        setTodoLists={setTodoLists}
        isEdit={isEdit}
        editedId={editedId}
      />
      <Main todoLists={todoLists} handleTodo={handleTodo} />
    </>
  );
}

export default App;
