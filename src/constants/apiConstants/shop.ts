import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Shops
export const CREATE_SHOP_API: ApiEndpoint = {
  url: apiUrls.CREATE_SHOP_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const UPLOAD_SHOP_FILE_API: ApiEndpoint = {
  url: apiUrls.UPLOAD_SHOP_FILE_URL,
  method: "POST",
  withToken: true,
  isMultipart: true,
  showToast: true,
};

export const UPDATE_SHOP_API = (id: string): ApiEndpoint => ({
  url: apiUrls.UPDATE_SHOP_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const DELETE_SHOP_API = (id: string): ApiEndpoint => ({
  url: apiUrls.DELETE_SHOP_URL(id),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const GET_SHOP_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_SHOP_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const LIST_SHOPS_API: ApiEndpoint = {
  url: apiUrls.LIST_SHOPS_URL,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
};