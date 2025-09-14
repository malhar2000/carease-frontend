// apiConstants/shopUserServiceRequest.ts

import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Create or Get a ShopUserServiceRequest
export const CREATE_OR_GET_SHOP_USER_SERVICE_REQUEST_API: ApiEndpoint = {
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_CREATE_OR_GET_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

// Invite Shops
export const INVITE_SHOPS_API: ApiEndpoint = {
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_INVITE_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

// Invite Shops with Notes
export const INVITE_SHOPS_WITH_NOTES_API: ApiEndpoint = {
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_INVITE_WITH_NOTES_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

// Get by ID
export const GET_SHOP_USER_SERVICE_REQUEST_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_GET_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

// List by Request ID
export const LIST_SHOP_USER_SERVICE_REQUESTS_BY_REQUEST_API = (
  requestID: string
): ApiEndpoint => ({
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_LIST_BY_REQUEST_URL(requestID),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

// List by Shop ID
export const LIST_SHOP_USER_SERVICE_REQUESTS_BY_SHOP_API = (shopID: string): ApiEndpoint => ({
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_LIST_BY_SHOP_URL(shopID),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

// Set Status
export const SET_SHOP_USER_SERVICE_REQUEST_STATUS_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_SET_STATUS_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

// Update Notes
export const UPDATE_SHOP_USER_SERVICE_REQUEST_NOTES_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_UPDATE_NOTES_URL(id),
  method: "PATCH",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

// Delete
export const DELETE_SHOP_USER_SERVICE_REQUEST_API = (id: string): ApiEndpoint => ({
  url: apiUrls.SHOP_USER_SERVICE_REQUEST_DELETE_URL(id),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});
