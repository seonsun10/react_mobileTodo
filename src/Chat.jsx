import { useState, useEffect, useRef } from "react";

import ChatList from "./components/ChatList";
import Search from "./components/Search";
import "./Chat.css";

const mockChatList = [
  {
    roomNo: 1,
    title: "1번째 방",
    content: "1번 내용",
  },
  {
    roomNo: 2,
    title: "2번째 방",
    content: "2번 내용",
  },
  {
    roomNo: 3,
    title: "3번째 방",
    content: "3번 내용",
  },
  {
    roomNo: 4,
    title: "4번째 방",
    content: "4번 내용",
  },
  {
    roomNo: 5,
    title: "5번째 방",
    content: "5번 내용",
  },
  {
    roomNo: 6,
    title: "6번째 방",
    content: "6번 내용",
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
