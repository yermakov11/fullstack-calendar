import { useState } from "react";
import type { Event } from "../types/types";

export const usePortal = ( updateEventTitle: (id: string, title: string) => void, deleteEvent: (id: string) => void) => {
  const [portalData, setPortalData] = useState<Event | null>(null);
  const [showPortal, setShowPortal] = useState(false);

  const openPortal = (event: Event) => {
    setPortalData(event);
    setShowPortal(true);
  };

  const closePortal = () => setShowPortal(false);

  const editEvent = () => {
    if (!portalData) return;

    const newText = window.prompt("Edit event name", portalData.title);
    if (!newText) return;

    updateEventTitle(portalData.id, newText);
    setPortalData({ ...portalData, title: newText });
  };

  const handleDelete = () => {
    if (!portalData) return;

    deleteEvent(portalData.id);
    closePortal();
  };

  return {
    portalData,
    showPortal,
    openPortal,
    closePortal,
    editEvent,
    handleDelete
  };
};