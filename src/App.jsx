import { useMemo, createContext, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content"; 
import Footer from "./components/Footer";
import Button from "./components/common/Button";

// mockData: 임시 할 일 데이터
const mockData = [
  {
    id: 1,
    title: "오늘 할일 1: 코드 리뷰",
    content: "프론트엔드 코드 리뷰 및 피드백",
    date: new Date().toLocaleDateString()
  },
  {
    id: 2,
    title: "오늘 할일 2: API 연동",
    content: "백엔드 API 연동 작업",
    date: new Date().toLocaleDateString()
  },
  {
    id: 3,
    title: "내일 할일 1: 디자인 미팅",
    content: "UI/UX 디자인 검토 회의",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
  },
  {
    id: 4,
    title: "내일 할일 2: 테스트 코드",
    content: "단위 테스트 코드 작성",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
  }
];

// reducer: 할 일 데이터 CRUD 작업을 처리하는 함수
const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      return state.map((item) =>
        String(action.data.id) === String(item.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.data.id));
    default:
      return state;
  }
};

// 오늘 날짜의 할 일 데이터만 필터링하여 반환
const getTodayData = (state) => {
  const today = new Date().toLocaleDateString();
  return state.filter((item) => item.date === today); // 단일데이터
};

// 내일 날짜의 할 일 데이터만 필터링하여 반환
const getTomorrowData = (state) => {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1)).toLocaleDateString();
  return state.filter((item) => item.date === tomorrow);
};

// Context API를 통해 할 일 데이터를 전역으로 관리
export const TodoContext = createContext();

function App() {
  // useReducer를 사용하여 할 일 데이터 상태 관리
  const [state, dispatch] = useReducer(reducer, mockData);

  // 성능 최적화를 위해 오늘/내일 데이터 메모이제이션
  const today = useMemo(() => getTodayData(state), [state]);
  const tomorrow = useMemo(() => getTomorrowData(state), [state]);

  const contextValue = useMemo(() => ({
    today,
    tomorrow,
    dispatch
  }), [today, tomorrow]);

  return (
    <TodoContext.Provider value={contextValue}>
      <Header />
      <Content />
      <Button type={"ADD bi bi-pencil"} />
      <Footer />
    </TodoContext.Provider>
  );
}

export default App;
