import type { Coords, KakaoApiResponse } from './kakaoTypes';

const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;

export async function getCoordsFromAddress(address: string): Promise<Coords> {
  const apiResponse = await getResponse(address);
  const kakaoApiResponse = await getKakaoApiResponse(apiResponse);
  return getCoords(kakaoApiResponse);
}

async function getResponse(address: string) {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
    {
      headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
    }
  );

  if (!response.ok) throw new Error('카카오 API 호출 실패');
  return response;
}

async function getKakaoApiResponse(response: Response): Promise<KakaoApiResponse> {
  const kakaoApiResponse = await response.json();

  if (!kakaoApiResponse.documents || kakaoApiResponse.documents.length === 0)
    throw new Error('주소를 찾을 수 없습니다.');

  return kakaoApiResponse;
}

function getCoords(kakaoApiResponse: KakaoApiResponse): Coords {
  const { x: lon, y: lat, address_name: addressName } = kakaoApiResponse.documents[0];

  return { addressName, lat, lon } as Coords;
}
