import { useMutation, useQueryClient } from "react-query";
import api from "./api";

const deleteList = async (listId: number) => {
  const response = await api.delete<null>({
    url: `/lists/${listId}`,
  });
  return response;
};

const useMutationDeleteList = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteList, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
  return mutation;
};

export default useMutationDeleteList;
