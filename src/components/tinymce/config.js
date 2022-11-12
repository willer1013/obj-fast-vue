/*
 * @Author: your name
 * @Date: 2021-10-30 15:54:44
 * @LastEditTime: 2022-08-23 17:50:18
 * @LastEditors: chenkangxu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \background-front-end\src\components\tinymce\config.js
 */

export const plugins = [
    'wlindent wlxiumi print  autoresize advlist anchor autolink  code indent2em codesample directionality emoticons fullscreen hr image imagetools insertdatetime link lists media lineheightcustom nonbreaking noneditable pagebreak  powerpaste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars tpImportword'
]
export const toolbar = [
    //fullscreen
    'fullscreen undo redo  fontsizeselect  bold italic underline strikethrough forecolor backcolor   removeformat subscript superscript blockquote alignleft aligncenter alignright alignjustify lineheightcustom indent2em wlindent    hr  bullist numlist link image charmap    insertdatetime media table emoticons preview print tpImportword wlxiumi' 
]
//不将图片上传到服务器的白名单
export const whiteList=[
    'http://guli123.oss-cn-beijing.aliyuncs.com/'
]
