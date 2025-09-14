import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/appConstants";
import {
  setCookie,
  getCookie,
  deleteCookie,
  CookieValueTypes,
} from "cookies-next";

/**
 * Default cookie options for consistent cookie settings
 */
const defaultOptions = {
  path: "/", // Make cookies available for all paths
  sameSite: "lax" as const, // Provides CSRF protection
  secure: process.env.NODE_ENV === "production", // Secure in production
  maxAge: 60 * 60 * 24 * 7, // 7 days default
};

/**
 * Create a new cookie with the provided key, value, and options
 */
export const createCookie = (
  key: string,
  value: string,
  options = {}
): void => {
  setCookie(key, value, { ...defaultOptions, ...options });
};

/**
 * Get a cookie value by key
 */
export const getCookieValue = (key: string): CookieValueTypes => {
  return getCookie(key) as CookieValueTypes;
};

/**
 * Remove a cookie by key
 */
export const clearCookie = (key: string, options = {}): void => {
  deleteCookie(key, { ...defaultOptions, ...options });
};

/**
 * Set authentication tokens (both access and refresh)
 */
export const setAuthTokens = (
  accessToken: string,
  refreshToken: string
): void => {
  createCookie(ACCESS_TOKEN, accessToken);
  createCookie(REFRESH_TOKEN, refreshToken);
};

/**
 * Clear authentication tokens
 */
export const clearAuthTokens = (): void => {
  clearCookie(ACCESS_TOKEN);
  clearCookie(REFRESH_TOKEN);
};

/**
 * Get authentication tokens
 */
export const getAuthTokens = () => {
  return {
    accessToken: getCookieValue(ACCESS_TOKEN),
    refreshToken: getCookieValue(REFRESH_TOKEN),
  };
};

/**
 * Check if user is authenticated (has a valid access token)
 */
export const isAuthenticated = (): boolean => {
  return !!getCookieValue(ACCESS_TOKEN);
};
