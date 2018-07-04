<template>
<Modal
    v-model="showHostToScale"
    title="增加商品类别"
    width="50%"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form ref="addClassForm" :model="form" label-position="top" :rules="rules">
        <Row>
            <Col span="24">
                <FormItem label="类别名称" prop="name">
                    <Input v-model="form.name" placeholder="请输入商品类别名称..."></Input>
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
    data(){
        return {
            showHostToScale:false,
            form:{
                name:'',
            },
            /*校验*/
            rules:{
                name:[
                    { required: true, message: '主机名称是必须的', trigger: 'blur' },
                ],
            }
        }
    },
    created(){
        setTimeout(()=>{
            this.showHostToScale = true;
        },0)
    },
    methods:{
        /*提交创建*/
        ok() {
            this.$refs['addClassForm'].validate((valid) => {
                if (valid) {
                    let service = () => Api.addGoodsClass(this.form);
                    let callback = (e) => {
                        this.showHostToScale = false;
                        setTimeout(()=>{
                            this.$emit('setaddmodal','success')
                        },500)
                    }
                    this.doServiceAndCallback("新增类别",service,callback)
                } else {
                    this.$Message.error('表单填写不正确！');
                }
            })
        },
        cancel(){
            this.showHostToScale = false;
            setTimeout(()=>{
                this.$emit('setaddmodal','cancel')
            },500)
        }
    }
}
</script>


<style scoped>
</style>