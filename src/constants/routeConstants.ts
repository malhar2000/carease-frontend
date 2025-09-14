// Token constants
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const USER_INFO = "userInfo";

// Public routes
export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const LISTINGS_PATH = "/listings";
export const ABOUT_PATH = "/aboutus";
export const CONTACT_PATH = "/contact-us";
export const BROKER_REGISTRATION_PATH = "/broker-registration";
export const SEARCH_BY_PLACE_PATH = "/searchByPlace";
export const WAREHOUSE_DETAIL_PATH = "/warehouse/detail";
// Dashboard base paths
export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_MERCHANTS_PATH = "/dashboard/merchants";
export const DASHBOARD_WAREHOUSE_OPERATOR_PATH =
  "/dashboard/warehouse-operator";
export const DASHBOARD_BROKER_PATH = "/dashboard/broker";

// Common dashboard paths
export const SETTINGS_PATH = "/dashboard/settings";
export const PROFILE_PATH = "/profile";

// Merchants paths
export const MERCHANTS_RENTALS_PATH = "/dashboard/merchants/rentals";
export const MERCHANTS_SAVED_PATH = "/dashboard/merchants/saved";
export const MERCHANTS_QA_PATH = "/dashboard/merchants/qa/new";
export const MERCHANTS_BOOKINGS_PATH = "/dashboard/merchants/bookings";

// Warehouse operator paths
export const WAREHOUSE_OPERATOR_PROPERTIES_PATH =
  "/dashboard/warehouse-operator/properties";
export const WAREHOUSE_OPERATOR_LISTINGS_PATH =
  "/dashboard/warehouse-operator/listings";
export const WAREHOUSE_OPERATOR_CREATE_LISTING_PATH =
  "/dashboard/warehouse-operator/listings/new";
export const WAREHOUSE_OPERATOR_ANALYTICS_PATH =
  "/dashboard/warehouse-operator/analytics";
export const WAREHOUSE_OPERATOR_PAYMENTS_PATH =
  "/dashboard/warehouse-operator/payments";

// Broker paths
export const BROKER_CLIENTS_PATH = "/dashboard/broker/clients";
export const BROKER_DEALS_PATH = "/dashboard/broker/deals";
export const BROKER_MARKET_PATH = "/dashboard/broker/market";
export const BROKER_LISTINGS_PATH = "/dashboard/broker/listings";

// Routes with custom footer handling (pages that provide their own footer)
export const ROUTES_WITH_CUSTOM_FOOTER = [
  PROFILE_PATH,
  // Add other paths here as needed in the future
];

// Public route paths array
export const PUBLIC_PATHS = [
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  LISTINGS_PATH,
  ABOUT_PATH,
  CONTACT_PATH,
  BROKER_REGISTRATION_PATH,
  SEARCH_BY_PLACE_PATH,
  WAREHOUSE_DETAIL_PATH,
];

// Role-based route mapping
export const ROLE_ROUTES = {
  merchants: [DASHBOARD_MERCHANTS_PATH],
  "warehouse-operator": [DASHBOARD_WAREHOUSE_OPERATOR_PATH],
  broker: [DASHBOARD_BROKER_PATH],
};

// Navigation items by role
export const NAV_ITEMS = {
  merchants: [
    {
      id: "merchants-rentals",
      label: "My Rentals",
      href: MERCHANTS_RENTALS_PATH,
    },
    {
      id: "merchants-saved",
      label: "Saved Properties",
      href: MERCHANTS_SAVED_PATH,
    },
    { id: "merchants-qa", label: "Ask a Question", href: MERCHANTS_QA_PATH },
    {
      id: "merchants-bookings",
      label: "Bookings",
      href: MERCHANTS_BOOKINGS_PATH,
    },
  ],
  "warehouse-operator": [
    {
      id: "warehouse-operator-properties",
      label: "My Properties",
      href: WAREHOUSE_OPERATOR_PROPERTIES_PATH,
    },
    {
      id: "warehouse-operator-listings",
      label: "Create Listing",
      href: WAREHOUSE_OPERATOR_CREATE_LISTING_PATH,
    },
    {
      id: "warehouse-operator-listings-manage",
      label: "Manage Listings",
      href: WAREHOUSE_OPERATOR_LISTINGS_PATH,
    },
    {
      id: "warehouse-operator-analytics",
      label: "Analytics",
      href: WAREHOUSE_OPERATOR_ANALYTICS_PATH,
    },
    {
      id: "warehouse-operator-payments",
      label: "Payments",
      href: WAREHOUSE_OPERATOR_PAYMENTS_PATH,
    },
  ],
  broker: [
    { id: "broker-deals", label: "Active Deals", href: BROKER_DEALS_PATH },
    {
      id: "broker-clients",
      label: "Client Management",
      href: BROKER_CLIENTS_PATH,
    },
    { id: "broker-market", label: "Market Analysis", href: BROKER_MARKET_PATH },
    { id: "broker-listings", label: "Listings", href: BROKER_LISTINGS_PATH },
  ],
  public: [
    { id: "public-home", label: "Home Page", href: HOME_PATH },
    { id: "public-contact", label: "Contact Us", href: CONTACT_PATH },
    {
      id: "public-broker",
      label: "Broker Registration",
      href: BROKER_REGISTRATION_PATH,
    },
    {
      id: "public-search",
      label: "Search By Location",
      href: SEARCH_BY_PLACE_PATH,
    },
  ],
};
