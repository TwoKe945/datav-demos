<script lang='ts' setup>
import axios from 'axios'
import * as echarts from 'echarts'


const options = ref({})

onMounted(() => {
  axios.get('/geojson/china.json').then(res => {
    echarts.registerMap('china',  res.data);
    console.log(res.data)
    options.value = {
      geo: [
        {
            type: 'map',
            map: 'china',
            top: '20%',
            roam: false, // 是否开启鼠标缩放和平移漫游
            aspectScale: 0.85,
            // layoutCenter: ['30%', '30%'],
            // showLegendSymbol: true,
            // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
            // layoutSize: 300,
            // boundingCoords: [
            //     // 定位左上角经纬度
            //     [-110, 90],
            //     // 定位右下角经纬度
            //     [110, -90]
            // ],
            zoom: 1, // 初始化时的缩放比例
            // scaleLimit: { // 缩放限制
            //     min: 1, // 最小缩放比例
            //     max: 2 // 最大缩放比例
            // },
            z: 12, // z轴
            // selectedMode: 'multiple',// multiple single
            // aspectScale: 
            label: {
              show: false,
              color: '#fff',
              fontSize: 10,
              // top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
              position: ['50%', '50%'],
              rotate: 0, // 旋转角度
              offset: [0, 0], // 偏移 [横向偏移，纵向偏移]
              minMargin: 10, // 标签最小间隔
            },
            itemStyle: {
                areaColor: '#113976',
                borderColor: '#fff',
                borderType: 'solid', // dashed solid dotted
                borderCap: 'square', // butt round square
                borderJoin: 'round', // bevel round miter

                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                opacity: 1,
                // borderWidth: 0.5,
                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                // shadowBlur: 0,
                // shadowOffsetX: 0,
                // shadowOffsetY: 0
            },
            emphasis: {
              label: {
                color: '#fff',
              },
              itemStyle: {
                areaColor: '#113976',
                shadowColor: '#0CF4F998',
                shadowBlur: 10,
                opacity: 0.8,
              }
            },
            regions: [
                { // 隐藏南海诸岛,因为顶层已经添加过了
                    name: '南海诸岛',
                    itemStyle: {
                        normal: {
                          opacity: 0 // 为 0 时不绘制该图形
                        }
                    },
                    label: {
                        show: false
                    }
                }
            ],
            select: {
              label: {
                color: '#fff',
              },
              itemStyle: {
                areaColor: '#113976',
                shadowColor: '#0CF4F998',
                shadowBlur: 20,
                opacity: 0.8,
              }
            }
        },
        {
          type: 'map',
          map: 'china',
          top:"21%", aspectScale: 0.85,
          z: 11,
          regions: [
            { // 隐藏南海诸岛,因为顶层已经添加过了
              name: '南海诸岛',
              itemStyle: {
                normal: {
                  opacity: 0 // 为 0 时不绘制该图形
                }
              },
              label: {
                  show: false
              }
            }
          ],
          itemStyle: {
            areaColor: '#006794',
            borderColor: '#20769B',
            borderWidth: 2,
            shadowColor: '#0f4c74',
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur: 10,
          }, 
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: '#006794',
              borderColor: '#20769B',
              borderWidth: 2,
              shadowColor: '#0f4c74',
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 10,
            }
          },
        },
        {
          type: 'map',
          map: 'china',
          top:"21.5%",
          aspectScale: 0.85,
          z: 10,
          regions: [
            { // 隐藏南海诸岛,因为顶层已经添加过了
              name: '南海诸岛',
              itemStyle: {
                normal: {
                  opacity: 0 // 为 0 时不绘制该图形
                }
              },
              label: {
                  show: false
              }
            }
          ], 
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: '#00517B',
              borderColor: '#124A71',
              borderWidth: 2,
              shadowColor: '#0f4c74',
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 10,
            }
          },
          itemStyle: {
            areaColor: '#00517B',
            borderColor: '#124A71',
            borderWidth: 2,
            shadowColor: '#0f4c74',
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur: 10,
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
