import { ApiEndpoint } from "@/api/api";
import { apiUrls } from "../apiUrls";

// Authentication
export const LOGIN_API: ApiEndpoint = {
  url: apiUrls.LOGIN_URL,
  method: "POST",
  withToken: false,
  isMultipart: false,
  showToast: true,
};

export const REFRESH_TOKEN_API: ApiEndpoint = {
  url: apiUrls.REFRESH_TOKEN_URL,
  method: "POST",
  withToken: false,
  isMultipart: false,
  showToast: false,
};

// MFA - TOTP
export const ENROLL_TOTP_API: ApiEndpoint = {
  url: apiUrls.ENROLL_TOTP_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};

export const VERIFY_TOTP_API: ApiEndpoint = {
  url: apiUrls.VERIFY_TOTP_URL,
  method: "POST",
  withToken: true,
  isMultipart: false,
  showToast: true,
};
