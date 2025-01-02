import { useMemo, createContext, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content"; 
import Footer from "./components/Footer";
import Button from "./components/Button";

// mockData: 임시 할 일 데이터
const mockData = [
  {
    id: 0,
    title: "12월 15일의 Todo제목입니다.",
    content: "1215TodoContent",
    date: new Date("2024-12-15").toLocaleDateString(),
  },
  {
    id: 1,
    title: "1월 2일의 Todo제목입니다.", 
    content: "1231TodoContent",
    date: new Date("2025-1-2").toLocaleDateString(),
  },
  {
    id: 2,
    title: "내일 할 일 1: 프로젝트 기획안 작성",
    content: "신규 프로젝트의 기획안 초안 작성하고 팀원들과 공유하기",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString(),
  },
  {
    id: 3,
    title: "내일 할 일 2: 팀 미팅 준비",
    content: "오후 2시 팀 미팅 발표자료 준비 및 회의록 정리",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString(),
  },
  {
    id: 4,
    title: "내일 할 일 3: 운동가기",
    content: "헬스장 PT 세션 참석 (가슴/어깨 운동)",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString(),
  },
  {
    id: 5,
    title: "1월 12일의 Todo제목입니다.",
    content: "112TodoContent",
    date: new Date("2025-01-12").toLocaleDateString(),
  },
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
export const mockDataContext = createContext();

function App() {
  // useReducer를 사용하여 할 일 데이터 상태 관리
  const [state, dispatch] = useReducer(reducer, mockData);

  // 성능 최적화를 위해 오늘/내일 데이터 메모이제이션
  const today = useMemo(() => getTodayData(state), [state]);
  const tomorrow = useMemo(() => getTomorrowData(state), [state]);

  const contextValue = useMemo(() => ({
    today,
    tomorrow
  }), [today, tomorrow]);

  return (
    <>
      <div>
        <mockDataContext.Provider value={contextValue}>
          <Header />
          <Content />
          <Button type={"ADD bi bi-pencil"} />
          <Footer />
        </mockDataContext.Provider>
      </div>
    </>
  );
}

export default App;
