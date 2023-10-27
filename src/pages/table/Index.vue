<template>
  <div class="table-page">
    <Table
      :field-list="state.fieldList"
      :table-data="state.tableData"
      :table-data-total="state.tableDataTotal"
      :table-loading="state.tableLoading"
      @fetch-tableData="fetchTableData"
    >
      <!-- 表格左上方的插入内容，不需要可以删除代码 -->
      <template #left-action>
        <el-button type="primary" @click="add">添加</el-button>
      </template>

      <!-- 表格右上方的插入内容，不需要可以删除代码 -->
      <template #right-action>
        <el-button type="primary">导出</el-button>
      </template>

      <!-- 需要自定义的表格内容，插槽name命名规则：row-{当前字段的prop} -->
      <template #row-body="{ row }">
        <i>{{ row.body }}</i>
      </template>

      <!-- 需要自定义的表格内容，插槽name命名规则：row-{当前字段的prop} -->
      <template #operate="{ row }">
        <el-button type="primary">查看</el-button>
        <el-popconfirm title="确认删除?" @confirm="del(row)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </Table>
  </div>
</template>
<script setup>
  import Table from '@/components/table/Index.vue'
  import { getTableData } from '@/api/test.js'

  const state = reactive({
    tableData: [],
    fieldList: [
      {
        prop: 'id',
        label: 'ID',
        width: 60,
        align: 'center',
      },
      {
        prop: 'title',
        label: '标题',
        query: {
          type: 'select',
          placeholder: '选择标题',
          options: [
            { label: 'a', value: 1 },
            { label: 'b', value: 2 },
          ],
        },
      },
      {
        prop: 'body',
        label: '内容',
        query: {
          type: 'input',
          sort: 1,
        },
      },
      {
        prop: 'date',
        label: '日期',
        query: {
          type: 'date',
          placeholder: '选择日期',
          format: 'YYYY-MM-DD',
          'value-format': 'YYYY-MM-DD',
          sort: 2,
        },
      },
      {
        prop: 'datetime',
        label: '日期时间',
        query: {
          type: 'datetime',
          placeholder: '日期时间',
          sort: 1,
        },
      },
      {
        prop: 'timeRange',
        label: '时间范围',
        query: {
          type: 'datetimerange',
          sort: 2,
        },
      },
      {
        prop: 'cascader',
        label: '级联选择',
        query: {
          type: 'cascader',
          options: [
            { label: 'a', value: 'a', children: [{ label: 'aa', value: 1 }] },
            { label: 'b', value: 'b' },
          ],
          change: (val) => {
            console.log(1, val)
          },
          sort: 2,
        },
      },
      {
        prop: 'operate',
        label: '操作',
        width: 200,
        align: 'center',
        fixed: 'right',
      },
    ],
    tableDataTotal: 0,
    tableLoading: false,
  })

  const fetchTableData = async (query) => {
    console.log(query)
    state.tableLoading = true
    const { data } = await getTableData()
    const index = Math.round(Math.random() * 10)
    state.tableData = data.slice(index, 20 + index)
    state.tableDataTotal = 87
    state.tableLoading = false
  }

  const add = () => {
    fetchTableData({})
  }

  const del = (row) => {
    console.log(row)
  }
</script>

<style lang="scss" scoped></style>
