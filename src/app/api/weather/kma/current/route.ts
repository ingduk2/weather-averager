import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { getKmaUltraSrtNcst } from '@/lib/weather/kma/ultraSrtNcst';
import { mapKmaUltraSrtNcstToCurrentWeather } from '@/lib/weather/kma/ultraSrtNcstTypes';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const kmaCurrentWeather = await getKmaUltraSrtNcst(coords.lat, coords.lon);
    const currentWeather = mapKmaUltraSrtNcstToCurrentWeather(kmaCurrentWeather.response.body.items.item);

    return createSuccessResponse(currentWeather);
  } catch (error) {
    return createErrorResponse(error);
  }
}
