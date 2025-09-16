export const apiUrls = {
  // Shops
  CREATE_SHOP_URL: "/api/v1/shops/",
  UPLOAD_SHOP_FILE_URL: "/api/v1/shops/upload",
  UPDATE_SHOP_URL: (id: string) => `/api/v1/shops/${id}`,
  DELETE_SHOP_URL: (id: string) => `/api/v1/shops/${id}`,
  GET_SHOP_BY_ID_URL: (id: string) => `/api/v1/shops/${id}`,
  LIST_SHOPS_URL: "/api/v1/shops/",

  // Shop Services
  ADD_SERVICE_TO_SHOP_URL: "/api/v1/shopservices/",
  REMOVE_SERVICE_FROM_SHOP_URL: (shopId: string, serviceId: string) =>
    `/api/v1/shopservices/${shopId}/${serviceId}`,
  GET_SERVICES_BY_SHOP_URL: (shopId: string) =>
    `/api/v1/shopservices/${shopId}`,

  // Shop Users
  CREATE_AND_ADD_USER_TO_SHOP_URL: "/api/v1/shop-users/",
  REMOVE_USER_FROM_SHOP_URL: (shopId: string, userId: string) =>
    `/api/v1/shop-users/${shopId}/${userId}`,
  GET_USERS_BY_SHOP_URL: (shopId: string) =>
    `/api/v1/shop-users/${shopId}/users`,

  // User Service Requests
  CREATE_USER_SERVICE_REQUEST_URL: "/api/v1/user-service-requests/",
  CREATE_USER_SERVICE_REQUEST_WITH_ITEMS_URL:
    "/api/v1/user-service-requests/with-items",
  LIST_USER_SERVICE_REQUESTS_BY_USER_URL:
    "/api/v1/user-service-requests/by-user",
  LIST_USER_SERVICE_REQUESTS_BY_SHOP_URL: (shopId: string) =>
    `/api/v1/user-service-requests/by-shop/${shopId}`,
  LIST_USER_SERVICE_REQUESTS_BY_STATUS_URL:
    "/api/v1/user-service-requests/status",
  REPLACE_USER_SERVICE_REQUEST_ITEMS_URL: (id: string) =>
    `/api/v1/user-service-requests/${id}/items`,
  GET_USER_SERVICE_REQUEST_BY_ID_URL: (id: string) =>
    `/api/v1/user-service-requests/${id}`,
  GET_DETAILED_USER_SERVICE_REQUEST_BY_ID_URL: (id: string) =>
    `/api/v1/user-service-requests/${id}?details=1`,
  UPDATE_USER_SERVICE_REQUEST_URL: (id: string) =>
    `/api/v1/user-service-requests/${id}`,
  PATCH_USER_SERVICE_REQUEST_URL: (id: string) =>
    `/api/v1/user-service-requests/${id}`,
  SET_USER_SERVICE_REQUEST_STATUS_URL: (id: string) =>
    `/api/v1/user-service-requests/${id}/status`,
  DELETE_USER_SERVICE_REQUEST_URL: (id: string) =>
    `/api/v1/user-service-requests/${id}`,

  // Users
  CREATE_USER_URL: "/api/v1/users/",
  GET_USER_BY_ID_URL: (id: string) => `/api/v1/users/${id}`,
  ACTIVATE_USER_URL: "/api/v1/users/activation",

  // Auth
  LOGIN_URL: "/api/v1/auth/login",
  REFRESH_TOKEN_URL: "/api/v1/auth/refresh",

  // MFA (TOTP)
  ENROLL_TOTP_URL: "/api/v1/mfa/totp/enroll",
  VERIFY_TOTP_URL: "/api/v1/mfa/totp/verify",

  // Vehicles
  CREATE_VEHICLE_URL: "/api/v1/vehicles/",
  GET_VEHICLE_BY_ID_URL: (id: string) => `/api/v1/vehicles/${id}`,
  LIST_VEHICLES_URL: "/api/v1/vehicles/",
  UPDATE_VEHICLE_URL: (id: string) => `/api/v1/vehicles/${id}`,
  DELETE_VEHICLE_URL: (id: string) => `/api/v1/vehicles/${id}`,

  // Services
  LIST_SERVICES_URL: "/api/v1/services/",

  // Shop Quotations
  CREATE_SHOP_QUOTATION_URL: "/api/v1/shop-quotations/",
  CREATE_SHOP_QUOTATION_WITH_ITEMS_URL:
    "/api/v1/shop-quotations/with-items",
  SET_SHOP_QUOTATION_REVISED_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}/revised`,
  LIST_SHOP_QUOTATIONS_BY_REQUEST_URL: (requestId: string) =>
    `/api/v1/shop-quotations/by-request/${requestId}`,
  LIST_SHOP_QUOTATIONS_BY_SHOP_URL: (shopId: string) =>
    `/api/v1/shop-quotations/by-shop/${shopId}`,
  LIST_SHOP_QUOTATIONS_BY_STATUS_URL: "/api/v1/shop-quotations/status",
  REPLACE_SHOP_QUOTATION_ITEMS_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}/items`,
  RECOMPUTE_SHOP_QUOTATION_TOTALS_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}/totals/recompute`,
  GET_SHOP_QUOTATION_BY_ID_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}`,
  GET_QUOTATION_FOR_USER_BY_ID_URL: (id: string) =>
    `/api/v1/shop-quotations/for-user/${id}`,
  UPDATE_SHOP_QUOTATION_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}`,
  PATCH_SHOP_QUOTATION_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}`,
  SET_SHOP_QUOTATION_STATUS_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}/status`,
  DELETE_SHOP_QUOTATION_URL: (id: string) =>
    `/api/v1/shop-quotations/${id}`,
  ACCEPT_SHOP_QUOTATION_URL: (id: string) =>
    `/api/v1/shop-quotations/accept/${id}`,

  // Shop Quotation Items
  LIST_QUOTATION_ITEMS_URL: (quotationId: string) =>
    `/api/v1/shop-quotation-items/by-quotation/${quotationId}`,
  FIND_QUOTATION_ITEMS_BY_REQUEST_URL: (quotationId: string) =>
    `/api/v1/shop-quotation-items/by-quotation/${quotationId}/by-request-items`,
  FIND_QUOTATION_ITEMS_BY_SERVICES_URL: (quotationId: string) =>
    `/api/v1/shop-quotation-items/by-quotation/${quotationId}/by-services`,
  SUM_QUOTATION_ITEMS_TOTALS_URL: (quotationId: string) =>
    `/api/v1/shop-quotation-items/by-quotation/${quotationId}/sum`,
  CREATE_QUOTATION_ITEM_URL: "/api/v1/shop-quotation-items/",
  CREATE_MANY_QUOTATION_ITEMS_URL: "/api/v1/shop-quotation-items/bulk",
  UPSERT_MANY_QUOTATION_ITEMS_URL:
    "/api/v1/shop-quotation-items/bulk/upsert",
  MARK_QUOTATION_ITEMS_REVISED_URL: (quotationId: string) =>
    `/api/v1/shop-quotation-items/by-quotation/${quotationId}/revised`,
  DELETE_QUOTATION_ITEMS_BY_QUOTATION_URL: (quotationId: string) =>
    `/api/v1/shop-quotation-items/by-quotation/${quotationId}`,
  GET_QUOTATION_ITEM_BY_ID_URL: (id: string) =>
    `/api/v1/shop-quotation-items/${id}`,
  UPDATE_QUOTATION_ITEM_URL: (id: string) =>
    `/api/v1/shop-quotation-items/${id}`,
  PATCH_QUOTATION_ITEM_URL: (id: string) =>
    `/api/v1/shop-quotation-items/${id}`,
  SET_QUOTATION_ITEM_REVISED_URL: (id: string) =>
    `/api/v1/shop-quotation-items/${id}/revised`,
  DELETE_QUOTATION_ITEM_URL: (id: string) =>
    `/api/v1/shop-quotation-items/${id}`,
  UPDATE_SUGGESTED_ITEM_STATUS_URL: (itemId: string) =>
    `/api/v1/shop-quotations/suggested/${itemId}`,

  // Shop User Service Requests
  SHOP_USER_SERVICE_REQUEST_CREATE_OR_GET_URL: "/api/v1/shop-user-service-requests",
  SHOP_USER_SERVICE_REQUEST_INVITE_URL: "/api/v1/shop-user-service-requests/invite",
  SHOP_USER_SERVICE_REQUEST_INVITE_WITH_NOTES_URL:
    "/api/v1/shop-user-service-requests/invite-with-notes",
  SHOP_USER_SERVICE_REQUEST_GET_BY_ID_URL: (id: string) =>
    `/api/v1/shop-user-service-requests/${id}?details=1`,
  SHOP_USER_SERVICE_REQUEST_LIST_BY_REQUEST_URL: (requestID: string) =>
    `/api/v1/shop-user-service-requests/by-request/${requestID}`,
  SHOP_USER_SERVICE_REQUEST_LIST_BY_SHOP_URL: (shopID: string) =>
    `/api/v1/shop-user-service-requests/by-shop/${shopID}`,
  SHOP_USER_SERVICE_REQUEST_SET_STATUS_URL: (id: string) =>
    `/api/v1/shop-user-service-requests/${id}/status`,
  SHOP_USER_SERVICE_REQUEST_UPDATE_NOTES_URL: (id: string) =>
    `/api/v1/shop-user-service-requests/${id}`,
  SHOP_USER_SERVICE_REQUEST_DELETE_URL: (id: string) =>
    `/api/v1/shop-user-service-requests/${id}`,
};
