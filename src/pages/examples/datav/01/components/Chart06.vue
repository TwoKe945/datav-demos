<script lang='ts' setup>
const options = ref({})

onMounted(() => {
  options.value = {
    backgroundColor: 'transparent', // 透明背景
    legend: {
      left: '10%',
      top: '5%',
      data: [
        {
          name: '未核查',
          icon: 'rect',
          itemStyle: {
            color: 'rgb(255,185,86)'
          }
        }, {
          name: '已核查',
          icon: 'rect',
          itemStyle: {
            color: 'rgb(3,148,123)'
          }
        }
      ]
    },
    grid: {
      top: '20%',
      left: '3%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false,
      }
    },
    yAxis: {
      type: 'category',
      data: ['治安', '民事', '纠纷'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
      },
    },
    series: [
      {
        name: '未核查',
        type: 'bar',
        data: [14, 3, 9],
        barWidth: 10,
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgb(255,185,86)' },
              { offset: 1, color: 'rgba(255,185,86, 0.3)' },
            ]
          }
        },
        label: {
          show: true,
          position: 'right',
          color: '#0EE6FB',
          fontSize: 10
        }
      },
      {
        name: '已核查',
        type: 'bar',
        data: [168, 118, 88],
        barWidth: 10,
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: 'rgb(3,148,123)' },
              { offset: 1, color: 'rgba(3,148,123, 0.3)' },
            ]
          }
        },
        label: {
          show: true,
          position: 'right',
          color: '#0EE6FB',
          fontSize: 10
        }
      }
    ]
  }
})
</script>

<template >
  <div class="p-4 h-full w-full">
    <div class="font-size-[22px] font-mono flex justify-start items-center pl-14">
      <img src="/images/dv01/icon_6.png" class="absolute left-0" />视频监控</div>
    <div class="h-full w-full">
      <BasicChart :options="options"></BasicChart>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
