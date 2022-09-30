import { useCallback } from "react";
import { useQuery } from "react-query";
import { IList } from "../types";
import api from "./api";

interface IQueryParams {
  include?: "tasks" | null;
}

const getLists = async (queryParams?: IQueryParams) => {
  const response = await api.get<IList[]>({ url: "/lists", queryParams });
  return response.data;
};

interface IArgs {
  includeTasks?: boolean | null;
}

const qp: IQueryParams = { include: "tasks" };

const useQueryLists = (args?: IArgs) => {
  const { includeTasks: rawIncludeTasks } = args || {};
  const includeTasks = !!rawIncludeTasks;

  const innerGetLists = useCallback(async () => {
    const queryParams = includeTasks ? qp : undefined;
    const lists = await getLists(queryParams);
    return lists;
  }, [includeTasks]);

  const query = useQuery<IList[]>(["lists", includeTasks], innerGetLists);
  return query;
};

export default useQueryLists;
