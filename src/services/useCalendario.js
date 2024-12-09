import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPlantao,
  deletePlantao,
  getCalendarioAll,
  getCalendarioFuturo,
  getCalendarioPassado,
} from "./apiCalendario";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/values";

export function useCalendarioFuturo(user_id, page) {
  const queryClient = useQueryClient();

  const { isPending, data, refetch } = useQuery({
    queryKey: ["calendario-futuro", user_id, page],
    queryFn: () => getCalendarioFuturo(user_id, page),
  });

  const calendarData = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["calendario-futuro", user_id, page + 1],
      queryFn: () => getCalendarioFuturo(user_id, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["calendario-futuro", user_id, page - 1],
      queryFn: () => getCalendarioFuturo(user_id, page - 1),
    });
  }

  return {
    isPending,
    calendarData,
    count,
    refetch,
  };
}

export function useCalendarioPassado(user_id, page) {
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: ["calendario-admin", user_id, page],
    queryFn: () => getCalendarioPassado(user_id, page),
  });
  const calendarData = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["calendario-admin", user_id, page + 1],
      queryFn: () => getCalendarioPassado(user_id, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["calendario-admin", user_id, page - 1],
      queryFn: () => getCalendarioPassado(user_id, page - 1),
    });
  }

  return {
    isPending,
    calendarData,
    count,
  };
}

export function useCalendarioAll(user_id, month, year) {
  const { isPending, data } = useQuery({
    queryKey: ["calendario", month, year],
    queryFn: () => getCalendarioAll(user_id, month, year),
    gcTime: 0,
  });
  const calendarData = data?.data;
  const count = data?.count;

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
    mutationFn: ({ user_id, date, turno, hospital }) => {
      return addPlantao(user_id, date, turno, hospital);
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
