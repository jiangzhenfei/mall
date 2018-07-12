import axios from 'axios'
import * as setter from '@/utils/local'
import router from '../router'
// axios 配置
axios.defaults.timeout = 15000;
axios.defaults.baseURL = '/';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (setter.getCookie('dnt')) {/*获取cookie里面dnt的值，放到x-auth-token这个header里，上个版本的请求，本版本只需要cookie，留着万一后端需要*/
            config.headers['x-auth-token'] = setter.getCookie('dnt');
        }
        //没报保存的数据则跳登入
        // if (!setter.getCookie('ccc')) {
        //     router.replace({name: 'login'})
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 402:
                    // 402 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({name: 'login'})
            }
        }
        return Promise.reject(error.response)
    }
);

axios.install = (Vue) => {
    Vue.prototype.axios = axios
}

export default axios;