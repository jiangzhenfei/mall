import axios from '@/services/axios'

/*获取商品类别列表*/
export const getClassList = () => axios.get(`/class/list`)

/*获取商品列表*/
export const getGoodsList = (id) => axios.get(`/goods/list/${id}`)