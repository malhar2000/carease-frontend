import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Shop Services
export const ADD_SERVICE_TO_SHOP_API: ApiEndpoint = {
  url: apiUrls.ADD_SERVICE_TO_SHOP_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const REMOVE_SERVICE_FROM_SHOP_API = (
  shopId: string,
  serviceId: string
): ApiEndpoint => ({
  url: apiUrls.REMOVE_SERVICE_FROM_SHOP_URL(shopId, serviceId),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const GET_SERVICES_BY_SHOP_API = (shopId: string): ApiEndpoint => ({
  url: apiUrls.GET_SERVICES_BY_SHOP_URL(shopId),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});
