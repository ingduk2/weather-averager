import { ACCUWEATHER_API_KEY } from '@/lib/config/env';
import { httpGet } from '@/lib/http/axios';
import { AccuWeatherHourlyForecastResponse } from './hoursOfHourlyForecastsTypes';
import { AccuWeatherForecastHourlyPeriod } from './accuweatherEnums';

/**
 * [AccuWeather] Hourly Forecast API
 * @param period 기간
 * @param locationKey
 * @returns
 */
export async function getAccuweatherHourlyForecasts(
  period: AccuWeatherForecastHourlyPeriod,
  locationKey: string
): Promise<AccuWeatherHourlyForecastResponse> {
  const response = await request(period, locationKey);
  return response;
}

async function request(
  period: AccuWeatherForecastHourlyPeriod,
  locationKey: string
): Promise<AccuWeatherHourlyForecastResponse> {
  const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/${period}/${locationKey}`;
  return httpGet<AccuWeatherHourlyForecastResponse>(url, {
    apikey: ACCUWEATHER_API_KEY,
    details: true,
    metric: true,
  });
}
