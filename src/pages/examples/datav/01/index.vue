<script lang='ts' setup>
import { useTime } from '~/composables/useTime'
import Chart08 from './components/Chart08.vue'
import Chart07 from './components/Chart07.vue'
import Chart06 from './components/Chart06.vue'
import Chart05 from './components/Chart05.vue'
import Chart04 from './components/Chart04.vue'
import Chart03 from './components/Chart03.vue'
import Chart02 from './components/Chart02.vue'
import Chart01 from './components/Chart01.vue'
import Map from './components/Map.vue'

const { nowTimeText } = useTime()

</script>

<template >
  <div class="datav-01-container">
    <div class="position-absolute top-4 left-4 right-4 bottom-4" style="background: url(/images/dv01/background-border.png) no-repeat;
    background-size: 100% 100%;
    ">
    <div class="font-bold font-mono font-size-[36px] position-absolute
    top--1 left-[50%] translate-x--50%
    " style="text-shadow: 2px 0px 2px rgba(44,201,168,.6),
    0px 2px 2px rgba(44,201,168,.6),
    0px -2px 2px rgba(44,201,168,.6),
    -2px 0px 2px rgba(44,201,168,.6);;">XXXX数据管理后台</div>
    <div class="font-mono font-size-[16px]  position-absolute
    top-[5.5%] left-[50%] translate-x--50%">{{ nowTimeText }}</div>
    </div>
    <div class="content">
      <div class="left-content">
        <div class="left-top pr-2">
          <Border01Small title="大数据统计分析">
            <Chart01 />
          </Border01Small>
        </div>
        <div class="left-center p-2 pl-6">
          <Border01>
            <Chart02 />
          </Border01>
        </div>
        <div  class="left-bottom p-2 pl-6">
          <Border01 :right-dectation-bottom="70" :top-decoration-width="110">
            <Chart03 />
          </Border01>
        </div>
      </div>
      <div class="center-content">
        <div></div>
        <div class="center-top p-2">
          <Border01 margin="0" :right-dectation-top="120" :top-decoration-start-x="400" :top-decoration-width="200"  right-dectation-type="line">
            <Map />
          </Border01>
        </div>
        <div class="center-bottom">
          <div class="center-bottom-left  p-2">
            <Border01 :right-dectation-bottom="70">
              <Chart04 />
            </Border01>
          </div>
          <div class="center-bottom-right p-2">
            <Border01 :right-dectation-bottom="70">
              <Chart05 />
            </Border01>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="right-top pl-2">
          <Border01Small title="实时公告通知" reverse>
            <Chart08 />
          </Border01Small>
        </div>
        <div class="right-center p-2 pr-6">
          <Border01 :right-dectation-top="150" :right-dectation-bottom="120"  :top-decoration-width="110">
            <Chart07 />
          </Border01>
        </div>
        <div  class="right-bottom p-2 pr-6">
          <Border01 :right-dectation-bottom="70"  :top-decoration-width="110">
            <Chart06 />
          </Border01>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.datav-01-container {
  width: 100vw;
  height: 100vh;
  background-image: url('/images/dv01/background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  position: relative;
  .content {
    position: absolute;
    top: 60px;
    left: 60px;
    right: 60px;
    bottom: 25px;
    display: grid;
    grid: repeat(5,1fr) / repeat(8,1fr);  /* x / y */
    .left-content {
      grid-area :  1 / 1 / 6 / 3;

      display: grid;
      grid: 1.5fr 4fr 3fr / repeat(1,1fr);
      .left-top{}
      .left-center{}
      .left-bottom{}
    }
    .center-content {
      grid-area : 1 / 3 / 6 / 7;
      display: grid;
      grid: .5fr 5fr 3fr / repeat(1,1fr);
      .center-top{}
      .center-bottom{
        display: grid;
        grid: repeat(1,1fr) / repeat(2,1fr);
        .center-bottom-left {
        }
        .center-bottom-right {
        }
      }
    }
    .right-content {
      grid-area : 1 / 7 / 6 / 9;
      display: grid;
      grid: 1.5fr 4fr 3fr / repeat(1,1fr);
      .right-top{}
      .right-center{}
      .right-bottom{}
    }
  }
}

.highlight-border {
  position: relative;
  width: 200px;
  height: 100px;
  border: 2px solid #333;
  overflow: hidden;
}

.highlight-border::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 60px;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255,255,255,0.5) 50%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: flowLight 2s infinite; /* 循环动画 */
}

@keyframes flowLight {
  from { left: -50%; }
  to { left: 150%; }
}

</style>
