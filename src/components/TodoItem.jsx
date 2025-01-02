const TodoItem = ({ date, items }) => {
  
    return (
      <div className="todo">
        <div className="todo_date">{date}</div>
        <div className="todo_items_container">
          {items.map((item) => (
            <div key={item.id} className="todo_item">
              <div className="todo_item_header">
                <h3 className="todo_title">{item.title}</h3>
              </div>
              <div className="todo_content">{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    );

  // return (
  //   <div className="todo">
  //     <div className="todo_date">{date}</div>
  //     <div className="todo_item">
  //       <div className="todo_item_header">
  //         <h3 className="todo_title">{items.title}</h3>
  //       </div>
  //       <div className="todo_content">{items.content}</div>
  //     </div>
  //   </div>
  // );
};

export default TodoItem;
