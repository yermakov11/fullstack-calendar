const KEYS = {
    EVENTS: "events",
    COUNTRY_CODE: "countryCode",
  } as const;
  
  
  export const saveEvents = (events: unknown): void => {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
  };
  
  export const loadEvents = <T>(fallback: T): T => {
    const saved = localStorage.getItem(KEYS.EVENTS);
    if (!saved) return fallback;
    return JSON.parse(saved, (key, value) =>
      key === "date" ? new Date(value) : value
    );
  };
  
  export const saveCountryCode = (code: string): void => {
    localStorage.setItem(KEYS.COUNTRY_CODE, code);
  };
  
  export const loadCountryCode = (): string => {
    return localStorage.getItem(KEYS.COUNTRY_CODE) ?? "";
  };