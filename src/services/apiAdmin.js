import { supabase } from "./supabase";

export async function updateConfirmarPlantao(user_id, checkedRows) {
  if (!user_id || !checkedRows) {
    throw new Error("Parâmetros inválidos: user_id ou id estão ausentes.");
  }

  const { data, error } = await supabase
    .from("calendars")
    .update({ validated: true, validator: user_id })
    .in("id", checkedRows)
    .select();

  if (error) {
    console.error("Erro ao atualizar plantão:", error.message);
    throw new Error("Falha ao confirmar plantão.");
  }

  return { data, user_id };
}
