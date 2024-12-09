import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, logoutApi } from "./apiAuth";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const { isPending, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return {
    isPending,
    user_id: userData?.profileData.id,
    name: userData?.profileData.name,
    surname: userData?.profileData.surname,
    email: userData?.profileData.email,
    crm: userData?.profileData.crm,
    role: userData?.profileData.role,
    hospitais_admin: userData?.profileData.admin_hospital,
    hospitais_autorizados: userData?.profileData.user_hospital_autorizado,
    isAuthenticated: userData?.userData.user?.role === "authenticated",
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}

// import { useQuery } from "@tanstack/react-query";
// import { getUser } from "./apiUser";

// export function useUser() {
//   const { isPending, data } = useQuery({
//     queryKey: ["user"],
//     queryFn: () => getUser(),
//   });

//   return {
//     isPending,
//     data,
//   };
// }
