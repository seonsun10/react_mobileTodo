import "./ChatList.css";

const ChatList = ({ chatList }) => {
  return (
    <div className="ChatList">
      <h4>방 목록</h4>
      <div className="room_section">
        <div className="room_items_container">
          {chatList &&
            chatList.map((chatRoom) => {
              return (
                  <div key={chatRoom.roomNo} className="room">
                    <div className="title">{chatRoom.title}</div>
                    <div className="content">{chatRoom.content}</div>
                    <div className="chatDate">2025-01-09</div>
                  </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ChatList;
