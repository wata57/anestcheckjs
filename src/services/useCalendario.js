import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPlantao, deletePlantao, getCalendario } from "./apiCalendario";
import { useSearchParams } from "react-router-dom";

export function useCalendario(id) {
  const { isPending, data } = useQuery({
    queryKey: ["calendario", id],
    queryFn: () => getCalendario(id),
  });
  return {
    isPending,
    data,
  };
}

export function useAddPlantao() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { mutate: addUserPlantao, isPending } = useMutation({
    mutationFn: ({ id, date, turno }) => {
      return addPlantao(id, date, turno);
    },
    onSuccess: (id) => {
      searchParams.delete("editar-evento");
      setSearchParams(searchParams);
      queryClient.invalidateQueries(["calendario", id]);
      window.location.reload();
    },
  });

  return { addUserPlantao, isPending };
}

export function useDeletePlantao() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { mutate: deleteUserPlantao, isPending } = useMutation({
    mutationFn: ({ user_id, id }) => {
      return deletePlantao(user_id, id);
    },
    onSuccess: (user_id) => {
      searchParams.delete("editar-evento");
      setSearchParams(searchParams);
      queryClient.invalidateQueries(["calendario", user_id]);
      window.location.reload();
    },
  });

  return { deleteUserPlantao, isPending };
}
