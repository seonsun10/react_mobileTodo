import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const nav = useNavigate();

  //로그인 페이지 이동
  function goLogin() {
    nav('/login');
  }

  return (
    <div className="Settings">
      <h4>설정</h4>
      <div className="settingsBox">
        <div>
          <h5>알림 설정</h5>
        </div>
        <div>
          <h5>테마 선택</h5>
        </div>
        <div>
          <h5>언어 선택</h5>
        </div>
        <div>
          <h5>계정 정보</h5>
        </div>
        <div>
          <h5>데이터 백업 및 복원</h5>
        </div>
        <div>
          <h5>도움말 및 지원</h5>
        </div>
        <div onClick={goLogin}>
          <h5>로그인</h5>
        </div>
      </div>
    </div>
  );
};

export default Settings;
