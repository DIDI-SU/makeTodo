import MainContainer from "../../Container/MainContainer/MainContainer";
import TodoList from "../../Components/TodoList/TodoList";
import TodoItem from "../../Components/TodoItem/TodoItem";
const Main = () => {
  return (
    <main>
      <MainContainer>
        <TodoList>
          <TodoItem />
        </TodoList>
      </MainContainer>
    </main>
  );
};

export default Main;
