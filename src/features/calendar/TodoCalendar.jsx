import { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./TodoCalendar.css";

const TodoCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const onClickDay = () => {
    console.log("hello");
  }

  return (
    <div className="TodoCalendar">
      <Calendar
        onClickDay={onClickDay}
        onChange={onChange}
        value={date}
        className={"custom-calendar"}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const day = date.getDay();
            if (day === 0) {
              return "sun"; // 일요일은 빨간색
            } else if (day === 6) {
              return "satur"; // 토요일은 파란색
            }
          }
          return null; // 다른 날은 기본 스타일
        }}
      />
    </div>
  );
};

export default TodoCalendar;
