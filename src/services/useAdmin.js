import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConfirmarPlantao } from "./apiAdmin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      navigate("/admin?content=plantoes-pendentes");
    },
    onError: () => {
      toast.error(
        "Houve um erro na confirmação dos plantões, tentar novamente."
      );
    },
  });

  return { confirmarPlantao, isPending };
}
