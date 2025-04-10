<script lang='ts' setup>
import * as echarts from 'echarts'
import axios from 'axios'
import { union, featureCollection } from '@turf/turf'
const options = ref({})
import { projection, createPseudo3DMapGeo, createBoundaries, createTexture, createMapTextureGeo ,createBoundariesSeriesAnimation } from '~/utils'



onMounted(async () => {
  const texture = createTexture({
    width: 1920,
    height: 1080,
    src: '/images/texture/cq.png',
    x: 506,
    y: 76,
    w: el => el.width / 1.25,
    h: el => el.height / 1.25,
  })

  let resp = await axios.get('/geojson/500000.json')
  echarts.registerMap('ChongQing', resp.data);
  resp = await axios.get('/geojson/bounds/500000.json')
  echarts.registerMap('ChongQing_bounds', resp.data);
  const boundaries = createBoundaries(resp.data.features)
  console.log(boundaries)
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
      createMapTextureGeo(texture, {
        map: 'ChongQing',
        z: 20,
        zoom: 1.2,
        top: '9%',
        left: '30%',
        aspectScale: 0.85,
        projection: projection.mercator,
      }),
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
      })
    ]
  }
})
</script>

<template >
  <div class=" relative w-[100vw] h-[100vh]">
    <BasicChart ref="chartRef" :options="options"></BasicChart>
  </div>
</template>

<style scoped lang='scss'>

</style>
