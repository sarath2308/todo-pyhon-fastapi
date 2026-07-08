import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "../api/api";
import toast from "react-hot-toast";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo) => {
      const response = await api.post("/todos", newTodo);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todo created successfully!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.detail || "An error occurred while creating the todo.");
      } else {
        toast.error("An error occurred while creating the todo.");
      }
    },
  });
};