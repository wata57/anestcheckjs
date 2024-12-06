import { supabase } from "./supabase";

export async function getCalendario(id, page) {
  const PAGE_SIZE = 4;
  let query = supabase
    .from("calendars")
    .select("*, hospitals(*)", {
      count: "exact",
    })
    .eq("user_id", id)
    .order("date", { ascending: true });

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

export async function addPlantao(id, date, turno) {
  const { data, error } = await supabase
    .from("calendars")
    .insert([
      {
        user_id: id,
        date: date,
        hospital_id: 1,
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

  return { data, id };
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
