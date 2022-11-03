import Header from "./Components/Header/Header";
import Main from "./pages/Main/Main";
import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "./Context/LoadingContext";
import axios from "axios";

function App() {
  //임시 로그인
  useEffect(() => {
    localStorage.setItem("USER", JSON.stringify({ userId: 1, isLogin: true }));
  }, []);

  const [todoLists, setTodoLists] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const { setError, loading, setLoading, editedId, setEditedId } =
    useContext(LoadingContext);

  useEffect(() => {
    getUserTodo();
  }, []);

  //초기값을 get 해오는 함수
  const getUserTodo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/to-dos`
      );
      return setTodoLists(response.data.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  //todo를 만들어주는 함수
  const createTodo = async (body) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/to-dos`,
        { ...body }
      );
      console.log(response.status);
      getUserTodo();
    } catch (e) {
      setError(e);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND}api/to-dos/${todoId}`
      );
      console.log(response.status);
    } catch (e) {
      setError(e);
    }
  };

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
      const { id } = e.target.parentNode.parentNode;
      deleteTodo(id);
      getUserTodo();
    } else if (name === "edit") {
      const { id } = e.target.parentNode.parentNode;
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
        createTodo={createTodo}
        setUserInput={setUserInput}
        getUserTodo={getUserTodo}
        todoLists={todoLists}
        updateTodo={updateTodo}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {loading && (
        <Main
          todoLists={todoLists}
          handleTodo={handleTodo}
          updateTodo={updateTodo}
        />
      )}
    </>
  );
}

export default App;
