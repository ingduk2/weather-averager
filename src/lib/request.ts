import { BadRequestError } from './error/error';

export function getQueryParam(request: Request, key: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(key);
}

export function getRequiredQueryParam(request: Request, key: string): string {
  const param = getQueryParam(request, key);
  if (!param) throw new BadRequestError(`${key} 파라미터 누락`);
  return param;
}
