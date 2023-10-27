<template>
  <div class="header-components">
    <div class="logo"></div>
    <div class="user">
      admin
      <el-avatar :size="50" />
    </div>
  </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>
  .header-components {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;
    .user{
      display: flex;
      align-items: center;
    }
  }
</style>
