import "./ChatList.css";

const ChatList = ({ chatList }) => {
  return (
    <div className="ChatList">
      {chatList &&
        chatList.map((chatRoom) => {
          return (
            <div key={chatRoom.roomNo}>
              <div className="title">{chatRoom.title}</div>
              <div className="content">{chatRoom.content}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ChatList;
