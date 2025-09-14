import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertObjToQueryString = (obj: any) => {
  return "?" + new URLSearchParams(obj).toString();
};

export const formatNumber = (value: number, type?: string) => {
  if (!value) return "";
  if (type && type === "integer") {
    return Math.floor(value).toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
  const style = type === "currency" ? "currency" : "decimal";
  return value?.toLocaleString("en-US", {
    style,
    ...(type === "currency" ? { currency: "USD" } : {}),
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const normalizeEmptyToNull = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(normalizeEmptyToNull);
  } else if (obj && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value === "" || value === undefined) {
        acc[key] = null;
      } else if (typeof value === "object") {
        acc[key] = normalizeEmptyToNull(value);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as any);
  }
  return obj;
};

export function sanitizeApiPayload(data: any): any {
  if (Array.isArray(data)) {
    return data
      .map(sanitizeApiPayload)
      .filter((item) => item !== null && item !== "" && item !== undefined);
  } else if (data && typeof data === "object" && !Array.isArray(data)) {
    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      const cleanedValue = sanitizeApiPayload(value);
      if (
        cleanedValue !== null &&
        cleanedValue !== "" &&
        cleanedValue !== undefined
      ) {
        result[key] = cleanedValue;
      }
    }
    return result;
  }
  return data;
}

interface Extractable {
  [key: string]: unknown;
}

export const extractIds = <T extends Extractable, K extends keyof T>(
  arr: T[] | undefined | null,
  key: K = "id" as K
): Array<T[K]> => arr?.map((o) => o?.[key]) ?? [];
type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type ParsedAddress = {
  street: string;
  city: string;
  state: string;
  stateShort: string;
  district: string;
  country: string;
  countryShort: string;
  postalCode: string;
};

export function extractAddressDetails(
  addressComponents: AddressComponent[]
): ParsedAddress {
  const components: Record<string, string> = {
    street_number: "",
    route: "",
    locality: "",
    administrative_area_level_1: "",
    administrative_area_level_1_short: "",
    administrative_area_level_2: "",
    country: "",
    country_short: "",
    postal_code: "",
  };

  addressComponents.forEach((component) => {
    for (const type of component.types) {
      switch (type) {
        case "administrative_area_level_1":
          components[type] = component.long_name;
          components[`${type}_short`] = component.short_name;
          break;
        case "country":
          components[type] = component.long_name;
          components[`${type}_short`] = component.short_name;
          break;
        default:
          if (components[type] !== undefined) {
            components[type] = component.long_name;
          }
          break;
      }
    }
  });

  return {
    street: `${components.street_number} ${components.route}`.trim(),
    city: components.locality,
    state: components.administrative_area_level_1,
    stateShort: components.administrative_area_level_1_short,
    district: components.administrative_area_level_2,
    country: components.country,
    countryShort: components.country_short,
    postalCode: components.postal_code,
  };
}

export const getFileSize = (file: any) =>
  file.file ? `${(file.file.size / 1024 / 1024).toFixed(2)} MB` : undefined;

export function generatePassword() {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialCharacters = "!@#$%^&*()_+[]{}|<>?";

  const allCharacters = lowercase + uppercase + digits + specialCharacters;

  // Ensure the password has at least one character from each set
  let password = [
    lowercase[Math.floor(Math.random() * lowercase.length)],
    uppercase[Math.floor(Math.random() * uppercase.length)],
    digits[Math.floor(Math.random() * digits.length)],
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)],
  ];

  // Fill the rest of the password length with random characters from all sets
  for (let i = password.length; i < 8; i++) {
    password.push(
      allCharacters[Math.floor(Math.random() * allCharacters.length)]
    );
  }

  // Shuffle the password to ensure randomness
  password = password.sort(() => Math.random() - 0.5);

  // Convert the array to a string and return
  return password.join("");
}

// Utility function to convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius: number | null): number | null => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return null;
  return Math.round((celsius * 9) / 5 + 32);
};

export const handleBadgeVisibility = (
  storageConditionsIds: string[],
  isTemperatureControlled: boolean
) => {
  const hazBadge = "/icons/haz-badge.webp";
  const foodBadge = "/icons/food-grade.webp";
  const cbpBadge = "/icons/cbp-bonded.webp";
  const tempBadge = "/icons/temp-badge.webp";
  // Define certification type IDs for different badge categories
  const foodCertificationsIds = [
    "ecd749c3-0e4d-40c1-9154-c034715cf94d",
    "d45319db-b009-493e-9923-a543f0a25e77",
    "81a3b4cb-54f0-4e71-b84d-4cfcd8a4dc16",
  ];

  const cbpCertificationsIds = "75ff5504-4c94-464c-9438-d7af6187b26c";
  const hazCertificationsIds = "8200d9b6-bf27-45b4-886d-ec495fc87b43";
  const badges = [] as string[];

  // Early return if no storage conditions exist
  if (
    (!storageConditionsIds || storageConditionsIds.length === 0) &&
    !isTemperatureControlled
  ) {
    return badges;
  }

  // Check for temperature-controlled storage badge
  if (isTemperatureControlled) {
    badges.push(tempBadge);
  }

  // If any storage condition matches food certification IDs
  if (foodCertificationsIds.some((id) => storageConditionsIds.includes(id))) {
    badges.push(foodBadge);
  }

  // Check for CBP certification badge
  if (storageConditionsIds.includes(cbpCertificationsIds)) {
    badges.push(cbpBadge);
  }

  // Check for hazardous materials certification badge
  if (storageConditionsIds.includes(hazCertificationsIds)) {
    badges.push(hazBadge);
  }

  return badges;
};

// Utility function to get place details from coordinates
export async function getPlaceDetailsFromCoords(lat: number, lng: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  const response = await fetch(url, {
    headers: { "User-Agent": "your-app-name" },
  });
  const data = await response.json();
  return data.address;
}