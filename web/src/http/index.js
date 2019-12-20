import axios from 'axios';
import config from '~';
import Vue from 'vue'
import ViewUI from 'view-design';
Vue.use(ViewUI);

const API = axios.create();
const $VUE = new Vue();

// 添加请求拦截器
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('my-project-token');
  Object.assign(config.headers, { 'Authorization': token}); // 携带token
  return config;
}, error => Promise.reject(error));

// 添加响应拦截器
API.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      if (error.response.status === 401) { // token
        $VUE.$Message.error('用户信息已过期');

        setTimeout(() => {
          location.href = `${config.domain}:${config.port}` // token认证不通过跳转登录页面
        }, 1000)
      }
    }

    return Promise.reject(error.response.data)
  }
)

export default API;