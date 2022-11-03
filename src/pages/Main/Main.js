import MainContainer from "../../Container/MainContainer/MainContainer";
import TodoList from "../../Components/TodoList/TodoList";
import Nodata from "../../Components/Nodata/Nodata";

const Main = ({ todoLists, handleTodo, updateTodo }) => {
  return (
    <main>
      <MainContainer>
        {todoLists.length !== 0 ? (
          <TodoList
            todoLists={todoLists}
            handleTodo={handleTodo}
            updateTodo={updateTodo}
          />
        ) : (
          <Nodata />
        )}
      </MainContainer>
    </main>
  );
};

export default Main;
