import { CurrentWeather } from '../weatherTypes';

export interface AccuWeatherCurrentConditionsResponse {
  LocalObservationDateTime: string; // 관측 현지 날짜 시간 (ISO 8601)
  EpochTime: number; // 유닉스 타임스탬프 (초)
  WeatherText: string; // 날씨 텍스트 설명
  WeatherIcon: number; // 날씨 아이콘 번호 (1~44)
  HasPrecipitation: boolean; // 강수 여부
  PrecipitationType: string | null; // 강수 타입 ("Rain", "Snow", "Ice", null)
  IsDayTime: boolean; // 낮/밤 여부
  Temperature: {
    Metric: {
      Value: number; // 온도 값 (섭씨)
      Unit: string; // 단위 (예: "C")
      UnitType: number; // 단위 타입 코드
    };
    Imperial: {
      Value: number; // 온도 값 (화씨)
      Unit: string; // 단위 (예: "F")
      UnitType: number; // 단위 타입 코드
    };
  };
  RealFeelTemperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RealFeelTemperatureShade: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RelativeHumidity: number; // 상대 습도 (%)
  IndoorRelativeHumidity?: number; // 실내 상대 습도 (%), 있을 수도 있고 없을 수도 있음
  DewPoint: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  Wind: {
    Direction: {
      Degrees: number;
      Localized: string;
      English: string;
    };
    Speed: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  };
  WindGust: {
    Speed: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  };
  UVIndex: number; // 자외선 지수
  UVIndexText: string; // 자외선 지수 텍스트 (예: "Low", "Moderate")
  Visibility: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  ObstructionsToVisibility: string; // 시야 장애 요인 (예: "Haze", "")
  CloudCover: number; // 구름 덮임 비율 (%)
  Ceiling: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  Pressure: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  PressureTendency: {
    LocalizedText: string; // 예: "Steady", "Rising"
    Code: string; // 예: "S", "R"
  };
  Past24HourTemperatureDeparture: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  ApparentTemperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  WindChillTemperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  WetBulbTemperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  Precip1hr: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  PrecipitationSummary: {
    Precipitation: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    PastHour: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    Past3Hours: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    Past6Hours: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    Past9Hours: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    Past12Hours: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  };
  TemperatureSummary: {
    Past6HourRange: {
      Minimum: {
        Metric: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Imperial: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
      Maximum: {
        Metric: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Imperial: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
    };
    Past12HourRange: {
      Minimum: {
        Metric: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Imperial: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
      Maximum: {
        Metric: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Imperial: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
    };
    Past24HourRange: {
      Minimum: {
        Metric: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Imperial: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
      Maximum: {
        Metric: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
        Imperial: {
          Value: number;
          Unit: string;
          UnitType: number;
        };
      };
    };
  };
  MobileLink: string; // 모바일 링크 URL
  Link: string; // 웹 링크 URL
}

export function mapAccuWeatherCurrentToCurrentWeather(response: AccuWeatherCurrentConditionsResponse): CurrentWeather {
  return {
    observationTime: response.LocalObservationDateTime,
    temperatureCelsius: response.Temperature.Metric.Value,
    weatherText: response.WeatherText,
    weatherIcon: response.WeatherIcon,
    isDayTime: response.IsDayTime,
    precipitationType: response.PrecipitationType,
    precipitationHas: response.HasPrecipitation,
    humidityPercent: response.RelativeHumidity,
    windDirectionDegrees: response.Wind.Direction.Degrees,
    windSpeedKph: response.Wind.Speed.Metric.Value,
  };
}
