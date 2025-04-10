<script lang='ts' setup>
import * as echarts from 'echarts'
import axios from 'axios'
const options = ref({})
import { projection, createPseudo3DMapGeo, createBoundaries, createTexture, createMapTextureGeo ,createBoundariesSeriesAnimation } from '~/utils'

onMounted(async () => {
  // const texture = createTexture({
  //   width: 1920,
  //   height: 1080,
  //   src: '/images/texture/cq.png',
  //   x: 506,
  //   y: 76,
  //   w: el => el.width / 1.25,
  //   h: el => el.height / 1.25,
  // })

  let resp = await axios.get('/geojson/500000.json')
  echarts.registerMap('ChongQing', resp.data);
  resp = await axios.get('/geojson/bounds/500000.json')
  echarts.registerMap('ChongQing_bounds', resp.data);

  const boundaries = createBoundaries(resp.data.features)
  options.value = {
    backgroundColor: 'transparent',
    geo: [
      {
        map: 'ChongQing',
        zoom: 1.2,
        z: 24,
        top: '9%',
        left: '30%',
        aspectScale: 8.5,
        itemStyle: {
          color: 'transparent',
          borderWidth: 1,
          borderColor: '#24DDDD',
        }, 
        projection: projection.mercator,
        label: {
          show: true,
          color: '#fff',
          formatter: function(value: echarts.LabelFormatterCallback) {
            return`{a|${ value.name.split('').join('\n')}}`
          },
          rich: {
            a: {
              backgroundColor: '#000',
              padding: [3,3,3,3],
              color: '#fff',
              writingMode:' vertical-rl'
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            rich: {
              a: {
                backgroundColor: 'rgba(12,217,150)',
                padding: [3,3,3,3],
                color: '#fff',
                writingMode:' vertical-rl'
              }
            }
          },
          itemStyle: {
            color: 'rgba(12,217,150,0.5)'
          }
        }
      },
      ...createPseudo3DMapGeo({
        count: 6,
        startTop: 9,
        startLeft: 30,
        offsetY: 0.5,
        config: {
          map: 'ChongQing',
          aspectScale: 0.85,
          zoom: 1.2,
          projection: projection.mercator,
        }
      })
    ],
    series: [
      createBoundariesSeriesAnimation(boundaries, {
        top: '9%',
        left: '30%',
        z: 22,
        lineStyle: {
          color: '#3F5B22'
        }
      }),
      {
        type: 'custom',
        data: [0],
        coordinateSystem: 'geo',
        geoIndex: 0,
        z: 23,
        renderItem: function (params: echarts.CustomSeriesRenderItemAPI, api: echarts.CustomSeriesRenderItemAPI) {
          const [x, y] = api.coord([105.2897590000000037,32.2011869999999973]);
          const [endX, endY] = api.coord([110.1988759999999985,28.1613390000000017]);
          console.log(x, y);
          return {
            type: 'image',
            x: x,
            y: y,
            style: {
              image: '/images/texture/1.png',
              width: endX - x,
              height: endY - y,
            },
            z:23,
          }
        },
      }
    ]
  } as echarts.EChartsOption
})
</script>

<template >
  <div class=" relative w-[100vw] h-[100vh]">
    <BasicChart ref="chartRef" :options="options"></BasicChart>
  </div>
</template>

<style scoped lang='scss'>

</style>
