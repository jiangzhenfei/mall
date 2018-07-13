import axios from '@/services/axios'
import * as setter from '@/utils/local'

/*登入*/
export const login = (data) => axios.post(`/login`,data)
/*登出*/
export const logout = (data) => axios.get(`/logout`)

/*获取商品列表*/
export const getAllClient = () => axios.get(`/user`)

