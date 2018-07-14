<template>
	<div class="container" style="margin-top:15px;margin-bottom: 30px;">
        <h3 v-if="tableData.length === 0" style="text-align:center">暂无商品</h3>
        <div  class="item" v-for="(item,i) in tableData" :key="i">
            <div class="card-box">
                <div v-if="false" class="add" >
                    <Icon type="plus-circled"></Icon>
                </div>
                <div class="img">
                    <img :src="item.commodityPic" :alt="item.commodityName"/>
                </div>
                <div class="info">
                    <p class="goods-desc">{{item.commodityBrand}}</p>
                    <p>{{item.commodityPrice}}</p>
                </div>
                <div class="mange" >
                    <div style="display:flex">
                        <div class="btm" @click="buy(item.id,item.store)">
                            <Icon type="social-usd"></Icon> 立即购买
                        </div>
                        <div class="btm" @click="add(item.id,item.store)">
                            <Icon type="ios-cart"></Icon> 加入购物车
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Event from '../utils/subscrible'
import * as Api from "@/services/goods"

export default {
    name: 'HelloWorld',
    data(){
        return {
            id:this.$route.params.id,
            tableData:[
               
            ]
        }
    },
    mounted(){
        this.getGoodsList()
    },
    methods:{
        //添加购物车，成功后更新头部购物车的数量
        add(id,store){
            console.log(id,store)
            if( !this.isLogin() ){
                this.showMessage('添加商品','还未登录')
                return;
            }
            if( store <=0 ){
                this.showMessage('添加商品','库存不足')
                return;
            }
            //TODO...
            Event.trigger('addGood')
        },
        buy(id,store){
            console.log(id,store)
            if( !this.isLogin() ){
                this.showMessage('添加商品','还未登录')
                return;
            }
            if( store <=0 ){
                this.showMessage('添加商品','库存不足')
                return;
            }
            //TODO...
        },
        //获取商品类别导航
        getGoodsList(){
            let service = ()=> Api.getGoodsList(this.id)
            let callback = (e) => {
				console.log(e)
				this.tableData = e.data.response || []
            }
            this.doService("获取商品列表",service,callback)
		},
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    display: flex;
    flex-wrap: wrap;
}
.container .item{
    width: 245px;
    position: relative;
}
.card-box{
    position: relative;
    padding-bottom: 20px;
    padding-top: 20px;
    margin:10px;
    background: #fff;
    border:1px solid #e2d9d9;
    border-radius: 2px;
}
.card-box .mange{
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    display: none;
    background: #ff6700
}
.card-box .mange .btm{
    width: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
}
.add{
    line-height: 50px;
    position: absolute;
    top:0;
    right: 0;
    width: 50px;
    height: 50px;
    text-align: center;
    vertical-align: middle;
}
.add i{
    font-size: 30px;
    cursor: pointer;
}
.card-box:hover{
    box-shadow: 2px 2px 1px #888888;
    transform: translate3d(-1px,-1px,1px)
}
.card-box:hover .mange{
    display: block;
}
img{
    width:185px;
    height: 185px;
    display: block;
    margin: auto;
}
.info p{
    color:red;
    text-align: center;
    font-size: 18px;
}
.info p.goods-desc{
    padding: 0 20px;
    text-align: center;
    height: 40px;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    overflow: hidden;
}
</style>
