import { CurrentWeather } from '../weatherTypes';
import {
  getPrecipitationType,
  getWeatherIconCodeFromSkyAndPty,
  getWeatherTextFromSkyAndPty,
  isDay,
  KmaUltraSrtNcstCategory,
  PrecipitationCode,
} from './kmaUtils';

export interface KmaUltraSrtNcstApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      dataType: string;
      items: { item: KmaUltraSrtNcstItem[] };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

export interface KmaUltraSrtNcstItem {
  baseDate: string; // YYYYMMDD
  baseTime: string; // HHmm
  category: string;
  obsrValue: string;
  nx: number;
  ny: number;
}

function getFloat(map: Map<string, string>, key: string): number {
  return parseFloat(map.get(key) || '0');
}

export function mapKmaUltraSrtNcstToCurrentWeather(items: KmaUltraSrtNcstItem[]): CurrentWeather {
  const map = new Map<string, string>();
  if (items.length === 0) {
    throw new Error('No weather data available.');
  }

  const { baseDate, baseTime } = items[0];
  for (const item of items) {
    map.set(item.category, item.obsrValue);
  }

  const observationTime = `${baseDate.slice(0, 4)}-${baseDate.slice(4, 6)}-${baseDate.slice(6, 8)}T${baseTime.slice(
    0,
    2
  )}:${baseTime.slice(2, 4)}:00`;

  const temperatureCelsius = getFloat(map, KmaUltraSrtNcstCategory.TEMPERATURE);
  const temperatureFahrenheit = parseFloat(((temperatureCelsius * 9) / 5 + 32).toFixed(1));
  const humidityPercent = getFloat(map, KmaUltraSrtNcstCategory.HUMIDITY);
  const windDirectionDegrees = getFloat(map, KmaUltraSrtNcstCategory.WIND_DIRECTION);
  const windSpeedKph = getFloat(map, KmaUltraSrtNcstCategory.WIND_SPEED);

  const skyCode = map.get(KmaUltraSrtNcstCategory.SKY) || '1';
  const precipitationCode = map.get(KmaUltraSrtNcstCategory.PRECIPITATION_TYPE) || PrecipitationCode.NONE;
  const precipitationType = getPrecipitationType(precipitationCode);
  const precipitationHas = precipitationCode !== PrecipitationCode.NONE;

  return {
    observationTime,
    temperatureCelsius,
    temperatureFahrenheit,
    weatherText: getWeatherTextFromSkyAndPty(skyCode, precipitationCode),
    weatherIcon: getWeatherIconCodeFromSkyAndPty(skyCode, precipitationCode),
    isDayTime: isDay(baseTime),
    precipitationType,
    precipitationHas,
    humidityPercent,
    windDirectionDegrees,
    windSpeedKph,
    uvIndex: -1,
    cloudCoverPercent: -1,
    visibilityKm: -1,
    pressureMB: -1,
    mobileLink: '',
    link: '',
  };
}
