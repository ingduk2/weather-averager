export interface GeoPositionSearchApiResponse {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: Region;
  Country: Country;
  AdministrativeArea: AdministrativeArea;
  TimeZone: TimeZone;
  GeoPosition: GeoPosition;
  IsAlias: boolean;
  ParentCity?: ParentCity;
  SupplementalAdminAreas?: SupplementalAdminArea[];
  DataSets: string[];
  Details: Details;
}

interface Region {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
}

interface Country {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
}

interface AdministrativeArea {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
  Level?: number;
  LocalizedType: string;
  EnglishType: string;
  CountryID: string;
}

interface TimeZone {
  Code: string;
  Name: string;
  GmtOffset: number;
  IsDaylightSaving: boolean;
  NextOffsetChange?: string;
}

interface GeoPosition {
  Latitude: number;
  Longitude: number;
  Elevation: {
    Metric: UnitValue;
    Imperial: UnitValue;
  };
}

interface UnitValue {
  Value: number;
  Unit: string;
  UnitType: number;
}

interface ParentCity {
  Key: string;
  LocalizedName: string;
  EnglishName: string;
}

interface SupplementalAdminArea {
  Level?: number;
  LocalizedName: string;
  EnglishName: string;
}

interface Details {
  Key: string;
  StationCode: string;
  StationGmtOffset?: number;
  BandMap: string;
  Climo: string;
  LocalRadar: string;
  MediaRegion: string;
  Metar: string;
  NXMetro: string;
  NXState: string;
  Population?: number;
  PrimaryWarningCountyCode: string;
  PrimaryWarningZoneCode: string;
  Satellite: string;
  Synoptic: string;
  MarineStation: string;
  MarineStationGMTOffset?: number;
  VideoCode: string;
  PartnerID?: number;
  DMA: {
    ID: string;
    EnglishName: string;
  };
  Sources: Source[];
  CanonicalPostalCode: string;
  CanonicalLocationKey: string;
  LocationStem: string;
}

interface Source {
  DataType: string;
  Source: string;
  SourceId: number;
}
