import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { toAccuWeatherHourlyPeriod } from '@/lib/weather/accuweather/accuweatherEnums';
import { getLocationKey } from '@/lib/weather/accuweather/geoPositionSearch';
import { getAccuweatherHourlyForecasts } from '@/lib/weather/accuweather/hoursOfHourlyForecasts';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const periodParam = getRequiredQueryParam(request, 'period');
    const hourlyPeriod = toAccuWeatherHourlyPeriod(periodParam);

    const coords = await getCoordsFromAddress(address);
    const locationKey = await getLocationKey(coords.lat, coords.lon);
    const weatherResponse = await getAccuweatherHourlyForecasts(hourlyPeriod, locationKey);

    return createSuccessResponse(weatherResponse);
  } catch (error) {
    return createErrorResponse(error);
  }
}
