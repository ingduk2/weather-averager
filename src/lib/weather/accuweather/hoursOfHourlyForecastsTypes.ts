export type AccuWeatherHourlyForecastResponse = AccuWeatherHourlyForecast[];

export interface AccuWeatherHourlyForecast {
  DateTime: string; // ISO 날짜 문자열
  EpochDateTime: number;

  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;

  IsDaylight: boolean;

  Temperature: AccuWeatherMeasurement;
  RealFeelTemperature: AccuWeatherMeasurement;
  WetBulbTemperature: AccuWeatherMeasurement;
  DewPoint: AccuWeatherMeasurement;

  Wind: AccuWeatherWind;
  WindGust: AccuWeatherWind;

  RelativeHumidity: number;
  Visibility: AccuWeatherMeasurement;
  CloudCover: number;

  UVIndex: number;
  UVIndexText: string;

  Rain: AccuWeatherMeasurement;
  Snow: AccuWeatherMeasurement;
  Ice: AccuWeatherMeasurement;
  TotalLiquid: AccuWeatherMeasurement;

  ProbabilityOfPrecipitation: number;
  ProbabilityOfThunderstorm: number;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;

  MobileLink: string;
  Link: string;
}

export interface AccuWeatherMeasurement {
  Value: number;
  Unit: string; // 예: "C", "km/h", etc.
  UnitType: number;
}

export interface AccuWeatherWind {
  Speed: AccuWeatherMeasurement;
  Direction: {
    Degrees: number;
    Localized: string;
    English: string;
  };
}
