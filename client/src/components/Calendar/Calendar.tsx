import { useState } from "react";
import { Wrapper, CountrySelect } from "../../styles/Calendar.styled";
import { CalendarSearchBar } from "./CalendarSearchBar";
import { CalendarControls } from "./CalendarControls";
import { CalendarHeadings } from "./CalendarHeadings";
import { CalendarDaysGrid } from "./CalendarDaysGrid";
import { Portal } from "./Portal";
import { DayEventsPortal } from "./DayEventPortal";
import { useCalendarDate } from "../../hooks/useCalendarDate";
import { useEvents } from "../../hooks/useEvents";
import { useSeeMore } from "../../hooks/useSeeMore";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { usePortal } from "../../hooks/usePortal";


export const Calendar = () => {
  const [countryCode, setCountryCode] = useState("US");
  const { currentDate, setCurrentDate, holidays, availableCountries } = useCalendarDate(countryCode);
  const { filteredEvents, searchText, setSearchText, addEvent, updateEventDate, updateEventTitle, deleteEvent, reorderEvents } = useEvents();
  const { onDragStart, onDrop, onDragOverEvent } = useDragAndDrop(updateEventDate, reorderEvents);
  const { portalData, showPortal, openPortal, closePortal, editEvent, handleDelete } = usePortal(updateEventTitle, deleteEvent);
  const { seeMoreEvents, seeMoreDate, isOpen, openSeeMore, closeSeeMore } = useSeeMore();

  return (
    <Wrapper>
      <CalendarSearchBar searchText={searchText} setSearchText={setSearchText} />
      <CountrySelect value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
        {availableCountries.map(c => (
          <option key={c.countryCode} value={c.countryCode}>
            {c.name}
          </option>
        ))}
      </CountrySelect>
      <CalendarControls currentDate={currentDate} setCurrentDate={setCurrentDate} />
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
        onSeeMore={openSeeMore}
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

      {isOpen && seeMoreDate && (
        <DayEventsPortal
          date={seeMoreDate}
          events={seeMoreEvents}
          onClose={closeSeeMore}
          onClickEvent={(ev) => { closeSeeMore(); openPortal(ev); }}
        />
      )}
    </Wrapper>
  );
};