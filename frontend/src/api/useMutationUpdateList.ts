import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { IList } from "../types";
import api from "./api";

interface IRequestData {
  name: string;
}

const updateList = async (listId: number, requestData: IRequestData) => {
  const response = await api.put<IRequestData, IList>({
    url: `/lists/${listId}`,
    requestData,
  });
  return response.data;
};

interface IMutate {
  name: string;
}

const useMutationUpdateList = (listId: number) => {
  const queryClient = useQueryClient();

  const innerUpdateList = useCallback(
    async ({ name }: IMutate) => {
      const list = await updateList(listId, { name });
      return list;
    },
    [listId]
  );

  const mutation = useMutation(innerUpdateList, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
  return mutation;
};

export default useMutationUpdateList;
