import { useState, useEffect } from "react";
import axios from "axios";

interface NagerHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export type HolidayMap = Map<string, string>;

const NAGER_BASE_URL = "https://date.nager.at/api/v3/PublicHolidays";

export const useCalendarDate = (countryCode: string = "DE") => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<HolidayMap>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${NAGER_BASE_URL}/${currentDate.getFullYear()}/${countryCode}`;
        const response = await axios.get<NagerHoliday[]>(url);
        const map: HolidayMap = new Map(
          response.data.map((h) => [
            new Date(h.date).toDateString(),
            h.localName,
          ])
        );
        setHolidays(map);
      } catch (err: any) {
        setError(err);
        setHolidays(new Map());
        console.error("Failed to fetch holidays:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [currentDate, countryCode]);

  return { currentDate, setCurrentDate, holidays, loading, error };
};