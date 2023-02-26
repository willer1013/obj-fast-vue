<template>
  <div class="swiper-demo">
    <!-- <div class="swiper-container"> -->
    <!-- <div class="swiper-wrapper" v-if="banner.length">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div> -->
    <!-- 如果需要分页器 -->
    <!-- <div class="swiper-pagination"></div> -->
    
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
    
<!-- </div> -->
<a-button type="primary" @click="screen">全屏</a-button>

      <div onclick="svgClick()" style="width:100px;height:100px;background-color:aqua"></div>
  </div>
</template>

<script>
// 引入js
// import Swiper from 'swiper'
// 引入css
// import 'swiper/css/swiper.min.css'

import axios from 'axios'
export default {
  name: '',
  props: {},
  data () {
    return {
        banner:[],
        speed:'',
        fullscreen: false,
    }
  },
  components: {
    
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
    //   点击触发全屏的方法
    svgClick() {
      // 判断如果浏览器支不支持全屏的使用的话---给用户提示
      // if (!screenfull.isEnabled) {
      //   // 此时全屏不可用
      //   this.$message.warning('此时全屏组件不可用')
      //   return
      // }
      // //   如果可用的话 就可以使用全屏
      // screenfull.toggle()
      if(screenfull.toggle()) {
        console.log('do it')
      }
    },
    screen() {
          let element = document.documentElement;
          if (this.fullscreen) {
              if (document.exitFullscreen) {
                  document.exitFullscreen();
              } else if (document.webkitCancelFullScreen) {
                  document.webkitCancelFullScreen();
              } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
              } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
              }
          } else {
              if (element.requestFullscreen) {
                  element.requestFullscreen();
              } else if (element.webkitRequestFullScreen) {
                  element.webkitRequestFullScreen();
              } else if (element.mozRequestFullScreen) {
                  element.mozRequestFullScreen();
              } else if (element.msRequestFullscreen) {
                  element.msRequestFullscreen();
              }
          }
          this.fullscreen = !this.fullscreen;
      },
  }
  ,
//   请求一般在created中发
  // async created () {
  //   const res = await axios.get('http://119.29.103.250:8080/renren-fast/rotation/pictures/getSpeed')
  //   this.speed = res.data
  //   console.log(speed)
  // },
  mounted () {
  //   new Swiper ('.swiper-container', {
  //   // direction: 'vertical', // 垂直切换选项
  //   loop: true, // 循环模式选项
    
  //   // 如果需要分页器
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },
    
  //   // 如果需要前进后退按钮
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
    
  //   // 如果需要滚动条
  //   // scrollbar: {
  //   //   el: '.swiper-scrollbar',
  //   // },
  // })
  this.svgClick();

  },
}
</script>

<style scoped>
  .swiper-container {
    height: 500px;
    width: 600px;
    margin: 0 auto;
}
</style>
