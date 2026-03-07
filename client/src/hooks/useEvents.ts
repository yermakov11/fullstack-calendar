import { useState, useEffect, useMemo } from "react";
import type { Event } from "../types/types";
import { MOCKAPPS } from "../types/types";
import { getDarkColor } from "../utils/dateUtils";
import { saveEvents, loadEvents } from "../utils/localStorage";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(
    () => loadEvents(MOCKAPPS.map(ev => ({ ...ev, id: crypto.randomUUID() })))
  );
  
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    saveEvents(events);
  }, [events]);
  
  const filteredEvents = useMemo(() => {
    return events.filter(ev => ev.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [events, searchText]);

  const addEvent = (date: Date) => {
    const text = window.prompt("Event name");
    if (!text) return;

    setEvents(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date,
        title: text,
        color: getDarkColor()
      }
    ]);
  };

  const updateEventDate = (id: string, date: Date) => {
    setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, date } : ev)));
  };

  const updateEventTitle = (id: string, title: string) => {
    setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, title } : ev)));
  };

  const deleteEvent = (id: string) => {setEvents(prev => prev.filter(ev => ev.id !== id));};

  const reorderEvents = (dragId: string, hoverId: string) => {
    setEvents(prev => {
      const dragIndex = prev.findIndex(e => e.id === dragId);
      const hoverIndex = prev.findIndex(e => e.id === hoverId);
  
      if (dragIndex === -1 || hoverIndex === -1) return prev;
  
      const updated = [...prev];
      const [dragItem] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, dragItem);
  
      return updated;
    });
  };

  return {
    events,
    filteredEvents,
    searchText,
    setSearchText,
    addEvent,
    updateEventDate,
    updateEventTitle,
    deleteEvent,
    reorderEvents
  };
};