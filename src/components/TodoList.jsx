import { useContext, useState } from "react";
import { TodoContext } from "../App";

import TodoItem from "./TodoItem";
import Search from "./Search";

import "./TodoList.css";

const TodoList = () => {
  // Context에서 오늘과 내일의 할 일 데이터를 가져옴
  const { today, tomorrow } = useContext(TodoContext);

  // 검색어 처리
  const [searchVal, setSearchVal] = useState("");


  // 검색 해당 데이터 조회
  const getSearchTodoData = () => {
    if (searchVal === "") {
      return [today, tomorrow];
    }
    const searchToday = today.filter((item) => {
      return item.title.toLowerCase().includes(searchVal.toLowerCase());
    });
    const searchTomorrow = tomorrow.filter((item) => {
      return item.title.toLowerCase().includes(searchVal.toLowerCase());
    });

    return [searchToday, searchTomorrow];
  };

  const todayData = getSearchTodoData()[0];
  const tomorrowData = getSearchTodoData()[1];



  return (
    <div className="content_wrapper searchBox">
      <Search setSearchVal={setSearchVal} targetClassNm={".content_wrapper"}/>
      <div className="TodoList">
        <div className="today_section">
          <h4>오늘의 할 일!</h4>
          {today && today.length > 0 && (
            <TodoItem date={today[0].date} items={todayData} />
          )}
        </div>

        <div className="tomorrow_section">
          <h4>내일의 할 일!</h4>
          {tomorrow && tomorrow.length > 0 && (
            <TodoItem date={tomorrow[0].date} items={tomorrowData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
