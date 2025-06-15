import { httpGet } from '@/lib/http/axios';
import { toGridXY } from '../../utils/dfsGridUtil';
import { getKstNow } from '../../utils/kstTime';
import { KMA_WEATHER_API_KEY } from '@/lib/config/env';
import { KmaUltraSrtFcstApiResponse } from './ultraSrtFcstTypes';

/**
 * 초단기예보조회 (ultraSrtFcst)
 * @param lat 위도 (string)
 * @param lon 경도 (string)
 * @returns KmaUltraSrtFcstApiResponse (API 응답 타입)
 */
export async function getKmaUltraSrtFcst(lat: string, lon: string): Promise<KmaUltraSrtFcstApiResponse> {
  const { x, y } = toGridXY(Number(lat), Number(lon));
  const { baseDate, baseTime } = getBaseDateTimeForUltraSrtFcst();
  const response = await requestUltraSrtFcst(x, y, baseDate, baseTime);
  return response;
}

function getBaseDateTimeForUltraSrtFcst(): { baseDate: string; baseTime: string } {
  let now = getKstNow();

  // 현재 분이 30분 미만이면 이전 시간 30분 기준으로 계산
  console.log(now.minute());
  if (now.minute() < 30) {
    now = now.subtract(1, 'hour');
  }

  const baseMinutes = 30;
  const baseMoment = now.minute(baseMinutes).second(0);

  return {
    baseDate: baseMoment.format('YYYYMMDD'),
    baseTime: baseMoment.format('HHmm'),
  };
}

async function requestUltraSrtFcst(
  nx: number,
  ny: number,
  baseDate: string,
  baseTime: string
): Promise<KmaUltraSrtFcstApiResponse> {
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';

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
