<script lang='ts' setup>
import CirclePoint from './Chart01/CirclePoint.vue'
import arrow from './Chart01/arrow.svg'
import { useResize } from '~/composables/useResize';

const { autoBindRef, domSize } = useResize();

const { height } = toRefs(domSize)

</script>

<template >
  <div class="flex items-center justify-around w-full h-full" :ref="autoBindRef">
    <CirclePoint name="今日访问量" :value="1090" :width="height - 8"/>
    <img :src="arrow" width="23px" height="29px" alt=""></img>
    <CirclePoint name="在线人数" :value="165" :width="height - 8"/>
    <img :src="arrow" width="23px" height="29px" alt=""></img>
    <CirclePoint name="用户总数" :value="2098" :width="height - 8"/>
  </div>
</template>

<style scoped lang='scss'>
</style>
