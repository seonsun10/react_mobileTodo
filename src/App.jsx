import { useMemo, createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import List from "./List";
import TodoCalendar from "./TodoCalendar";
import Chat from "./Chat";
import Settings from "./Settings";
import Footer from "./components/Footer";
import EditTodo from "./components/EditTodo";
import ChatRoom from "./components/ChatRoom";

// mockData: 임시 할 일 데이터
const mockData = [
  {
    id: 1,
    register:'덕자',
    title: "오늘 할일 1: 코드 리뷰",
    content: "프론트엔드 코드 리뷰 및 피드백",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    register:'풍호',
    title: "오늘 할일 2: API 연동",
    content: "백엔드 API 연동 작업",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    register:'민둥',
    title: "내일 할일 1: 디자인 미팅",
    content: "UI/UX 디자인 검토 회의",
    date: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString(),
  },
  {
    id: 4,
    register:'광식',
    title: "내일 할일 2: 테스트 코드",
    content: "단위 테스트 코드 작성",
    date: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString(),
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
  const tomorrow = new Date(
    today.setDate(today.getDate() + 1)
  ).toLocaleDateString();
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

  const contextValue = useMemo(
    () => ({
      mockData,
      today,
      tomorrow,
      dispatch,
    }),
    [today, tomorrow]
  );

  return (
    <TodoContext.Provider value={contextValue}>
      <Header />
      <Routes>
        <Route path="/" element={<List/>}></Route>
        <Route path="/calendar" element={<TodoCalendar />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/newTodo" element={<EditTodo/>}></Route>
        <Route path="/room/:id" element={<ChatRoom/>}></Route>
      </Routes>
      <Footer />
    </TodoContext.Provider>
  );
}

export default App;
