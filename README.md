# Calendar Task Manager

## Overview

A fullstack calendar-based task management application built with **React + TypeScript + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

Users can create, edit, move, and organize tasks directly inside calendar day cells. Tasks are persisted in MongoDB via a RESTful API. The application also integrates a public holidays API to display worldwide holidays within the calendar cells.

**Live demo:** [https://fullstack-calendar-sigma.vercel.app](https://fullstack-calendar-sigma.vercel.app)

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

### Frontend
- React 19
- TypeScript
- Vite
- Styled Components
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Deployed on [Render.com](https://render.com)

---

## Project Structure

```
fullstack-calendar/
│
├── client/                        # React frontend
│   └── src/
│       ├── components/
│       │   └── Calendar/
│       │       ├── Calendar.tsx           # Root calendar component
│       │       ├── CalendarControls.tsx   # Prev/Next month buttons
│       │       ├── CalendarDaysGrid.tsx   # Grid of day cells
│       │       ├── CalendarDayCell.tsx    # Single day cell
│       │       ├── CalendarHeadings.tsx   # Mon–Sun header row
│       │       ├── CalendarSearchBar.tsx  # Search input
│       │       ├── EventWrapper.tsx       # Renders events in a cell
│       │       ├── Portal.tsx             # Edit/delete modal
│       │       └── DayEventPortal.tsx     # "See more" modal
│       │
│       ├── hooks/
│       │   ├── useCalendarDate.ts    # Month navigation + holidays
│       │   ├── useDragAndDrop.ts     # Drag between days + reorder
│       │   ├── useEvents.ts          # CRUD + optimistic updates
│       │   ├── usePortal.ts          # Edit/delete modal state
│       │   └── useSeeMore.ts         # "See more" modal state
│       │
│       ├── data/
│       │   ├── data_time.ts          # Holidays API calls
│       │   └── server_api.ts         # Backend API calls (axios)
│       │
│       ├── styles/
│       │   └── Calendar.styled.ts    # All styled-components
│       │
│       ├── utils/
│       │   ├── dateUtils.ts          # Date helpers
│       │   └── localStorage.ts       # LocalStorage cache
│       │
│       └── types/
│           └── types.ts              # Shared TypeScript types
│
└── server/                        # Express backend
    ├── server.js
    ├── db/connection.js
    ├── models/event.model.js
    ├── routes/eventRoutes.js
    ├── controllers/eventController.js
    └── middleware/
        ├── corsOptions.js
        ├── logger.js
        ├── errorHandler.js
        └── notFound.js
```

---

## Installation

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/yermakov11/fullstack-calendar.git
cd fullstack-calendar
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=3000
DB_URL=your_mongodb_connection_string
NODE_ENV=development
```

Start the server:

```bash
node server.js
```

### 3. Set up the frontend

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_SERVER_URL=http://localhost:3000/api/events
VITE_NAGER_BASE_URL=https://date.nager.at/api/v3
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## How the Calendar Works

### Navigation

Use the **prev** and **next** buttons to move between months. The current month and year are displayed in the center.

### Creating a Task

Click on any empty area inside a calendar day cell. A browser prompt will appear — enter the task name and press **OK**. The task appears immediately in the cell (optimistic update) and is saved to MongoDB in the background.

### Editing a Task

Click on an existing task to open the **edit portal**. Inside the portal you can:
- **Edit** — rename the task via a prompt
- **Delete** — permanently remove the task
- **Close** — dismiss the portal without changes

### Deleting a Task

Open the task by clicking it, then press the **Delete** button in the portal.

### Drag & Drop — Move Between Days

Drag a task card and drop it onto a different calendar day cell. The task will be reassigned to that date and saved to the server.

### Drag & Drop — Reorder Within a Day

Drag a task card over another task **within the same day cell**. The two tasks will swap positions. Order is persisted to MongoDB so it is preserved after page refresh.

### See More

If a day cell has more than 3 tasks, a **+N more...** button appears. Click it to open the full list for that day in a popup. You can also search within the popup and click any task to edit or delete it.

### Search / Filter

Use the search bar at the top of the calendar. Typing any text instantly filters all visible tasks across every day cell to show only those whose titles match.

### Holidays

Select a country from the dropdown next to the search bar. Public holidays for that country and the current year will appear as a colored label at the top of the corresponding day cells. Holidays are display-only and cannot be moved or interacted with.

---

## API Endpoints

Base URL: `https://fullstack-calendar.onrender.com/api/events`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Fetch all events |
| POST | `/api/events` | Create a new event |
| PUT | `/api/events/:id` | Update an event (title, date, color, order) |
| DELETE | `/api/events/:id` | Delete an event |

### Event schema

```json
{
  "id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Team meeting",
  "date": "2025-03-10T00:00:00.000Z",
  "color": "#238783",
  "order": 2
}
```

---

## Holidays API

Powered by [Nager.Date](https://date.nager.at).

Documentation: [https://date.nager.at/swagger/index.html](https://date.nager.at/swagger/index.html)

Example request:

```
GET https://date.nager.at/api/v3/PublicHolidays/2025/US
```

---

## Deployment

| Part | Platform | Notes |
|------|----------|-------|
| Frontend | [Vercel](https://vercel.com) | Root directory: `client`, build: `npm run build` |
| Backend | [Render.com](https://render.com) | Free tier — cold starts after 15 min of inactivity |
| Database | MongoDB Atlas | Network access open to `0.0.0.0/0` for Render |

### Required environment variables

**Vercel (frontend):**
```
VITE_SERVER_URL=https://fullstack-calendar.onrender.com/api/events
VITE_NAGER_BASE_URL=https://date.nager.at/api/v3
```

**Render (backend):**
```
DB_URL=your_mongodb_atlas_connection_string
PORT=3000
NODE_ENV=production
```

---

## Future Improvements

- Real-time collaboration between users
- Support for recurring tasks
- Additional calendar views (Week / Year)
- User authentication and authorization
- Task priority and labeling system
- Notifications and reminders for upcoming tasks