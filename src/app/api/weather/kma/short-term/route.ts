import { getCoordsFromAddress } from '@/lib/coords/kakao';
import { getRequiredQueryParam } from '@/lib/request';
import { createErrorResponse, createSuccessResponse } from '@/lib/response';
import { getKmaUltraSrtFcst } from '@/lib/weather/kma/ultraSrtFcst';

export async function GET(request: Request) {
  try {
    const address = getRequiredQueryParam(request, 'address');
    const coords = await getCoordsFromAddress(address);
    const weatherResponse = await getKmaUltraSrtFcst(coords.lat, coords.lon);

    return createSuccessResponse(weatherResponse);
  } catch (error) {
    return createErrorResponse(error);
  }
}
