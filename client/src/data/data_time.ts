import axios from "axios";

export const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",];

export const MOCKAPPS = [
  { date: new Date(2024, 2, 3), title: "appointment", color: "#238783" },
  { date: new Date(2024, 2, 6), title: "doctos", color: "#708898" },
  { date: new Date(2024, 2, 13), title: "bd", color: "#047106" },
  { date: new Date(2024, 2, 9), title: "second", color: "#371395" },
];

export const fetchHolidays = async ( year: number): Promise<string[]> => {
  try {
    const url = `${import.meta.env.VITE_API_HOLIDAYS}/${year}/${import.meta.env.VITE_COUNTRY_CODE}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Failed to fetch holidays");
    }
    const holidayNames = response.data.map((holiday: any) => holiday.date);
    return holidayNames;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};