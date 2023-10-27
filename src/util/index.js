// 工具类

//节流函数
export function throttle(func, wait) {
  let timer = null
  return function () {
    let context = this,
      args = [...arguments]
    if (timer) return
    timer = setTimeout(function () {
      func.apply(context, args)
      timer = null
    }, wait)
  }
}
