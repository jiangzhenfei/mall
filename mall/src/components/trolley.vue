<template>
	<card id="trolley">
        <Row type="flex" justify="end" class="btn-container">
            <Col>
                <Button type="primary" icon="ios-list-outline">新增商品类别</Button>
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
        <Row type="flex" justify="start" class="buy">
            <Col>
                <Button type="primary" icon="ios-list-outline">购买</Button>
            </Col>
        </Row>
    </card>
</template>

<script>
import * as Api from "@/services/auth.js"
import * as Cookie from '@/utils/local'
export default {
    name: 'Login',
    data(){
        return {
            page:1,
            pageSize:5,
            total:0,
            searchText:'',
            pageSizeOpts:[5,20,50],
            tableConfig:[],
            loading:false,
            selectionv:[],

            tableData:[
                {
                    img:'/static/logo.png',
                    name:'apple',
                    money:120,
                },
                {
                    img:'/static/logo.png',
                    name:'banner',
                    money:24,
                }
            ]
        }
    },
    mounted(){
        this.initTable()
    },
    methods:{
        initTable(){
            this.tableConfig = [
                {type: 'selection',width: 60,align: 'center'},
                {title: '商品图片',key: 'host',render:(h,params)=>{
                    return (
                        <img src="/static/logo.png" />
                    )
                }},
                {title: "商品名称",
                    render:(h,params) => {
                        return (
                            <span class="syan">{params.row.name}</span>
                        )
                    }
                },
                {title: "价格",key: "project_name",render:(h,params)=>{
                    return h('span', params.row.money);
                }},
                
            ]
        },
        onSelectionChange(){},
        handlePage(){},
        handlePageSize(){},
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy{
    margin-top: 20px;
}
</style>
