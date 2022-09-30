import { useMutation, useQueryClient } from "react-query";
import api from "./api";

const deleteTask = async (taskId: number) => {
  const response = await api.delete<null>({
    url: `/tasks/${taskId}`,
  });
  return response;
};

const useMutationDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
      queryClient.invalidateQueries(["tasks"]);
    },
  });
  return mutation;
};

export default useMutationDeleteTask;
