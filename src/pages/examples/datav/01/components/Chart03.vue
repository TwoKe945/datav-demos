<script lang='ts' setup>

const data = [
  {
    name: '公众服务',
    icon: 'icon_3_1.png',
    items: [
      {
        name: '注册人数',
        value: 299
      },
      {
        name: '在线人数',
        value: 287
      },
      {
        name: '派单人数',
        value: 178
      }
    ]
  },
  {
    name: '支援服务',
    icon: 'icon_3_2.png',
    items: [
      {
        name: '注册人数',
        value: 182
      },
      {
        name: '在线人数',
        value: 101
      },
      {
        name: '派单人数',
        value: 55
      }
    ]
  },
  {
    name: '便民服务',
    icon: 'icon_3_3.png',
    items: [
      {
        name: '注册商户数',
        value: 1902
      },
      {
        name: '在线商户数',
        value: 1902
      }
    ]
  }
]

</script>

<template >
  <div class="p-4 h-full w-full">
    <div class="font-size-[22px] font-mono flex justify-start items-center pl-14">
      <img src="/images/dv01/icon_3.png" class="absolute left-0" />社区服务统计</div>
    <div class="h-full w-full flex flex-col mt-[2%]">
      <div class="flex justify-center items-end" :style="{
        borderBottom: index != data.length - 1 ? '2px solid rgb(9,57,54)' : 'none',
        paddingBottom: index != data.length - 1 ? '8px' : '0',
        marginBottom: index != data.length - 1 ? '8px' : '0',
      }" v-for="(item, index) in data">
        <div class="flex flex-col justify-center items-center">
          <img class="mb-2" :src="`/images/dv01/${item.icon}`">
          <div class="font-size-[16px] font-mono">{{ item.name }}</div>
        </div>
        <div class="flex-1 grid grid-rows-[repeat(1,1fr)] grid-cols-[repeat(3,1fr)" style="grid-template-areas: '0 1 2';">
            <div :class="[`grid-area-['${_index}']`]" v-for="(_item, _index) in item.items">
            <div class="flex flex-col justify-end items-center" >
              <div class="color-[#ffffff] font-mono font-size-[12px] mb-2">{{ _item.name }}</div>
              <div class="color-[#77C8FF] font-mono font-size-[24px]">{{ _item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
