<script lang='ts' setup>
import { useResize } from '~/composables/useResize';

const { autoBindRef, refreshLayoutSize, domSize } = useResize();

const { width, height } = toRefs(domSize)

defineExpose({ refreshLayoutSize });

const props = withDefaults(defineProps<{
  topDecoration?: boolean
  /**
   * 顶部装饰线宽度
   */
  topDecorationWidth?: number
  /**
   * 顶部装饰线开始位置
   */
  topDecorationStartX?: number

  rightDectation?: boolean
  rightDectationTop?: number
  rightDectationBottom?: number
  rightDectationType?: 'line' | 'rect'
  margin?: string
}>(), {
  topDecoration: true,
  topDecorationWidth: 84,
  topDecorationStartX: 236,
  rightDectation: true,
  rightDectationTop: 73,
  rightDectationBottom: 135,
  rightDectationType: 'rect',
  margin: '10px'
})

const showTopDectation = computed(() => {
  return props.topDecoration && props.topDecorationStartX + props.topDecorationWidth < width.value;
})

const topDecrationPath = computed(() => {
  return showTopDectation.value ? `L${props.topDecorationStartX - 27},6
      L${props.topDecorationStartX - 12},13
      L${props.topDecorationStartX + props.topDecorationWidth + 2},13
      L${props.topDecorationStartX + props.topDecorationWidth + 5},6` : ''
})

const innerRightDectationBottom = computed(() => {
  return props.rightDectationBottom < 50 ? 50 : props.rightDectationBottom
})

const rightDectationCount = computed(() => {
  return Math.round((height.value - props.rightDectationTop - innerRightDectationBottom.value) / 21)
})

const showRightDectation = computed(() => {
  return props.rightDectation && rightDectationCount.value > 0
})

const rightDectationPath = computed(() => {
  return showRightDectation.value ? `L${width.value - (props.rightDectationType === 'line' ? 14: 17)},${props.rightDectationTop}
      L${width.value - (props.rightDectationType === 'line' ? 14: 17)},${height.value - innerRightDectationBottom.value}` : ''
})
</script>
<template >
  <div class="border-01-container" :ref="autoBindRef">
    <svg class="border-svg-container" :width="width" :height="height">
      <!-- 边框 + 背景 -->
      <path fill-rule="evenodd"  stroke="rgb(44, 201, 168)" stroke-width="1.4px" stroke-linecap="round" stroke-linejoin="miter" opacity="0.651" fill="rgb(13, 41, 42)"
      :d="`
      M27,6
      ${topDecrationPath}
      L${width - 39},6
      L${width - 21},22
      L${width - 8},22
      L${width - 8},${rightDectationTop-8} 

      ${rightDectationPath}
      L${width - 8},${height - innerRightDectationBottom + 10}
      L${width - 8},${height - 19}

      L${width - 21},${height - 8}
      L6,${height - 8}
      L6,27
      L27,6 Z
      `"/>
      <!-- 顶部装饰线 -->
      <path v-if="showTopDectation" fill-rule="evenodd"  stroke="rgb(80, 244, 177)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M${topDecorationStartX},7 L${topDecorationStartX + topDecorationWidth},7 Z`"/>
      <!-- 右侧样式 -->
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M${width - 8},41 L${width - 8},22 L${width - 21},22 `"/>
      <!-- 边框样式3 -->
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      d="M6,6 L21,6 L6,17 L6,6 Z"/>
      <template v-if="showRightDectation && rightDectationType === 'rect'">
        <!-- 边框样式4 -->
        <path fill-rule="evenodd" v-for="(_,i) in Array.from({length: rightDectationCount})" stroke="rgb(147, 255, 192)" stroke-width="1px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
        :d="`M${width - 12},${rightDectationTop + 1 + i * 21 }
        L${width - 8},${rightDectationTop + 1 +  i * 21 }
        L${width - 8},${rightDectationTop + 13 + i * 21 }
        L${width - 12},${rightDectationTop + 13 + i* 21 }
        L${width - 12},${rightDectationTop + 1 + i * 21} Z`"/>
      </template>
      <template v-if="showRightDectation && rightDectationType === 'line'">
        <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="1.4px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
        :d="`M${width - 8},${rightDectationTop}
        L${width - 8},${height - rightDectationBottom} Z`"/>
      </template>
        <image href="/images/dv01/light.png" style="filter: drop-shadow(0px 0px 10px rgb(147, 255, 192));" :x="-40" :y="-48+6" height="96" width="313" />
        <image href="/images/dv01/light.png" transform="rotate(90)"
        :x="-155 + height/2" :y="-48-8" height="96" width="313" />
        <image href="/images/dv01/light.png" :x="-313 + width" :y="-48 + height - 10" height="96" width="313" />
    </svg>
    <div class="content" :style="{ margin: margin }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.border-01-container {
  position: relative;
  width: 100%;
  height: 100%;

  .border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }

  .content {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

}
</style>
