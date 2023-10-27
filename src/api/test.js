import axios from 'axios'

export const getTableData = () =>
  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts',
  })
