import { useState, useEffect, useMemo } from "react";
import type { Event as CalendarEvent } from "../types/types";
import { getDarkColor } from "../utils/dateUtils";
import { saveEvents, loadEvents } from "../utils/localStorage";
import * as server_api from "../data/server_api";

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => loadEvents([])  );

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    server_api.getEvents().then(data => {
      const list = Array.isArray(data) ? data : [];
      setEvents(
        list
          .map(ev => ({
            ...ev,
            id: ev._id ?? ev.id,
            date: new Date(ev.date),
          }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))  
      );
    }).catch(err => {
      console.error("Failed to fetch events:", err);
    });
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(ev => ev.title?.toLowerCase().includes(searchText.toLowerCase()));
  }, [events, searchText]);

  const addEvent = async (date: Date) => {
    const text = window.prompt("Event name");
    if (!text) return;
  
    const tempId = `temp-${Date.now()}`;
    const tempEvent: CalendarEvent = {
      id: tempId,
      title: text,
      date,
      color: getDarkColor(),
    };
  
    setEvents(prev => [...prev, tempEvent]);
  
    try {
      const newEvent = await server_api.createEvent({
        title: text,
        date,
        color: tempEvent.color,
      });
  
      setEvents(prev => prev.map(ev => ev.id === tempId ? { ...newEvent, id: newEvent._id ?? newEvent.id, date: new Date(newEvent.date) }: ev));
    } catch (err) {
      console.error("Failed to create event:", err);
      setEvents(prev => prev.filter(ev => ev.id !== tempId));
    }
  };

  const updateEventDate = async (id: string, date: Date) => {
    const prev_date = events.find(ev => ev.id === id)?.date;
    setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, date } : ev)));
    try {
      await server_api.updateEvent(id, { date });
    } catch (err) {
      setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, date: prev_date! } : ev)));
    }
  };
  
  const updateEventTitle = async (id: string, title: string) => {
    const prev_title = events.find(ev => ev.id === id)?.title;
    setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, title } : ev)));
    try {
      await server_api.updateEvent(id, { title });
    } catch (err) {
      setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, title: prev_title! } : ev)));
    }
  };
  
  const deleteEvent = async (id: string) => {
    const deleted = events.find(ev => ev.id === id);
    setEvents(prev => prev.filter(ev => ev.id !== id));
    try {
      await server_api.deleteEvent(id);
    } catch (err) {
      if (deleted) setEvents(prev => [...prev, deleted]);
    }
  };

  const reorderEvents = async (dragId: string, hoverId: string) => {
    setEvents(prev => {
      const dragIndex = prev.findIndex(e => e.id === dragId);
      const hoverIndex = prev.findIndex(e => e.id === hoverId);
  
      if (dragIndex === -1 || hoverIndex === -1) return prev;
  
      const updated = [...prev];
      const [dragItem] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, dragItem);
  
      Promise.all(
        updated.map((ev, index) =>
          server_api.updateEvent(ev.id, { order: index })
        )
      );
  
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