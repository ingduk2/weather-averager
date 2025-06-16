export enum KmaUltraSrtNcstCategory {
  /** 기온 (℃) */
  TEMPERATURE = 'T1H',
  /** 1시간 강수량 (mm) */
  RAIN_1H = 'RN1',
  /** 하늘 상태 */
  SKY = 'SKY',
  /** 강수 형태 */
  PRECIPITATION_TYPE = 'PTY',
  /** 습도 (%) */
  HUMIDITY = 'REH',
  /** 풍속 (m/s) */
  WIND_SPEED = 'WSD',
  /** 풍향 (deg) */
  WIND_DIRECTION = 'VEC',
  /** 동서바람성분 (m/s) */
  WIND_U_COMPONENT = 'UUU',
  /** 남북바람성분 (m/s) */
  WIND_V_COMPONENT = 'VVV',
}

export enum PrecipitationCode {
  NONE = '0',
  RAIN = '1',
  RAIN_SNOW = '2',
  SNOW = '3',
  SHOWER = '4',
}

export function getPrecipitationType(code: string): string | null {
  switch (code) {
    case '1':
      return 'rain';
    case '2':
      return 'rain/snow';
    case '3':
      return 'snow';
    case '4':
      return 'shower';
    default:
      return null;
  }
}

/**
 * PTY (강수 형태)가 우선이며,
 * PTY가 '0'일 경우에만 SKY를 참고해서 텍스트를 반환합니다.
 */
export function getWeatherTextFromSkyAndPty(sky: string, pty: string): string {
  switch (pty) {
    case '1':
      return 'Rain';
    case '2':
      return 'Rain/Snow';
    case '3':
      return 'Snow';
    case '4':
      return 'Shower';
    case '0':
    default:
      switch (sky) {
        case '1':
          return 'Clear';
        case '3':
          return 'Partly Cloudy';
        case '4':
          return 'Cloudy';
        default:
          return 'Unknown';
      }
  }
}

/**
 * SKY (하늘 상태)
 * 1: 맑음, 3: 구름 많음, 4: 흐림
 *
 * PTY (강수 형태)
 * 0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 소나기
 */
export function getWeatherIconCodeFromSkyAndPty(sky: string, pty: string): number {
  if (pty === '1') return 12; // 비
  if (pty === '2') return 18; // 비/눈
  if (pty === '3') return 22; // 눈
  if (pty === '4') return 15; // 소나기

  switch (sky) {
    case '1':
      return 1; // 맑음
    case '3':
      return 6; // 구름 많음
    case '4':
      return 7; // 흐림
    default:
      return 0; // 알 수 없음
  }
}

export function isDay(baseTime: string): boolean {
  const hour = parseInt(baseTime.slice(0, 2), 10);
  return hour >= 6 && hour < 18;
}
