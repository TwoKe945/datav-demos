import 'leaflet'

declare module 'leaflet' {

  export interface TileLayerOptions {
    corrdType?: 'gcj02' | 'bd09' | 'wgs84';
  }

  export type ProvidedChinaMapType = // TianDiTu
    'TianDiTu.Normal.Map' |
    'TianDiTu.Normal.Annotion' |
    'TianDiTu.Satellite.Map' |
    'TianDiTu.Satellite.Annotion' |
    'TianDiTu.Terrain.Map' |
    'TianDiTu.Terrain.Annotion' |
    // GaoDe
    'GaoDe.Normal.Map' | // (include Annotion)
    'GaoDe.Satellite.Map' |
    'GaoDe.Satellite.Annotion' |
    // Google
    'Google.Normal.Map' | // (include Annotion)
    'Google.Satellite.Map' | // (exclude Annotion)
    'Google.Satellite.Map' | // (include Annotion)
    // Geoq
    'Geoq.Normal.Map' |
    'Geoq.Normal.PurplishBlue' |
    'Geoq.Normal.Gray' |
    'Geoq.Normal.Warm' |
    'Geoq.Normal.Hydro' |
    // OSM
    'OSM.Normal.Map' |
    // Baidu
    'Baidu.Normal.Map' |
    'Baidu.Satellite.Map' | //(exclude Annotion)
    'Baidu.Satellite.Annotion' |
    // Tencent
    'Tencent.Normal.Map' |
    'Tencent.Satellite.Map' |
    'Tencent.Terrain.Map';

  namespace tileLayer {
    function chinaProvider(map: ProvidedChinaMapType, options?: TileLayerOptions): TileLayer;
  }

}
