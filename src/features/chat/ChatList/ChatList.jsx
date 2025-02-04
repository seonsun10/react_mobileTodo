import { useNavigate } from "react-router-dom";

import "./ChatList.css";

const ChatList = ({ chatList }) => {
  const nav = useNavigate();

  const handleClickRoom = (roomNo) => {
    nav("/room/"+roomNo)
  }

  return (
    <div className="ChatList">
      <h4>방 목록</h4>
      <div className="room_section">
        <div className="room_items_container">
          {chatList &&
            chatList.map((chatRoom) => {
              return (
                <div key={`room_${chatRoom.roomNo}`} className="room" onClick={()=>handleClickRoom(chatRoom.roomNo)}>
                  <div className="title">{chatRoom.roomName}</div>
                  <div className="content">{chatRoom.lastChat}</div>
                  <div className="chatDate">{chatRoom.createDate}</div>
                </div>
              );
            })}
          {chatList.length === 0 && (
            <div className="room">방이 존재하지 않습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
