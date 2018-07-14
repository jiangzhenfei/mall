<template>
    <card>
        <Row type="flex" justify="end" class="btn-container">
            <Col>
                <Button type="primary" icon="ios-list-outline" @click="add">新增商品</Button>
            </Col>
        </Row>
        <Table  
            ref="projectTable"
            :loading="loading"
            :columns="tableConfig"
            :data="tableData" 
            @on-selection-change="onSelectionChange"
            stripe>
        </Table>
        <Page 
            ref="projectPage"
            :current.sync="page" 
            :page-size='pageSize' 
            :total="total" 
            :page-size-opts="pageSizeOpts"
            @on-change="handlePage"
            @on-page-size-change="handlePageSize"
            show-elevator show-sizer>
        </Page>
    </card>
</template>

<script>
import Event from '../utils/subscrible'
import * as Api from "@/services/goods"
import addGoodsClass from  './modal/addClass.vue'

export default {
    name: 'goodsClass',
    data(){
        return {
            id:this.$route.params.id,
            page:1,
            pageSize:5,
            total:0,
            searchText:'',
            pageSizeOpts:[5,20,50],
            tableConfig:[],
            loading:false,
            selectionv:[],

            tableData:[
                
            ]
        }
    },
    mounted(){
        this.initTable()
        this.getGoodsList()
    },
    methods:{
        initTable(){
            this.tableConfig = [
                {title: "名称",width:'15%',
                    render:(h,params) => {
                        return (
                            <span>{params.row.commodityName}</span>
                        )
                    }
                },
                {title: "图片",key: "commodityPic",width:'15%'},
                {title: "品牌",key: "commodityBrand",width:'20%',render:(h,params)=>{
                    return h('span', params.row.commodityBrand);
                }},
                {title: "价格",key: "commodityPrice",width:'15%'},
                {title: "库存",key: "commodityStock",width:'15%'},
                {title: '操作',key: 'id',width:'15%',
                    render:(h,params) =>{
                        return (
                            <div>
                                <i-button size="small" type="error" icon="trash-a" on-click={() => this.delete(params.row.commodityID)}>删除</i-button>
                                <i-button size="small" type="primary" icon="android-exit" on-click={() => this.amend(params.row.commodityID)}>修改</i-button>
                            </div>
                            
                        )
                    }
                }
            ]
        },
        //获取商品类别导航
        getGoodsList(){
            let service = ()=> Api.getGoodsList(this.id)
            let callback = (e) => {
				this.tableData = e.data.response || []
            }
            this.doService("获取商品列表",service,callback)
		},
        onSelectionChange(){},
        handlePage(){},
        handlePageSize(){},
        add(){
            this.$router.push(`/addGoods/${this.id}`);
        },
        delete(id){
            let service = ()=> Api.deleteGoods(id)
            let callback = (e) => {
                this.getGoodsList()
            }
            this.doServiceAndCallback("删除商品",service,callback)
        },
        amend(id){
            this.$router.push(`/amendGoods/${this.id}/${id}`);
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
