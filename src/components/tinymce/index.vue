/* eslint-disable */
<template>
  <textarea :id="tinymceId" style="visibility: hidden" />
</template>

<script>
import { plugins, toolbar, whiteList } from "./config";
import { debounce } from "throttle-debounce";
import { Loading } from 'element-ui';
let num = 1;
// let id = 0; //img的id
// let sizeArr = []; //存储图片的宽高数据
// let flag = false; //判断是否存在图片
let Editor = "";
export default {
  name: "Tinymce",
  props: {
    id: {
      type: String,
      default: () => {
        num === 10000 && (num = 1);
        return `tinymce${+new Date()}${num++}`;
      },
    },
    value: {
      default: "",
    },
    //额外添加的config
    config:{
      type:Object,
      default:()=>{}
    },
    //添加额外的plugin
    extraPlugins:{
      type:Array,
      default:()=>[]
    },
    //添加额外的toolbar
    extraToolbars:{
      type:Array,
      default:()=>[]
    },
    //设置plugins，注意这个会覆盖掉默认配置
    plugins:{
      type:Array,
      default:()=>[]
    },
    //设置toolbar，注意这个会覆盖默认配置
    toolbars:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      tinymceId: this.id,
    };
  },
  mounted() {
    let that = this;

    let token = this.getUserToken();
    let uploadUrl = "http://47.104.83.158:8080/csc/oss/upload";
    // eslint-disable-next-line global-require
    require("./zh_CN");
    let conf = {
      extended_valid_elements:
        "*[*],svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]",
      selector: `#${this.tinymceId}`,
      entity_encoding: "row", //此选项控制TinyMCE如何处理实体/字符的转换方式。基本实体<,>,&,',",将始终被转换成其对应的实体。但单引号和双引号只在属性值和被<,>包裹中的文本节点内编码。
      language: "zh_CN",
      menubar: "false",
      cache_suffix: "?v=0.0.1",
      //这样写就不会让plugin被覆盖，也就达到了“额外添加”的目的。如果需要覆盖就使用
      plugins:this.plugins.length>0?this.plugins:[...this.extraPlugins,...plugins],
      toolbar:this.toolbars.length>0?this.toolbars:[...this.extraToolbars,...toolbar],
      skin:"oxide",
      // icons_url: "./icons/custom/icons.js",
      // icons: "custom", //自定义图标
      lineheight_val: "1 1.4 1.5 1.75 2 3",
      toolbar_drawer: "sliding",
      toolbar_mode: "sliding",
      //使用了autoresize插件，height无效，只能使用min_height和max_height
      height: 200,
      max_height: 800,
      //处理了wps引入文章左右margin显示（实际处理在移动端）
      // content_style: "p {margin-left:0px !important; margin-right:0px !important;}",
      // fontsize_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 20pt 22pt 24pt 36pt",
      branding: false,
      // object_resizing: false,//关闭图片大小拖拽
      end_container_on_empty_block: true,
      // paste_data_images: true,//单独粘贴的图片会执行上传图片的操作
      powerpaste_word_import: "merge",
      powerpaste_html_import: "merge",
      powerpaste_allow_local_images: true,
      extended_valid_elements: "svg",
      // external_plugins: {
      //   powerpaste: "./powerpaste/plugin.min.js",
      // },
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: "square",
      advlist_number_styles: "default",
      default_link_target: "_blank",
      link_title: false,
      statusbar: false,
      // invalid_elements: 'a',
      nonbreaking_force_tab: true,
      images_upload_handler: function (blobInfo, succFun, failFun) {
        var xhr, formData;
        // var file =new File([blobInfo.blob(),])
        var file = blobInfo.blob(); // 转化为易于理解的file对象
        //如果file是blob实例那么必须转换为file
        if (Object.getPrototypeOf(file).isPrototypeOf(new Blob())) {
          //文件名随便设置，服务器会重新存储名称，要有后缀
          file = new window.File([file], "test.png", { type: file.type });
        } else {
        }
        console.log(file);
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", uploadUrl);
        xhr.setRequestHeader("token", token);
        xhr.onload = function () {
          console.log(xhr);
          var json;
          if (xhr.status != 200) {
            failFun("HTTP Error: " + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
          if (!json || typeof json.url != "string") {
            failFun("Invalid JSON: " + xhr.responseText);
            return;
          }
          succFun(json.url);
        };
        formData = new FormData();
        formData.append("file", file, file.name); // 此处与源文档不一样
        xhr.send(formData);
      },
      //粘贴前预处理
      paste_preprocess: (editor, args) => {
        setTimeout(() => {
          //上传与获取图片宽高
          let urlDom = Editor.dom.select('[style*="url"],img');
          urlDom.forEach((dom) => {
            console.log(dom.tagName);
            if (dom.tagName == "IMG") {
              this.getImageSize(dom);
            }
            this.uploadUrl(dom);
          });
        }, 0);
      },
      //粘贴后上传移除a标签
      paste_postprocess:(plugin,args)=>{
        //移除粘贴内容的a标签
        function filterATag(node){
          for(let i=0;i<node.children.length;i++){

            if(node.children[i].tagName=='A'){

              for(let j=0;j<node.children[i].children.length;j++){
                node.insertBefore(node.children[i].children[j],node.children[i])
              }
              // node.removeChild(node.children[i])
            }else{
              filterATag(node.children[i])
            }

          }
        }
        filterATag(args.node)
      },
      //预览回调，打开移动端预览界面时的请求数据
      preview_callback: () => {
        return this.$api.savePreviewRichText({ text: Editor.getContent() });
      },
      ...this.config
    };
    conf = Object.assign(conf, this.$attrs);
    conf.init_instance_callback = (editor) => {
      Editor = editor;
      if (this.value) editor.setContent(this.value);
      this.vModel(editor);
    };
    tinymce.init(conf);
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    vModel(editor) {
      // 控制连续写入时setContent的触发频率
      const debounceSetContent = debounce(250, editor.setContent);
      this.$watch("value", (val, prevVal) => {
        if (editor && val !== prevVal && val !== editor.getContent()) {
          if (typeof val !== "string") val = val.toString();
          debounceSetContent.call(editor, val);
        }
      });

      editor.on("change keyup undo redo", () => {
        this.$emit("input", editor.getContent());
      });
      editor.on("blur", () => {
        this.$emit("blur");
      });
    },
    getUserToken() {
      return this.$store.getters["user/isLogin"];
    },
    getImageSize(dom) {
      let url = Editor.dom.getAttrib(dom, "src");
      let img = new Image();
      img.src = url;
      img.onload = function () {
        Editor.dom.setAttrib(dom, "width", img.width);
        Editor.dom.setAttrib(dom, "height", img.height);
      };
    },
    uploadUrl(dom) {
      if (dom.tagName == "IMG") {
        let url = Editor.dom.getAttrib(dom, "src");
        if(url.slice(0,4)!='blob'){
          const loadingInstance = Loading.service({
            fullscreen: true,
            lock: true,
            text: '正在上传文章图片,请稍候~',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$api.richTextImgUpload(url)
          .then(res=>{
            console.log(res);
            Editor.dom.setAttrib(dom,'src',res.data.url)
          })
          .finally(()=>{
            loadingInstance.close();
          })
        }
        
      }
      //查找style内含有url的内容
      else {
        //可能使用url()的属性
        let useUrl = [
          { label: "background", value: "background" },
          { label: "backgroundImage", value: "background-image" },
          { label: "borderImage", value: "border-image" },
          { label: "listStyleImage", value: "list-style-image" },
        ];
        let imageType = "jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF,webp,WEBP";
        useUrl.forEach((item) => {
          let value = dom.style[item.label];
          let reg = /url\(.*?\)/g;
          let match = value.match(reg);
          if (match) {
            match.forEach((str) => {
              let url = str.slice(5, -2);
              if (imageType.indexOf(url.split(".").pop()) != -1) {
                const loadingInstance = Loading.service({
                  fullscreen: true,
                  lock: true,
                  text: '正在上传文章图片,请稍候~',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })      
                this.$api.richTextImgUpload(url)
                .then((res) => {
                  value=value.replace(url, res.data.url);
                  Editor.dom.setStyle(dom, item.value, value);
                })
                .finally(()=>{
                  loadingInstance.close();
                })
              }
            });
          }
          // console.log(value.match(reg))
          // try{

          // }catch(err){
          //   console.log(err)
          // }
        });
      }
    },
    // getImageSize1(str) {
    //   let urlArr = str.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/gi);
    //   console.log(str.match(/.*background[^;"]+url\(([^\)]+)\).*/gi));
    //   let promiseArr = [];
    //   if (urlArr && urlArr.map) {
    //     urlArr = urlArr.map((item) => {
    //       return item.slice(5, -1);
    //     });
    //     for (let i = 0; i < urlArr.length; i++) {
    //       let img = new Image();
    //       img.src = urlArr[i];
    //       //判断是否是内部链接
    //       whiteList.forEach((item) => {
    //         if (urlArr[i].indexOf(item) == -1) {
    //           this.$api.richTextImgUpload(urlArr[i]).then((res) => {
    //             console.log(
    //               id + i,
    //               Editor.dom.select("#" + (id + i)),
    //               res.data.url
    //             );
    //             Editor.dom.setAttrib(
    //               Editor.dom.select("#" + (id + i)),
    //               "src",
    //               res.data.url
    //             );
    //           });
    //         }
    //       });
    //       promiseArr.push(
    //         new Promise((resolve) => {
    //           img.onload = function () {
    //             sizeArr.push({
    //               width: img.width,
    //               height: img.height,
    //               id: id + i,
    //             });
    //             resolve();
    //           };
    //         })
    //       );
    //     }
    //   }

    //   // setInterval(() => {
    //   //   console.log(sizeArr)
    //   // }, 5000);
    //   Promise.all(promiseArr).then(() => {
    //     // let str = this.value;
    //     sizeArr.forEach((item) => {
    //       let ele = Editor.dom.select("#" + item.id);
    //       Editor.dom.setAttrib(ele, "width", item.width);
    //       Editor.dom.setAttrib(ele, "height", item.height);
    //       // str = str.replace(
    //       //   `id="${item.id}"`,
    //       //   `height=${item.height} width=${item.width}`
    //       // );
    //       // console.log(str)
    //     });
    //     // Editor.setContent(str);
    //   });
    // },
    destroyTinymce() {
      if (!window.tinymce) return;
      const tinymce = window.tinymce.get(this.tinymceId);
      if (tinymce) {
        tinymce.destroy();
      }
    },
  },
};
</script>