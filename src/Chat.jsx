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

  return (
    <div className="Chat searchBox">
      <Search setSearchVal={setSearchVal} targetClassNm={".Chat"} />
      <ChatList chatList={chatList} />
    </div>
  );
};

export default Chat;
