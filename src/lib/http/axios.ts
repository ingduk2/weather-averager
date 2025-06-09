import axios, { AxiosError } from 'axios';

export async function httpGet<T>(url: string, params: Record<string, string | number>): Promise<T> {
  try {
    const response = await axios.get<T>(url, {
      params: {
        ...params,
      },
      timeout: 5000,
    });

    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;

    if (err.code === 'ECONNABORTED') {
      throw new Error('KMA API 요청 시간 초과');
    }

    if (err.response) {
      throw new Error(
        `GET API 호출 실패: ${url} - ${err.response.status} ${err.response.statusText} - ${JSON.stringify(
          err.response.data
        )}`
      );
    }

    throw err;
  }
}
