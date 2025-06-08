import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getCurrentOpenWeather } from '@/lib/weather/openWeather';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const weatherResponse = await getCurrentOpenWeather(coords.lat, coords.lon);

    return createSuccessResponse(weatherResponse);
  } catch (error) {
    return createErrorResponse(error);
  }
}
