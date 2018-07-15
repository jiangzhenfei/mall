<template>
	<div id="trolley">
        <Row type="flex" justify="end" class="btn-container">
            <Col>
                
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
        <Row type="flex" justify="start" class="buy">
            <Col>
                <Button type="primary" icon="ios-list-outline">购买</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import * as Api from "@/services/auth.js"
import * as Cookie from '@/utils/local'
export default {
    name: 'Login',
    data(){
        return {
            tableConfig:[],
            loading:false,
            selectionv:[],
            tableData:[
                {
                    img:'/static/logo.png',
                    name:'apple',
                    money:120,
                    num:2
                },
                {
                    img:'/static/logo.png',
                    name:'banner',
                    money:24,
                    num:7
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
                {title: '商品图片',key: 'host',width: 100,render:(h,params)=>{
                    return (
                        <div class="good-img"><img src="/static/logo.png" /></div>
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
                {title: "数量",key: "num",render:(h,params)=>{
                    return (
                        <div style="display:flex">
                            <icon class="minus" type="minus" on-click={() => this.minus(params.row)}></icon>
                            <input class="input" type="text" value={params.row.num} on-blur={(e)=> this.changeNum(e,params.row)}></input>
                            <icon class="plus" type="plus-round" on-click={() => this.plus(params.row)}></icon>
                        </div>
                    )
                }},
                {title: '操作',key: 'id',
                    render:(h,params) =>{
                        return (
                            <div>
                                <i-button size="small" type="error" icon="trash-a" on-click={() => this.delete(params.row.sortID)}>删除</i-button>
                            </div>   
                        )
                    }
                }
                
            ]
        },
        onSelectionChange(){},
        delete(){},
        //减少按钮
        minus(e){
            //TODO
            //修改数量的接口
            //刷新列表
        },
        //增加按钮
        plus(e){
            //TODO
            //修改数量的接口
            //刷新列表
        },
        changeNum(event,e){
            if( Number(event.target.value)!== e.num ){
                //TODO
                //修改数量的接口
                //刷新列表
            }
            
        },
        delete(){
            
        }
        

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy{
    margin-top: 20px;
}
.good-img{
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
}
.good-img img{
    width: 100%;
    height: 100%;
}
</style>
