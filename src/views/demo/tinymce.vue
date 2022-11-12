<template>
  <div>
    <el-alert type="success" title="tinymce+powerpaste+xiumi微信公众号示例" :closable="false" show-icon></el-alert>
    <tinymce class="rich_text_editor" v-model="richText"></tinymce>
    <el-alert type="success" title="obj-table-plus示例" :closable="false" show-icon></el-alert>
    <obj-table-plus>
      
    </obj-table-plus>
  </div>
</template>

<script>
import Tinymce from "@/components/tinymce/index.vue";
export default {
  components: { Tinymce },
  data() {
    return {
      richText: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>