<template>
    <div>
        <card>
            <h5 class="pannel-title">新增商品</h5>
            <Form ref="addGoods" :model="formInline" :rules="ruleInline">
                <Row>
                    <Col span="12">
                        <Row>
                            <Col span="24">
                                <FormItem label="商品名称" prop="name" class="login-bottom">
                                    <Input type="text" v-model="formInline.name">
                                        
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="描述" prop="desc" class="login-bottom">
                                    <Input type="textarea" v-model="formInline.desc">
                                        
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="价格" prop="money" class="login-bottom">
                                    <InputNumber v-model="formInline.money"></InputNumber>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="库存" prop="store">
                                    <InputNumber v-model="formInline.store"></InputNumber>
                                </FormItem>  
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span="24" style="text-align:center">
                        <Button type="primary" icon="checkmark" @click="add">提交</Button>
                        <Button type="primary" icon="ios-rewind" @click="back">返回</Button>
                    </Col>
                </Row>
            </Form>
        </card>
    </div>
</template>

<script>
import * as Api from "@/services/goods"
export default {
    data(){
        return{
            id:this.$route.params.id,
            formInline: {
                name: '',
                desc: '',
                money:100,
                store:0

            },
            ruleInline: {
                name:[
                    { required: true, message: '名称是必须的', trigger: 'blur' },
                ],
                desc:[],
                money:[
                   
                ],
                store:[
                    
                ]
            },
        }
    },
    created(){
    }, 
    methods: {
        add(name){
            this.$refs['addGoods'].validate((valid) => {
                if (valid) {
                    let service = () => Api.addGoods(this.id,this.formInline);
                    let callback = (e) => {
                        this.back()
                    }
                    this.doServiceAndCallback("新增商品",service,callback)
                } else {
                    this.$Message.error('表单填写不正确！');
                }
                    
            })
        },
        back(){
            this.$router.go(-1)
        }
    },

}
</script>

<style scoped>
</style>