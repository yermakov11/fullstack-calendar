import axios from "axios";
import type { Event as CalendarEvent } from "../types/types";

const SERVER_URL = "http://localhost:3000/api/events";


export const getEvents = async (): Promise<CalendarEvent[]> => {
  const res = await axios.get(SERVER_URL);
  return res.data;
};

export const createEvent = async (event: Omit<CalendarEvent, "id">): Promise<CalendarEvent> => {
  const res = await axios.post(SERVER_URL, event);
  return res.data;
};

export const updateEvent = async (id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> => {
  const res = await axios.put(`${SERVER_URL}/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await axios.delete(`${SERVER_URL}/${id}`);
};