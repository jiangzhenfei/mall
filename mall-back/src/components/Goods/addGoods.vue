<template>
    <div>
        <card>
            <h5 class="pannel-title">新增商品</h5>
            <Form ref="addGoods" :model="formInline" :rules="ruleInline">
                <Row>
                    <Col span="12">
                        <Row>
                            <Col span="24">
                                <FormItem label="商品名称" prop="commodityName" class="login-bottom">
                                    <Input type="text" v-model="formInline.commodityName">
                                        
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="品牌" prop="commodityBrand" class="login-bottom">
                                    <Input type="text" v-model="formInline.commodityBrand">
                                        
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="价格" prop="commodityPrice" class="login-bottom">
                                    <InputNumber v-model="formInline.commodityPrice"></InputNumber>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem label="库存" prop="commodityStock">
                                    <InputNumber v-model="formInline.commodityStock"></InputNumber>
                                </FormItem>  
                            </Col>
                            <Col span="24">
                                <Upload action="osm/admin/upload" :headers="token" name="commondityPic" :format="['jpg','jpeg','png']" :on-success="fileSuccess">
                                    <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                                </Upload>
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
import * as setter from '@/utils/local'
export default {
    data(){
        return{
            id:this.$route.params.id,
            formInline: {
                commodityName: '',
                commodityPrice:100,
                commodityStock:0,
                commodityBrand:'',
                commodityPic:'',
                commoditySort:this.$route.params.id,
            },
            token:{
                "x-auth-token":setter.getCookie('osm')
            },
            ruleInline: {
                commodityName:[
                    { required: true, message: '名称是必须的', trigger: 'blur' },
                ],
                commodityBrand:[],
                commodityPrice:[
                   
                ],
                commodityStock:[
                    
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
                    if( !this.hasImg()){
                        this.$Message.error('请上传图片！');
                        return;
                    }
                    let service = () => Api.addGoods(this.formInline);
                    let callback = (e) => {
                        this.back()
                    }
                    this.doServiceAndCallback("新增商品",service,callback)
                } else {
                    this.$Message.error('表单填写不正确！');
                }
                    
            })
        },
        hasImg(){
            if(this.formInline.commodityPic){
                return true
            }
            return false;
        },
        back(){
            this.$router.go(-1)
        },
        fileSuccess(response, file, fileList){
            console.log(response)
            this.formInline.commodityPic = response.response;
        }
    },

}
</script>

<style scoped>
</style>