import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// User Service Requests
export const CREATE_USER_SERVICE_REQUEST_API: ApiEndpoint = {
  url: apiUrls.CREATE_USER_SERVICE_REQUEST_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const CREATE_USER_SERVICE_REQUEST_WITH_ITEMS_API: ApiEndpoint = {
  url: apiUrls.CREATE_USER_SERVICE_REQUEST_WITH_ITEMS_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const LIST_USER_SERVICE_REQUESTS_BY_USER_API: ApiEndpoint = {
  url: apiUrls.LIST_USER_SERVICE_REQUESTS_BY_USER_URL,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
};

export const LIST_USER_SERVICE_REQUESTS_BY_SHOP_API = (
  shopId: string
): ApiEndpoint => ({
  url: apiUrls.LIST_USER_SERVICE_REQUESTS_BY_SHOP_URL(shopId),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const LIST_USER_SERVICE_REQUESTS_BY_STATUS_API: ApiEndpoint = {
  url: apiUrls.LIST_USER_SERVICE_REQUESTS_BY_STATUS_URL,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
};

export const REPLACE_USER_SERVICE_REQUEST_ITEMS_API = (
  id: string
): ApiEndpoint => ({
  url: apiUrls.REPLACE_USER_SERVICE_REQUEST_ITEMS_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const GET_USER_SERVICE_REQUEST_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_USER_SERVICE_REQUEST_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const GET_DETAILED_USER_SERVICE_REQUEST_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_DETAILED_USER_SERVICE_REQUEST_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const UPDATE_USER_SERVICE_REQUEST_API = (id: string): ApiEndpoint => ({
  url: apiUrls.UPDATE_USER_SERVICE_REQUEST_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const PATCH_USER_SERVICE_REQUEST_API = (id: string): ApiEndpoint => ({
  url: apiUrls.PATCH_USER_SERVICE_REQUEST_URL(id),
  method: "PATCH",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const SET_USER_SERVICE_REQUEST_STATUS_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SET_USER_SERVICE_REQUEST_STATUS_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const DELETE_USER_SERVICE_REQUEST_API = (id: string): ApiEndpoint => ({
  url: apiUrls.DELETE_USER_SERVICE_REQUEST_URL(id),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});
