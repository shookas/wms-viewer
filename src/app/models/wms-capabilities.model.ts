export interface IWmsCapablilities {
  version: string;
  Service: Service;
  Capability: Capability;
}
export interface ContactPersonPrimary {
  ContactPerson: string;
  ContactOrganization: string;
}

export interface ContactAddress {
  AddressType: string;
  Address: string;
  City: string;
  StateOrProvince: string;
  PostCode: string;
  Country: string;
}

export interface ContactInformation {
  ContactPersonPrimary: ContactPersonPrimary;
  ContactPosition: string;
  ContactAddress: ContactAddress;
  ContactVoiceTelephone: string;
  ContactFacsimileTelephone: string;
  ContactElectronicMailAddress: string;
}

export interface Service {
  Name: string;
  Title: string;
  Abstract: string;
  KeywordList: any[];
  OnlineResource: string;
  ContactInformation: ContactInformation;
  Fees: string;
  AccessConstraints: string;
}

export interface Get {
  OnlineResource: string;
}

export interface Post {
  OnlineResource: string;
}

export interface HTTP {
  Get: Get;
  Post: Post;
}

export interface DCPType {
  HTTP: HTTP;
}

export interface GetCapabilities {
  Format: string[];
  DCPType: DCPType[];
}

export interface Get2 {
  OnlineResource: string;
}

export interface HTTP2 {
  Get: Get2;
}

export interface DCPType2 {
  HTTP: HTTP2;
}

export interface GetMap {
  Format: string[];
  DCPType: DCPType2[];
}

export interface Get3 {
  OnlineResource: string;
}

export interface Post2 {
  OnlineResource: string;
}

export interface HTTP3 {
  Get: Get3;
  Post: Post2;
}

export interface DCPType3 {
  HTTP: HTTP3;
}

export interface GetFeatureInfo {
  Format: string[];
  DCPType: DCPType3[];
}

export interface Request {
  GetCapabilities: GetCapabilities;
  GetMap: GetMap;
  GetFeatureInfo: GetFeatureInfo;
}

export interface BoundingBox {
  crs: string;
  extent: number[];
  res: any[];
}

export interface LegendURL {
  Format: string;
  OnlineResource: string;
  size: number[];
}

export interface Style {
  Name: string;
  Title: string;
  Abstract: string;
  LegendURL: LegendURL[];
}

export interface Layer {
  Name: string;
  Title: string;
  Abstract: string;
  KeywordList: string[];
  SRS: string[];
  LatLonBoundingBox: number[];
  BoundingBox: BoundingBox[];
  Style: Style[];
  queryable: boolean;
  opaque: boolean;
  noSubsets: boolean;
}

export interface Layers {
  Title: string;
  Abstract: string;
  SRS: string[];
  LatLonBoundingBox: number[];
  Layer: Layer[];
}

export interface Capability {
  Request: Request;
  Exception: string[];
  Layer: Layers;
}
