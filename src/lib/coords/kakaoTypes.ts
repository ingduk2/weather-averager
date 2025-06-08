export type Coords = {
  addressName: string;
  lat: string;
  lon: string;
};

export type KakaoApiResponse = {
  documents: {
    address_name: string;
    x: string;
    y: string;
  }[];
};
