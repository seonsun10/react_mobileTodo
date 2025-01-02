import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useContext, useState, useEffect } from "react";
import { mockDataContext } from "../App";

const TodoList = () => {
  // Context에서 오늘과 내일의 할 일 데이터를 가져옴
  const { today, tomorrow } = useContext(mockDataContext);
  
  // 검색창의 확장 여부를 관리하는 상태
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  // 검색버튼의 표시 여부를 관리하는 상태
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  // 스크롤 이벤트를 감지하여 검색 버튼의 표시 여부를 제어하는 효과
  useEffect(() => {
    const content = document.querySelector('.content_wrapper');
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const currentScrollY = content.scrollTop;
      
      if (currentScrollY === 0) {
        // 최상단일 때
        setIsSearchVisible(true);
        setIsSearchExpanded(true);
      } else if (currentScrollY > lastScrollY) {
        // 아래로 스크롤할 때
        setIsSearchVisible(false);
        setIsSearchExpanded(false);
      } else {
        // 위로 스크롤할 때
        setIsSearchVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    content.addEventListener('scroll', handleScroll);
    return () => content.removeEventListener('scroll', handleScroll);
  }, []);

  // 검색 버튼 클릭 시 검색창 확장/축소 토글
  const handleSearchClick = () => {
    const content = document.querySelector('.content_wrapper');
    if (content.scrollTop !== 0) {
      setIsSearchExpanded(!isSearchExpanded);
    }
  };

  return (
    <div className="TodoList">
      <div className={`search_area ${isSearchVisible ? '' : 'hidden'}`}>
        <div className={`search_container ${isSearchExpanded ? 'expanded' : ''}`}>
          <input 
            type="text" 
            placeholder="검색어를 입력하세요"
            className={`search_input ${isSearchExpanded ? 'expanded' : ''}`}
          />
          <button className="search_button" onClick={handleSearchClick}>
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      
      <div className="today_section">
        <h4>오늘의 할 일!</h4>
        {today && today.length > 0 && (
          <TodoItem
            date={today[0].date}
            items={today}
          />
        )}
      </div>

      <div className="tomorrow_section">
        <h4>내일의 할 일!</h4>
        {tomorrow && tomorrow.length > 0 && (
          <TodoItem
            date={tomorrow[0].date}
            items={tomorrow}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;
