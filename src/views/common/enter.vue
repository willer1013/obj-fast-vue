<template>
    <div id="app">
    <div id="logo">
      
    </div>
        <div id="bt">
            <a-button type="danger" @click="screen" size="large" id="bt" icon="search" :ghost="true">
                <p >点击触发全屏</p>
            </a-button>
        </div>

    </div>
</template>

<script>
export default {
    name: "",
    props: {},
    data() {
        return {};
    },
    components: {},
    computed: {},
    mounted: {},
    watch: {},
    methods: {
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
            this.$router.push('/swiper')
        },
    },
    created() { },
    mounted() { },
};
</script>

<style scoped>
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
    /* float: left; */
  height: 5%;
  background-color: #fff;
  background: url(~@/assets/img/logo.png) no-repeat 10px;
  /* 大小 */
  background-size: contain;
}

#bt {
    position: absolute;
    width: 300px;
    left: 35%;
    top: 50%;
    /* background-color: #fff; */
}
p {
    color: #fff;
    
    font-size: 300%;
    font-weight: bold;
    font-family: "宋体";
}
</style>

