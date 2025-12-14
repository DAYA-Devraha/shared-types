/**
 * @daya-devraha/shared-types
 *
 * Shared TypeScript type definitions for DAYA-Devraha frontends
 */

// Models
export type {
  User,
  Admin,
  CowGender,
  Cow,
  CowBackend,
  DonationStatus,
  DonationType,
  Donation,
  LegacyDonation,
  PujaOrderStatus,
  PujaCustomer,
  PujaDetails,
  PujaOrder,
} from './models.js';

// API types
export type {
  ApiResponse,
  PaginationMeta,
  ExtendedPaginationMeta,
  PaginatedResponse,
  ApiEnvelope,
  SecondsLeftPayload,
  RawUserPayload,
  LoginPendingResponse,
  LoginSuccessResponse,
  CowListResponse,
} from './api.js';

// Error types and utilities
export type { ApiError, AxiosErrorShape } from './errors.js';
export { isApiError, getErrorMessage, getAxiosErrorMessage } from './errors.js';
