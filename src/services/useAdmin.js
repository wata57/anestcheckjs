import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCalendarioAdmin, updateConfirmarPlantao } from "./apiAdmin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PAGE_SIZE } from "../utils/values";

export function useConfirmarPlantao() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: confirmarPlantao, isPending } = useMutation({
    mutationFn: ({ user_id, checkedRows }) => {
      return updateConfirmarPlantao(user_id, checkedRows);
    },
    onSuccess: (user_id) => {
      queryClient.invalidateQueries(["calendario-admin", user_id]);
      toast.success("Plantões confirmados");
      navigate("/app/admin?content=plantoes-pendentes");
    },
    onError: () => {
      toast.error(
        "Houve um erro na confirmação dos plantões, tentar novamente."
      );
    },
  });

  return { confirmarPlantao, isPending };
}

export function useCalendarioAdmin(page, month, year) {
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ["calendario-admin", page, month, year],
    queryFn: () => getCalendarioAdmin(page, month, year),
    gcTime: 0,
  });
  const calendarData = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["calendario-admin", page + 1, month, year],
      queryFn: () => getCalendarioAdmin(page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["calendario-admin", page - 1, month, year],
      queryFn: () => getCalendarioAdmin(page - 1),
    });
  }

  return {
    isPending,
    calendarData,
    count,
  };
}
