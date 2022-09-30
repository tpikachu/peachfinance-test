import { useCallback } from "react";
import { useQuery } from "react-query";
import { IList } from "../types";
import api from "./api";

interface IQueryParams {
  include?: "tasks" | null;
}

const getList = async (listId: number, queryParams?: IQueryParams) => {
  const response = await api.get<IList>({
    url: `/lists/${listId}`,
    queryParams,
  });
  return response.data;
};

interface IArgs {
  listId: number;
  includeTasks?: boolean | null;
}

const qp: IQueryParams = { include: "tasks" };

const useQueryList = (args: IArgs) => {
  const { listId, includeTasks: rawIncludeTasks } = args;
  const includeTasks = !!rawIncludeTasks;

  const innerGetList = useCallback(async () => {
    const queryParams = includeTasks ? qp : undefined;
    const list = await getList(listId, queryParams);
    return list;
  }, [listId, includeTasks]);

  const query = useQuery<IList>(["lists", includeTasks, listId], innerGetList);
  return query;
};

export default useQueryList;
