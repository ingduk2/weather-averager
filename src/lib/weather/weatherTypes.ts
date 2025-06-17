export interface CurrentWeather {
  observationTime: string; // ISO 8601 문자열 (ex: "2025-06-15T10:00:00")
  temperatureCelsius: number;
  weatherText: string;
  weatherIcon: number;
  isDayTime: boolean;
  precipitationType: string | null;
  precipitationHas: boolean;
  humidityPercent: number;
  windDirectionDegrees: number;
  windSpeedKph: number;
}
