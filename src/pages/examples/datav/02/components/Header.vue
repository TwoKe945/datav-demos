<script lang='ts' setup>
</script>

<template >
  <div class='header relative'>
    <svg
      width="1920" height="80">
      <defs>
        <mask id="mask">
          <rect x="0" y="0" width="1920" height="80" fill="#000"></rect>
          <path  fill-rule="evenodd"  stroke-width="2px" stroke-linecap="round"
          stroke-linejoin="round" fill="#fff"
          d="M1893,16
          C1874,16 1391,31 1364,31
          C1337,33 1301,33 1280,45
          C1261,56 1250,80 1172,80
          C1100,80 985.728,80 974,80
          C974,80 973.646,80 973,80
          C961.272,80 847,80 773,80
          C696.890,80 686,56 667,45
          C645.823,33 610,33 583,31
          C556.377,31 48,16 28,16
          C10.862,16 0,0 0,0
          L0,0 H1920
          L1920,0
          C1920,0 1911,16 1893,16 Z"/>
        </mask>
      </defs>
      </svg>
      <div class="absolute top-[50%] left-[50%] translate-y-[-60%] translate-x-[-50%] font-mono font-size-[24px] translate-y-[-50%] color-[#fff]">
        <h1 class="header-title">渝中区资源可视化</h1>
      </div>
      <div class="highlight-border"></div>
  </div>
</template>

<style scoped lang='scss'>
.header {
  background: url('./header.png') no-repeat;
  height: 100px;


  .header-title {
    background: linear-gradient(to top, rgb(131,192,255) 0%, #ffffff 100%);
    -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
  }
  .highlight-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    mask: url('#mask');
    width: 100vw;
    height: 100px;
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
    animation: flowLight 10s ease infinite; /* 循环动画 */
  }

  @keyframes flowLight {
    from { left: -50%; }
    to { left: 150%; }
  }

}
</style>
