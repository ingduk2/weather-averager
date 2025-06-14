import { BadRequestError } from '@/lib/error/error';

export enum AccuWeatherForecastDailyPeriod {
  ONE_DAY = '1day',
  FIVE_DAY = '5day',
  TEN_DAY = '10day',
  FIFTEEN_DAY = '15day',
}

export function toAccuWeatherDailyPeriod(value: string): AccuWeatherForecastDailyPeriod {
  if (!isValidDailyPeriod(value)) {
    throw new BadRequestError(`Invalid period parameter: ${value}`);
  }
  return value as AccuWeatherForecastDailyPeriod;
}

function isValidDailyPeriod(value: string): value is AccuWeatherForecastDailyPeriod {
  return Object.values(AccuWeatherForecastDailyPeriod).includes(value as AccuWeatherForecastDailyPeriod);
}

export enum AccuWeatherForecastHourlyPeriod {
  ONE_HOUR = '1hour',
  TWELVE_HOUR = '12hour',
  TWENTY_FOUR_HOUR = '24hour',
  SEVENTY_TWO_HOUR = '72hour',
  ONE_HUNDRED_TWENTY_HOUR = '120hour',
}

export function toAccuWeatherHourlyPeriod(value: string): AccuWeatherForecastHourlyPeriod {
  if (!isValidHourlyPeriod(value)) {
    throw new BadRequestError(`Invalid period parameter: ${value}`);
  }
  return value as AccuWeatherForecastHourlyPeriod;
}

function isValidHourlyPeriod(value: string): value is AccuWeatherForecastHourlyPeriod {
  return Object.values(AccuWeatherForecastHourlyPeriod).includes(value as AccuWeatherForecastHourlyPeriod);
}
