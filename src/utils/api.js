import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
// 请求拦截器
axios.interceptors.request.use(config => {
  // 如果存在 session ，请求携带 token
  if (window.sessionStorage.getItem('tokenStr')) {
    config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
  }
  return config
},error => {
  console.log(error)
})
// 响应拦截器
// success：表示成功调到后端接口
// error：调用后端接口失败
axios.interceptors.response.use(success => {
  // 业务逻辑错误
  if(success.status && success.status === 200){
    if(success.data.code === 500 || success.data.code === 401 || success.data.code === 403){
      Message.error({message:success.data.message})
      return
    }
    if(success.data.message){
      Message.success({message:success.data.message})
    }
  }
  return success.data;
},error => { // error 压根就没有访问到后端接口
  if(error.response.code === 504 || error.response.code === 404){
    Message.error({message:'服务器被吃掉了'})
  } else if (error.response.code === 403){
    Message.error({message:'权限不足，请联系管理员'})
  }else if(error.response.code === 401){
    Message.error({message:'尚未登录，请登陆'})
    // 跳转到登录页面
    router.replace('/')
  }else{
    if(error.response.data.message){
      Message.error({message:error.response.data.message})
    }else{
      Message.error({message:"未知错误！"})
    }
  }
  return
})

// 前置路径，默认 空，就是没有
let base = ''

// 传送JSON格式的POST请求
export const postRequest = (url,params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}

// 传送 JSON 的 put 请求
export const putRequest = (url,params) => {
  return axios({
    method: 'put',
    url: `${base}{url}`,
    data: params
  })
}

// get 请求
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    url: `${base}{url}`,
    data: params
  })
}

// delete 请求
export const deleteRequest = (url,params) => {
  return axios({
    method: 'delete',
    url: `${base}{url}`,
    data: params
  })
}