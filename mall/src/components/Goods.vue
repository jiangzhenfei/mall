<template>
	<Row type="flex" justify="start" style="margin-top:15px;margin-bottom: 30px;">
        <h3 v-if="tableData.length === 0" style="text-align:center">暂无商品</h3>
        <Col :xs="12" :sm="8" :md="6" :lg="6" v-for="(item,i) in tableData" :key="i">
            <div class="card-box">
                <div class="add" @click="add(item.id,item.store)">
                    <Icon type="plus-circled"></Icon>
                </div>
                <div class="img">
                    <img :src="item.commodityPic" />
                </div>
                <div class="info">
                    <p class="goods-desc">{{item.commodityBrand}}</p>
                    <p>{{item.commodityPrice}}</p>
                </div>
            </div>
        </Col>
    </Row>
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
.card-box{
    position: relative;
    padding-bottom: 20px;
    padding-top: 20px;
    margin:10px;
    background: #fff;
    border:1px solid #e2d9d9;
    border-radius: 8px;
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
    box-shadow: 10px 10px 5px #888888;
    transform: translate3d(-1px,-1px,10px)
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
