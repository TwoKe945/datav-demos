
export const ASSETS_TYPE = {
  zk_hospital: '专科医院',
  zh_hospital: '综合医院',
  zx_school: '中学',
  xx_school: '小学',
} as const


export type AssetsType = keyof typeof ASSETS_TYPE
export type AssetsName = typeof ASSETS_TYPE[AssetsType]

export interface AssetsData {
  name: AssetsName,// 资源名称
  type: AssetsType, // 资源类型
  address: string // 详细地址
  phone: string // 联系电话
  lonlat: string // 详细地址
  lon: number // 纬度
  lat: number // 经度
}
