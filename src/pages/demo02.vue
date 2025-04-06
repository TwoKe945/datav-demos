<script lang='ts' setup>
import axios from 'axios'
import * as echarts from 'echarts';
import { graphic } from 'echarts/core';
import 'echarts-gl';


const options = ref({})
// 渐变色生成函数
function createAreaGradient(start: string, end: string): graphic.LinearGradient {
  return new graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: start },
    { offset: 0.7, color: end + 'dd' },
    { offset: 1, color: end + '55' }
  ], false);
}

function createBorderGradient(): graphic.LinearGradient {
  return new graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: 'rgba(255,255,255,0.8)' },
    { offset: 1, color: 'rgba(255,255,255,0.2)' }
  ], false);
}
onMounted(() => {
  axios.get('/city/500000.json').then(res => {
    echarts.registerMap('CQ',  res.data);
    console.log(res.data)
    options.value = {
      backgroundColor: '#040d21',
      geo3D: [
          {
            type: 'map',
            map: 'CQ',
            roma: true,
            regionHeight: 2,
            groundPlane: {
              color: 'red'
            },
            instancing: true,
            itemStyle: {
              color:[0.2, 0.4, 1, 0.23],
              borderWidth: 1.2,
              borderColor: createBorderGradient()
            },
            emphasis: {
              regionHeight: 5,
            },
            label: {
              show: true,
              color: '#fff',
              fontSize: 12,
              // formatter: '{b}'
            },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        inRange: {
          color: ['#1a5b7e', '#3e8a9f']
        },
        textStyle: {
          color: '#fff'
        }
      }
        }
      ]
    }
  })
})
</script>

<template >
  <div class="chart-container">
    <BasicChart  :options="options" />
  </div>
</template>

<style scoped lang='scss'>
.chart-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  // gap: 20px;
  height: 100vh;
  width: 100vw;
}
</style>
