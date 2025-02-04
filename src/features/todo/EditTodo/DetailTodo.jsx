import { useParams, useNavigate } from "react-router-dom";
import "./EditTodo.css";
import useDetail from "../../../hooks/useDetail";
import DatePicker, { registerLocale } from "react-datepicker";
import { useEffect, useState } from "react";
import Button from "../../../components/common/Button/Button";
import { ko } from "date-fns/locale"; // 한국어 로케일 가져오기
import { useContext } from "react";
import { TodoContext } from "../../../App";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
// 로케일 등록
registerLocale("ko", ko);

const DetailTodo = () => {
  const nav = useNavigate();
  const params = useParams();
  const todo = useDetail(params.id);

  const { dispatch } = useContext(TodoContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [register, setRegister] = useState("");
  const [date, setDate] = useState(null);

  //todo변경될 때 마다 재할당
  useEffect(() => {
    setTitle(todo.title || "");
    setContent(todo.content || "");
    setRegister(todo.register || "");
    setDate(todo.date ? new Date(todo.date) : null);
  }, [todo]);

  //todo삭제
  function handleDeleteTodo() {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    async function deleteTodo() {
      await axios.delete(`/todo/deleteTodo/${params.id}`);
      dispatch({
        type:"DELETE",
        data:{
            id:params.id
        }
      })
      nav("/", { raplace: true });
    }

    deleteTodo();
  }

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
      <div className="BtnBox">
        <Button text={"삭제"} clickBtn={handleDeleteTodo} type={"DEL"} />
        <Button text={"수정"} />
      </div>
    </div>
  );
};

export default DetailTodo;
