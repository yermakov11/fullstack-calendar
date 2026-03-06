import React from "react";
import { DayContainer, HolidayLabel } from "../../styles/Calendar.styled";
import type { Event } from "../../types/types";
import type { HolidayMap } from "../../hooks/useCalendarDate";
import { EventWrapper } from "./EventWrapper";

interface PropsCalendarDayCell {
  currentDate: Date;
  day: number;
  holidays: HolidayMap;
  events: Event[];
  onDragStart: (id: string, date: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onClickEvent: (event: Event) => void;
  onDrop: (date: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onDragOverEvent: (targetId: string, targetDate: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onSeeMore: (events: Event[], date: Date) => void;
  addEvent: (date: Date) => void;
}

export const CalendarDayCell = ({ currentDate, day, holidays, events, onDragStart, onClickEvent, onDrop, onDragOverEvent, onSeeMore, addEvent }: PropsCalendarDayCell) => {
  const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const holidayName = holidays.get(dateObj.toDateString());
  const isToday = dateObj.toDateString() === new Date().toDateString();
  const justDropped = React.useRef(false);

  return (
    <DayContainer
      className={isToday ? "today" : undefined}
      onClick={() => {
        if (justDropped.current) { justDropped.current = false; return; }
        addEvent(dateObj);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { justDropped.current = true; onDrop(dateObj, e); }}
    >
      {holidayName && <HolidayLabel>{holidayName}</HolidayLabel>}
      <span className={`day-number ${holidayName ? "holiday" : ""}`}>{day}</span>
      <EventWrapper
        events={events}
        currentDate={currentDate}
        day={day}
        onDragStart={onDragStart}
        onDragOverEvent={onDragOverEvent}
        onClickEvent={onClickEvent}
        onSeeMore={onSeeMore}
      />
    </DayContainer>
  );
};