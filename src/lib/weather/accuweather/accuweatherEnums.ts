export enum AccuWeatherForecastDailyPeriod {
  ONE_DAY = '1day',
  FIVE_DAY = '5day',
  TEN_DAY = '10day',
  FIFTEEN_DAY = '15day',
}

export function toAccuWeatherDailyPeriod(value: string): AccuWeatherForecastDailyPeriod {
  if (!isValidDailyPeriod(value)) {
    throw new Error(`Invalid period parameter: ${value}`);
  }
  return value as AccuWeatherForecastDailyPeriod;
}

function isValidDailyPeriod(value: string): value is AccuWeatherForecastDailyPeriod {
  return Object.values(AccuWeatherForecastDailyPeriod).includes(value as AccuWeatherForecastDailyPeriod);
}
