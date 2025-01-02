import "./Content.css";
import TodoList from "./TodoList";

const Content = () => {
  // 메인 컨텐츠 영역: TodoList 컴포넌트를 감싸는 스크롤 가능한 컨테이너
  return (
    <div className="content_wrapper">
      <TodoList />
    </div>
  );
};

export default Content;
