import { supabase } from "./supabase";

export async function getCalendario(id) {
  const { data, error } = await supabase
    .from("calendars")
    .select("*, hospitals(*)")

    .eq("user_id", id);

  if (error) {
    console.error("Error:", error.message);
    throw new Error("Calendario não foi carregado");
  }

  return data;
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
