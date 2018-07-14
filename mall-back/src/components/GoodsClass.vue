<template>
    <card>
        <Row type="flex" justify="end" class="btn-container">
            <Col>
                <Button type="primary" icon="ios-list-outline" @click="showAdd=true">新增商品类别</Button>
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
        <div v-if="showAdd">
            <add-goods-class v-on:setaddmodal="setAddModal"></add-goods-class>
        </div>

        <div v-if="showAmend">
            <amend-goods-class v-on:setamendmodal="setAmendModal" :data="classInfo"></amend-goods-class>
        </div>
    </card>
</template>

<script>
import Event from '../utils/subscrible'
import * as Api from "@/services/goods"
import addGoodsClass from  './modal/addClass.vue'
import amendGoodsClass from  './modal/amendClass.vue'

export default {
    name: 'goodsClass',
    components:{
        addGoodsClass,
        amendGoodsClass
    },
    data(){
        return {
            classInfo:{},
            showAmend:false,
            showAdd:false,
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
        this.getClassList()
    },
    methods:{
        initTable(){
            this.tableConfig = [
                {title: "名称",width:'15%',
                    render:(h,params) => {
                        return (
                            <span class="syan" on-click={ ()=>{this.goGoodsList(params.row.sortID)} }>{params.row.sortName}</span>
                        )
                    }
                },
                {title: "id",key: "sortID",width:'20%',render:(h,params)=>{
                    return h('span', params.row.sortID);
                }},
                {title: "创建时间",key: "createTime",width:'15%'},
                {title: '操作',key: 'id',width:'15%',
                    render:(h,params) =>{
                        return (
                            <div>
                                <i-button size="small" type="primary" icon="trash-a" on-click={() => this.delete(params.row.sortID)}>删除</i-button>
                                <i-button size="small" type="error" icon="android-exit" on-click={() => this.amend(params.row)}>修改</i-button>
                            </div>
                            
                        )
                    }
                }
            ]
        },
        //获取商品类别导航
        getClassList(){
            let service = ()=> Api.getClassList()
            let callback = (e) => {
				this.tableData = e.data.response || []
            }
            this.doService("获取商品列表",service,callback)
		},
        onSelectionChange(){},
        handlePage(){},
        handlePageSize(){},
        setAddModal( e ){
            if( e === 'success' ){
                this.getClassList()
            }
            this.showAdd = false;
        },
        setAmendModal( e ) {
            if( e === 'success' ){
                this.getClassList()
            }
            this.showAmend = false;
        },
        delete(id){
            let service = ()=> Api.deleteClass(id)
            let callback = (e) => {
                this.getClassList()
            }
            this.doServiceAndCallback("删除商品类别",service,callback)
        },
        amend(data){
            this.classInfo = data;
            this.showAmend = true
        },
        goGoodsList(id){
            this.$router.push(`/goodsList/${id}`);
        }
    },
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
