<script lang='ts' setup>

const options = ref({})

function createData({ data, name, color }: {name: string, data: number[], color: [string, string, string]}) {
  return {
        data: data,
        type: 'line',
        name: name,
        smooth: true,
        symbol: 'circle',
        showSymbol: true,
        symbolSize: 7,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: color[0] // 0% 处的颜色
            },{
              offset: 0.5, color: color[1]
            },{
              offset: 0.8, color: color[2]
            }, {
              offset: 1, color: 'transparent' // 100% 处的颜色
            }],
          }
        },
        clip: false,
        itemStyle: {
          color: color[0],
        },
        lineStyle: {
          color: color[0],
          width: 3
        }
      }
}

onMounted(() => {
  options.value = {
    backgroundColor: 'transparent', // 透明背景
    legend: {
      show: true,
      type: 'scroll',
      top: '5%',
      data: ['刑满释放人员', '低保人员', '疾病人员']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      boundaryGap: false, // 不显示坐标轴两边的刻度线
      axisLine: {
        show: false  // 隐藏x轴
      },
      axisTick: {
        show: true, // 隐藏x轴刻度线
        lineStyle: {
          color: '#11363A'
        }
      },
      axisLabel: {
        color: '#fff', // x轴文字颜色
        fontSize: 10
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#11363A'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: true, // 隐藏x轴刻度线
        lineStyle: {
          color: '#11363A'
        }
      },
      axisLabel: {
        color: '#fff', // x轴文字颜色
        fontSize: 10
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#11363A'
        }
      }
    },
    series: [
      createData({
        name: '刑满释放人员',
        data: [450, 350, 300, 250, 220, 200, 190, 120],
        color: ['rgb(3,148,123)', 'rgba(3,148,123, 0.5)', 'rgba(3,148,123,  0.2)']
      }),
      createData({
        name: '低保人员',
        data: [350, 200, 120, 100, 150, 170, 160, 90],
        color: ['rgb(255,185,86)', 'rgba(255,185,86, 0.5)', 'rgba(255,185,86,  0.2)']
      }),
      createData({
        name: '疾病人员',
        data: [250, 350, 410, 490, 420, 400, 420, 600], 
        color: ['rgb(12,217,150)', 'rgba(12,217,150, 0.5)', 'rgba(12,217,150,  0.2)']
      })
    ]
  }
})
</script>

<template >
  <div class="p-4 h-full w-full">
    <div class="font-size-[22px] font-mono flex justify-start items-center pl-14">
      <img src="/images/dv01/icon_7.png" class="absolute left-0" />特殊人群趋势
    </div>
    <div class="h-full w-full">
      <BasicChart :options="options"></BasicChart>
    </div>
  </div>
</template>

<style scoped lang='scss'>
// * {
//   color: transparent;
// }
</style>
