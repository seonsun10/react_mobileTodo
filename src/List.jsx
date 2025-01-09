import TodoList from "./components/TodoList";

const List = ({ children }) => {
  return (
    <>
      <TodoList />
      {children}
    </>
  );
};

export default List;
