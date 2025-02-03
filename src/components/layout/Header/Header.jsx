import "./Header.css";
import Button from "../../common/Button/Button";

const Header = () => {
  // 헤더 영역: 배경 이미지, 날짜 표시, 편집 버튼 포함
  return (
    <div className="Header">
      <img src="https://png.pngtree.com/thumb_back/fw800/background/20230922/pngtree-blue-sky-with-clouds-wallpapers-image_13315602.jpg" />
      <Button type="EDIT bi bi-pencil" />
      <div className="section_today">{new Date().toLocaleDateString()}</div>
    </div>
  );
};

export default Header;
