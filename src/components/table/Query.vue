<template>
  <div class="query-component">
    <section class="query-section">
      <div class="query-list">
        <template v-for="field in fieldArray" :key="field.prop">
          <div class="query-item" v-if="field.query">
            <label class="query-label">{{ field.label }}</label>
            <template v-if="field.query.type === 'input'">
              <el-input
                v-model="query[field.prop]"
                v-bind="{ ...field.query }"
              />
            </template>
            <template v-if="field.query.type === 'select'">
              <el-select
                v-model="query[field.prop]"
                v-bind="{ ...field.query }"
              >
                <el-option
                  v-for="(option, index) in field.query.options"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template
              v-if="
                [
                  'year',
                  'month',
                  'date',
                  'dates',
                  'datetime',
                  'week',
                  'datetimerange',
                  'monthrange',
                ].includes(field.query.type)
              "
            >
              <el-date-picker
                v-model="query[field.prop]"
                v-bind="{ ...field.query }"
              />
            </template>
            <template v-if="field.query.type === 'cascader'">
              <el-cascader
                v-model="query[field.prop]"
                v-bind="{ ...field.query }"
                @change="field.query.change"
              />
            </template>
          </div>
        </template>
      </div>
      <div class="query-action">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </section>
  </div>
</template>
<script setup>
  const props = defineProps({
    queryList: {
      //所需要查询的字段
      type: Array,
      default: () => [],
    },
  })

  const fieldArray = ref([])
  const query = ref({})

  const emits = defineEmits(['search'])

  const search = () => {
    emits('search', query.value)
  }

  //点击重置
  const reset = () => {
    query.value = {}
  }

  watch(
    () => props.queryList,
    (val) => {
      const array = val.reduce((arr, item) => {
        if (item.query) {
          item.query.sort = item.query.sort || Infinity
          arr.push(item)
        }
        return arr
      }, [])
      fieldArray.value = array.sort((a, b) => a.query.sort - b.query.sort)
    },
    { immediate: true, deep: true }
  )
</script>

<style lang="scss" scoped>
  .query-component {
    padding-bottom: var(--el-font-size-base);
    .query-section {
      flex-shrink: 0;
      background-color: var(--el-color-white);
      border-radius: var(--el-border-radius-base);
      padding: calc(var(--el-font-size-base) / 2) 0;

      position: relative;
      .query-list {
        display: flex;
        flex-wrap: wrap;
        margin-right: 140px;
        .query-item {
          display: flex;
          align-items: center;
          padding: calc(var(--el-font-size-base) / 2) var(--el-font-size-base);

          .query-label {
            display: inline-block;
            white-space: nowrap;
            margin-right: var(--el-font-size-base);
          }
        }
      }
      .query-action {
        position: absolute;
        bottom: var(--el-font-size-base);
        right: var(--el-font-size-base);
      }
    }
  }
</style>
