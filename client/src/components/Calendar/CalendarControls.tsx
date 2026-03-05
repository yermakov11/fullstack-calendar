import { DateControls } from "../../styles/Calendar.styled";
import { getMonthYear, nextMonth, prevMonth } from "../../utils/dateUtils";

interface PropsControls {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const CalendarControls = ({ currentDate, setCurrentDate }: PropsControls) => (
  <DateControls>
    <button className="arrow" onClick={() => prevMonth(currentDate, setCurrentDate)}>prev</button>
    <p className="year">{getMonthYear(currentDate)}</p>
    <button className="arrow" onClick={() => nextMonth(currentDate, setCurrentDate)}>next</button>
  </DateControls>
);