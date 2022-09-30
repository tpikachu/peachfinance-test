import { useMutation, useQueryClient } from "react-query";
import { IList } from "../types";
import api from "./api";

interface IRequestData {
  name: string;
}

const createList = async (requestData: IRequestData) => {
  const response = await api.post<IRequestData, IList>({
    url: "/lists",
    requestData,
  });
  return response;
};

const useMutationCreateList = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createList, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });
  return mutation;
};

export default useMutationCreateList;
