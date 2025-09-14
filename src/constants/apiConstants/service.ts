import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Services
export const LIST_SERVICES_API: ApiEndpoint = {
  url: apiUrls.LIST_SERVICES_URL,
  method: "GET",
  withToken: true,
  isMultipart: false,
  showToast: false,
};
