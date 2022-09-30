import { useCallback } from "react";
import { useQuery } from "react-query";
import { ITask } from "../types";
import api from "./api";

const getTask = async (taskId: number) => {
  const response = await api.get<ITask>({ url: `/tasks/${taskId}` });
  return response.data;
};

const useQueryTask = (taskId: number) => {
  const innerGetTask = useCallback(async () => {
    const task = await getTask(taskId);
    return task;
  }, [taskId]);

  const query = useQuery<ITask>(["tasks", taskId], innerGetTask);
  return query;
};

export default useQueryTask;
