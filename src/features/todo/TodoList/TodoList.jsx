import { useContext, useState, useMemo } from "react";
import { TodoContext } from "../../../App";
import { useNavigate } from "react-router-dom";

import TodoItem from "../TodoItem/TodoItem";
import Search from "../../../components/common/Search/Search";
import Button from "../../../components/common/Button/Button";

import "./TodoList.css";

const TodoList = () => {
  // Context에서 오늘과 내일의 할 일 데이터를 가져옴
  const { today, tomorrow } = useContext(TodoContext);

  // 페이지 이동
  const nav = useNavigate();

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

  // useMemo를 사용하여 리렌더링 최적화
  const [todayData, tomorrowData] = useMemo(
    () => getSearchTodoData(),
    [searchVal, today, tomorrow]
  );

  return (
    <>
      <div className="content_wrapper searchBox">
        <Search
          setSearchVal={setSearchVal}
          targetClassNm={".content_wrapper"}
        />
        <div className="TodoList">
          <div className="today_section">
            <h4>오늘의 할 일!</h4>
            {today && today.length > 0 && (
              <TodoItem todoDate={today[0].todoDate} items={todayData} />
            )}
          </div>

          <div className="tomorrow_section">
            <h4>내일의 할 일!</h4>
            {tomorrow && tomorrow.length > 0 && (
              <TodoItem todoDate={tomorrow[0].todoDate} items={tomorrowData} />
            )}
          </div>
        </div>
      </div>
      <Button
        type={"ADD bi bi-pencil"}
        clickBtn={() => {
          nav("/newTodo");
        }}
      />
    </>
  );
};

export default TodoList;
