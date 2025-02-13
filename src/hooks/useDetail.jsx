import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useDetail = (id) => {
  const [todo, setTodo] = useState({});
  const nav = useNavigate();

  // 상세데이터 호출
  useEffect(() => {
    async function getDetail() {
      const response = await axios.get(`https://running-stace-seonsun10-a588ed5f.koyeb.app/todo/searchTodo/${id}`);
      const data = response.data;

      if (!data) {
        alert("해당 페이지가 존재하지 않습니다.");
        nav("/", { replace: true });
      }

      setTodo(data);
    }

    getDetail();
  }, [id]);

  return todo;
};

export default useDetail;
