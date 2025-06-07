import { CustomError } from './error/error';

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
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
