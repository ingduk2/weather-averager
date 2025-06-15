import { httpGet } from '@/lib/http/axios';
import { CurrentWeather } from '../weatherTypes';
import { ErrorResponse, SuccessResponse, toErrorResponse } from '@/lib/response';

export async function fetchAccuWeatherCurrent(
  address: string
): Promise<SuccessResponse<CurrentWeather> | ErrorResponse> {
  const url = `/api/weather/accuweather/current?address=${address}`;
  try {
    return await httpGet<SuccessResponse<CurrentWeather>>(url, {});
  } catch (error: unknown) {
    return toErrorResponse(error);
  }
}
