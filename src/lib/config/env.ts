export const KMA_WEATHER_API_KEY =
  process.env.KMA_WEATHER_API_KEY ??
  (() => {
    throw new Error('KMA_WEATHER_API_KEY is not defined');
  })();

export const OPENWEATHER_API_KEY =
  process.env.OPENWEATHER_API_KEY ??
  (() => {
    throw new Error('OPENWEATHER_API_KEY is not defined');
  })();

export const ACCUWEATHER_API_KEY =
  process.env.ACCUWEATHER_API_KEY ??
  (() => {
    throw new Error('ACCUWEATHER_API_KEY is not defined');
  })();
