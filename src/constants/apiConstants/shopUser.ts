import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Shop Users
export const CREATE_AND_ADD_USER_TO_SHOP_API: ApiEndpoint = {
  url: apiUrls.CREATE_AND_ADD_USER_TO_SHOP_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const REMOVE_USER_FROM_SHOP_API = (
  shopId: string,
  userId: string
): ApiEndpoint => ({
  url: apiUrls.REMOVE_USER_FROM_SHOP_URL(shopId, userId),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const GET_USERS_BY_SHOP_API = (shopId: string): ApiEndpoint => ({
  url: apiUrls.GET_USERS_BY_SHOP_URL(shopId),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});
