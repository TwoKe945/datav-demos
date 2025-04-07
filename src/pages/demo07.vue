<script lang='ts' setup>
import * as echarts from 'echarts'
import axios from 'axios'
const options = ref({})

function createShadow({ level = 3, top = 9, left = 10, z = 1, offset = 0.25 }:{ offset: number, z: number, level: number, top: number , left: number }) {
  return Array.from({ length: level }, (_, i) => {
    const config =  {
        type: 'map',
        map: 'ChongQing',
        z: z + i,
        aspectScale: 0.85,
        top: `${top + offset * (i + 1)}%`,
        left: `${left + offset * (i + 1)}%`,
        itemStyle: {
          color: 'transparent'
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            color: 'transparent'
          }
        }
    }
    return config
  })
}

onMounted(async () => {
  const resp = await axios.get('/city/500000.json')
  echarts.registerMap('ChongQing', resp.data);
  options.value = {
    backgroundColor: 'transparent',
    geo: [
      {
        type: 'map',
        map: 'ChongQing',
        z: 6,
        top: '9%',
        left: '30%',
        aspectScale: 0.85,
        itemStyle: {
          color: '#0CD996'
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            color: '#0CD996'
          }
        }
      },
      ...createShadow({
        level: 3,
        top: 9,
        left: 30,
        z: 1,
        offset: 0.25
      })
    ]
  }


})

</script>

<template >
  <div class=" bg-[#fff] w-[100vw] h-[100vh]">
    <BasicChart :options="options"></BasicChart>
  </div>
</template>

<style scoped lang='scss'>

</style>
