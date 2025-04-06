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
    <div :title="example.path" @click="handleClickItem(example)" class="gap-2 cursor-pointer flex flex-col justify-center items-center border-1 border-solid p-2" v-for="(example, index) in examples" :key="index">
      <img class="w-[640px] h-[360px]":src="`/images/examples/${ example.images[0] }`" />
      <div class="font-mono font-size-[20px] font-bold">{{ example.name }}</div>
      <div class="font-mono font-size-[13px] color-[#eee]">{{ example.description }}</div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
* {
  color: #fff;
}
</style>
