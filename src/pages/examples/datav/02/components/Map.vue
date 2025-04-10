<template >
  <BasicChart ref="chartRef" :options="options"></BasicChart>
</template>

<script setup lang="ts">
import axios from 'axios'
import * as echarts from 'echarts'
import  { type AssetsData, ASSETS_TYPE, type AssetsType } from './types'

const options = ref({})
const chartRef = ref()

const assets = inject('assets') as Ref<AssetsData[]>

let count = 4;

watch(() => assets.value, (val) => {
  const instance = chartRef.value.instance() as echarts.Echarts
  if (--count == 0) {
    instance.setOption({
      series: [
        createData('zk_hospital', 'zkyy'), // 专科医院
        createData('zh_hospital', 'zhyy'),// 综合医院
        createData('zx_school', 'zxxx'), // 中学
        createData('xx_school', 'xxxx'), // 小学
      ]
    });
  }
}, {
  deep: true
})
function createData(type: AssetsType, icon: string) {
  return  {
      name: ASSETS_TYPE[type],
      geoIndex: 0,
      z: 23,
      type: 'scatter',
      coordinateSystem: 'geo',
      legendHoverLink: true,
      data: assets.value.filter(item => item.type === type),
      symbol: `image://${location.origin}/images/icons/${icon}.svg`,
      symbolSize: 30, // 图标大小
      large: true, // 是否开启大数据量优化
      label: {
        show: false,
      },
      emphasis: {
        scale: 2.0,
        label: {
          show: true,
          color: '#fff',
          formatter: function (params: any) {
            return `{name|${params.data.name}}`
          },
          fontSize: 14,
          rich: {
            name: {
              backgroundColor: '#000000ee',
              padding: [5,5,5,5],
            }
          }
        }
      },
      labelLayout: function () {
        return {
          hideOverlap: true, // 避免重叠
          verticalAlign: 'bottom' // 文本垂直对齐方式
        };
      },
      tooltip: {
        show: true,
        enterable: true,
        formatter: function (params) {
          console.log( params)
          const { address,  lonlat, phone} = params.data as AssetsData
          return `<div style="width:200px;max-width:200px;">
            <div>类型：${params.seriesName}</div>
            <div style="white-space: pre-wrap; ">名称：${params.name}</div>
            <div style="white-space: pre-wrap; ">联系方式：${phone || '-'}</div>
            <div style="white-space: pre-wrap; ">地址：<a href="https://ditu.amap.com/search?query=${encodeURIComponent(params.name.includes("重庆") || params.name.includes("渝中") ? params.name : (`重庆市渝中区` + params.name))}" target="_blank">${address || params.name}</a></div>
            <div style="white-space: pre-wrap; ">经纬度${lonlat}</div>
          </div>`
        }
      }
    } as echarts.ScatterSeriesOption
}

onMounted(async () => {
  // let resp = await axios.get('/geojson/bounds/500103.json');
  let resp = await axios.get('/geojson/roads/500103.json');
  echarts.registerMap('500103_roads', resp.data)
  resp = await axios.get('/geojson/water/500103.json');
  echarts.registerMap('500103_water', resp.data)
  resp = await axios.get('/geojson/roadways/500103.json');
  echarts.registerMap('500103_roadways', resp.data)
  axios.get('/geojson/500103.json').then(res => {
    let data = null as any
    if (res.data) {
      data =  {
        features: res.data.features || res.data,
        type: 'FeatureCollection',
      }
      data.features.forEach((feature: any) => {
        feature.properties.name = feature.properties['乡']
      })
    }
    echarts.registerMap('500103', data)
    const boundingCoords = [
      [106.4780209974945677,29.5311256808466496],
      [106.5882514756467856,29.5747754111781802]
    ];
    const zoom = 0.9;
    const image = new Image();
    image.src = '/images/texture/water/01.jpg';
    options.value = {
      backgroundColor: 'transparent',
      geo: [
        {
          map: '500103',
          z: 10,
          zoom,
          label: {
            show: true,
            color: '#fff',
          },
          itemStyle: {
            borderWidth: 1.2,
            borderColor: '#ffffff88',
            color: 'rgba(12,217,150,0.1)'
          },
          boundingCoords: boundingCoords,
          emphasis: {
            label: {
              color: '#fff',
            },
            itemStyle: {
              color: 'rgba(12,217,150,0.5)'
            }
          }
        },
        {
        map: '500103_roads', // 道路
        boundingCoords: boundingCoords,
        z: 2,
        zoom,
        silent: true,
        itemStyle: {
          borderColor: 'yellow'
        },
      },
      {
        map: '500103_roadways', // 道路
        silent: true,
        boundingCoords: boundingCoords,
        z: 3,
        zoom,
        itemStyle: {
          borderColor: 'red'
        },
      },
      {
        map: '500103_water', // 水域
        z: 1,
        zoom,
        silent: true,
        boundingCoords: boundingCoords,
        itemStyle: {
          areaColor: {
            image: image,
            scaleX: 0.04,
            scaleY: 0.04,
            repeat: 'repeat'
          },
        },
      }
      ],
      legend: {
        show: true,
        // selected: {
        //   '专科医院': false,
        //   '综合医院': false,
        //   '中学': false,
        //   '小学': false,
        // },
        inactiveColor: '#fff',
        // right: '4%',
        bottom: '5%',
        data: Object.values(ASSETS_TYPE),
        itemHeight: 40,
        itemWidth: 40,
        textStyle: {
          fontSize: 14,
          color: 'yellow'
        },
        selectorLabel: {
          color: '#fff',
          backgroundColor: '#000',
          padding: [5,5,5,5],
          borderRadius: 0,
          borderWidth: 0
        },
        // orient: 'vertical',
        selector: [
          {
            type: 'all',
            title: '全选'
          },
          {
            type: 'inverse',
            title: '反选'
          }
        ]
      },
      tooltip: {
        show: false,
        trigger: 'item',
        className: 'echarts-tooltip',
      },
      series: [
        createData('zk_hospital', 'zkyy'), // 专科医院
        createData('zh_hospital', 'zhyy'),// 综合医院
        createData('zx_school', 'zxxx'), // 中学
        createData('xx_school', 'xxxx'), // 小学
        {
          type: 'custom',
          data: [0],
          coordinateSystem: 'geo',
          geoIndex: 0,
          z: -1,
          renderItem: function (_params: echarts.CustomSeriesRenderItemAPI, api: echarts.CustomSeriesRenderItemAPI) {
            const [x, y] = api.coord([106.4780209970000016,29.5747754110000010]);
            const [endX, endY] = api.coord([106.5882514759999964,29.5311256809999989]);
            console.log(x, y);
            return {
              type: 'image',
              x: x,
              y: y,
              style: {
                image: '/images/texture/500103.png',
                opacity: .6,
                width: endX - x,
                height: endY - y
              },
              z:23,
            }
          }
        },
        {
        type: 'custom',
        data: [0],
        coordinateSystem: 'geo',
        geoIndex: 0,
        z: -1,
        renderItem: function (_params: echarts.CustomSeriesRenderItemAPI, api: echarts.CustomSeriesRenderItemAPI) {
          const [x, y] = api.coord([106.4418304250000062, 29.5912603459999985]);
          const [endX, endY] = api.coord([106.6218304249999989, 29.5022603459999999]);
          return {
            type: 'image',
            x: x,
            y: y,
            style: {
              image: '/images/texture/bg.png',
              opacity: .3,
              width: endX - x,
              height: endY - y,
            },
            z:23,
          }
        }
        }
      ]
    } as echarts.EChartsOption;
  })
})
</script>
