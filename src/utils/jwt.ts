import { jwtVerify, decodeJwt } from "jose";

export interface JWTPayload {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: string;
  email: string;
  roles: string[];
  is_active: boolean;
}

/**
 * Verify JWT token with the provided secret
 */
export async function verifyToken(
  token: string,
  secret: string
): Promise<JWTPayload> {
  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as JWTPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

/**
 * Decode JWT token without verification (use when you just need to see the payload)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return decodeJwt(token) as unknown as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Check if a token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return true;

    // Convert exp to milliseconds and check against current time
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
}

/**
 * Check if user has a specific role based on the token
 */
export function hasRole(token: string, role: string): boolean {
  try {
    const payload = decodeToken(token);
    if (!payload || !payload.roles) return false;

    return payload.roles.includes(role);
  } catch (error) {
    return false;
  }
}

/**
 * Get all roles from token
 */
export function getUserRoles(token: string): string[] {
  try {
    const payload = decodeToken(token);
    if (!payload || !payload.roles) return [];

    return payload.roles;
  } catch (error) {
    return [];
  }
}
