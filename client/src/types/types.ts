export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday", "Sunday",];

export const MOCKAPPS = [
  { date: new Date(2024, 2, 3), title: "appointment", color: "#238783" },
  { date: new Date(2024, 2, 6), title: "doctos", color: "#708898" },
  { date: new Date(2024, 2, 13), title: "bd", color: "#047106" },
  { date: new Date(2024, 2, 9), title: "second", color: "#371395" },
];

export interface Event {
    _id?: string;
    id: string;
    title: string;   
    date: Date;
    color: string;
    order?: number;
  }

  export interface NagerHoliday {
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
  
  export interface AvailableCountry {
    countryCode: string;
    name: string;
  }
