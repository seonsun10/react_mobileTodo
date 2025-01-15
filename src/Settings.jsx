import "./Settings.css"

const Settings = () => {
  return (
    <div className="Settings">
      <h4>설정</h4>
      <div className="settingsBox">
        <div className="settingItem">
          <h5>알림 설정</h5>
        </div>
        <div className="settingItem">
          <h5>테마 선택</h5>
        </div>
        <div className="settingItem">
          <h5>언어 선택</h5>
        </div>
        <div className="settingItem">
          <h5>계정 정보</h5>
        </div>
        <div className="settingItem">
          <h5>데이터 백업 및 복원</h5>
        </div>
        <div className="settingItem">
          <h5>도움말 및 지원</h5>
        </div>
      </div>
    </div>
  );
};

export default Settings;
