import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { getAccuWeatherCurrentConditions } from '@/lib/weather/accuweather/currentConditions';
import { mapAccuWeatherCurrentToCurrentWeather } from '@/lib/weather/accuweather/currentConditionsTypes';
import { getLocationKey } from '@/lib/weather/accuweather/geoPositionSearch';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const locationKey = await getLocationKey(coords.lat, coords.lon);
    const accuWeatherCurrent = await getAccuWeatherCurrentConditions(locationKey);
    const currentWeather = mapAccuWeatherCurrentToCurrentWeather(accuWeatherCurrent);

    return createSuccessResponse(currentWeather);
  } catch (error) {
    return createErrorResponse(error);
  }
}
