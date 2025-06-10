export interface KmaUltraSrtNcstApiResponse {
  response: {
    header: {
      resultCode: string; // e.g. "00"
      resultMsg: string; // e.g. "NORMAL_SERVICE"
    };
    body: {
      dataType: string; // e.g. "JSON"
      items: {
        item: KmaUltraSrtNcstItem[];
      };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

export interface KmaUltraSrtNcstItem {
  baseDate: string; // 관측일자, YYYYMMDD
  baseTime: string; // 관측시각, HHmm
  category: string; // 관측 항목 코드 (T1H, RN1, SKY 등)
  obsrValue: string; // 관측값
  nx: number; // 격자 X 좌표
  ny: number; // 격자 Y 좌표
}

export interface KmaUltraSrtFcstApiResponse {
  response: {
    header: {
      resultCode: string; // e.g. "00"
      resultMsg: string; // e.g. "NORMAL_SERVICE"
    };
    body: {
      dataType: string; // e.g. "JSON"
      items: {
        item: KmaUltraSrtFcstItem[];
      };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

export interface KmaUltraSrtFcstItem {
  baseDate: string; // 발표일자, YYYYMMDD
  baseTime: string; // 발표시각, HHmm
  category: string; // 예보 항목 코드 (T1H, RN1, SKY 등)
  fcstDate: string; // 예보일자, YYYYMMDD
  fcstTime: string; // 예보시각, HHmm
  fcstValue: string; // 예보 값 (문자열로 옴)
  nx: number; // 격자 X 좌표
  ny: number; // 격자 Y 좌표
}

export interface KmaVilageFcstApiResponse {
  response: {
    header: {
      resultCode: string; // e.g. "00"
      resultMsg: string; // e.g. "NORMAL_SERVICE"
    };
    body: {
      dataType: string; // e.g. "JSON"
      items: {
        item: KmaVilageFcstItem[];
      };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

export interface KmaVilageFcstItem {
  baseDate: string; // 발표일자, YYYYMMDD
  baseTime: string; // 발표시각, HHmm
  category: string; // 예보 항목 코드 (T1H, RN1, SKY 등)
  fcstDate: string; // 예보일자, YYYYMMDD
  fcstTime: string; // 예보시각, HHmm
  fcstValue: string; // 예보 값 (문자열로 옴)
  nx: number; // 격자 X 좌표
  ny: number; // 격자 Y 좌표
}
