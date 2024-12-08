import { useQuery } from "@tanstack/react-query";
import { getUser } from "./apiUser";

export function useUser(user_id) {
  const { isPending, data: userData } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUser(user_id),
  });
  return {
    isPending,
    userData,
  };
}
