<script lang='ts' setup>
withDefaults(defineProps<{
  width?: number,
  name: string
  value: number
}>(), {
  width: 100
})

</script>

<template >
  <div class="circle-point" v-if="width / 2 > 0">
   <svg :width="`${width}px`" :height="`${width}px`">
    <circle :cx="width/2"
    :cy="width/2"
    :r="width/2 - 1" fill="none"  stroke-width="1px" stroke-dasharray="2, 2" stroke-linecap="butt" stroke-linejoin="miter"  stroke="rgb(17, 169, 122)"></circle>
    <circle :cx=" width / 2"
    :cy="width / 2"
    :r="width / 2 - 7" fill="none" style="filter: drop-shadow( 0px 0px 5px rgb(172, 251, 219)) brightness(110%)  blur(1px);"  stroke-width="3px" stroke-linecap="butt" stroke-linejoin="miter"  stroke="rgb(172, 251, 219)"></circle>
    <circle :cx=" width / 2"
    :cy="width / 2"
    :r="width / 2 - 13" fill="none" stroke-width="0.6px" stroke-linecap="butt" stroke-linejoin="miter"  stroke="rgb(17, 169, 122)"></circle>
  </svg>
  <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center">
    <div class="font-mono font-size-[18px] font-bold color-[#fff]">{{ value }}</div>
    <div class="font-mono font-size-[11px] color-[#109870] mt-1 break-keep font-bold">{{ name }}</div>
  </div>
  </div>
</template>

<style scoped lang='scss'>
.circle-point {
  position: relative;
}
</style>
