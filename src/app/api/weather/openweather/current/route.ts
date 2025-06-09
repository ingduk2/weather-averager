import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getOpenWeatherCurrentWeather } from '@/lib/weather/openweather/currentWeatherData';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const weatherResponse = await getOpenWeatherCurrentWeather(coords.lat, coords.lon);

    return createSuccessResponse(weatherResponse);
  } catch (error) {
    return createErrorResponse(error);
  }
}
