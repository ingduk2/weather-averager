import { httpGet } from '@/lib/http/axios';
import { toGridXY } from '../../utils/dfsGridUtil';
import { getKstNow } from '../../utils/kstTime';
import { KMA_WEATHER_API_KEY } from '@/lib/config/env';
import { KmaVilageFcstApiResponse } from './vilageFcstTypes';

/**
 * 단기예보조회 (vilageFcst)
 * @param lat 위도 (string)
 * @param lon 경도 (string)
 * @returns KmaVilageFcstApiResponse (API 응답 타입)
 */
export async function getKmaVilageFcst(lat: string, lon: string): Promise<KmaVilageFcstApiResponse> {
  const { x, y } = toGridXY(Number(lat), Number(lon));
  const { baseDate, baseTime } = getBaseDateTimeForVilageFcst();
  const response = await requestVilageFcst(x, y, baseDate, baseTime);
  return response;
}

function getBaseDateTimeForVilageFcst(): { baseDate: string; baseTime: string } {
  let now = getKstNow();

  // 단기예보는 3시간 간격: 02, 05, 08, 11, 14, 17, 20, 23시
  const hours = [2, 5, 8, 11, 14, 17, 20, 23];
  const currentHour = now.hour();
  const baseHour = hours.reduce((prev, curr) => (curr <= currentHour ? curr : prev), hours[0]);

  if (currentHour < 2) {
    now = now.subtract(1, 'day');
  }

  const baseMoment = now.hour(baseHour).minute(0).second(0);

  return {
    baseDate: baseMoment.format('YYYYMMDD'),
    baseTime: baseMoment.format('HHmm'),
  };
}

async function requestVilageFcst(
  nx: number,
  ny: number,
  baseDate: string,
  baseTime: string
): Promise<KmaVilageFcstApiResponse> {
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  return httpGet(url, {
    serviceKey: KMA_WEATHER_API_KEY,
    pageNo: 1,
    numOfRows: 1000,
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx,
    ny,
  });
}
