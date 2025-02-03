import "./Button.css";


const Button = ({ text, type, clickBtn }) => {

  const handleClickBtn = () => {
    clickBtn();
  }


  // 재사용 가능한 버튼 컴포넌트
  return (
    <div className="ButtonArea">
      <button onClick={handleClickBtn} className={`Button Button_${type}`}>{text}</button>
    </div>
  );
};

export default Button;
