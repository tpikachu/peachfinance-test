import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ITask } from "../types";
import api from "./api";

interface IRequestData {
  text: string;
}

const createTask = async (listId: number, requestData: IRequestData) => {
  const response = await api.post<IRequestData, ITask>({
    url: `/lists/${listId}/tasks`,
    requestData,
  });
  return response;
};

interface IMutate {
  text: string;
}

const useMutationCreateTask = (listId: number) => {
  const queryClient = useQueryClient();

  const innerCreateTask = useCallback(
    async ({ text }: IMutate) => {
      const task = await createTask(listId, { text });
      return task;
    },
    [listId]
  );

  const mutation = useMutation(innerCreateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
      queryClient.invalidateQueries(["tasks", listId]);
    },
  });
  return mutation;
};

export default useMutationCreateTask;
