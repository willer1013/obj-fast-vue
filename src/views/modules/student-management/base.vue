<template>
  <div>
    <div>测试</div>
    <div>{{data1}}</div>
    <div>{{data2}}</div>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import useState from './hooks/useState';
let data1= ref(1);
const [data2,setData2]=useState(0);

onMounted(()=>{
    setInterval(()=>{
        data1.value++;
        setData2(data2.value+1)
    },1000)
})
</script>

<style>
</style>