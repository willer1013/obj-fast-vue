<template>
  <div id="app">
    <!-- <img id="hx" src="~@/assets/img/海星.png" alt="" /> -->
    <!-- logo -->
    <div id="logo">
      <!-- 文字触发 -->
      <!-- <a-button type="primary" @click="screen" size="large"></a-button> -->
    </div>
    <div class="left">
      <div class="lt">
        <img class="bubble" src="~@/assets/img/泡泡.png" />
      </div>

      <!-- 章鱼图片 -->
      <!-- <img class="zy" src="~@/assets/img/章鱼.png" alt="" /> -->
      <!-- 海草 -->
      <img class="hc" src="~@/assets/img/海草.png" alt="" />
    </div>
    <div class="right">
      <!-- v-if="banner.length" -->
      <div class="rt">
        <!-- <img id="hx" src="~@/assets/img/海星.png" alt="" /> -->
        <div class="picture" id="mySwiper">
          <!-- <div
            class="swiper-slide"
            v-for="(carousel, index) in bannerList"
            :key="carousel.id"
          >
            <img :src="carousel.imgUrl" /> -->

          <slider
            animation="fade"
            height="100%"
            :stopOnHover="true"
            :speed="swiperDelay"
            :autoplay="swiperAutoPlay"
          >
            <slider-item
              v-for="(i, index) in banner"
              :key="index"
              @click="hello"
            >
              <div>
                <img :src="i.picUrl" class="swiperImg" />
                <p class="swiperName">{{ i.picName }}</p>
              </div>
            </slider-item>
          </slider>
        </div>
      </div>
      <div class="rb">
        <!-- swiper-button-prev -->
        <div class="b1" onclick="prephoto">
          <img src="~@/assets/img/上一页.png" alt=""  />
        </div>
        <div class="b2" @click="stopbutton">
          <img src="~@/assets/img/暂停.png" alt=""  />
        </div>
        <!-- swiper-button-next -->
        <div class="b3" onclick="nextphoto">
          <img src="~@/assets/img/下一页.png" alt=""  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Slider, SliderItem } from "vue-easy-slider";
import screenfull from "screenfull";
import axios from "axios";

export default {
  name: "",
  props: {},
  data() {
    return {
      banner: [],
      speed: "",
      pictureAttr: [],
      swiperAutoPlay: true,
      stopbutton: true,
      // 默认设置为 1000
      swiperDelay: 500,
    };
  },
  components: { Slider, SliderItem },
  computed: {},
  updated() {},
  watch: {},
  methods: {
    // play(flag){
    //   console.log(this.swiperAutoPlay)
    //   this.swiperAutoPlay = flag;
    // },
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
    hello($event) {
      console.log(`hello index: ${$event}`);
    },
    stop() {
      if(this.stopbutton == true)
      this.swiperAutoPlay = !this.swiperAutoPlay;
      // this.swiperAutoPlay = false;

    },
    stopbutton() {

      this.stopbutton = !this.stopbutton;
      console.log('stop')
    },
    async getBannerList() {
      let {
        data: { page },
      } = await this.$api.photo.getAll();
      this.banner = page.list;
    },
    async getSpeed() {
      let {
        data: { msg },
      } = await this.$api.photo.getSpeed();
      // this.banner = page.list;
      this.swiperDelay = +msg * 500;
      console.log(this.swiperDelay);
    },
  },
  created() {
    this.getBannerList();
    this.getSpeed();
  },
  mounted() {
    // 需要注意的是 如果判断!screenfull.enabled 显示的是不支持全屏的话 是因为谷歌的版本问题  判断改为 !screenfull.isEnabled  就可以了
    if (!screenfull.enabled) {
      // 如果不允许进入全屏，发出不允许提示
      let err = this.$message({
        message: "不支持全屏",
        type: "warning",
      });
      console.log("nofull", err);
      console.log("screenfull1", screenfull);
      return false;
    }
    screenfull.toggle();
    if (screenfull.toggle()) {
      console.log('1')
    }

    var interleaveOffset = 0.5; //视差比值
    // new Swiper(".picture", {
    //   loop: true, // 循环模式选项

    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },

    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },

    //   // 如果需要滚动条
    //   scrollbar: {
    //     el: ".swiper-scrollbar",
    //   },
    //   autoplay: {
    //     delay: this.swiperdelay,
    //   },
    // });

    // new Swiper(".swiper-container", swiperOptions);
  },
};
</script>

<style lang="css" scoped >
* {
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  /* background-color: skyblue; */
  background: url(~@/assets/img/背景图.png) no-repeat center;
  /* background: url(~@/assets/img/整体界面.png) no-repeat center; */
  background-size: 100% 100%;
  position: absolute;
}

#logo {
  height: 5%;
  background-color: #fff;
  background: url(~@/assets/img/logo.png) no-repeat 10px;
  /* 大小 */
  background-size: contain;
}
.a-button {
  width: 100%;
  height: 100px;
  background-color: #fff;
}
.left {
  float: left;
  width: 25%;
  height: 95%;
  position: relative;
  background-color: skyblue;
  background: url(~@/assets/img/章鱼.png) no-repeat;
  background-size: contain;
  background-position: left center;
}
.lt {
  /* float: left; */
  width: 100%;
  height: 30%;
  position: absolute;
}
.bubble {
  float: left;
  margin-left: 20px;
  margin-top: 120px;
  width: 300px;
  z-index: 999;
}
.zy {
  /* float: left; */
  width: 60%;
}
.hc {
  float: left;
  margin-top: 225px;
  margin-left: 10px;
  height: 72%;
  width: 90%;
  z-index: 900;
  position: absolute;
}
.right {
  float: right;
  width: 75%;
  height: 95%;
  /* background-color: #fff; */
}
.rt {
  height: 85%;
  width: 100%;
  border: 5px solid #fff;
  /* background: url(~@/assets/img/相框.png) no-repeat; */
}

.rb {
  height: 15%;
  /* background-color: pink; */
}
.b1 {
  float: left;
  width: 33%;
  height: 100%;
  /* background-color: blue; */
  position: relative;
}
.b1 img {
  height: 40%;
  top: 20%;
  left: 40%;
  position: absolute;
}
.b2 {
  float: left;
  width: 34%;
  height: 100%;
  /* background-color: rgb(121, 36, 119); */
  position: relative;
}
.b2 img {
  height: 100%;
  left: 33%;
  position: absolute;
}
.b3 {
  float: right;
  width: 33%;
  height: 100%;
  /* background-color: black; */
  position: relative;
}
.b3 img {
  height: 40%;
  top: 20%;
  left: 25%;
  position: absolute;
}
#hx {
  float: right;
  width: 5%;
}
.picture {
  height: 100%;
  background-color: skyblue;
}
.title {
  height: 7%;
  /* background-color: #fff; */
}
p {
  text-align: center;
  font-size: 20px;
}

.swiperImg {
  width: 100%;
  height: 100%;
}

.swiperName {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 20%;
  height: 10%;
  background-image: linear-gradient(
    to right,
    transparent 0,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>
