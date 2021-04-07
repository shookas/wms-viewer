export interface FeatureInfo<T = { [key: string]: string | number }> {
    type: string;
    features?: (FeaturesEntity<T>)[] | null;
    totalFeatures: string;
    numberReturned: number;
    timeStamp: string;
    crs: Crs;
    bbox?: (number)[] | null;
}
interface FeaturesEntity<T> {
    type: string;
    id: string;
    geometry: Geometry;
    geometry_name: string;
    properties: T;
    bbox?: (number)[] | null;
}
interface Geometry {
    type: string;
    coordinates?: (number)[] | null;
}
interface Crs {
    type: string;
    properties: Properties1;
}
interface Properties1 {
    name: string;
}
