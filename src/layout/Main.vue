<!-- 大多数页面所用到的布局 -->
<template>
  <main class="main-layout" :name="page">
    <div class="layout-header">
      <Header />
    </div>
    <div class="layout-bottom">
      <Navigation />
      <div class="layout-content">
        <RouterView class="page-main" />
      </div>
    </div>
  </main>
</template>

<script setup>
  import Header from './components/Header.vue'
  import Navigation from './components/Navigation.vue'

  const props = defineProps({
    page: {
      type: String,
      default: '',
    },
    showBreadcrumb: {
      type: Boolean,
      default: true,
    },
    showCopyright: {
      type: Boolean,
      default: true,
    },
  })
</script>

<style lang="scss" scoped>
  .main-layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .layout-header {
      height: 80px;
      display: flex;
      align-items: center;
      padding: 0 var(--el-font-size-base);
    }
    .layout-bottom {
      height: calc(100% - 80px);
      background-color: var(--el-bg-color-page);
      display: flex;
    }
    .navigation-components {
      width: 200px;
    }
    .layout-content {
      width: calc(100% - 200px);
      .page-main {
        margin: var(--el-font-size-base);
        height: calc(100% - 2 * var(--el-font-size-base));
        overflow: hidden;
      }
    }
  }
</style>
