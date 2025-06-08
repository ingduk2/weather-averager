export interface KmaCurrentApiResponse {
  response: {
    body: {
      items: {
        item: {
          baseDate: string;
          baseTime: string;
          category: string;
          nx: number;
          ny: number;
          obsrValue: string;
        }[];
      };
    };
  };
}
