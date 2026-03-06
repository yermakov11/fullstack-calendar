import React from "react";
import { SevenColGrid } from "../../styles/Calendar.styled";
import { CalendarDayCell } from "./CalendarDayCell";
import type { Event } from "../../types/types";
import type { HolidayMap } from "../../hooks/useCalendarDate";
import { getSortedDays, getDaysInMonth } from "../../utils/dateUtils";

interface PropsCalendarDaysGrid {
  currentDate: Date;
  holidays: HolidayMap;
  events: Event[];
  onDragStart: (id: string, date: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onClickEvent: (event: Event) => void;
  onDrop: (date: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onDragOverEvent: (targetId: string, targetDate: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onSeeMore: (events: Event[], date: Date) => void;
  addEvent: (date: Date) => void;
}

export const CalendarDaysGrid = ({ currentDate, holidays, events, onDragStart, onDrop, onDragOverEvent, onClickEvent, onSeeMore, addEvent }: PropsCalendarDaysGrid) => {
  const days = getSortedDays(currentDate);
  const is28Days = getDaysInMonth(currentDate) === 28;

  return (
    <SevenColGrid fullheight="true" is28Days={is28Days}>
      {days.map((day, index) => (
        <CalendarDayCell
          key={index}
          currentDate={currentDate}
          day={day}
          holidays={holidays}
          events={events}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDragOverEvent={onDragOverEvent}
          onClickEvent={onClickEvent}
          onSeeMore={onSeeMore}
          addEvent={addEvent} />
      ))}
    </SevenColGrid>
  );
};