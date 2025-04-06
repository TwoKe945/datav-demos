<script lang='ts' setup>
import { useResize } from '~/composables/useResize';
const { autoBindRef, refreshLayoutSize, domSize } = useResize();
import type { ECharts } from 'echarts'

const { width, height: h } = toRefs(domSize)
const height = computed(() => h.value - 5)
const chartRef = ref()
const options = ref({} as any)

defineExpose({
  refreshLayoutSize
})

function onMouseOver(params: any) {
  options.value.title.text = Math.round(params.percent) + '%'
}
function onMouseOut(_params: any) {
  options.value.title.text = ''
}

onMounted(() => {
  options.value = {
    backgroundColor: 'transparent', // 透明背景
    title: {
      text: '',
      left: 'center',
      top: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 20
      }
    },
    series: [
      {
      type: 'pie',
      radius: ['40%', '55%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        color: '#0F8362',
      },
      color: ['#029B80', '#7DF7FF', '#FFB956', '#2FFAFF'],
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true,
        lineStyle: {
          color:  '#275A83'
        }
      },
      data: [
        { value: 1048, name: '不满意' },
        { value: 735, name: '满意' },
        { value: 580, name: '一般' },
        { value: 484, name: '非常满意' }
      ]
    }
  ]
  }
  const instance = chartRef.value.instance() as ECharts;
  instance.on('mouseover', 'series.pie', onMouseOver)
  instance.on('mouseout', 'series.pie', onMouseOut)
})

onBeforeUnmount(() => {
  const instance = chartRef.value.instance() as ECharts;
  instance.off('mouseover', onMouseOver)
  instance.off('mouseout', onMouseOut)
})

</script>
<template >
  <div class="mt--1 overflow-hidden relative w-full h-full" :ref="autoBindRef">
    <svg :width="width" :height="height" v-if="height > 0 && width > 0">
      <path fill-rule="evenodd"  stroke="rgb(44, 201, 168)" stroke-width="1.4px" stroke-linecap="round" stroke-linejoin="miter" opacity="0.651" fill="rgb(11, 40, 42)"
      :d="`M${width-8},${height-8}
      L${width-8},22 L170,22 L153,6 L15,6 L6,16 L6,${height-8} L103,${height-8} L107,${height-12} L185,${height-12} L191,${height-8} L${width-8},${height-8} Z`"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M${width-21},22 L${width-8},22 L${width-8},30 `"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M${width-20},${height-9} L${width-7},${height-9} L${width-7},${height-17} `"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M126,${height-12} L161,${height-12}`"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      d="M129,6 L152,6 L170,22 L185,22 "/>
      <path fill-rule="evenodd"  fill="rgb(147, 255, 192)"
      d="M8,6 L13,6 L6,12 L6,8 L8,6 Z"/>
    </svg>
    <div class="absolute top-0 left-0 w-full h-full bottom-0 right-0">
      <div class="pt-3 pl-6 font-mono font-size-[12px]">本月居民满意度指数</div>
      <div class="h-[80%]">
        <BasicChart ref="chartRef" :options="options"></BasicChart>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
