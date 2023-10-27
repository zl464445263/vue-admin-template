<template>
  <el-config-provider :locale="zhCn">
    <Layout />
  </el-config-provider>
</template>
<script setup>
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import Layout from '@/layout/Main.vue'
</script>
<style>
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: var(--el-font-family);
    color: var(--el-text-color-primary);
    font-size: var(--el-font-size-base);
  }
  * {
    box-sizing: border-box;
  }
</style>
