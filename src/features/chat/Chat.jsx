import { useEffect, useReducer, useState } from "react";

import ChatList from "./ChatList/ChatList";
import Search from "../../components/common/Search/Search";
import "./Chat.css";
import axios from "axios";

const CHATREDUCER_TYPE = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

const chatReducer = (state, action) => {
  switch(action.type){
    case CHATREDUCER_TYPE.CREATE :
      return [...state,action.data];
    case CHATREDUCER_TYPE.UPDATE :
      break;
    case CHATREDUCER_TYPE.DELETE :
      break;
  }
}

const Chat = () => {
  const [chatList, dispatch] = useReducer(chatReducer, []);
  const [searchVal, setSearchVal] = useState("");

  //채팅방 목록 조회
  useEffect(() => {
    async function getChatRoom() {
      const response = await axios.get("/todo/searchChatRoom");
      const data = response.data;
      
      data.map(item=>{
        dispatch({
          type:"CREATE",
          data: item,
        })
      })
    }

    getChatRoom();
  }, []);

  //채팅방 검색
  const getSearchChatList = () => {
    if (searchVal === "") {
      return chatList;
    }

    return chatList.filter((item) =>
      item.roomName.toLowerCase().includes(searchVal.toLowerCase())
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
