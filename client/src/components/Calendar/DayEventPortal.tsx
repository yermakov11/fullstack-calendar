import { useState } from "react";
import { DayEventsWrapper, DayEventsOverlay, DayEventItem, EventListWrapper } from "../../styles/Calendar.styled";
import type { Event } from "../../types/types";
import { truncateChars } from '../../utils/dateUtils';
import { CalendarSearchBar } from '../../components/Calendar/CalendarSearchBar';

interface PropsDayEventsPortal {
  date: Date;
  events: Event[];
  onClose: () => void;
  onClickEvent: (event: Event) => void;
}

export const DayEventsPortal = ({ date, events, onClose, onClickEvent }: PropsDayEventsPortal) => {
  const [searchEvents, setSearchEvents] = useState("");

  const filteredEvents = events.filter(ev => ev.title.toLowerCase().includes(searchEvents.toLowerCase()));

  return (
    <DayEventsOverlay onClick={onClose}>
      <DayEventsWrapper onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="header">
          <h3>{date.toDateString()}</h3>
          <CalendarSearchBar searchText={searchEvents} setSearchText={setSearchEvents} />
        </div>

        <EventListWrapper>
          {filteredEvents.map(ev => (
            <DayEventItem
              key={ev.id}
              bgColor={ev.color}
              title={ev.title}
              onClick={() => { onClickEvent(ev); onClose(); }}
            >
              {truncateChars(ev.title, 16)}
            </DayEventItem>
          ))}
        </EventListWrapper>
      </DayEventsWrapper>
    </DayEventsOverlay>
  );
};