import { apiUrls } from "@/constants/apiUrls";
import {
  ACCESS_TOKEN,
  BASE_URL,
  REFRESH_TOKEN,
} from "@/constants/appConstants";
import { clearAuthTokens, createCookie, getCookieValue } from "@/utils/cookies";
import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import https from "https";

// TODO: IN PRODUCTION CHANGE IT TO COOKIE BASED AUTHENTICATION (i.e. withcredentials: true)
export const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    // withCredentials: true,
  }),
});

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

// Function to check if the token is expired with proper error handling
const isTokenExpired = (): boolean => {
  try {
    // Use consistent storage method - prefer cookies for security
    const token =
      getCookieValue(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN);
    if (!token) return true;

    // Safely decode JWT token
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return true;

    const expirationTime = payload.exp * 1000;
    // Add buffer time (30 seconds) before actual expiration
    return Date.now() >= expirationTime - 5000;
  } catch (error) {
    console.error("Error checking token expiry:", error);
    return true;
  }
};

// Function to get stored tokens consistently
const getStoredTokens = () => {
  return {
    accessToken:
      getCookieValue(ACCESS_TOKEN) || localStorage.getItem(ACCESS_TOKEN),
    refreshToken:
      getCookieValue(REFRESH_TOKEN) || localStorage.getItem(REFRESH_TOKEN),
  };
};

// Request interceptor with improved token handling
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { accessToken, refreshToken } = getStoredTokens();

    // If we have tokens and access token is expired, refresh it
    if (accessToken && refreshToken && isTokenExpired()) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            config.headers.set("Authorization", `Bearer ${newAccessToken}`);

            // Process all queued requests with new token
            refreshQueue.forEach(({ resolve }) => resolve(newAccessToken));
            refreshQueue = [];
          } else {
            // Refresh failed, reject all queued requests
            refreshQueue.forEach(({ reject }) =>
              reject(new Error("Token refresh failed"))
            );
            refreshQueue = [];

            await handleAuthFailure();
            return Promise.reject(new Error("Authentication failed"));
          }
        } catch (error) {
          // Handle refresh error
          refreshQueue.forEach(({ reject }) => reject(error));
          refreshQueue = [];
          await handleAuthFailure();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If refresh is in progress, queue the request
        return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
          refreshQueue.push({
            resolve: (token: string) => {
              config.headers.set("Authorization", `Bearer ${token}`);
              resolve(config);
            },
            reject: (error: any) => reject(error),
          });

          // Add timeout for queued requests (5 seconds)
          setTimeout(() => {
            reject(new Error("Token refresh timeout"));
          }, 5000);
        });
      }
    } else if (accessToken && !isTokenExpired()) {
      // Token is valid, add to headers
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken } = getStoredTokens();

      if (refreshToken && !isRefreshing) {
        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${newAccessToken}`
            );
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          await handleAuthFailure();
          return Promise.reject(refreshError);
        }
      }

      await handleAuthFailure();
    }

    return Promise.reject(error);
  }
);

// Handle authentication failure consistently
const handleAuthFailure = async () => {
  await clearTokensAtomically();

  // Only redirect if we're in a browser environment
  if (typeof window !== "undefined") {
    window.location.replace(`${window.location.origin}/`);
  }
};

/* -------------------------- Getting a new access token after expiry -------------------------- */
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken =
      getCookieValue(REFRESH_TOKEN) || localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Create a fresh axios instance to avoid interceptor loops
    const refreshAxios = axios.create({
      timeout: 5000, // 5 second timeout
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    const response: AxiosResponse<{
      access: string;
      refresh?: string;
    }> = await refreshAxios.post(
      `${BASE_URL}${apiUrls.GET_REFRESH_TOKEN_URL}`,
      {
        refresh: refreshToken,
      }
    );

    if (response.status === 200) {
      const newAccessToken = response?.data?.access;
      const newRefreshToken = response?.data?.refresh;

      if (!newAccessToken) {
        throw new Error("Invalid response: missing access token");
      }

      // Validate the new access token is a proper JWT
      if (!isValidJWT(newAccessToken)) {
        throw new Error("Invalid access token format received");
      }

      // Validate refresh token if provided
      if (newRefreshToken && !isValidJWT(newRefreshToken)) {
        throw new Error("Invalid refresh token format received");
      }

      // Store tokens consistently and atomically
      await storeTokensAtomically(newAccessToken, newRefreshToken);

      return newAccessToken;
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error: any) {
    console.error("Token refresh failed:", error);

    // Handle specific error types
    if (error.code === "ECONNABORTED") {
      console.error("Token refresh timed out");
    } else if (error.response?.status === 401) {
      console.error("Refresh token is invalid or expired");
    } else if (error.response?.status >= 500) {
      console.error("Server error during token refresh");
    }

    // Clear invalid tokens only on auth errors
    if (
      error.response?.status === 401 ||
      error.message.includes("No refresh token")
    ) {
      await clearTokensAtomically();
    }

    return null;
  }
};

// Helper function to validate JWT token format
const isValidJWT = (token: string): boolean => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    // Validate each part can be base64 decoded
    JSON.parse(atob(parts[1])); // payload

    // Check if token has expiration time
    const payload = JSON.parse(atob(parts[1]));
    return typeof payload.exp === "number" && payload.exp > 0;
  } catch (error) {
    return false;
  }
};

// Helper function to store tokens atomically
const storeTokensAtomically = async (
  accessToken: string,
  refreshToken?: string
): Promise<void> => {
  try {
    // Store in cookies first (more secure)
    createCookie(ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      createCookie(REFRESH_TOKEN, refreshToken);
    }

    // Then store in localStorage as backup
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
  } catch (error) {
    console.error("Failed to store tokens:", error);
    throw new Error("Token storage failed");
  }
};

// Helper function to clear tokens atomically
const clearTokensAtomically = async (): Promise<void> => {
  try {
    // Clear from cookies
    clearAuthTokens();

    // Clear from localStorage
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  } catch (error) {
    console.error("Failed to clear tokens:", error);
  }
};
