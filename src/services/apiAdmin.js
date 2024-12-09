import { supabase } from "./supabase";
import { PAGE_SIZE } from "../utils/values";

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

export async function getCalendarioAdmin(page, month, year) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.toISOString().slice(0, 10);

  let query = supabase
    .from("calendars")
    .select("*, hospitals(*), profile:user_id(*)", {
      count: "exact",
    })
    .eq("validated", false)
    .order("date", { ascending: true })
    .gte("date", todayTimestamp);

  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    query = query
      .gte("date", startDate.toISOString())
      .lte("date", endDate.toISOString());
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

export async function getUsersAdmin() {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("role", 2);

  if (error) {
    console.error("Erro ao selecionar usuários:", error.message);
    throw new Error("Falha ao selecionar usuários.");
  }

  return { data };
}
