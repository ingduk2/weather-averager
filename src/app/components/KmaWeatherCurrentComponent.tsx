'use client';

import { fetchKmaWeatherCurrent } from '@/lib/weather/kma/client';
import { CurrentWeather } from '@/lib/weather/weatherTypes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const WeatherIconUrl = (iconNumber: number) =>
  `https://developer.accuweather.com/sites/default/files/${iconNumber < 10 ? '0' + iconNumber : iconNumber}-s.png`;

const KmaWeatherCurrentComponent = ({ address }: { address: string }) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchKmaWeatherCurrent(address)
      .then((res) => {
        if (res.success) {
          setWeather(res.data);
          setError(null);
        } else {
          setError(res.error.message);
        }
      })
      .catch((e) => {
        if (e?.body?.error?.message) {
          setError(e.body.error.message);
        } else {
          setError('네트워크 에러 또는 알 수 없는 에러');
        }
      })
      .finally(() => setLoading(false));
  }, [address]);

  if (loading || error || !weather) {
    return (
      <div style={{ border: '1px solid #ccc', padding: 16, maxWidth: 320 }}>
        <h2>🌤️ KMA 기상청 현재 날씨</h2>
        {loading && <p>로딩중...</p>}
        {error && <p>에러: {error}</p>}
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, maxWidth: 320 }}>
      <h2>🌤️ KMA 기상청 현재 날씨</h2>
      <p>
        <strong>관측 시간:</strong> {new Date(weather.observationTime).toLocaleString()}
      </p>
      <Image src={WeatherIconUrl(weather.weatherIcon)} alt={weather.weatherText} width={50} height={50} />
      <p>
        <strong>날씨:</strong> {weather.weatherText}
      </p>
      <p>
        <strong>온도:</strong> {weather.temperatureCelsius}°C
      </p>
      <p>
        <strong>습도:</strong> {weather.humidityPercent}%
      </p>
      <p>
        <strong>강수 여부:</strong> {weather.precipitationHas ? `예 (${weather.precipitationType ?? '-'})` : '없음'}
      </p>
      <p>
        <strong>풍향:</strong> {weather.windDirectionDegrees}°
      </p>
      <p>
        <strong>풍속:</strong> {weather.windSpeedKph} km/h
      </p>
    </div>
  );
};

export default KmaWeatherCurrentComponent;
