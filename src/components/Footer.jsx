import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const nav = useNavigate();

  // 하단 네비게이션 바: 메뉴, 캘린더, 채팅, 설정 아이콘 포함
  return (
    <div className="Footer">
      <ul className="horizontal_menu">
        <li onClick={()=>nav('/')}>
          <i className="bi bi-list"></i>
        </li>
        <li onClick={()=>nav('/calendar')}>
          <i className="bi bi-calendar2-check"></i>
        </li>
        <li onClick={()=>nav('/chat')}>
          <i className="bi bi-chat-dots"></i>
        </li>
        <li onClick={()=>nav('/settings')}>
          <i className="bi bi-gear"></i>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
