export type LatLon = { lat: number; lon: number };
export type GridXY = { x: number; y: number };

const RE = 6371.00877; // Earth radius (km)
const GRID = 5.0; // Grid spacing (km)
const SLAT1 = 30.0; // Projection latitude 1 (degree)
const SLAT2 = 60.0; // Projection latitude 2 (degree)
const OLON = 126.0; // Origin longitude (degree)
const OLAT = 38.0; // Origin latitude (degree)
const XO = 43; // Origin x coordinate (GRID)
const YO = 136; // Origin y coordinate (GRID)

const DEGRAD = Math.PI / 180.0;
const RADDEG = 180.0 / Math.PI;

const re = RE / GRID;
const slat1 = SLAT1 * DEGRAD;
const slat2 = SLAT2 * DEGRAD;
const olon = OLON * DEGRAD;
const olat = OLAT * DEGRAD;

const sn = (() => {
  const num = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  return Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(num);
})();

const sf = (() => {
  const val = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  return (Math.pow(val, sn) * Math.cos(slat1)) / sn;
})();

const ro = (() => {
  const val = Math.tan(Math.PI * 0.25 + olat * 0.5);
  return (re * sf) / Math.pow(val, sn);
})();

/**
 * 위도, 경도 → 기상청 격자 좌표 (nx, ny)
 */
export function toGridXY(lat: number, lon: number): GridXY {
  const ra = (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5), sn);
  let theta = lon * DEGRAD - olon;

  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;

  theta *= sn;

  return {
    x: Math.floor(ra * Math.sin(theta) + XO + 0.5),
    y: Math.floor(ro - ra * Math.cos(theta) + YO + 0.5),
  };
}

/**
 * 기상청 격자 좌표 (nx, ny) → 위도, 경도
 */
export function toLatLon(x: number, y: number): LatLon {
  const xn = x - XO;
  const yn = ro - y + YO;
  const ra = Math.sqrt(xn * xn + yn * yn);
  const alat = 2.0 * Math.atan(Math.pow((re * sf) / ra, 1.0 / sn)) - Math.PI * 0.5;

  const theta = Math.abs(xn) <= 0.0 ? 0.0 : Math.atan2(xn, yn);
  const alon = theta / sn + olon;

  return {
    lat: alat * RADDEG,
    lon: alon * RADDEG,
  };
}
