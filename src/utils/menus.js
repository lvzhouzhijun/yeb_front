import {getRequest} from "./api";

export const initMenu = (router, store) => {
  // 大于 0 说明已经有数据了，不需要初始化了
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest('/system/cfg/menu').then(data => {
    if (data) {
      // 格式化
      let fmtRoutes = formRouters(data)
      // 添加到路由
      router.addRoutes(fmtRoutes)
      // 将数据存入 Vuex
      store.commit('initRoutes',fmtRoutes)
    }
  })
}

export const formRouters = (routes => {
  let fmtRoutes = []
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      // 递归
      children = formRouters(children)
    }
    let fmRoutes = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component(resolve) {
        if(component.startWith('Emp')){
          require(['../views/emp/'+component + '.vue'], resolve)
        } else if (component.startWith('per')){
          require(['../views/per/'+component + '.vue'], resolve)
        } else if (component.startWith('sal')){
          require(['../views/sal/'+component + '.vue'], resolve)
        } else if (component.startWith('sta')){
          require(['../views/sta/'+component + '.vue'], resolve)
        } else if (component.startWith('sys')){
          require(['../views/sys/'+component + '.vue'], resolve)
        }
      }
    }
    fmtRoutes.push(fmRoutes)
  })
  return fmtRoutes
})

