const ChatRoom = ({title, content, chatDate}) => {
  return <div className="room">
  <div className="title">{title}</div>
  <div className="content">{content}</div>
  <div className="chatDate">{chatDate}</div>
</div>
};

export default ChatRoom;
