<!-- 404页面 -->
<template>
  <div class="page-404">
    <el-empty description="页面未找到！">
      <el-button @click="router.back()">返回</el-button>
      <el-button type="primary" @click="router.push('/home')"
        >返回首页</el-button
      >
    </el-empty>
  </div>
</template>
<script setup>
  const router = useRouter()
</script>

<style lang="scss" scoped>
  .page-404 {
    height: calc(100vh - 130px);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-button {
      width: 100px;
    }
  }
</style>
