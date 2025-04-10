<script lang='ts' setup>
import axios from 'axios'
import * as echarts from 'echarts'
import type { } from '@turf/turf'

const options = ref({})


onMounted(async () => {
  // let resp = await axios.get('/geojson/bounds/500103.json');
  let resp = await axios.get('/geojson/roads/500103.json');
  echarts.registerMap('500103_roads', resp.data)

  resp = await axios.get('/geojson/water/500103.json');
  echarts.registerMap('500103_water', resp.data)
  resp = await axios.get('/geojson/roadways/500103.json');
  echarts.registerMap('500103_roadways', resp.data)
  // console.log(data1)


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
    const geoCoordMap = {
      '望龙门街道': [106.580086, 29.558097],
      '朝天门街道': [106.582124, 29.566141],
      '大溪沟街道': [106.556568, 29.564107],
    }
    let convertData = function (data: GeoMapData[]) {
        // 处理数据函数
      let res = []
      for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            num: data[i].num,
            value: geoCoord.concat(data[i].rn),
          })
        }
      }
      return res
    }

    const boundingCoords = [
      [106.4780209974945677,29.5311256808466496],
      [106.5882514756467856,29.5747754111781802]
    ];
    const zoom = 0.9;
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
            color: 'rgba(12,217,150,0.2)'
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
        map: '500103_roads',
        boundingCoords: boundingCoords,
        z: 2,
        zoom,
        itemStyle: {
          borderColor: 'yellow'
        },
      },
      {
        map: '500103_roadways',
        boundingCoords: boundingCoords,
        z: 3,
        zoom,
        itemStyle: {
          borderColor: 'red'
        },
      },
      {
        map: '500103_water',
        z: 1,
        zoom,
        boundingCoords: boundingCoords,
        itemStyle: {
          color: '#0000ff88'
        },
      }
      ],
      legend: {
        show: true,
        selected: {
          // 默认展示前十
          '告警点': true,
        },
        //icon: 'none',
        right: '4%',
        bottom: '15%',
        data: ['告警点'],
        textStyle: {
          fontSize: 12,
        },
      },
      series: [
        {
          name: '告警点',
          geoIndex: 0,
          z: 11,
          type: 'effectScatter',
          coordinateSystem: 'geo',
          legendHoverLink: true,
          data: convertData([
            {
              name: '望龙门街道',
              num: 110
            },
            {
              name: '朝天门街道',
              num: 100
            },
            {
              name: '大溪沟街道',
              num: 50
            },
          ]),
          large: 10,
          //showEffectOn: 'emphasis',
          rippleEffect: {
            scale: 15,
          },
          itemStyle: {
            color: 'red',
          },
          label: {
            show: true,
            color: '#fff',
            formatter: function (params: any) {
              console.log(params) 
              return params.data.num
            }
          },
        },
      ]
    } as echarts.EChartsOption;
  })
})
</script>

<template >
  <div class="w-[100vw] h-[100vh]">
    <BasicChart :options="options"></BasicChart>
  </div>
</template>

<style scoped lang='scss'>
</style>
