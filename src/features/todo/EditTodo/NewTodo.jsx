import { useRef, useContext, useState } from "react";
import { TodoContext } from "../../../App";
import { useNavigate } from "react-router-dom";

import DatePicker, { registerLocale } from "react-datepicker";
import Button from "../../../components/common/Button/Button";
import { ko } from "date-fns/locale"; // 한국어 로케일 가져오기

import "react-datepicker/dist/react-datepicker.css";
import "./EditTodo.css";

// 로케일 등록
registerLocale("ko", ko);

const NewTodo = () => {
  const { dispatch, todos } = useContext(TodoContext);
  const todoId = useRef(todos.length + 1);
  const [register, setRegister] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [regDttm, setRegDttm] = useState("");

  const nav = useNavigate();

  // 저장
  const handleClickAdd = () => {
    if (register === "" || title === "" || content === "" || regDttm === "") {
      return;
    }
    if (!confirm("일정을 등록하시겠습니까?")) {
      return;
    }


    const newData = {
      id: todoId.current++,
      register: register,
      title: title,
      content: content,
      regDttm: date.toLocaleDateString(),
    };

    dispatch({
      type: "CREATE",
      data: newData,
    });

    //입력데이터 초기화
    setRegister("");
    setTitle("");
    setContent("");
    setRegDttm("");

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
          onChange={(date) => setRegDttm(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하세요"
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

export default NewTodo;
