import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../api/api";
import toast from "react-hot-toast";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId) => {
      const response = await api.delete(`/todos/${todoId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todo deleted successfully!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.detail || "An error occurred while deleting the todo.");
      } else {
        toast.error("An error occurred while deleting the todo.");
      }
    },
  });
};