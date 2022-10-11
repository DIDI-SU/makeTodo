import Header from "./Components/Header/Header";
import Main from "./pages/Main/Main";
import { useState, useEffect } from "react";
function App() {
  const [todoLists, setTodoLists] = useState(() => {
    const init = localStorage.getItem("TODO");
    if (init) {
      return JSON.parse(init);
    }
    return [];
  });
  const [userInput, setUserInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedId, setEditedId] = useState(0);

  useEffect(() => {
    localStorage.setItem("TODO", JSON.stringify(todoLists));
  }, [todoLists]);

  const handleTodo = (e) => {
    const { name } = e.target;
    if (name === "delete") {
      const { id } = e.target.parentNode.parentNode;
      setTodoLists(todoLists.filter((item) => item.id !== parseInt(id)));
    } else if (name === "edit") {
      const { id } = e.target.parentNode.parentNode;
      setUserInput(todoLists.find((item) => item.id === parseInt(id)).task);
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
        setTodoLists={setTodoLists}
        isEdit={isEdit}
        editedId={editedId}
      />
      <Main todoLists={todoLists} handleTodo={handleTodo} />
    </>
  );
}

export default App;
