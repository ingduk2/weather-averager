import { httpGet } from '@/lib/http/axios';
import { CurrentWeather } from '../weatherTypes';
import { ErrorResponse, SuccessResponse, toErrorResponse } from '@/lib/response';

export async function fetchKmaWeatherCurrent(
  address: string
): Promise<SuccessResponse<CurrentWeather> | ErrorResponse> {
  const url = `/api/weather/kma/current?address=${address}`;
  try {
    return await httpGet<SuccessResponse<CurrentWeather>>(url, {});
  } catch (error: unknown) {
    return toErrorResponse(error);
  }
}
