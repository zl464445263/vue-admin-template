<template>
  <div class="navigation-components">
    <el-scrollbar>
      <el-menu
        router
        :default-active="router.currentRoute.value.path"
        active-text-color="var(--el-color-primary)"
        background-color="var(--el-text-color-primary)"
        text-color="var(--el-color-white)"
      >
        <el-menu-item index="/home">
          <i-ep-HomeFilled class="navigation-logo" />
          首页
        </el-menu-item>
        <el-sub-menu index="/table">
          <template #title>
            <i-ep-Menu class="navigation-logo" />
            <span>表格数据</span>
          </template>
          <el-menu-item index="/table">
            <i-ep-Document class="navigation-logo" />表格列表
          </el-menu-item>
          <el-menu-item index="/table/detail">
            <i-ep-Document class="navigation-logo" />表单详情
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/user">
          <i-ep-Avatar class="navigation-logo" />
          用户管理
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
  const router = useRouter()
</script>

<style lang="scss" scoped>
  .navigation-components {
    .el-scrollbar {
      background-color: var(--el-text-color-primary);
    }
    .el-menu {
      height: 100%;
      border-right: 0;
      .navigation-logo {
        margin-right: var(--el-font-size-base);
      }
    }
  }
</style>
