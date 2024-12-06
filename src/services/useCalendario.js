import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPlantao, deletePlantao, getCalendario } from "./apiCalendario";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/values";

export function useCalendario(id, page) {
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ["calendario", id, page],
    queryFn: () => getCalendario(id, page),
  });
  const calendarData = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["calendario", id, page + 1],
      queryFn: () => getCalendario(id, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["calendario", id, page - 1],
      queryFn: () => getCalendario(id, page - 1),
    });
  }

  return {
    isPending,
    calendarData,
    count,
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
