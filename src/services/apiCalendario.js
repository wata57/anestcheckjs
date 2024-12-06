import { supabase } from "./supabase";

export async function getCalendario(user_id, page, onlyUpcomingDates) {
  const PAGE_SIZE = 4;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.toISOString().slice(0, 19).replace("T", " ");

  let query = supabase
    .from("calendars")
    .select("*, hospitals(*)", {
      count: "exact",
    })
    .eq("user_id", user_id)
    .order("date", { ascending: true });

  if (onlyUpcomingDates) {
    query = query.gte("date", todayTimestamp);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error:", error.message);
    throw new Error("Calendario não foi carregado");
  }

  return { data, count };
}

export async function getCalendarioAll(user_id, month, year) {
  let query = supabase
    .from("calendars")
    .select("*, hospitals(*)", {
      count: "exact",
    })
    .eq("user_id", user_id)
    .order("date", { ascending: true });

  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    query = query
      .gte("date", startDate.toISOString())
      .lte("date", endDate.toISOString());
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error:", error.message);
    throw new Error("Calendario não foi carregado");
  }

  return { data, count };
}

export async function addPlantao(user_id, date, turno, hospital) {
  const { data, error } = await supabase
    .from("calendars")
    .insert([
      {
        user_id: user_id,
        date: date,
        hospital_id: hospital,
        anesthesia_group_id: 1,
        validated: false,
        event: turno === "diurno" ? "Plantão diurno" : "Plantão noturno",
      },
    ])
    .select();

  if (error) {
    console.error("Error:", error.message);
    throw new Error("Calendario não foi carregado");
  }

  return { data, user_id };
}

export async function deletePlantao(user_id, id) {
  const { error } = await supabase
    .from("calendars")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);
  return { user_id };
}
