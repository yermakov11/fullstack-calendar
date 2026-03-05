import { useRef } from "react";

type DropEventFn = (id: string, date: Date) => void;
type ReorderFn = (id: string, targetId: string) => void;

export const useDragAndDrop = (onDropEvent: DropEventFn, onReorder: ReorderFn) => {
  const dragEventIdRef = useRef<string | null>(null);
  const dragSourceDateRef = useRef<string | null>(null); 

  const onDragStart = (id: string, date: Date, e: React.DragEvent<HTMLDivElement>) => {
    dragEventIdRef.current = id;
    dragSourceDateRef.current = date.toDateString();
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (date: Date, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;

    onDropEvent(id, date);
    dragEventIdRef.current = null;
    dragSourceDateRef.current = null;
  };

  const onDragOverEvent = ( targetId: string, targetDate: Date, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = dragEventIdRef.current;
    if (!id || id === targetId) return;
    if (dragSourceDateRef.current !== targetDate.toDateString()) return;
    onReorder(id, targetId);
  };

  return { onDragStart, onDrop, onDragOverEvent};
};