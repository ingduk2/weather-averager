export interface AccuWeatherDailyForecastResponse {
  Headline: ForecastHeadline;
  DailyForecasts: DailyForecast[];
}

export interface ForecastHeadline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate?: string;
  EndEpochDate?: number;
  MobileLink: string;
  Link: string;
}

export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  RealFeelTemperature: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  RealFeelTemperatureShade: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  HoursOfSun: number;
  DegreeDaySummary: {
    Heating: DegreeDay;
    Cooling: DegreeDay;
  };
  AirAndPollen: AirAndPollen[];
  Day: ForecastCondition;
  Night: ForecastCondition;
  Sources: string[];
  MobileLink: string;
  Link: string;
  Sun: {
    Rise: string;
    EpochRise: number;
    Set: string;
    EpochSet: number;
  };
  Moon: {
    Rise: string;
    EpochRise: number;
    Set: string;
    EpochSet: number;
    Phase: string;
    Age: number;
  };
}

export interface Temperature {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface DegreeDay {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface AirAndPollen {
  Name: string; // e.g., "AirQuality", "Grass", "Mold", etc.
  Value: number;
  Category: string; // e.g., "Good", "Moderate", etc.
  CategoryValue: number;
  Type?: string; // only for "AirQuality"
}

export interface ForecastCondition {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string; // "Rain", "Snow", etc.
  PrecipitationIntensity?: string; // "Light", "Moderate", etc.
  ShortPhrase?: string;
  LongPhrase?: string;
  ThunderstormProbability?: number;
  RainProbability?: number;
  SnowProbability?: number;
  IceProbability?: number;
  Wind: Wind;
  WindGust: Wind;
  TotalLiquid?: Amount;
  Rain?: Amount;
  Snow?: Amount;
  Ice?: Amount;
  HoursOfPrecipitation?: number;
  HoursOfRain?: number;
  HoursOfSnow?: number;
  HoursOfIce?: number;
  CloudCover?: number;
}

export interface Wind {
  Speed: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Direction: {
    Degrees: number;
    Localized: string;
    English: string;
  };
}

export interface Amount {
  Value: number;
  Unit: string;
  UnitType: number;
}
