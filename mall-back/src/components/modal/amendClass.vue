<template>
<Modal
    v-model="showHostToScale"
    title="增加商品类别"
    width="50%"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form ref="amendClassForm" :model="form" label-position="top" :rules="rules">
        <Row>
            <Col span="24">
                <FormItem label="类别名称" prop="sortNames">
                    <Input v-model="form.sortNames" placeholder="请输入商品类别名称..."></Input>
                </FormItem>
            </Col>
        </Row>   
    </Form>
    <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button type="default" @click="cancel">取消</Button>
    </div>
</Modal>
</template>

<script>
import * as Api from "@/services/goods"
export default {
    name:'',
    props:{
        data: { type: Object,  require: true },
    },
    data(){
        return {
            showHostToScale:false,
            sortID:"",
            form:{
                sortNames:'',
            },
            /*校验*/
            rules:{
                sortNames:[
                    { required: true, message: '商品类别名称是必须的', trigger: 'blur' },
                ],
            }
        }
    },
    created(){
        setTimeout(()=>{
            this.showHostToScale = true;
            this.form.sortNames = this.data.sortName
            this.sortID = this.data.sortID
        },0)
    },
    methods:{
        /*提交创建*/
        ok() {
            console.log(1)
            this.$refs['amendClassForm'].validate((valid) => {
                console.log(valid)
                if (valid) {
                    let service = () => Api.amendGoodsClass(this.sortID,{sortNames:[this.form.sortNames]});
                    let callback = (e) => {
                        this.showHostToScale = false;
                        setTimeout(()=>{
                            this.$emit('setamendmodal','success')
                        },500)
                    }
                    this.doServiceAndCallback("修改类别",service,callback)
                    console.log(valid)
                } else {
                    this.$Message.error('表单填写不正确！');
                }
            })
        },
        cancel(){
            this.showHostToScale = false;
            setTimeout(()=>{
                this.$emit('setamendmodal','cancel')
            },500)
        }
    }
}
</script>


<style scoped>
</style>