import React from "react";
import { EventBox, SeeMore } from "../../styles/Calendar.styled";
import type { Event } from "../../types/types";
import { datesAreOnSameDay } from "../../utils/dateUtils";

interface PropsEventWrapper {
  events: Event[];
  currentDate: Date;
  day: number;
  onDragStart: (id: string, date: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onDragOverEvent: (targetId: string, targetDate: Date, e: React.DragEvent<HTMLDivElement>) => void;
  onClickEvent: (event: Event) => void;
}

export const EventWrapper = ({ events, currentDate, day, onDragStart, onDragOverEvent, onClickEvent }: PropsEventWrapper) => {
  
  const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

  const filteredEvents = events.filter(ev => datesAreOnSameDay(ev.date, cellDate));
  const visibleEvents = filteredEvents.slice(0, 2);
  const hiddenCount = filteredEvents.length - 2;

  return (
    <>
      {visibleEvents.map(ev => (
        <EventBox
          key={ev.id}
          bgColor={ev.color}
          draggable
          onDragStart={(e) => onDragStart(ev.id, ev.date, e)}
          onDragOver={(e) => onDragOverEvent(ev.id, cellDate, e)}
          onClick={(e) => { e.stopPropagation(); onClickEvent(ev); }}
        >
          {ev.title}
        </EventBox>
      ))}
      {hiddenCount > 0 && (
        <SeeMore onClick={(e) => e.stopPropagation()}>+{hiddenCount} more...</SeeMore>
      )}
    </>
  );
};