import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { getOpenWeather5DayWeatherForecast } from '@/lib/weather/openweather/5dayWeatherForecast';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const weatherResponse = await getOpenWeather5DayWeatherForecast(coords.lat, coords.lon);

    return createSuccessResponse(weatherResponse);
  } catch (error) {
    return createErrorResponse(error);
  }
}
