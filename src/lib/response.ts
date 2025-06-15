import { isAxiosError } from 'axios';
import { CustomError } from './error/error';

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
  };
}

export function createSuccessResponse<T>(data: T, statusCode: number = 200): Response {
  const body: SuccessResponse<T> = { success: true, data };
  return createResponse(body, statusCode);
}

export function createErrorResponse(error: unknown, fallbackStatusCode: number = 500): Response {
  let message = 'unexpected error';
  let statusCode = fallbackStatusCode;

  if (error instanceof CustomError) {
    message = error.message;
    statusCode = error.statusCode;
  } else if (error instanceof Error) {
    message = error.message;
  }

  const body: ErrorResponse = { success: false, error: { message, statusCode } };
  return createResponse(body, statusCode);
}

function createResponse(body: unknown, statusCode: number) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export function toErrorResponse(error: unknown): ErrorResponse {
  if (isAxiosError(error)) {
    return {
      success: false,
      error: {
        message: error.message ?? '알 수 없는 에러',
        statusCode: error.response?.status ?? 500,
      },
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: {
        message: error.message,
        statusCode: 500,
      },
    };
  }

  return {
    success: false,
    error: {
      message: '알 수 없는 에러',
      statusCode: 500,
    },
  };
}
