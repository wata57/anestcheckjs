import { useQuery } from "@tanstack/react-query";
import { getHospitals } from "./apiHospital";

export function useHospitalsData() {
  const { isPending, data: listaHospitais } = useQuery({
    queryKey: ["hospitais"],
    queryFn: () => getHospitals(),
  });
  return {
    isPending,
    listaHospitais,
  };
}
