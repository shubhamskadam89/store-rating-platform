import { isAxiosError } from 'axios';

export function getErrorMessage(err: unknown, fallback = 'An unexpected error occurred'): string {
  if (isAxiosError(err)) {
    const data = err.response?.data;
    if (data && typeof data === 'object') {
      const message = (data as { message?: unknown }).message;
      if (Array.isArray(message)) {
        return message.join('. ');
      }
      if (typeof message === 'string' && message.trim().length > 0) {
        return message;
      }
      const error = (data as { error?: unknown }).error;
      if (typeof error === 'string' && error.trim().length > 0) {
        return error;
      }
    }
    if (err.message) {
      return err.message;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
}
