import { useState, useEffect } from "react";
import { fetchHolidays, fetchCountries } from "../data/data_time";
import type { AvailableCountry, NagerHoliday } from "../types/types";


export type HolidayMap = Map<string, string>;

export const useCalendarDate = (countryCode: string = "") => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<HolidayMap>(new Map());
  const [availableCountries, setAvailableCountries] = useState<AvailableCountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountries();
      setAvailableCountries(data.sort((a, b) => a.name.localeCompare(b.name)))
    }
    loadCountries()
  }, [])

  useEffect(() => {
    const loadHolidays = async () =>{
      setLoading(true);
      setError(null);
      try {
        const data: NagerHoliday[] = await fetchHolidays(currentDate, countryCode);
        const map: HolidayMap = new Map (data.map((h) => [new Date(h.date).toDateString(), h.localName]));
        setHolidays(map);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(String(error)));
        setHolidays(new Map());
      } finally{
        setLoading(false);
      } 
    };
    loadHolidays()
  }, [currentDate, countryCode])


  return { currentDate, setCurrentDate, holidays, availableCountries, loading, error };
};