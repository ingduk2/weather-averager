import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { getLocationKey } from '@/lib/weather/accuweather/geoPositionSearch';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const locationKey = await getLocationKey(coords.lat, coords.lon);

    return createSuccessResponse(locationKey);
  } catch (error) {
    return createErrorResponse(error);
  }
}
