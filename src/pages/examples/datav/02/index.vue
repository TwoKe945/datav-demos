<script lang='ts' setup>
import axios from 'axios'
import Header from './components/Header.vue'
import Map from './components/Map.vue'
import Chart01 from './components/Chart01.vue'
import Chart02 from './components/Chart02.vue'
import type { AssetsData, AssetsType, AssetsName } from './components/types'

const assets  = ref<AssetsData[]>([])

async function loadAssets() {
  let resp = await axios.get('/data/hospital/zk.json');
  assets.value.push(...resp.data.map((item: AssetsData) => ({...item, type: 'zk_hospital', value: [item.lon, item.lat]})))
  resp = await axios.get('/data/hospital/zh.json');
  assets.value.push(...resp.data.map((item: AssetsData) => ({...item, type: 'zh_hospital', value: [item.lon, item.lat]})))
  resp = await axios.get('/data/school/zx.json');
  assets.value.push(...resp.data.map((item: AssetsData) => ({...item, type: 'zx_school', value: [item.lon, item.lat]})))
  resp = await axios.get('/data/school/xx.json');
  assets.value.push(...resp.data.map((item: AssetsData) => ({...item, type: 'xx_school', value: [item.lon, item.lat]})))
}

provide("assets", assets)

 onMounted(() => {
  loadAssets()
})

</script>

<template >
  <div class="datav-02-container w-[100vw] h-[100vh] relative">
    <div class="absolute z-999 top-0 left-0 right-0">
      <Header/>
    </div>
    <Map />
    <div class="content absolute top-[80px] left-0 right-0 bottom-0 pointer-events-none">
      <div class="content-left">
        <div class="content-left_top">
          <Border02 scan title="资源占比/学校">
            <Chart01 type="school" />
          </Border02>
        </div>
        <div class="content-left_bottom">
          <Border02 scan  style="--duration: 7s" title="资源占比/医院">
            <Chart01 type="hospital"/>
          </Border02>
        </div>
      </div>
      <div class="content_center"></div>
      <div class="content-right">
        <div class="content-right_top">
        </div>
        <div class="content-right_bottom">
          <Border02 scan style="--duration: 4s" title="资源占比/行政区划">
            <Chart02 />
          </Border02>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.datav-02-container {
  .content {
    display: grid;
    grid: repeat(6, 1fr) / 1fr 3fr 1fr ;
    grid-template-areas: 
    'left center right'
    'left center right'
    'left center right'
    'left center right'
    'left center right'
    'left center right'
    ;
    .content-left {
      display: grid;
      grid-area: left;
      grid: repeat(2, 3fr) / 1fr;
      grid-template-areas: 'a1' "a2";
      .content-left_top {
        grid-area: 'a1';
        padding: 20px;
      }
      .content-left_bottom {
        grid-area: 'a2';
        padding: 20px;
      }
    }
    .content_center {
      grid-area: center;
      display: grid;
      grid: repeat(3, 2fr) / 1fr;
    }
    .content-right {
      grid-area: right;
      display: grid;
      grid: 2fr 4fr / 1fr;
      grid-template-areas: "c1" "c2";
      .content-right_top {
        grid-area: 'c1';
        padding: 20px;
      }
      .content-right_bottom {
        grid-area: 'c2';
        padding: 20px;
      }
    }
  }
}
</style>

<style lang='scss'>
.echarts-tooltip {
  border: 1px  solid rgb(17,84,106) !important;
  background-color: rgba(5,13,47, .7) !important;
  border-radius: 0px !important;
  color: #fff !important;
  font-size: 12px  !important;
  position: relative;
  display: none;
  &::after {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    background-color: rgb(33,252,244);
    height: 6px;
    width: 3px;
  }
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    background-color: rgb(33,252,244);
    height: 6px;
    width:3px;
  }
  a {
    color: rgb(33,252,244) !important;
    white-space: pre-wrap;
  }
}
</style>
