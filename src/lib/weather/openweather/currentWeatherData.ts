import { OPENWEATHER_API_KEY } from '@/lib/config/env';
import { OpenWeatherCurrentApiResponse } from './openWeatherTypes';
import { httpGet } from '@/lib/http/axios';

/**
 * OpenWeatherMap (Current Weather Data)
 * @param lat 위도 (string)
 * @param lon 경도 (string)
 * @returns OpenWeatherCurrentApiResponse
 */
export async function getOpenWeatherCurrentWeather(lat: string, lon: string): Promise<OpenWeatherCurrentApiResponse> {
  const response = await requestOpenWeatherCurrent(lat, lon);
  return response;
}

async function requestOpenWeatherCurrent(lat: string, lon: string): Promise<OpenWeatherCurrentApiResponse> {
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  return httpGet(url, {
    lat: lat,
    lon: lon,
    appid: OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'kr',
  });
}
