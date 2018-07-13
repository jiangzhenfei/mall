<template>
    <card>
        <Row type="flex" justify="end" class="btn-container">
            <Col>
                <Button type="primary" icon="ios-list-outline" @click="add">用户</Button>
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

import * as Api from "@/services/user"
import addGoodsClass from  '../modal/addClass.vue'

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
        this.getAllClient()
    },
    methods:{
        initTable(){
            this.tableConfig = [
                {title: ' ',key: 'host',width: 30,render:(h,params)=>{
                    return (
                        <icon type="android-person"></icon>
                    )
                }},
                {title: "名称",width:'15%',
                    render:(h,params) => {
                        return (
                            <span class="syan">{params.row.userName}</span>
                        )
                    }
                },
                {title: "创建时间",key: "createTime",width:'15%'},
                {title: "更新时间",key: "updateTime",width:'15%'},
            ]
        },
        //获取商品类别导航
        getAllClient(){
            let service = ()=> Api.getAllClient()
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
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
