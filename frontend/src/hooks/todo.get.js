import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await api.get("/todos");
      return response.data;
    },
    staleTime: 1000 * 60,
  });
};