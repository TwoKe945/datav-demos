<script lang='ts' setup>
import { useResize } from '~/composables/useResize';

const { autoBindRef, refreshLayoutSize, domSize } = useResize();

const { width, height } = toRefs(domSize)

defineExpose({ refreshLayoutSize });

const props = withDefaults(defineProps<{
  topDecoration?: boolean,
  topDecorationWidth?: number,
  reverse?: boolean,
  title?: string
}>(), {
  topDecoration: true,
  topDecorationWidth: 162,
  reverse:  false,
  title: '标题'
})

</script>
<template >
  <div class="border-01-small-container"  :ref="autoBindRef">
    <svg :class="{
      reverse: reverse,
    }" class="border-svg-container"  :width="width" :height="height">
      <path fill-rule="evenodd"  stroke="rgb(44, 201, 168)" stroke-width="1.4px" stroke-linecap="round" stroke-linejoin="miter" opacity="0.651" fill="rgb(11, 40, 42)"
      :d="`
        M18,6
        L6,18
        L6,58
        L15,69
        L32,70
        L32,${height - 12}
        L${width - 21},${height - 12}
        L${width - 8},${height - 23}
        L${width - 8},57
        L${width - 20},57
        L${width - 37},42
        L${width - 61},42
        L${width - 65},50
        L${width - 62 - topDecorationWidth - 1},50
        L${width - 62 - topDecorationWidth - 39},6
        L18,6 Z`"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M${width - 62},42 L${width - 62 - topDecorationWidth},42`"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M32,84 L32,${height - 12} L67,${height - 12}`"/>
    </svg>
    <div class="content">
      <div class="header select-none font-mono" :class="{normal: !reverse, reverse}">
        {{ title }}
      </div>
      <div class="inner-content" :class="{normal: !reverse, reverse}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.border-01-small-container {
  position: relative;
  width: 100%;
  height: 100%;

  .border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    &.reverse {
      transform: scaleX(-1);
    }
  }
  .content {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    .header {
      font-size: 22px;
      position: absolute;
      top: 20px;
      height: 40px;
      width: 170px;

      &.normal {
        left: 35px;
        text-align: left;
      }
      &.reverse {
        right: 35px;
        text-align: right;
      }
    }

    .inner-content {
      position: absolute;
      top: 56px;
      width: calc(100% - 65px);
      height: calc(100% - 68px);
      &.normal {
        left: 40px;
      }
      &.reverse {
        right: 40px;
      }
    }
  }
}

</style>
