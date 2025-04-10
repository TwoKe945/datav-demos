<script lang='ts' setup>
const options = ref({})
import { ASSETS_TYPE } from './types'

const chartRef = ref()
const assets = inject("assets")
const props = defineProps<{
  type: 'school' | 'hospital'
}>()
function groupBy(data: [], generateKey: (item) => string) {
  const result = {}
  data.forEach(item => {
    const key = generateKey(item);
    if (!result[key]){
      result[key] = 0;
    }
    result[key]++;
  })
  return result;
}

const name = '资源占比';
let count = 4;
watch(() => assets.value, (val) => {
  const instance = chartRef.value.instance() as echarts.Echarts
  if (--count == 0) {
    
  const result = groupBy(assets.value, item => item.type);
  const data = Object.keys(result).filter(item => item.endsWith(props.type)).map(item => ({name: ASSETS_TYPE[item], value: result[item]}))
    instance.setOption({
      series: [
        {
          name,
          data
        }
      ]
    });
  }
}, {
  deep: true
})

onMounted(() => {

  const result = groupBy(assets.value, item => item.type);
  const data = Object.keys(result).filter(item => item.endsWith(props.type)).map(item => ({name: ASSETS_TYPE[item], value: result[item]}))

  options.value = {
    backgroundColor: 'transparent',
    legend: {
      show: true,
      bottom: '0px'
    },
    tooltip: {
      className: 'echarts-tooltip',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name,
        type: 'pie',
        radius: ['30%','80%'],
        data: data,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderWidth: 0
        },
        color: props.type === 'school' ? [
          'rgba(255,188,29)',
          'rgba(22,202,133)'] : [
          'rgba(37,146,255)',
          'rgb(131,229,174)'
        ],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
      }
    ]
  }
})
</script>

<template >
  <BasicChart ref="chartRef" :options="options"></BasicChart>
</template>

<style scoped lang='scss'>
</style>
