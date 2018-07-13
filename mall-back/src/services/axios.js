import axios from 'axios'
import * as setter from '@/utils/local'
import router from '../router'
// axios 配置
axios.defaults.timeout = 15000;
axios.defaults.baseURL = '/osm/admin/';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (setter.getCookie('osm')) {/*获取cookie里面dnt的值，放到x-auth-token这个header里，上个版本的请求，本版本只需要cookie，留着万一后端需要*/
            config.headers['x-auth-token'] = setter.getCookie('osm');
        }
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
                    setter.delCookie('osm');
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