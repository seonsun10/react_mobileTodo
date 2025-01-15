import "./ChatList.css";
import ChatRoom from "./ChatRoom";

const ChatList = ({ chatList }) => {
  return (
    <div className="ChatList">
      <h4>방 목록</h4>
      <div className="room_section">
        <div className="room_items_container">
          {chatList &&
            chatList.map((chatRoom) => {
              return <ChatRoom key={chatRoom.roomNo} {...chatRoom} />;
            })}
          {chatList.length === 0 && <ChatRoom title={"방이 없습니다."} />}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
