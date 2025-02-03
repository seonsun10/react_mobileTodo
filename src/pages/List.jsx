import TodoList from "../features/todo/TodoList/TodoList";

const List = ({ children }) => {
  return (
    <>
      <TodoList />
      {children}
    </>
  );
};

export default List;
