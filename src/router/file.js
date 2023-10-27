// 根据pages下面的.vue文件生成路由
// 排除掉components文件夹下面的文件生成路由

const pages = import.meta.glob(['@/pages/**/**.vue', '!@/pages/**/components'])
const fileRouters = []
for (let page in pages) {
  const path = page
    .replace('/src/pages/', '')
    .replace('/Index.vue', '')
    .replace('.vue', '')
    .toLowerCase()
  fileRouters.push({
    path: '/' + path,
    name: path.replace('/', '-'),
    component: pages[page],
  })
}
export default fileRouters
