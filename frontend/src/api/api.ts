import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

interface IGetDelete {
  url: string;
  config?: AxiosRequestConfig;
  queryParams?: Record<string, any>;
}

interface IPostPut<RequestData> extends IGetDelete {
  requestData?: RequestData;
  config?: AxiosRequestConfig;
}

interface IRequestFnArgs<RequestData> extends IPostPut<RequestData> {
  method: "get" | "post" | "put" | "delete";
  config?: AxiosRequestConfig;
}

async function request<RequestData, ResponseData>({
  method,
  url,
  requestData,
  config,
  queryParams,
}: IRequestFnArgs<RequestData>): Promise<AxiosResponse<ResponseData>> {
  let response;
  const configWithParams = {
    ...(config || {}),
    params: queryParams,
  };
  if (method === "get") {
    response = await axios.get<ResponseData>(url, configWithParams);
  } else if (method === "post") {
    response = await axios.post<ResponseData>(
      url,
      requestData,
      configWithParams
    );
  } else if (method === "put") {
    response = await axios.put<ResponseData>(
      url,
      requestData,
      configWithParams
    );
  } else {
    response = await axios.delete<ResponseData>(url, configWithParams);
  }
  return response;
}

async function get<ResponseData = null>({ url, queryParams }: IGetDelete) {
  return request<undefined, ResponseData>({
    method: "get",
    url,
    queryParams,
  });
}

async function post<RequestData, ResponseData = null>({
  url,
  requestData,
  queryParams,
  config,
}: IPostPut<RequestData>) {
  const response = await request<RequestData, ResponseData>({
    method: "post",
    url,
    requestData,
    queryParams,
    config,
  });
  return response;
}

async function put<RequestData, ResponseData = null>({
  url,
  requestData,
  queryParams,
  config,
}: IPostPut<RequestData>) {
  return request<RequestData, ResponseData>({
    method: "put",
    url,
    requestData,
    queryParams,
    config,
  });
}

async function apiDelete<ResponseData = null>({
  url,
  queryParams,
  config,
}: IGetDelete) {
  return request<undefined, ResponseData>({
    method: "delete",
    url,
    queryParams,
    config,
  });
}

const api = {
  get,
  post,
  put,
  delete: apiDelete,
};

export default api;
