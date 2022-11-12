<!--
 * @author: ym
 * @Date: 2021-10-16 15:52:46
 * @LastEditTime: 2021-10-16 19:38:13
 * @LastEditors: ym
 * @Description: 
 * @FilePath: \background-front-end\src\components\SvgIcon\index.vue
-->
<template>
    <svg class="svg-icon" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="`#${name}` " />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
