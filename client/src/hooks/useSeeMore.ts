import { useState } from "react";
import type { Event } from "../types/types";

export const useSeeMore = () => {
  const [seeMoreEvents, setSeeMoreEvents] = useState<Event[]>([]);
  const [seeMoreDate, setSeeMoreDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openSeeMore = (events: Event[], date: Date) => {
    setSeeMoreEvents(events);
    setSeeMoreDate(date);
    setIsOpen(true);
  };

  const closeSeeMore = () => {
    setSeeMoreEvents([]);
    setSeeMoreDate(null);
    setIsOpen(false);
  };

  return { seeMoreEvents, seeMoreDate, isOpen, openSeeMore, closeSeeMore};
};