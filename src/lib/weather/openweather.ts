import type { OpenWeatherApiResponse } from '../types';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getOpenWeather(lat: string, lon: string): Promise<OpenWeatherApiResponse> {
  const response = await getResponse(lat, lon);
  return await getOpenWeatherApiResponse(response);
}

async function getResponse(lat: string, lon: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr`
  );

  if (!res.ok) throw new Error('OpenWeatherMap API 호출 실패');

  return res;
}

async function getOpenWeatherApiResponse(response: Response): Promise<OpenWeatherApiResponse> {
  return await response.json();
}
