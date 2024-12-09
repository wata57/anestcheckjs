export function transformCalendarioData(data) {
  const today = new Date().toISOString().split("T")[0];

  return (data || []).map((item) => {
    const eventDate = item.date.split("T")[0];

    let calendarId = item.validated ? "confirmado" : "aguardando";
    if (eventDate < today) {
      calendarId = "antigo";
    }
    const validator = item.validated ? item?.profile?.name : null;

    return {
      id: item.id.toString(),
      location: item.hospitals.hospital_name,
      title: item.event,
      start: eventDate,
      end: eventDate,
      validated: item.validated,
      validator: validator,
      calendarId: calendarId,
    };
  });
}

export function formatYearCalendar(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function getDisplayedMonthAndYear(range) {
  const startDate = new Date(range.start);
  const endDate = new Date(range.end);

  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  let month, year;

  if (startMonth === endMonth && startYear === endYear) {
    month = (startMonth + 1).toString().padStart(2, "0");
    year = startYear;
  } else {
    const middleDate = new Date((startDate.getTime() + endDate.getTime()) / 2);
    month = (middleDate.getMonth() + 1).toString().padStart(2, "0");
    year = middleDate.getFullYear();
  }

  return { month, year };
}
