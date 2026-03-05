import { SevenColGrid, HeadDays } from "../../styles/Calendar.styled";
import { DAYS } from "../../data/data_time";

export const CalendarHeadings = () => (
  <SevenColGrid>
    {DAYS.map(day => <HeadDays key={day}>{day}</HeadDays>)}
  </SevenColGrid>
);