import type { NagerHoliday, AvailableCountry } from "../types/types";
import axios from "axios";

const NAGER_BASE_URL = import.meta.env.VITE_NAGER_BASE_URL;

export const fetchCountries = async (): Promise<AvailableCountry[]> => {
  try {
    const response = await axios.get<AvailableCountry[]>(`${NAGER_BASE_URL}/AvailableCountries`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch countries:", err);
    return[]
  }
};

export const fetchHolidays = async (currentDate: Date, countryCode: string): Promise<NagerHoliday[]> => {
  try {
    const url = `${NAGER_BASE_URL}/PublicHolidays/${currentDate.getFullYear()}/${countryCode}`;
    const response = await axios.get<NagerHoliday[]>(url);
    return response.data;
  } catch (err: any) {
    console.error("Failed to fetch holidays:", err);
    return []; 
  }
};
