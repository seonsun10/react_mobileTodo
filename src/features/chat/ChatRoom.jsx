import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/common/Button/Button";

const ChatRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "나",
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>채팅방 {id}</h2>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === "나" ? "sent" : "received"}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button type="SEND" clickBtn={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;
