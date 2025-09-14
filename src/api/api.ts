/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN, BASE_URL } from "@/constants/appConstants";
import { convertObjToQueryString } from "@/utils/utils";
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  CancelTokenSource,
} from "axios";
import { toast } from "react-hot-toast";
import { axiosInstance } from "./apiInterceptors";

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  isMultipart?: boolean;
  url: string;
  showToast?: boolean;
  responseType?: "json" | "blob" | "text";
  withToken?: boolean;
}

export interface ApiParams {
  endpoint: ApiEndpoint;
  payloadData?: any;
  id?: string | null | string[];
  params?: Record<string, any> | null;
  dynamicMessage?: string | null;
  cancelToken?: CancelTokenSource | null;
  withoutToken?: boolean;
}

// Main API function
export const api = async ({
  endpoint,
  payloadData,
  id = null,
  params = null,
  cancelToken = null,
}: ApiParams) => {
  const {
    url,
    method,
    isMultipart,
    showToast,
    responseType,
    withToken = false,
  } = endpoint;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || BASE_URL;
  let res: AxiosResponse | null = null;
  const token = withToken && localStorage.getItem(ACCESS_TOKEN);

  try {
    const headers: Record<string, string> = {
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // "ngrok-skip-browser-warning": "true", // need to add permission for custom cor headers in backend
    };

    const requestConfig: AxiosRequestConfig = {
      method,
      headers,
      url: `${baseUrl}${url}${id || ""}${
        params ? convertObjToQueryString(params) : ""
      }`,
      data: method !== "GET" && payloadData ? payloadData : undefined,
      params: method === "GET" ? payloadData : undefined,
      responseType,
      cancelToken: cancelToken ? cancelToken.token : undefined,
    };

    res = await axiosInstance(requestConfig);
  } catch (err) {
    interface ErrorPayload {
      message?: string;
      msg?: string;
      // allow any other JSON-y values from the backend
      [key: string]: unknown;
    }

    const error = err as AxiosError;
    const errorData: ErrorPayload = (error.response?.data as ErrorPayload) ?? {
      message: "An error occurred.",
    };

    // Define status-specific error messages
    const getStatusMessage = (status?: number): string => {
      switch (status) {
        case 400:
          return "Bad request. Please check your input and try again.";
        case 401:
          return "Unauthorized. Please log in again.";
        case 403:
          return "Access forbidden. You don't have permission to perform this action.";
        case 404:
          return "Resource not found. Please check the URL and try again.";

        case 422:
          return "Validation error. Please check your input data.";
        case 500:
          return "Internal server error. Please try again later.";
        case 502:
          return "Bad gateway. Please try again later.";
        case 503:
          return "Service unavailable. Please try again later.";

        default:
          return "An error occurred. Please try again later.";
      }
    };

    const errorMessage =
      typeof errorData.message === "string"
        ? errorData.message
        : Object.values(errorData)
            .map((val) => (Array.isArray(val) ? val.join(", ") : String(val)))
            .join(" ");

    const fallbackStatusMessage = getStatusMessage(error.response?.status);

    toast.error(errorMessage || fallbackStatusMessage);

    return {
      error: true,
      status: error.response?.status,
      data: null,
      message: errorMessage,
    };
  }

  if (
    res?.data &&
    !res?.data?.isError &&
    showToast &&
    (method === "PUT" ||
      method === "DELETE" ||
      method === "PATCH" ||
      method === "POST")
  ) {
    toast.success(
      res?.data?.message || res?.data?.welcome_message || "Success"
    );
  }

  return {
    error: false,
    status: res?.status,
    data: res?.data,
    message: res?.data?.message,
  };
};
