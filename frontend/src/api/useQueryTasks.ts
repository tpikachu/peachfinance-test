import { useCallback } from "react";
import { useQuery } from "react-query";
import { ITask } from "../types";
import api from "./api";

const getTasks = async (listId: number) => {
  const response = await api.get<ITask[]>({ url: `/lists/${listId}/tasks` });
  return response.data;
};

const useQueryTasks = (listId: number) => {
  const innerGetTasks = useCallback(async () => {
    const tasks = await getTasks(listId);
    return tasks;
  }, [listId]);

  const query = useQuery<ITask[]>(["tasks", listId], innerGetTasks);
  return query;
};

export default useQueryTasks;
