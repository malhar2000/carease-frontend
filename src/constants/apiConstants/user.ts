import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Users
export const CREATE_USER_API: ApiEndpoint = {
  url: apiUrls.CREATE_USER_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const GET_USER_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_USER_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const ACTIVATE_USER_API: ApiEndpoint = {
  url: apiUrls.ACTIVATE_USER_URL,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: true,
};
