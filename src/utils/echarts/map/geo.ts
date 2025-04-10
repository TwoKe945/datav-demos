import type { LinesSeriesOption, SeriesOption } from 'echarts'
import type { GeoComponentOption } from 'echarts'
import { merge } from 'lodash-es'
type Boundaries = [
  { coord: [number, number] }, // 当前点
  { coord: [number, number] } // 上一个点
]

/**
 * 创建边界线点
 * @param features geojson features
 * @returns
 */
export function createBoundaries(features: any) {
  if (!features || features.length === 0) return [];
  const boundaries: Boundaries[] = [];
    features.forEach((feature: any) => {
      if (feature.geometry.type === 'MultiPolygon') {
          feature.geometry.coordinates.forEach((polygon: [number,number][][]) => {
            if (!polygon || polygon.length === 0) return
            polygon[0].forEach((point: [number,number], index: number) => {
                if (index > 0) {
                    boundaries.push([
                        { coord: point }, // 当前点
                        { coord: polygon[0][index - 1] } // 上一个点
                    ]);
                }
            });
          });
      } else if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates.forEach((polygon: [number,number][]) => {
          if (!polygon || polygon.length === 0) return
          console.log(polygon)
          polygon.forEach((point: [number,number], index: number) => {
            if (index > 0) {
              boundaries.push([
                  { coord: point }, // 当前点
                  { coord: polygon[index - 1] } // 上一个点
              ]);
            }
          })
        });
      }
  });
  return boundaries;
}


/**
 * 创建边界线动画
 * @param boundaries 边界线点
 * @param options 边界线配置
 * @returns
 */
export function createBoundariesSeriesAnimation(boundaries: Boundaries[], options: SeriesOption & LinesSeriesOption = {}) {
  return merge({
    type: 'lines',
    coordinateSystem: 'geo',
    data: boundaries, // 动态生成边界的线条数据
    lineStyle: {
      color: '#24DDDD',
      width: 6,
      opacity: 1,
      shadowColor: '#24DDDD88',
      shadowBlur: 10,
      cap: 'round',
      join: 'round',
    },
    progressiveThreshold: 500, // 触发渐进动画的阈值
    progressive: 3 // 每次绘制的点数
  }, options)
}


export function createMapTextureGeo(image: HTMLImageElement | HTMLCanvasElement , option?: GeoComponentOption) {
  return merge({
    itemStyle: {
      areaColor:{
        image: image, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
        repeat: 'no-repeat', // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
      },
      borderWidth: 0,
      borderColor: 'transparent'
    },
    label: {
      show: false,
    },
    emphasis: {
      label: {
        show: false,
      },
      itemStyle: {
        areaColor:{
          image: image, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          repeat: 'no-repeat', // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
        },
        borderWidth: 0,
        borderColor: 'transparent'
      }
    }
  }, option || {})
}

interface CreatePseudo3DMapOption {
  count?: number
  startTop?: number
  startLeft?: number
  offsetX?: number
  offsetY?: number
  startZ?: number
  config: GeoComponentOption // 通用配置
  type?: 'gradation' | 'border'
}

const MIN_COUNT = 3;

export function createPseudo3DMapGeo(option: CreatePseudo3DMapOption) {
  const count = option.count ? option.count < MIN_COUNT ? MIN_COUNT : option.count : MIN_COUNT
  const z = option.startZ || 1
  const left = option.startLeft || 0
  const top = option.startTop || 0
  const offsetX = option.offsetX || 0
  const offsetY = option.offsetY || 0.25
  const type = option.type || 'border'

  function color(i: number) {
    if (type === 'border') return 'transparent'
    return 'transparent'
  }

  function borderWidth(_i: number) {
    if (type === 'border') return 1
    return 0
  }


  return Array.from({ length: count }, (_, i) => {
    console.log(`${top + offsetY * (i + 1)}%`, `${left + offsetX * (i + 1)}%`)
    const config = merge({
      type: 'map',
      z: z + i,
      top: `${top + offsetY * (i + 1)}%`,
      left: `${left + offsetX * (i + 1)}%`,
      itemStyle: {
        color: color(i),
        borderWidth: borderWidth(i),
        borderColor: '#fff',
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          color: color(i),
        }
      }
    }, option.config)
    return config
  })
}
