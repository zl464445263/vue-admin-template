<!-- 表格组件 -->
<template>
  <div class="table-component">
    <Query v-if="hasQuery" :queryList="fieldList" @search="search"/>
     
    <section class="data-section">
      <div class="data-action">
        <div class="left-action">
          <slot name="left-action"></slot>
        </div>
        <div class="right-action">
          <slot name="right-action"></slot>
          <el-button @click="fieldDrawer = true" title="修改表格显示字段">
            <i-ep-Operation />
          </el-button>
        </div>
      </div>

      <div class="data-content">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          stripe
          :border="true"
          :max-height="tableHeight"
          style="width: 100%"
          table-layout="auto"
        >
          <template v-for="field in fieldArray" :key="field.prop">
            <template v-if="field.show">
              <el-table-column v-bind="{ ...field }">
                <template #default="scope">
                  <slot :name="'row-' + field.prop" :row="scope.row">
                    {{ scope.row[field.prop] }}
                  </slot>
                </template>
              </el-table-column>
            </template>
          </template>
        </el-table>
      </div>

      <div class="data-pagination" v-if="hasPagination">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          :current-page="state.pagination.current"
          :page-size="state.pagination.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="tableDataTotal"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </section>

    <el-drawer v-model="fieldDrawer" title="修改表格显示字段">
      <el-scrollbar>
        <el-table :data="fieldArray" :border="true" max-height="100%" stripe>
          <el-table-column prop="label" label="字段名" />
          <el-table-column prop="show" label="开关">
            <template #default="scope">
              <el-switch
                v-model="scope.row.show"
                inline-prompt
                active-text="显示"
                inactive-text="隐藏"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>
<script setup>
  import Query from './Query.vue'
  import { throttle } from '@/util/index.js'

  const props = defineProps({
    fieldList: {
      //表格展示的字段列表
      //fieldList 里面的参数和el-table的参数一样，请保证prop唯一,如需要自定表格里面的内容，请使用插槽，插槽name命名规则：row-{当前字段的prop}
      //fieldList 里面的query不填或者值为false则表示不会出现的查询表单里面,query里面的sort用来排序，sort有值并且值越小，组件出现的越靠前，其他的参数和el组件一样
      type: Array,
      default: () => [],
    },
    tableData: {
      //表格数据
      type: Array,
      default: () => [],
    },
    tableDataTotal: {
      //表格数据总共数量，分页的时候需要，不需要分页可以不传
      type: Number,
      default: 0,
    },
    tableLoading: {
      //表格是否展示加载动画
      type: Boolean,
      default: false,
    },
    hasPagination: {
      //是否需要分页
      type: Boolean,
      default: true,
    },
  })

  const emits = defineEmits(['fetchTableData'])

  const hasQuery = ref(false)
  const fieldArray = ref([])
  const state = {
    pagination: {
      current: 1, //当前页
      size: 10, //每页显示多少条
    },
  }
  const fieldDrawer = ref(false)
  const tableHeight = ref(0)

  //查询数据
  const search = (query) => {
    emits('fetchTableData', { ...query, ...state.pagination })
  }

  //切换表格显示数据条数
  const sizeChange = (size) => {
    state.pagination.current = 1
    state.pagination.size = size
    search()
  }

  //跳转到指定页
  const currentChange = (current) => {
    state.pagination.current = current
    search()
  }

  //获取table的最大高度
  const getTableHeight = () => {
    const allHeight =
      document.querySelector('.table-component')?.clientHeight || 0
    const queryHeight =
      document.querySelector('.table-component .query-component')
        ?.clientHeight || 0
    const actionHeight =
      document.querySelector('.table-component .data-action')?.clientHeight || 0
    const paginationHeight = props.hasPagination
      ? (document.querySelector('.table-component .data-pagination')
          ?.clientHeight || 0) + 14
      : 0
    return allHeight - queryHeight - actionHeight - paginationHeight - 14 * 3
  }

  //页面缩放
  const resize = throttle(() => {
    tableHeight.value = getTableHeight()
  }, 200)

  watch(
    () => props.fieldList,
    (val) => {
      fieldArray.value = val.map((item) => {
        return { ...item, show: true }
      })
      hasQuery.value = val.find((item) => item.query)
    },
    { immediate: true, deep: true }
  )

  onMounted(() => {
    search()
    tableHeight.value = getTableHeight()
    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })
</script>

<style lang="scss" scoped>
  .table-component {
    display: flex;
    flex-direction: column;
    height: 100%;

    .data-section {
      flex-shrink: 1;
      height: 100%;
      background-color: var(--el-color-white);
      padding: var(--el-font-size-base);
      border-radius: var(--el-border-radius-base);
      display: flex;
      flex-direction: column;
      .data-action {
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--el-font-size-base);
      }
      .data-content {
        flex-shrink: 1;
        height: 100%;
      }
      .data-pagination {
        flex-shrink: 0;
        margin-top: var(--el-font-size-base);
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
