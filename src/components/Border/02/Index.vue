<template>
  <div class="border-02-container w-full h-full">
    <div class="title">
      <div class="z-999 font-mono flex justify-between items-center absolute left-0 top-0 bottom-0 right-0">
        <div class="flex justify-start items-center">
          <span class="flag"></span>
          {{title}}
        </div>
        <div class="end"></div>
      </div>
      <div class="light" :class="{
        'none-scan': !scan
      }" ></div>
    </div>
    <div class="content pointer-events-auto w-full h-[calc(100%-36px)]">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  title: string,
  scan?: boolean
}>(), {
  title: '默认标题',
  scan: false
})
</script>

<style scoped lang="scss">
.border-02-container {
  --duration: 5s;
  .title {
    border: 1px solid rgb(49,126,229);
    border-left: none;
    border-right: none;
    height: 36px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    position: relative;
    &::before {
      display: block;
      box-sizing: border-box;
      content: '';
      position: absolute;
      background-color: transparent;
      border: 1px solid rgb(16,53,103);
      border-left: none;
      border-right: none;
      top: -1px;
      left: 10px;
      bottom: -1px;
      right: 10px;
    }
    .flag {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 14px;
      height: 14px;
      background-color: rgb(63,141,231);
      border-radius: 2px;
      margin: 0px 15px 0px 5px;
      transform: rotate(45deg);
      &::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background-color: rgb(18,48,94);
      }
      &::after {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 2px;
        background-color: rgb(81,177,255, .9);
      }
    }
    .end {
      display: flex;
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background-color: rgb(33,131,197);
        margin-right: 8px;
        transform: rotate(45deg);
      }
      &::after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background-color: rgb(32,166,196);
        margin-right: 5px;
        transform: rotate(45deg);
      }
    }
    .light {
      position: absolute;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(12,217,150, .3) 90%,
        rgba(12,217,150, 1) 100%
      );
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      animation: light var(--duration) ease infinite;
      &.none-scan {
        background: #ffffff2f;
        animation: none;
      }
    }
  }
  @keyframes light {
    0% {
      right: 100%;
    }
    100% {
      right: 0px;
    }
  }
  .content {}
}
</style>
