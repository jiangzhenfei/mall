import axios from '@/services/axios'

/*获取商品类别列表*/
export const getClassList = () => axios.get(`/sort`)
/*增加商品类别*/
export const addGoodsClass = (data) => axios.post(`/sort`,data)
/*修改商品类别*/
export const amendGoodsClass = (id,data) => axios.put(`/sort/${id}`,data)
/*删除商品类别*/
export const deleteClass = (id) => axios.delete(`/sort/${id}`)


/*获取商品列表*/
export const getGoodsList = (id) => axios.get(`commodity/${id}`)
/*增加商品*/
export const addGoods = (data) => axios.post(`/commodity`,data)
/*增加商品*/
export const amendGoods = (id,data) => axios.put(`commodity/${id}`,data)
/*删除怒商品*/
export const deleteGoods = (id) => axios.delete(`commodity/${id}`)