import axios from '@/services/axios'

/*获取商品类别列表*/
export const getClassList = () => axios.get(`/class/list`)

/*获取商品列表*/
export const getGoodsList = (id) => axios.get(`/goods/list/${id}`)

/*增加商品类别*/
export const addGoodsClass = (data) => axios.post(`/class/add`,data)

/*增加商品*/
export const addGoods = (id,data) => axios.post(`/goods/add/${id}`,data)