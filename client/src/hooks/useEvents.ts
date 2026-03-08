import { useState, useMemo, useEffect } from "react";
import type { Event } from "../types/types";
import { getDarkColor } from "../utils/dateUtils";
import * as server_api from '../data/server_api';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    server_api.getEvents().then(data => {
      const list = Array.isArray(data) ? data : [];
      setEvents(list.map(ev => ({
        ...ev,
        id: ev._id ?? ev.id,
        date: new Date(ev.date),
      })));
    });
  }, []);
  
  const filteredEvents = useMemo(() => {
    const text = searchText.toLowerCase();
    return events.filter(ev => ev.title?.toLowerCase().includes(text));
  }, [events, searchText]);

  const addEvent = async (date: Date) => {
    const text = window.prompt("Event name");
    if (!text) return;
  
    const newEvent = await server_api.createEvent({
      title: text,
      date,
      color: getDarkColor(),
    });
  
    const formattedEvent = {
      ...newEvent,
      id: newEvent._id ?? newEvent.id,
      date: new Date(newEvent.date)
    };
  
    setEvents(prev => [...prev, formattedEvent]);
  };

  const updateEventDate = async (id: string, date: Date) => {
    await server_api.updateEvent(id, { date });
    setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, date } : ev)));
  };

  const updateEventTitle = async (id: string, title: string) => {
    await server_api.updateEvent(id, { title })
    setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, title } : ev)));
  };

  const deleteEvent = async (id: string) => {
    await server_api.deleteEvent(id)
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

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
    reorderEvents,
  };
};