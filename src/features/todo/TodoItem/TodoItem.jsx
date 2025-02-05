import { useNavigate } from "react-router-dom";

const TodoItem = ({ date, items, todoDetail }) => {

  const nav = useNavigate();

  return (
    <div className="todo">
      <div className="todo_date">{date}</div>
      <div key={'todo_items_container'} className="todo_items_container">
        {items.length === 0 ? (
          <div className="noData">할 일이 없습니다!</div>
        ) : (
          items.map((item) => (
            <div 
              key={item.todoId} 
              className="todo_item" 
              onClick={() => nav(`/detailTodo/${item.todoId}`)}
            >
              <div className="todo_item_header">
                <h3 className="todo_title">{item.title}</h3>
              </div>
              <div className="todo_content">{item.content}</div>
              <div className="register">{item.register}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoItem;
