/**
 * Geo stream interface compatitable with d3-geo
 * See the API detail in https://github.com/d3/d3-geo#streams
 */
interface ProjectionStream {
  point(x: number, y: number): void;
  lineStart(): void;
  lineEnd(): void;
  polygonStart(): void;
  polygonEnd(): void;
  /**
   * Not supported yet.
   */
  sphere(): void;
}
interface GeoProjection {
  project(point: number[]): number[];
  unproject(point: number[]): number[];
  /**
   * Projection stream compatitable to d3-geo projection stream.
   *
   * When rotate projection is used. It may have antimeridian artifacts.
   * So we need to introduce the fule projection stream to do antimeridian clipping.
   *
   * project will be ignored if projectStream is given.
   */
  stream?(outStream: ProjectionStream): ProjectionStream;
}

/**
 * 墨卡托投影
 */
const mercator: GeoProjection = {
  project: (point: number[]) => [point[0] / 180 * Math.PI, - Math.log(Math.tan((Math.PI / 2 + point[1] / 180 * Math.PI) / 2))],
  unproject: (point: number[]) => [point[0] * 180 / Math.PI, 2 * 180 / Math.PI * Math.atan(Math.exp(point[1])) - 90]
}


export const projection = {
  /**
   * 墨卡托投影
   */
  mercator
}
