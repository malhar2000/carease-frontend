import {
  Home,
  Package,
  Warehouse,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Wifi,
  TruckIcon,
  Thermometer,
  Box,
} from "lucide-react";
import {
  DASHBOARD_MERCHANTS_PATH,
  MERCHANTS_RENTALS_PATH,
  MERCHANTS_SAVED_PATH,
  MERCHANTS_QA_PATH,
  DASHBOARD_WAREHOUSE_OPERATOR_PATH,
  WAREHOUSE_OPERATOR_PROPERTIES_PATH,
  WAREHOUSE_OPERATOR_LISTINGS_PATH,
  WAREHOUSE_OPERATOR_ANALYTICS_PATH,
  DASHBOARD_BROKER_PATH,
  BROKER_CLIENTS_PATH,
  BROKER_DEALS_PATH,
  BROKER_MARKET_PATH,
  SETTINGS_PATH,
} from "./routeConstants";

// Import custom icons for warehouse filter options
import {
  ConnectionIcon,
  CustomerIcon,
  PackageIcon,
  PalletIcon,
  RulerIcon,
  ValidationIcon,
} from "@/components/icons";
import { FILTER_TYPES } from "@/constants/appConstants";

export const DASHBOARD_OPTIONS = [
  {
    id: "warehouse-operator-dashboard",
    label: "Warehouse Operator",
    description: "Manage warehouse properties, listings, and analytics.",
    href: "/dashboard/warehouse-operator",
  },
  {
    id: "merchants-dashboard",
    label: "Brands/Merchants",
    description: "Find and manage warehouse spaces for rent.",
    href: "/dashboard/merchants",
  },
  {
    id: "broker-dashboard",
    label: "Referral Portal",
    description:
      "Connect clients with warehouse spaces, manage deals, and track commissions.",
    href: "/dashboard/broker",
  },
  {
    id: "volume-buy-admin",
    label: "Volume Buy Admin",
    description: "Manage volume buy details and prebatch orders.",
    href: "/volume-buy-admin/dashboard",
  },
];

export const USER_MENU_OPTIONS = [
  {
    id: "profile",
    label: "Your Profile",
    href: "/dashboard/profile",
  },
  {
    id: "notifications",
    label: "Notifications",
    href: "/dashboard/notifications",
  },
  {
    id: "signout",
    label: "Sign Out",
    href: null,
    isDanger: true,
  },
];

export const SIDEBAR_ITEMS = {
  merchants: [
    { icon: Home, label: "Dashboard", href: DASHBOARD_MERCHANTS_PATH },
    { icon: Package, label: "My Rentals", href: MERCHANTS_RENTALS_PATH },
    {
      icon: Warehouse,
      label: "Saved Properties",
      href: MERCHANTS_SAVED_PATH,
    },
    {
      icon: HelpCircle,
      label: "Ask a Question",
      href: MERCHANTS_QA_PATH,
    },
    { icon: Settings, label: "Settings", href: SETTINGS_PATH },
  ],
  "warehouse-operator": [
    { icon: Home, label: "Dashboard", href: DASHBOARD_WAREHOUSE_OPERATOR_PATH },
    {
      icon: Warehouse,
      label: "My Properties",
      href: WAREHOUSE_OPERATOR_PROPERTIES_PATH,
    },
    {
      icon: Package,
      label: "Listings",
      href: WAREHOUSE_OPERATOR_LISTINGS_PATH,
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: WAREHOUSE_OPERATOR_ANALYTICS_PATH,
    },
    { icon: Settings, label: "Settings", href: SETTINGS_PATH },
  ],
  broker: [
    { icon: Home, label: "Dashboard", href: DASHBOARD_BROKER_PATH },
    { icon: Users, label: "Clients", href: BROKER_CLIENTS_PATH },
    { icon: Package, label: "Deals", href: BROKER_DEALS_PATH },
    {
      icon: BarChart3,
      label: "Market Analysis",
      href: BROKER_MARKET_PATH,
    },
    { icon: Settings, label: "Settings", href: SETTINGS_PATH },
  ],
};

// /constants/menuConstants.ts
// /constants/menuConstants.ts
export const WAREHOUSE_LEASE_TYPES = [
  {
    id: "3pl",
    label: "3PL Warehouse",
    icon: "/icons/warehouse-3pl.png", // Path to your 3PL ico
  },
  {
    id: "sublease",
    label: "Sublease & Direct Lease",
    icon: "/icons/sublease.png",
    badge: "NEW",
  },
];

export const WAREHOUSE_LEASE_TYPES_MAP = {
  "3pl": {
    id: "3pl",
    label: "3PL Warehouse",
  },
  sublease: {
    id: "sublease",
    label: "Sublease & Direct Lease",
  },
};

export const WAREHOUSE_FILTER_OPTIONS = [
  { id: "min-sqft", label: "SQFT", icon: "/icons/sqft-3d.webp" },
  { id: "min-pallets", label: "Pallets", icon: "/icons/pallets-3d.webp" },
  {
    id: FILTER_TYPES.AMENITIES,
    label: "Amenities",
    icon: "/icons/amenities.webp",
  },
  {
    id: FILTER_TYPES.SERVICES,
    label: "Services",
    icon: "/icons/services-3d.webp",
  },
  {
    id: FILTER_TYPES.CERTIFICATIONS,
    label: "Certifications",
    icon: "/icons/Certification_Ribbon.webp",
  },
  {
    id: FILTER_TYPES.TECHNOLOGIES,
    label: "Technologies",
    icon: "/icons/tech-3d.webp",
  },
  {
    id: FILTER_TYPES.FULLFILMENT_TYPE,
    label: "Fullfillment Type",
    icon: "/icons/fullfilment-3d.webp",
  },
  {
    id: FILTER_TYPES.TEMP_CONTROL,
    label: "Temperature Control",
    icon: "/icons/temp-controll-3d.webp",
  },
  { id: "fba-prep", label: "FBA Prep", icon: "/icons/fba-prep.webp" },
  { id: "cross-dock", label: "Cross Docking", icon: "/icons/cross-dock.webp" },
  { id: "rail-sided", label: "Rail Sided", icon: "/icons/rail-sided.webp" },
  // { id: "max-price", label: "Maximum Price", icon: MoneyFlowIcon },
  // { id: 'min-order', label: 'MOQ', icon: ClipboardIcon },
  // { id: "forklift", label: "Forklift ", icon: Forklift2Icon },
  // { id: "max-forklift", label: "Forklift Rental Price", icon: Forklift1Icon },
  // { id: "hydraulic", label: "Hydraulic Dock Levelers", icon: AnchorIcon },
  // { id: "mechanical", label: "Mechanical Dock Levelers", icon: AnchorIcon },
  // { id: "edge-dock", label: "Edge Dock Levelers", icon: AnchorIcon },
  // { id: "outside", label: "Outside Storage", icon: PackageIcon },
  // { id: "trailer", label: "Trailer Parking", icon: CarParkIcon },
];
