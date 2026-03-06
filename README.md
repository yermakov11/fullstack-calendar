# Calendar Task Manager

## Overview

This project is a calendar-based task management application built with React + Vite.
Users can create, edit, move, and organize tasks directly inside calendar day cells.

The application also integrates a public holidays API to display worldwide holidays within the calendar.

Tasks can be filtered via search, moved between days using drag-and-drop, and reordered inside a single calendar cell.

The project is designed with React components and custom hooks to keep logic modular and maintainable.

---

## Features

- [x] Create tasks inside calendar cells (days)
- [x] Edit tasks directly from the calendar
- [x] Reassign tasks between days using **Drag & Drop**
- [x] Reorder tasks inside one day using **Drag & Drop**
- [x] Filter tasks using search input
- [x] Display worldwide holidays in the calendar
- [x] Holidays are fixed in the calendar cell and cannot be reordered
- [x] Persist tasks in **MongoDB** using **Node.js CRUD API**

---

## Tech Stack

### Front-end
- React
- TypeScript
- Vite
- Styled Components (CSS-in-JS)
- Axios

### Back-end
- Node.js
- Express.js
- MongoDB
---
  
## Project Structure

```
src
 ├── components
 │   └── Calendar
 │       ├── Calendar.tsx
 │       ├── CalendarControls.tsx
 │       ├── CalendarDaysGrid.tsx
 │       ├── CalendarDayCell.tsx
 │       ├── CalendarHeadings.tsx
 │       ├── CalendarSearchBar.tsx
 │       ├── EventWrapper.tsx
 │       └── Portal.tsx
 │
 ├── pages
 │   └── CalendarPage.tsx
 │
 ├── hooks
 │   ├── useCalendarDate.ts
 │   ├── useDragAndDrop.ts
 │   ├── useEvents.ts
 │   └── usePortal.ts
 │
 ├── styles
 │   └── Calendar.styled.ts
 │
 ├── utils
 │   └── dateUtils.ts
 │
 ├── data
 │   └── data_time.ts
 │
 └── types
     └── types.ts
```
## Installation

Clone the repository:

```bash
https://github.com/yermakov11/fullstack-calendar.git
```

Go to the project folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🌍 Holidays API

Documentation:

https://date.nager.at/swagger/index.html

Example request:

```bash
https://date.nager.at/api/v3/PublicHolidays/2024/US
```

---

## 🔍 Search Tasks

The calendar supports **text filtering**.

Example:

```
Search: meeting
```

Only tasks containing `"meeting"` will be displayed.

---

## 🖱 Drag & Drop

Supported drag operations:

| Action | Description |
|------|-------------|
| Move task | Drag task to another day |
| Reorder task | Drag inside the same cell |
| Open task | Click event to open edit portal |

---

## 🗄 Future Backend (Node.js + MongoDB)

Tasks will be stored using CRUD API.

Example structure:

```json
{
  "id": "123",
  "title": "Meeting",
  "date": "2024-03-10",
  "color": "#238783"
}
```

API endpoints example:

```
GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id
```

---

## 📸 Example Workflow

1. Click on any day
2. Enter task name
3. Task appears inside the cell
4. Drag it to another day if needed
5. Click task to **edit or delete**

---

## Future Improvements

The following features can be added to improve the application:

- Real-time collaboration between users
- Support for recurring tasks
- Additional calendar views (Week / Year)
- User authentication and authorization
- Task priority and labeling system
- Notifications and reminders for upcoming tasks
