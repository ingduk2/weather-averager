import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getOpenWeatherCurrentWeather } from '@/lib/weather/openweather/currentWeatherData';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { mapOpenWeatherToCurrentWeather } from '@/lib/weather/openweather/currentWeatherDataTypes';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const openWeatherCurrent = await getOpenWeatherCurrentWeather(coords.lat, coords.lon);
    const currentWeather = mapOpenWeatherToCurrentWeather(openWeatherCurrent);

    return createSuccessResponse(currentWeather);
  } catch (error) {
    return createErrorResponse(error);
  }
}
