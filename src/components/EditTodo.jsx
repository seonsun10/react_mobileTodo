import { useRef, useContext, useState } from "react";
import { TodoContext } from "../App";
import { useNavigate } from "react-router-dom";

import DatePicker, { registerLocale } from "react-datepicker";
import Button from "./Button";
import { ko } from "date-fns/locale"; // 한국어 로케일 가져오기

import "react-datepicker/dist/react-datepicker.css";
import "./EditTodo.css";

// 로케일 등록
registerLocale("ko", ko);

const EditTodo = ({addTodo}) => {
  const { mockData } = useContext(TodoContext);
  const todoId = useRef(mockData.length + 1);
  const [register, setRegister] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const nav = useNavigate();

  const handleClickAdd = () => {
    if (register === "" || title === "" || content === "" || date === "") {
      return;
    }
    const newData = {
      id: todoId.current++,
      register: register,
      title: title,
      content: content,
      date: date.toLocaleDateString(),
    };

    addTodo(newData);

    //입력데이터 초기화
    setRegister("");
    setTitle("");
    setContent("");
    setDate("");

    //등록 후 리스트로 반환
    nav("/");
  };

  return (
    <div className="EditTodo">
      <div>
        <h4>등록자</h4>
        <input
          type="text"
          placeholder="등록자 정보를 입력하세요"
          value={register}
          onChange={(e) => setRegister(e.target.value)}
        />
      </div>
      <div>
        <h4>제목</h4>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <h4>일정</h4>
        <DatePicker
          locale="ko"
          selected={date}
          onChange={(date) => setDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          placeholderText="날짜와 시간을 선택하세요"
          className="datepicker-input" // 커스텀 클래스 추가
        />
      </div>
      <div>
        <h4>내용</h4>
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button text={"등록"} clickBtn={handleClickAdd} type={"REG"} />
    </div>
  );
};

export default EditTodo;
