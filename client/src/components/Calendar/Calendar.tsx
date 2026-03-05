import { Wrapper } from "../../styles/Calendar.styled";
import { CalendarSearchBar } from "./CalendarSearchBar";
import { CalendarControls } from "./CalendarControls";
import { CalendarHeadings } from "./CalendarHeadings";
import { CalendarDaysGrid } from "./CalendarDaysGrid";
import { Portal } from "./Portal";
import { useCalendarDate } from "../../hooks/useCalendarDate";
import { useEvents } from "../../hooks/useEvents";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { usePortal } from "../../hooks/usePortal";

interface PropsCalendar {
  countryCode?: string;
}

export const Calendar = ({ countryCode = "US" }: PropsCalendar) => {
  const { currentDate, setCurrentDate, holidays } = useCalendarDate(countryCode);
  const { filteredEvents, searchText, setSearchText, addEvent, updateEventDate, updateEventTitle, deleteEvent, reorderEvents} = useEvents();
  const { onDragStart, onDrop, onDragOverEvent } = useDragAndDrop(updateEventDate, reorderEvents);
  const { portalData, showPortal, openPortal, closePortal, editEvent, handleDelete } = usePortal(updateEventTitle, deleteEvent);

  return (
    <Wrapper>
      <CalendarSearchBar searchText={searchText} setSearchText={setSearchText}/>
      <CalendarControls currentDate={currentDate} setCurrentDate={setCurrentDate}/>
      <CalendarHeadings />
      <CalendarDaysGrid
        currentDate={currentDate}
        holidays={holidays}
        events={filteredEvents}
        onDragStart={onDragStart}
        onClickEvent={openPortal}
        onDrop={onDrop}
        onDragOverEvent={onDragOverEvent}
        addEvent={addEvent}
      />

      {showPortal && portalData && (
        <Portal
          title={portalData.title}
          date={portalData.date}
          handleDelete={handleDelete}
          handleClose={closePortal}
          handleEdit={editEvent}
        />
      )}
    </Wrapper>
  );
};