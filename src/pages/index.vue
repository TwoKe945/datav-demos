<script lang='ts' setup>
import axios from 'axios';

interface Example {
  name: string;
  path: string;
  images: string[];
  description: string;
}

const examples = ref<Example[]>([]);

onMounted(() => {
  axios.get('/examples.json').then(res => {
    examples.value = res.data;
  })
})

function handleClickItem(example: Example) {
  window.open(`${location.origin}/#${example.path}`, '_blank');
}

</script>

<template >
  <div class="flex flex-wrap justify-center p-10">
    <el-carousel :interval="4000" type="card" style="width: 100%;" height="450px">
      <el-carousel-item v-for="(example, index) in examples" :key="index">
        <div :title="example.path" @click="handleClickItem(example)"
        class="bg-[#000000] gap-2 cursor-pointer flex flex-col justify-center items-center border-1 border-solid p-2 h-[450px]">
          <img class="w-[640px] h-[360px]":src="`/images/examples/${ example.images[0] }`" />
          <div class="font-mono font-size-[20px] font-bold  color-[#eee]">{{ example.name }}</div>
          <div class="font-mono font-size-[13px] color-[#eee]">{{ example.description }}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
