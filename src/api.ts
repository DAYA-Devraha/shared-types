/**
 * Shared API type definitions for DAYA-Devraha frontends
 */

/**
 * Standard API response wrapper
 * All API responses follow this structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

/**
 * Pagination metadata returned with list endpoints
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Extended pagination metadata (used by cow endpoints)
 */
export interface ExtendedPaginationMeta extends PaginationMeta {
  grandTotal: number; // total count before filters
}

/**
 * Paginated API response wrapper
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

/**
 * API envelope type used internally
 */
export interface ApiEnvelope<T> {
  data?: T;
  message?: string;
  success?: boolean;
  errors?: unknown;
}

/**
 * Seconds left payload for rate-limited responses
 */
export interface SecondsLeftPayload {
  secondsLeft?: number | null;
}

/**
 * Raw user payload shape from backend responses
 * Varies by endpoint - some fields may be missing
 */
export interface RawUserPayload {
  _id?: string;
  id?: string;
  userId?: number;
  email?: string;
  name?: string | null;
  twoFactorEnabled?: boolean;
  isVerified?: boolean;
  dateOfBirth?: string | Date;
  emergencyRecoveryContact?: string;
  twoFactorRequired?: boolean;
  verificationRequired?: boolean;
  secondsLeft?: number;
}

/**
 * Login response shape when 2FA or verification is required
 */
export interface LoginPendingResponse {
  twoFactorRequired?: boolean;
  verificationRequired?: boolean;
  secondsLeft?: number;
}

/**
 * Full login response shape (when fully authenticated)
 */
export interface LoginSuccessResponse extends RawUserPayload {
  twoFactorRequired?: boolean;
  verificationRequired?: boolean;
}

/**
 * Cow list response shape from API
 */
export interface CowListResponse<T> {
  data: T[];
  meta: ExtendedPaginationMeta;
}
