export interface OpenWeather5DayForecastApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain: {
      '3h': number;
    };
    snow: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
    city?: {
      id: number;
      name: string;
      coord: { lat: number; lon: number };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }>;
}
