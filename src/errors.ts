/**
 * Shared error type definitions and utilities for DAYA-Devraha frontends
 */

/**
 * Standard API error shape
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Type guard to check if an unknown value is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  );
}

/**
 * Extract a human-readable error message from unknown errors
 * Works with ApiError, standard Error, or falls back to default
 */
export function getErrorMessage(
  error: unknown,
  fallback = 'An unexpected error occurred'
): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

/**
 * Axios-specific error shape for type narrowing
 */
export interface AxiosErrorShape<T = unknown> {
  response?: {
    data?: T;
    status?: number;
    statusText?: string;
  };
  message?: string;
  code?: string;
}

/**
 * Extract error message from Axios error responses
 */
export function getAxiosErrorMessage<T extends { message?: string }>(
  error: unknown,
  fallback = 'Unexpected error'
): string {
  if (error instanceof Error) return error.message || fallback;

  const axiosError = error as AxiosErrorShape<T>;
  const message =
    axiosError?.response?.data?.message ||
    (typeof axiosError?.message === 'string' ? axiosError.message : undefined);

  return message || fallback;
}
