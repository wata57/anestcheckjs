import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewMonthGrid(), createViewWeek(), createViewMonthAgenda()],
    events: [
      {
        id: "1",
        title: "Plantão",
        start: "2024-12-05",
        end: "2024-12-06",
      },
      {
        id: "12",
        title: "Plantão",
        start: "2024-12-12",
        end: "2024-12-12",
      },
    ],
    plugins: [eventsService],
    locale: "pt-BR",
    defaultView: "Month Grid",
  });

  useEffect(() => {
    eventsService.getAll();
  }, []);

  return (
    <div className="h-1/2">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
