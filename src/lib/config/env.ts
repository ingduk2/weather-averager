export const KMA_WEATHER_API_KEY =
  process.env.KMA_WEATHER_API_KEY ??
  (() => {
    throw new Error('KMA_WEATHER_API_KEY is not defined');
  })();
