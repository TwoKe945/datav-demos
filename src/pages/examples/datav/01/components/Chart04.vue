<script lang='ts' setup>

const options = ref({})
const color = ['rgb(3,148,123)', 'rgb(255,185,86)', 'rgb(3,139,148)', 'rgb(12,217,150)']

let data = [
  { value: 2876, name: 'APP采集' },
  { value: 166, name: '日常人工采集' },
  { value: 768, name: '业务系统采集' },
  { value: 1239, name: '机器采集' }
]

function dealPieData() {
  let pieData = data;
  let showData = [];
  let sum = 0, max = -Infinity;

  pieData.forEach((item) => {
    sum += item.value;
    if (item.value > max) {
      max = item.value;
    }
  })

  const scaleUpperNumber = Math.round(max * 0.7)

  showData = pieData.map((item) => {
    return {
      ...item,
      value: scaleUpperNumber + item.value,
      real: item.value
    }
  })

  data = showData;
}


onMounted(() => {
  dealPieData();
  options.value = {
    backgroundColor: 'transparent', // 透明背景
    series: [
    {
      type: 'pie',
      radius: [0, 80],
      roseType: 'angle',
      startAngle: -90,
      data: data,
      itemStyle: {
        color: function (e: any) {
          return color[e.dataIndex] || '#576869';
        }
      },
      label: {
        fontSize: 12,
        formatter: (item: any) => `${item.name}\n${item.data.real}`
      },
      labelLine: {
        length: 10,
        length2: 10,
        lineStyle: {
          color: 'rgb(131,229,174)'
        }
      }
    }
  ]
  }
})
</script>

<template >
  <div class="p-4 h-full w-full">
    <div class="font-size-[22px] font-mono flex justify-start items-center pl-14">
      <img src="/images/dv01/icon_4.png" class="absolute left-0" />数据采集分析</div>
    <div class="h-full w-full">
      <BasicChart :options="options"></BasicChart>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
