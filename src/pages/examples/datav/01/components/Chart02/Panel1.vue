<script lang='ts' setup>

import { useResize } from '~/composables/useResize';

const { autoBindRef, domSize } = useResize();

const { width } = toRefs(domSize)

defineProps<{
  value: number,
  total: number
}>()

</script>

<template >
    <!-- width="415.9px" height="69.9px" -->
  <div :ref="autoBindRef" class="pt-2 overflow-hidden relative w-full h-full">
    <svg
      :width="width" height="69.9px">
      <path fill-rule="evenodd"  stroke="rgb(44, 201, 168)" stroke-width="1.4px" stroke-linecap="round" stroke-linejoin="miter" opacity="0.651" fill="rgb(11, 40, 42)"
      :d="`M6,13 L14,6 L${width - 8},6 L${width - 8},41 L${width - 29},61 L164,61 L152,52 L6,52 L6,13 Z`"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      d="M6,39 L6,52 L22,52 "/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      :d="`M${width - 8},19 L${width - 8},6 L${width - 24},6 `"/>
      <path fill-rule="evenodd"  fill="rgb(147, 255, 192)"
      :d="`M${width - 9},47 L${width - 23},60 L${width - 15},60 L${width - 9},55 L${width - 9},47 Z`"/>
    </svg>
    <div class="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-around">
      <div class="font-mono font-size-[16px]">本月工单数</div>
      <div class="flex items-center">
        <div class="font-mono font-bold font-size-[30px] color-[#FEB856]">{{ value }}</div>
        <div class="font-mono font-bold font-size-[30px] color-[#11A97A]">/{{ total }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
