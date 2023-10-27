<template>
  <div class="home-page">
    首页

    <h2>refData:{{ refData }}</h2>
    <h2>reactiveData:{{ reactiveData.data }}</h2>
    <el-button @click="sub">修改数据</el-button>
  </div>
</template>
<script setup>
  const refData = ref({ a: { aa: 1, bb: 2 } })
  const reactiveData = reactive({ data: { a: { aa: 1, bb: 2 } } })
  const sub = () => {
    console.log('refData click', refData.value.a.aa)
    console.log('reactiveData click', reactiveData.data.a.aa)
    refData.value.a.aa = refData.value.a.aa + 1
    reactiveData.data.a.aa = reactiveData.data.a.aa + 1
  }
  watch(refData, (val) => {
    console.log('refData watch', val)
  })
  watch(reactiveData.data, (val) => {
    console.log('reactiveData watch', val)
  })
</script>

<style lang="scss" scoped></style>
