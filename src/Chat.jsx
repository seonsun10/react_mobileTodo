import { useState, useEffect, useRef } from "react";

import ChatList from "./components/ChatList";
import Search from "./components/Search";
import "./Chat.css";

const mockChatList = [
  {
    roomNo: 1,
    title: "개발자들의 방",
    content: "프로그래밍 관련 질문과 답변을 나누는 방입니다.",
  },
  {
    roomNo: 2,
    title: "디자인 토론방",
    content: "디자인 관련 아이디어와 피드백을 공유하는 공간입니다.",
  },
  {
    roomNo: 3,
    title: "게임 개발 방",
    content: "게임 개발에 관한 모든 것을 이야기하는 방입니다.",
  },
  {
    roomNo: 4,
    title: "AI 연구실",
    content: "인공지능과 머신러닝에 대한 연구와 토론을 하는 방입니다.",
  },
  {
    roomNo: 5,
    title: "일상 대화방",
    content: "일상적인 이야기와 소소한 대화를 나누는 방입니다.",
  },
  {
    roomNo: 6,
    title: "영화 추천 방",
    content: "좋은 영화를 추천하고 리뷰를 나누는 방입니다.",
  },
];

const Chat = () => {
  const [chatList, setChatList] = useState(mockChatList);
  const [searchVal, setSearchVal] = useState("");

  //채팅방 검색
  const getSearchChatList = () => {
    if (searchVal === "") {
      return chatList;
    }

    return chatList.filter((item) =>
      item.title.toLowerCase().includes(searchVal.toLowerCase())
    );
  };

  const searchRoomList = getSearchChatList();

  return (
    <div className="Chat searchBox">
      <Search setSearchVal={setSearchVal} targetClassNm={".Chat"} />
      <ChatList chatList={searchRoomList} />
    </div>
  );
};

export default Chat;
