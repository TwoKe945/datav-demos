<script lang='ts' setup>
import 'echarts-wordcloud';
const options = ref({})
const color = [
  '#E65A56',
  '#FEE588',
  '#009DFF',
  '#22E4FF',
  '#3BFFD0',
  '#04E38A',
  '#5B6E96',
];
onMounted(() => {
  options.value = {
    backgroundColor: 'transparent', // 透明背景
    series: [
      {
        type: 'wordCloud',
        gridSize: 10, // 控制词云图的网格大小，值越大词语之间的间距越大
        sizeRange: [10, 30], // 控制词语的大小范围
        rotationRange: [0, 0], // 控制词语的旋转角度范围
        rotationStep: 45, // 控制词语旋转的步长
        shape: 'pentagon', // 控制词云图的形状，可选值为 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        drawOutOfBound: false, // 控制词云图是否允许词语超出绘制区域
        //  // 布局的时候是否有动画
        layoutAnimation: true,
            // 图的位置
        left: 'center',
        top: '0%',
        textStyle: {
          color: function (e: any) {
            return color[e.dataIndex] || '#576869';
          }
        },
        emphasis: {
          focus: 'self',
          textStyle: {
              fontSize: 30 // 点击的词放大
          }
        },
      data: [
        { name: '办理证件流程复杂', value: 50 },
        { name: '冬季取暖措施', value: 40 },
        { name: '流动人口众多', value: 35 },
        { name: '违规停车安全隐患', value: 30 },
        { name: '物业维修乱收费', value: 30 },
        { name: '垃圾成堆环境污染', value: 20 },
        { name: '流动人口众多', value: 20 },
        { name: '管理混乱', value: 15 },
        { name: '电梯经常坏', value: 12 },
        { name: '乱收费', value: 12 },
        { name: '老龄化社区', value: 12 },
      ]
    }]
  }
})
</script>

<template >
  <div class="p-4 h-full w-full">
    <div class="font-size-[22px] font-mono flex justify-start items-center pl-14">
      <img src="/images/dv01/icon_5.png" class="absolute left-0" />舆情分析</div>
    <div class="h-full w-full">
      <BasicChart :options="options"></BasicChart>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
