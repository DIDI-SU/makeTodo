import MainContainer from "../../Container/MainContainer/MainContainer";
import TodoList from "../../Components/TodoList/TodoList";
const Main = ({ todoLists, handleTodo }) => {
  return (
    <main>
      <MainContainer>
        <TodoList todoLists={todoLists} handleTodo={handleTodo} />
      </MainContainer>
    </main>
  );
};

export default Main;
