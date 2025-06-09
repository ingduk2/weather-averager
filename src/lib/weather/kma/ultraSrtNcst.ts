import { httpGet } from '@/lib/http/axios';
import { toGridXY } from '../../utils/dfsGridUtil';
import { getKstNow } from '../../utils/kstTime';
import { KmaUltraSrtNcstApiResponse } from './kmaWeatherTypes';
import { KMA_WEATHER_API_KEY } from '@/lib/config/env';

/**
 * 초단기실황조회 (ultraSrtNcst)
 * @param lat 위도 (string)
 * @param lon 경도 (string)
 * @returns KmaCurrentApiResponse (API 응답 타입)
 */
export async function getKmaUltraSrtNcst(lat: string, lon: string): Promise<KmaUltraSrtNcstApiResponse> {
  const { x, y } = toGridXY(Number(lat), Number(lon));
  const { baseDate, baseTime } = getBaseDateTimeForCurrent();
  const response = await requestUltraSrtNcst(x, y, baseDate, baseTime);
  return response;
}

function getBaseDateTimeForCurrent(): { baseDate: string; baseTime: string } {
  const now = getKstNow();
  const minutes = now.minute();

  const usePreviousHour = minutes < 30;
  const baseMoment = usePreviousHour ? now.subtract(1, 'hour') : now;

  const baseDate = baseMoment.format('YYYYMMDD');
  const baseTime = baseMoment.format('HH00');

  return { baseDate, baseTime };
}

async function requestUltraSrtNcst(
  nx: number,
  ny: number,
  baseDate: string,
  baseTime: string
): Promise<KmaUltraSrtNcstApiResponse> {
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

  return httpGet(url, {
    serviceKey: KMA_WEATHER_API_KEY,
    pageNo: 1,
    numOfRows: 100,
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx,
    ny,
  });
}
