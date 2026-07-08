import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../api/api";
import toast from "react-hot-toast";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTodo) => {
      const { id, ...payload } = updatedTodo;
      const response = await api.patch(`/todos/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todo updated successfully!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.detail || "An error occurred while updating the todo.");
      } else {
        toast.error("An error occurred while updating the todo.");
      }
    },
  });
};