import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Shop Quotation Items
export const LIST_QUOTATION_ITEMS_API = (quotationId: string): ApiEndpoint => ({
  url: apiUrls.LIST_QUOTATION_ITEMS_URL(quotationId),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const FIND_QUOTATION_ITEMS_BY_REQUEST_API = (
  quotationId: string
): ApiEndpoint => ({
  url: apiUrls.FIND_QUOTATION_ITEMS_BY_REQUEST_URL(quotationId),
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const FIND_QUOTATION_ITEMS_BY_SERVICES_API = (
  quotationId: string
): ApiEndpoint => ({
  url: apiUrls.FIND_QUOTATION_ITEMS_BY_SERVICES_URL(quotationId),
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const SUM_QUOTATION_ITEMS_TOTALS_API = (quotationId: string): ApiEndpoint => ({
  url: apiUrls.SUM_QUOTATION_ITEMS_TOTALS_URL(quotationId),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const CREATE_QUOTATION_ITEM_API: ApiEndpoint = {
  url: apiUrls.CREATE_QUOTATION_ITEM_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const CREATE_MANY_QUOTATION_ITEMS_API: ApiEndpoint = {
  url: apiUrls.CREATE_MANY_QUOTATION_ITEMS_URL,
  method: "POST",
  withToken: true,
  isMultipart: true,
  showToast: true,
};

export const UPSERT_MANY_QUOTATION_ITEMS_API: ApiEndpoint = {
  url: apiUrls.UPSERT_MANY_QUOTATION_ITEMS_URL,
  method: "PUT",
  withToken: true,
  isMultipart: true,
  showToast: true,
};

export const MARK_QUOTATION_ITEMS_REVISED_API = (
  quotationId: string
): ApiEndpoint => ({
  url: apiUrls.MARK_QUOTATION_ITEMS_REVISED_URL(quotationId),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const DELETE_QUOTATION_ITEMS_BY_QUOTATION_API = (
  quotationId: string
): ApiEndpoint => ({
  url: apiUrls.DELETE_QUOTATION_ITEMS_BY_QUOTATION_URL(quotationId),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const GET_QUOTATION_ITEM_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_QUOTATION_ITEM_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const UPDATE_QUOTATION_ITEM_API = (id: string): ApiEndpoint => ({
  url: apiUrls.UPDATE_QUOTATION_ITEM_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const PATCH_QUOTATION_ITEM_API = (id: string): ApiEndpoint => ({
  url: apiUrls.PATCH_QUOTATION_ITEM_URL(id),
  method: "PATCH",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const SET_QUOTATION_ITEM_REVISED_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SET_QUOTATION_ITEM_REVISED_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const DELETE_QUOTATION_ITEM_API = (id: string): ApiEndpoint => ({
  url: apiUrls.DELETE_QUOTATION_ITEM_URL(id),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});
