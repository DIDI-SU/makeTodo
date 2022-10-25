import MainContainer from "../../Container/MainContainer/MainContainer";
import TodoList from "../../Components/TodoList/TodoList";
import Nodata from "../../Components/Nodata/Nodata";

const Main = ({ todoLists, handleTodo, isDone, setIsDone }) => {
  return (
    <main>
      <MainContainer>
        {todoLists.length !== 0 ? (
          <TodoList
            todoLists={todoLists}
            handleTodo={handleTodo}
            isDone={isDone}
            setIsDone={setIsDone}
          />
        ) : (
          <Nodata />
        )}
      </MainContainer>
    </main>
  );
};

export default Main;
