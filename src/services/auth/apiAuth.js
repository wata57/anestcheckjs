import { supabase } from "../supabase";

export async function signUp({ name, surname, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        surname,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function loginWithGoogle() {
  const currentUrl = new URL(window.location.href);

  const newPathname = currentUrl.pathname.replace(/\/home$/, "");

  currentUrl.pathname = newPathname + "/app/home";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://appanestesia.com.br/app/home",
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

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

export async function sendResetPasswordEmail(email) {
  let { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
}

export async function resetPassword(new_password) {
  let { error } = await supabase.auth.updateUser({ password: new_password });
  if (error) throw new Error(error.message);
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
