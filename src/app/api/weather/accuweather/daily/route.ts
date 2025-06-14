import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { toAccuWeatherDailyPeriod } from '@/lib/weather/accuweather/accuweatherEnums';
import { getAccuweatherDailyForecasts } from '@/lib/weather/accuweather/dayOfDailyForecasts';
import { getLocationKey } from '@/lib/weather/accuweather/geoPositionSearch';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const periodParam = getRequiredQueryParam(request, 'period');
    const dailyPeriod = toAccuWeatherDailyPeriod(periodParam);

    const coords = await getCoordsFromAddress(address);
    const locationKey = await getLocationKey(coords.lat, coords.lon);
    const weatherResponse = await getAccuweatherDailyForecasts(dailyPeriod, locationKey);

    return createSuccessResponse(weatherResponse);
  } catch (error) {
    return createErrorResponse(error);
  }
}
