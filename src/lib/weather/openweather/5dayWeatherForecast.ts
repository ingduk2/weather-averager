import { OPENWEATHER_API_KEY } from '@/lib/config/env';
import { OpenWeather5DayForecastApiResponse } from './openWeatherTypes';
import { httpGet } from '@/lib/http/axios';

/**
 * OpenWeatherMap (5 day weather forecast)
 * Call 5 day / 3 hour forecast data
 * @param lat 위도 (string)
 * @param lon 경도 (string)
 * @returns OpenWeatherCurrentApiResponse
 */
export async function getOpenWeather5DayWeatherForecast(
  lat: string,
  lon: string
): Promise<OpenWeather5DayForecastApiResponse> {
  const response = await request(lat, lon);
  return response;
}

async function request(lat: string, lon: string): Promise<OpenWeather5DayForecastApiResponse> {
  const url = 'https://api.openweathermap.org/data/2.5/forecast';

  return httpGet(url, {
    lat: lat,
    lon: lon,
    appid: OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'kr',
  });
}
