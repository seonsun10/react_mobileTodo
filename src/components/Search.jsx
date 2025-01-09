import { useState, useEffect } from "react";

import "./Search.css"

const Search = ({setSearchVal, targetClassNm}) => {


  // 검색창의 확장 여부를 관리하는 상태
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  // 검색버튼의 표시 여부를 관리하는 상태
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  // 스크롤 이벤트를 감지하여 검색 버튼의 표시 여부를 제어하는 효과
  useEffect(() => {
    const content = document.querySelector(targetClassNm);
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

    content.addEventListener("scroll", handleScroll);
    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  // 검색 버튼 클릭 시 검색창 확장/축소 토글
  const handleSearchClick = () => {
    const content = document.querySelector(targetClassNm);
    if (content.scrollTop !== 0) {
      setIsSearchExpanded(!isSearchExpanded);
    }
  };

  // 검색어 저장
  const handleChangeSearch = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className={`search_area ${isSearchVisible ? "" : "hidden"}`}>
      <div className={`search_container ${isSearchExpanded ? "expanded" : ""}`}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className={`search_input ${isSearchExpanded ? "expanded" : ""}`}
          onChange={handleChangeSearch}
        />
        <button className="search_button" onClick={handleSearchClick}>
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default Search;
