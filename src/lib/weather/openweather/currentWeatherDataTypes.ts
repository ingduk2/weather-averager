import { CurrentWeather } from '../weatherTypes';

export interface OpenWeatherCurrentApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export function mapOpenWeatherToCurrentWeather(apiResponse: OpenWeatherCurrentApiResponse): CurrentWeather {
  return {
    observationTime: new Date(apiResponse.dt * 1000).toISOString(), // UNIX timestamp → ISO 문자열
    temperatureCelsius: Math.round(apiResponse.main.temp * 10) / 10, // 소수점 한 자리까지 반올림
    weatherText: apiResponse.weather[0]?.description ?? '',
    weatherIcon: parseInt(apiResponse.weather[0]?.icon?.replace(/\D/g, '') ?? '0'), // 아이콘 번호 추출
    isDayTime: apiResponse.weather[0]?.icon?.includes('d') ?? true,
    precipitationType: 'Unknown', // OpenWeather 현재 날씨에서는 강수 타입 없음 (One Call API에는 있음)
    precipitationHas: false, // 위와 같음 — 필요 시 별도 API 연동
    humidityPercent: apiResponse.main.humidity,
    windDirectionDegrees: apiResponse.wind.deg,
    windSpeedKph: Math.round(apiResponse.wind.speed * 3.6), // m/s → km/h 변환
  };
}
