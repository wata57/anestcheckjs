import PropTypes from "prop-types";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import {
  getDisplayedMonthAndYear,
  transformCalendarioData,
} from "../../utils/calendar";
import CalendarModalEdit from "./CalendarModalEdit";

import { useSearchParams } from "react-router-dom";
import CalendarEdit from "./CalendarEdit";
import CalendarAdd from "./CalendarAdd";

function CalendarApp({ data, today }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const event = transformCalendarioData(data);

  const date = new Date();
  const formattedToday = date.toISOString().split("T")[0]; // Format today's date to "YYYY-MM-DD"

  const isSelectedDateValid = selectedDate >= formattedToday;
  const isSelectedEventValid = selectedEvent?.start >= formattedToday;

  const calendar = useCalendarApp({
    calendars: {
      confirmado: {
        colorName: "confirmado",
        lightColors: {
          main: "#22c55e",
          container: "#86efac",
          onContainer: "#000",
        },
      },
      aguardando: {
        colorName: "aguardando",
        lightColors: {
          main: "#facc15",
          container: "#fef08a",
          onContainer: "#000",
        },
      },
      antigo: {
        colorName: "antigo",
        lightColors: {
          main: "#f87171",
          container: "#fecaca",
          onContainer: "#000",
        },
      },
    },
    views: [createViewMonthGrid(), createViewMonthAgenda()],
    events: event,
    plugins: [eventsService],
    locale: "pt-BR",
    selectedDate: today,
    defaultView: "Month Grid",
    callbacks: {
      onRangeUpdate(range) {
        const calendarDate = getDisplayedMonthAndYear(range);
        searchParams.set("mes", calendarDate.month);
        searchParams.set("ano", calendarDate.year);
        searchParams.delete("editar-evento");
        setSearchParams(searchParams);
      },
      onClickDate(date) {
        setSelectedDate(date);
        searchParams.set("editar-evento", "verdade");
        setSearchParams(searchParams);
      },

      onDoubleClickAgendaDate(date) {
        setSelectedDate(date);
        searchParams.set("editar-evento", "verdade");
        setSearchParams(searchParams);
      },
      onEventClick(calendarEvent) {
        setSelectedDate(calendarEvent?.start);
        setSelectedEvent(calendarEvent);
        searchParams.set("editar-evento", "verdade");
        setSearchParams(searchParams);
      },
    },
  });

  useEffect(() => {
    eventsService.getAll();
  }, []);

  useEffect(() => {
    if (!isSelectedDateValid) {
      searchParams.delete("editar-evento");
      setSearchParams(searchParams);
    }
  }, [
    isSelectedDateValid,
    isSelectedEventValid,
    searchParams,
    setSearchParams,
    selectedEvent,
    selectedDate,
  ]);

  return (
    <div className="cursor-pointer">
      <ScheduleXCalendar calendarApp={calendar} />
      <CalendarModalEdit
        date={selectedDate}
        type={selectedEvent ? "editar" : "adicionar"}
        setSelectedEvent={setSelectedEvent}
        title={selectedEvent ? "Editar plantão" : "Adicionar plantão"}
      >
        {selectedEvent ? (
          <CalendarEdit data={selectedEvent} />
        ) : (
          <CalendarAdd date={selectedDate} />
        )}
      </CalendarModalEdit>
    </div>
  );
}

CalendarApp.propTypes = {
  data: PropTypes.any,
  today: PropTypes.any,
  month: PropTypes.any,
  year: PropTypes.any,
};

export default CalendarApp;
