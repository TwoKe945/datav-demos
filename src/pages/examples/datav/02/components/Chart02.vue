<script lang='ts' setup>
import axios from 'axios'
import { ASSETS_TYPE } from "./types";
import * as turf from '@turf/turf';

const options = ref({})
const chartRef = ref()
const assets = inject("assets")


let count = 4;
watch(() => assets.value, (val) => {
  const instance = chartRef.value.instance() as echarts.Echarts
  if (--count == 0) {
    instance.setOption({
      series: createDataSeries()
    });
  }
}, {
  deep: true
})

let features = []
let names = []

const colorMap = {
  zk_hospital: ['rgba(37,146,255)', 'rgba(37,146,255,.3)'],
  zh_hospital: ['rgb(131,229,174)', 'rgb(131,229,174, .3)'],
  zx_school: ['rgb(255,188,29)', 'rgb(255,188,29, .3)'],
  xx_school: ['rgb(22,202,133)', 'rgb(22,202,133, .3)'],
}

function createDate(type: string) {
  const color = colorMap[type];
  
  return {
        name: ASSETS_TYPE[type],
        type: 'bar',
        stack: 'total',
        data: names.map(name => namesCount[name][type]),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: color[0] },
              { offset: 1, color: color[1] },
            ]
          }
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 8,
          formatter: (params) => {
            return Math.round(params.value / namesCount[params.name].count * 1000) / 10 + '%'
          }
        }
      }
}

const namesCount = {};
function createDataSeries() {
  names.forEach(name => {
    namesCount[name] = {count: 0};
    const polygon = turf.polygon(features[name].geometry.coordinates);
    assets.value.forEach(item => {
      if (turf.booleanPointInPolygon(turf.point([item.lon, item.lat]), polygon)) {
        namesCount[name].count++;
        if (!namesCount[name][item.type]){
          namesCount[name][item.type] = 0;
        }
        namesCount[name][item.type]++;
      }
    })
  })
  return [
    createDate('zk_hospital'),
    createDate('zh_hospital'),
    createDate('zx_school'),
    createDate('xx_school')
  ]
}

onMounted(async () => {
  const resp = await axios.get('/geojson/500103.json')
  features = resp.data.features.reduce((config, item) => {
    config[item.properties.name] = item
    return config
  },{})
  names = Object.keys(features).sort();
  
  options.value = {
    backgroundColor: 'transparent',
    legend: {
      show: true,
      top: '20px'
    },
    grid: {
      left: '30px',
      right: '0px'
    },
    tooltip: {
      className: 'echarts-tooltip',
      textStyle: {
        color: '#fff'
      },
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        rotate: 45,
        color: '#fff',
        fontSize: 10
      },
      splitLine: {
        show: false,
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false,
        color: '#fff'
      },
      splitLine: {
        show: false,
      }
    },
    series: [
      ...createDataSeries()
    ]
  }
})
</script>

<template >
  <BasicChart ref="chartRef" :options="options"></BasicChart>
</template>

<style scoped lang='scss'>
</style>
