import { supabase } from "../supabase";

// export async function getUser(user_id) {
//   let { data, error } = await supabase
//     .from("profile")
//     .select(
//       "*, admin_hospital(*), role(*),user_hospital_autorizado(*, hospitals(*))"
//     )
//     .eq("id", user_id)
//     .single();

//   if (error) throw new Error(error.message);

//   return data;
// }

export async function getUser() {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  let { data: profileData, error } = await supabase
    .from("profile")
    .select(
      "*, admin_hospital(*), role(*),user_hospital_autorizado(*, hospitals(*))"
    )
    .eq("id", userData.user.id)
    .single();

  if (error) throw new Error(error.message);
  if (userError) throw new Error(error.message);

  return { profileData, userData };
}
