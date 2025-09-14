import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Shop Quotations
export const CREATE_SHOP_QUOTATION_API: ApiEndpoint = {
  url: apiUrls.CREATE_SHOP_QUOTATION_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const CREATE_SHOP_QUOTATION_WITH_ITEMS_API: ApiEndpoint = {
  url: apiUrls.CREATE_SHOP_QUOTATION_WITH_ITEMS_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const SET_SHOP_QUOTATION_REVISED_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SET_SHOP_QUOTATION_REVISED_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const LIST_SHOP_QUOTATIONS_BY_REQUEST_API = (
  requestId: string
): ApiEndpoint => ({
  url: apiUrls.LIST_SHOP_QUOTATIONS_BY_REQUEST_URL(requestId),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const LIST_SHOP_QUOTATIONS_BY_SHOP_API = (shopId: string): ApiEndpoint => ({
  url: apiUrls.LIST_SHOP_QUOTATIONS_BY_SHOP_URL(shopId),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const LIST_SHOP_QUOTATIONS_BY_STATUS_API: ApiEndpoint = {
  url: apiUrls.LIST_SHOP_QUOTATIONS_BY_STATUS_URL,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
};

export const REPLACE_SHOP_QUOTATION_ITEMS_API = (id: string): ApiEndpoint => ({
  url: apiUrls.REPLACE_SHOP_QUOTATION_ITEMS_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: true,
  showToast: true,
});

export const RECOMPUTE_SHOP_QUOTATION_TOTALS_API = (id: string): ApiEndpoint => ({
  url: apiUrls.RECOMPUTE_SHOP_QUOTATION_TOTALS_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const GET_SHOP_QUOTATION_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_SHOP_QUOTATION_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const GET_QUOTATION_FOR_USER_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_QUOTATION_FOR_USER_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const UPDATE_SHOP_QUOTATION_API = (id: string): ApiEndpoint => ({
  url: apiUrls.UPDATE_SHOP_QUOTATION_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const PATCH_SHOP_QUOTATION_API = (id: string): ApiEndpoint => ({
  url: apiUrls.PATCH_SHOP_QUOTATION_URL(id),
  method: "PATCH",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const SET_SHOP_QUOTATION_STATUS_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SET_SHOP_QUOTATION_STATUS_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const DELETE_SHOP_QUOTATION_API = (id: string): ApiEndpoint => ({
  url: apiUrls.DELETE_SHOP_QUOTATION_URL(id),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const ACCEPT_SHOP_QUOTATION_API = (id: string): ApiEndpoint => ({
  url: apiUrls.ACCEPT_SHOP_QUOTATION_URL(id),
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
});
