import { ACCUWEATHER_API_KEY } from '@/lib/config/env';
import { httpGet } from '@/lib/http/axios';
import { GeoPositionSearchApiResponse } from './geoPositionSearchTypes';

/**
 * AccuWeather LocationKey 조회
 * Returns information about a specific location, by GeoPosition (Latitude and Longitude).
 * @param lat
 * @param lon
 * @returns
 */
export async function getLocationKey(lat: string, lon: string): Promise<string> {
  const response = await request(lat, lon);
  if (!response.Key) throw new Error('locationKey를 찾을 수 없습니다.');

  return response.Key;
}

async function request(lat: string, lon: string): Promise<GeoPositionSearchApiResponse> {
  const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`;
  return httpGet(url, {
    apikey: ACCUWEATHER_API_KEY,
    q: `${lat},${lon}`,
    details: true,
  });
}
