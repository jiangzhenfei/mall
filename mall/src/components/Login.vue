<template>
	<Row type="flex" justify="center" align="middle" class="code-row-bg">
        <Col span="24" class="bk">
            <div class="login">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom"  class="card-box box-custom" >
                    <FormItem prop="user" label="用户名">
                        <Input type="text"  size="large" v-model="formCustom.user" placeholder="用户名">
                            <Icon type="person" slot="prepend" size="20" style="color:#307fff"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <Input type="password" size="large" v-model="formCustom.password" placeholder="密码" @keyup.enter.native="handleSubmit('formCustom')">
                            <Icon type="ios-locked" slot="prepend" size="20" style="color:#307fff"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem class="login-bottom">
                        <Row>
                            <Button type="primary" @click="handleSubmit('formCustom')" :loading="loading" long>
                                <span v-if="!loading">登录</span>
                                <span v-else>正在登录...</span>
                            </Button>
                        </Row>
                    </FormItem>
                </Form>
                <span class="register" @click="registry">立即注册</span>
            </div>
        </Col>
    </Row>
</template>

<script>
import * as Api from "@/services/auth.js"
import * as Cookie from '@/utils/local'
export default {
    name: 'Login',
    data(){
        return {
            formCustom:{
                user:'',
                password:''
            },
            loading:false,
            ruleCustom:{
                user: [
                    { required: true, message: "请填写用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请填写密码", trigger: "blur" },
                    { type: "string", min: 4, message: "密码长度不能小于4位", trigger: "blur" }
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
                    let service = ()=> Api.login()
                    let callback = (e)=>{
                        console.log(e)
                        Cookie.setCookie('user',e)
                        this.$router.go(-1)
                    }
                    this.doServiceAndCallback('登入',service,callback)
                }
            })
        },
        registry(){
            this.$router.push({name:'registry'});
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bk{
    height: 475px;
    background: url(../assets/images/loginBk.jpeg) no-repeat;
    background-size: 100% 100%
}
.login{
    width: 350px;
    height: 350px;
    background:rgba(255,255,255,.9);
    padding: 25px;
    position: absolute;
    right: 150px;
    top:40px
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
