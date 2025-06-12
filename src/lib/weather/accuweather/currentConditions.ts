import { ACCUWEATHER_API_KEY } from '@/lib/config/env';
import { httpGet } from '@/lib/http/axios';
import { CurrentConditionsResponse } from './currentConditionsApiResponseTypes';

/**
 * [AccuWeather] Current Conditions API
 * @param locationKey
 * @returns
 */
export async function getAccuWeatherCurrentConditions(locationKey: string): Promise<CurrentConditionsResponse> {
  const response = await request(locationKey);
  return response;
}

async function request(locationKey: string): Promise<CurrentConditionsResponse> {
  const url = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
  const response = await httpGet<CurrentConditionsResponse[]>(url, {
    apikey: ACCUWEATHER_API_KEY,
    details: true,
  });

  if (!response || response.length === 0) {
    throw new Error('현재 나맀 정보를 찾을 수 없습니다.');
  }

  return response[0];
}
