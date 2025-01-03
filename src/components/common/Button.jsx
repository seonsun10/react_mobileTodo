import "./Button.css";

const Button = ({ text, type }) => {
  // 재사용 가능한 버튼 컴포넌트: ADD 버튼 등에 사용
  return (
    <div className="ButtonArea">
      <button className={`Button Button_${type}`}>{text}</button>
    </div>
  );
};

export default Button;
