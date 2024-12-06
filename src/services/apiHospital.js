import { supabase } from "./supabase";

export async function getHospitals() {
  let { data: antecedentes, error } = await supabase
    .from("hospitals")
    .select("*");

  if (error) throw new Error(error.message);

  return antecedentes;
}
