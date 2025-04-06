<script lang='ts' setup>
import * as echarts from 'echarts';
const props = withDefaults(defineProps<{
  options: echarts.EChartsOption,
  theme?: 'dark' | 'light'
}>(), {
  theme: 'dark'
})

const chartRef = useTemplateRef<HTMLDivElement>('chartRef')
let chartInstance:echarts.ECharts|null = null

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value, props.theme)
  chartInstance.setOption(props.options)
}

// 响应式调整
const resizeHandler = () => {
  chartInstance?.resize()
}


onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeHandler);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
  chartInstance?.dispose();
})

// 监听选项变化
watch(() => props.options, (newVal) => {
  chartInstance && chartInstance.setOption(newVal)
}, { deep: true })

defineExpose({
  instance: () => chartInstance
})
</script>

<template >
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<style scoped lang='scss'>
</style>
