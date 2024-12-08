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

export async function getCurrentUser() {
  try {
    const storedSession = localStorage.getItem(
      "sb-dtfxboyhntunmblbcgrb-auth-token"
    );
    let session = null;

    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      if (parsedSession?.expires_at * 1000 > Date.now()) {
        session = parsedSession;
      } else {
        localStorage.removeItem("sb-dtfxboyhntunmblbcgrb-auth-token");
      }
    }

    if (!session) {
      const { data: supabaseSession, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !supabaseSession?.session) {
        throw new Error("No active session");
      }
      session = supabaseSession.session;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (profileError) {
      throw new Error(profileError.message);
    }

    const fullName =
      profileData?.name || userData?.user.user_metadata.name || "";
    const firstName = fullName.split(" ")[0];

    const capitalizeFirstLetter = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const name = capitalizeFirstLetter(firstName);

    return {
      id: userData.user.id,
      user: userData.user,
      name: name,
      customerId: profileData?.stripe_customer || "",
      surname: profileData?.surname || "",
      subscription_status: profileData?.subscription_status || "",
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function getCurrentUserId() {
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
      return null;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    return {
      id: userData.user.id,
    };
  } catch (error) {
    console.error("Error in getCurrentUserId", error.message);
    throw error;
  }
}

export async function sendResetPasswordEmail(email) {
  let { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
}

export async function resetPassword(new_password) {
  let { error } = await supabase.auth.updateUser({ password: new_password });
  if (error) throw new Error(error.message);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
