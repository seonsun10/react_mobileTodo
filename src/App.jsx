import { useState, useMemo, createContext, useReducer, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header/Header";
import List from "./pages/List";
import TodoCalendar from "./features/calendar/TodoCalendar";
import Chat from "./features/chat/Chat";
import Settings from "./pages/Settings";
import Footer from "./components/layout/Footer/Footer";
import NewTodo from "./features/todo/EditTodo/NewTodo";
import ChatRoom from "./features/chat/ChatRoom";
import DetailTodo from "./features/todo/EditTodo/DetailTodo";

import axios from "axios";

const REDUCER_TYPE = {
  INIT: "INIT",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

// reducer: 할 일 데이터 CRUD 작업을 처리하는 함수
const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.INIT:
      return action.data;
    case REDUCER_TYPE.CREATE:
      return [action.data,...state];
    case REDUCER_TYPE.UPDATE:
      return state.map((item) =>
        String(action.data.id) === String(item.todoId) ? action.data : item
      );
    case REDUCER_TYPE.DELETE:
      return state.filter((item) => String(item.todoId) !== String(action.data.id));
    default:
      return state;
  }
};

// 오늘 날짜의 할 일 데이터만 필터링하여 반환
const getTodayData = (state) => {
  const today = new Date().toLocaleDateString();

  return state.filter(
    (item) => new Date(item.todoDate).toLocaleDateString() === today
  ); // 단일데이터
};

// 내일 날짜의 할 일 데이터만 필터링하여 반환
const getTomorrowData = (state) => {
  const today = new Date();
  const tomorrow = new Date(
    today.setDate(today.getDate() + 1)
  ).toLocaleDateString();
  return state.filter(
    (item) => new Date(item.todoDate).toLocaleDateString() === tomorrow
  );
};

// Context API를 통해 할 일 데이터를 전역으로 관리
export const TodoContext = createContext();

function App() {
  // useReducer를 사용하여 할 일 데이터 상태 관리
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    async function getUser() {
      const response = await axios.get(`https://running-stace-seonsun10-a588ed5f.koyeb.app/todo/searchTodo`);
      const data = response.data;
      
      dispatch({
        type: "INIT",
        data: data
      });
    }

    getUser();
  }, []);

  // 성능 최적화를 위해 오늘/내일 데이터 메모이제이션
  const today = useMemo(() => getTodayData(todos), [todos]);
  const tomorrow = useMemo(() => getTomorrowData(todos), [todos]);

  const contextValue = useMemo(
    () => ({
      todos,
      today,
      tomorrow,
      dispatch,
    }),
    [todos, today, tomorrow]
  );

  return (
    <TodoContext.Provider value={contextValue}>
      <Header />
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/calendar" element={<TodoCalendar />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/detailTodo/:id" element={<DetailTodo />}></Route>
        <Route path="/newTodo" element={<NewTodo />}></Route>
        <Route path="/room/:id" element={<ChatRoom />}></Route>
      </Routes>
      <Footer />
    </TodoContext.Provider>
  );
}

export default App;
