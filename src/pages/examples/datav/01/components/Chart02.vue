<script lang='ts' setup>
import Panel1 from './Chart02/Panel1.vue'
import Panel2 from './Chart02/Panel2.vue'
import Panel3 from './Chart02/Panel3.vue'
</script>

<template >
  <div class="p-4 h-full w-full">
    <div class="font-size-[22px] font-mono flex justify-start items-center pl-14">
      <img src="/images/dv01/icon_2.png" class="absolute left-0" />社区数据</div>
    <div class="h-full w-full">
      <div class="h-full w-full content">
        <div class="grid-area-['a']">
          <Panel1 :value="90" :total="666" />
        </div>
        <div class="grid-area-['b'] flex justify-around">
          <Panel2 name="社区" :value="68" :total="317" />
          <Panel2 name="物业" :value="26" :total="209"/>
        </div>
        <div class="grid-area-['c'] overflow-hidden">
          <Panel3 />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.content {
  display: grid;
  grid: 1fr 1fr 3fr / repeat(1, 1fr) ;
  grid-template-areas: 'a', 'b', 'c';
}
</style>
