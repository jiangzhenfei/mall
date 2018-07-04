<template>
	<Row type="flex" justify="center" align="middle" class="code-row-bg">
        <Col span="6" class="login">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom"  class="card-box box-custom" >
                <FormItem prop="phone" label="手机号">
                    <Input type="text"  size="large" v-model="formCustom.phone" placeholder="请填写手机号...">
                        <Icon type="person" slot="prepend" size="20" style="color:#307fff"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password" label="密码">
                    <Input type="password" size="large" v-model="formCustom.password" placeholder="密码">
                        <Icon type="ios-locked" slot="prepend" size="20" style="color:#307fff"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="repeatPassword" label="确认密码">
                    <Input type="password" size="large" v-model="formCustom.repeatPassword" placeholder="确认密码">
                        <Icon type="ios-locked" slot="prepend" size="20" style="color:#307fff"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="url" label="收货地址">
                    <Input type="text" size="large" v-model="formCustom.url" placeholder="填写收货地址">
                        <Icon type="ios-locked" slot="prepend" size="20" style="color:#307fff"></Icon>
                    </Input>
                </FormItem>
                <FormItem class="login-bottom">
                    <Row>
                        <Button type="primary" @click="handleSubmit('formCustom')" :loading="loading" long>
                            <span v-if="!loading">注册</span>
                            <span v-else>正在注册...</span>
                        </Button>
                    </Row>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>

<script>
export default {
    name: 'registry',
    data(){
        return {
            formCustom:{
                phone:'',
                password:'',
                repeatPassword:'',
                url:''
            },
            loading:false,
            ruleCustom:{
                phone: [
                    { required: true, message: "请填写常用手机号码", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请填写密码", trigger: "blur" },
                    { type: "string", min: 4, message: "密码长度不能小于4位", trigger: "blur" }
                ],
                repeatPassword: [

                ],
                url:[

                ]
            }
        }
    },
    mounted(){
    },
    methods:{
        handleSubmit( name ){
            this.$refs[name].validate(valid => {
                if (valid) {
                    console.log('succesee')
                }
            })
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    width: 350px;
    height: 600px;
    background:rgba(255,255,255,.9);
    padding: 25px;
}
.code-row-bg{
    height: 100%;
}
.register{
    color: #b61d1d;
    cursor: pointer;
    font-size: 16px
}
</style>
