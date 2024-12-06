import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPlantao,
  deletePlantao,
  getCalendario,
  getCalendarioAll,
} from "./apiCalendario";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/values";

export function useCalendario(user_id, page, onlyUpcomingDates) {
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: [
      "calendario",
      user_id,
      page,
      `${onlyUpcomingDates ? "upcoming-dates" : null}`,
    ],
    queryFn: () =>
      getCalendario(
        user_id,
        page,
        `${onlyUpcomingDates ? "upcoming-dates" : null}`
      ),
  });
  const calendarData = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        "calendario",
        user_id,
        page + 1,
        `${onlyUpcomingDates ? "upcoming-dates" : null}`,
      ],
      queryFn: () => getCalendario(user_id, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        "calendario",
        user_id,
        page - 1,
        `${onlyUpcomingDates ? "upcoming-dates" : null}`,
      ],
      queryFn: () => getCalendario(user_id, page - 1),
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
