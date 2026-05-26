import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong',
): string {
  if (!isFetchBaseQueryError(error)) {
    return fallback;
  }

  const data = error.data;

  if (typeof data !== 'object' || data === null) {
    return fallback;
  }

  // DRF-style: { field: ["msg", ...], ... } or { detail: "msg" }
  const record = data as Record<string, unknown>;

  if (typeof record.detail === 'string') {
    return record.detail;
  }

  const [field, value] = Object.entries(record)[0] ?? [];

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return field ? `${field}: ${value[0]}` : value[0];
  }

  if (typeof value === 'string') {
    return field ? `${field}: ${value}` : value;
  }

  return fallback;
}
