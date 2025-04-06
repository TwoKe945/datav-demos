<script lang='ts' setup>
import { useResize } from '~/composables/useResize';
const { autoBindRef, domSize } = useResize();

const { width } = toRefs(domSize)

defineProps<{
  name: string,
  value: number,
  total: number
}>()

</script>
<!-- width="205.9px" height="64.9px" -->
<template >
  <div class="pt-2 overflow-hidden relative w-full h-full" :ref="autoBindRef">
    <svg
      :width="width" height="64.9px">
      <path fill-rule="evenodd"  stroke="rgb(44, 201, 168)" stroke-width="1.4px" stroke-linecap="round" stroke-linejoin="miter" opacity="0.651" fill="rgb(11, 40, 42)"
      :d="`M${width - 8},50 L${width - 14},56 L11,56 L6,50 L6,11 L12,6 L${width - 15},6 L${width - 8},13 ${width - 8},50 Z`"/>
      <path fill-rule="evenodd"  stroke="rgb(147, 255, 192)" stroke-width="3px" stroke-linecap="round" stroke-linejoin="miter" fill="none"
      d="M41,5 L13,5 L7,11 "/>
    </svg>
    
    <div class="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-evenly box-border">
      <div class="font-mono font-size-[16px]">{{ name }}</div>
      <div class="flex items-center">
        <div class="font-mono font-bold font-size-[30px] color-[#FEB856]">{{ value }}</div>
        <div class="font-mono font-bold font-size-[30px] color-[#11A97A]">/{{ total }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
