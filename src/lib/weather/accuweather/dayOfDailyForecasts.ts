import { ACCUWEATHER_API_KEY } from '@/lib/config/env';
import { httpGet } from '@/lib/http/axios';
import { AccuWeatherForecastDailyPeriod } from './accuweatherEnums';
import { AccuWeatherDailyForecastResponse } from './dayOfDailyForecastsTypes';

/**
 * [AccuWeather] Daily Forecast API
 * @param period 기간
 * @param locationKey
 * @returns
 */
export async function getAccuweatherDailyForecasts(
  period: AccuWeatherForecastDailyPeriod,
  locationKey: string
): Promise<AccuWeatherDailyForecastResponse> {
  const response = await request(period, locationKey);
  return response;
}

async function request(
  period: AccuWeatherForecastDailyPeriod,
  locationKey: string
): Promise<AccuWeatherDailyForecastResponse> {
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/${period}/${locationKey}`;
  return httpGet<AccuWeatherDailyForecastResponse>(url, {
    apikey: ACCUWEATHER_API_KEY,
    details: true,
    metric: true,
  });
}
