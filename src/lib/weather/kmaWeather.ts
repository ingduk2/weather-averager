import { toGridXY } from '../utils/dfsGridUtil';
import { getKstNow } from '../utils/kstTime';
import { KmaCurrentApiResponse } from './kmaWeatherTypes';

const KMA_WEATHER_API_KEY = process.env.KMA_WEATHER_API_KEY;

export async function getCurrentKmaWeather(lat: string, lon: string): Promise<KmaCurrentApiResponse> {
  const { x, y } = toGridXY(parseFloat(lat), parseFloat(lon));
  const { baseDate, baseTime } = getBaseDateTimeForCurrent();
  const response = await getResponse(x, y, baseDate, baseTime);
  return await getKmaApiResponse(response);
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

async function getResponse(nx: number, ny: number, baseDate: string, baseTime: string): Promise<Response> {
  const url =
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst` +
    `?serviceKey=${KMA_WEATHER_API_KEY}` +
    `&pageNo=1` +
    `&numOfRows=100` +
    `&dataType=JSON` +
    `&base_date=${baseDate}` +
    `&base_time=${baseTime}` +
    `&nx=${nx}` +
    `&ny=${ny}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`KMA API 호출 실패: ${res.status} ${res.statusText} - ${body}`);
  }
  return res;
}

async function getKmaApiResponse(response: Response): Promise<KmaCurrentApiResponse> {
  return await response.json();
}
