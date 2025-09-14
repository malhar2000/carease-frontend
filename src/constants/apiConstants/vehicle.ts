import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Vehicles
export const CREATE_VEHICLE_API: ApiEndpoint = {
  url: apiUrls.CREATE_VEHICLE_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const GET_VEHICLE_BY_ID_API = (id: string): ApiEndpoint => ({
  url: apiUrls.GET_VEHICLE_BY_ID_URL(id),
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
});

export const LIST_VEHICLES_API: ApiEndpoint = {
  url: apiUrls.LIST_VEHICLES_URL,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
};

export const UPDATE_VEHICLE_API = (id: string): ApiEndpoint => ({
  url: apiUrls.UPDATE_VEHICLE_URL(id),
  method: "PUT",
  withToken: true,
  isMultipart: false,
  showToast: true,
});

export const DELETE_VEHICLE_API = (id: string): ApiEndpoint => ({
  url: apiUrls.DELETE_VEHICLE_URL(id),
  method: "DELETE",
  withToken: true,
  isMultipart: false,
  showToast: true,
});
