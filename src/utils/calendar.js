export function transformCalendarioData(data) {
  return (data || []).map((item) => ({
    id: item.id.toString(), // Ensure the id is a string
    location: item.hospitals.hospital_name,
    title: item.event, // Set the title as the event name
    start: item.date.split("T")[0], // Get the date part (YYYY-MM-DD)
    end: item.date.split("T")[0], // For now, set end as the same as start
    validated: item.validated,
    calendarId: item.validated ? "confirmado" : "aguardando",
  }));
}

export function formatYearCalendar(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
