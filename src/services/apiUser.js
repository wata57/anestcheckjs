import { supabase } from "./supabase";

export async function getUser(user_id) {
  let { data, error } = await supabase
    .from("users")
    .select(
      "*, admin_hospital(*), role(*),user_hospital_autorizado(*, hospitals(*))"
    )
    .eq("id", user_id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
