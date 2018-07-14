<template>
	<div id="app">
		<div class="layout">
			<Header class="layout-header-bar">
				<span v-if="user">用户{{ user }}已经登入</span>
				<span v-else>用户还未登录</span>
				<span @click="trolley"><Icon class="header-icon" type="ios-cart"></Icon> 购物车{{ num }}件</span>
				<span v-if="!user" class="login" @click="login">请登入</span>
				<span v-if="user" class="login" @click="logout">登出</span>
				<span @click="registry">免费注册</span>
			</Header>
			<div>
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import Event from '../utils/subscrible'
import * as Api from "@/services/goods"
import * as Cookie from '@/utils/local'
export default {
    name: 'HelloWorld',
    data () {
		return {
			num:0,
			user:Cookie.getCookie('user')
		}
	},
	created(){
		Event.listen('addGood',this.refreshTrolley.bind(this))
		console.log(this.$refs)
	},
	methods:{
		//刷新购物车
		refreshTrolley(){
			this.num++
		},
		//刷新用户登入状态
		refreshLoginStatus(){
			this.user = Cookie.getCookie('user')
		},
		//去往login界面
		login(){
			this.$router.push({name:'login'});
		},
		logout(){
			console.log('out')
			Cookie.delCookie('user')
			this.refreshLoginStatus()
			//TODO...将购物车置空为0
		},
		//购物车
		trolley(){
			if( !this.isLogin() ){
                this.showMessage('查看购物车','还未登录')
                return;
            }
			this.$router.push(`/trolley`);
		},
		//注册
		registry(){
			this.$router.push(`/registry`);
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto_page{
	width: 1000px;
	height: 460px;
	margin: auto;
	background:#f5f7f9
}
img{
	width: 1000px;
	height: 460px;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}
.layout{
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
	height: 100%;
}
.Sider{
	height: 460px;
}
.layout-header-bar{
	background: #f2f2f2;
	height: 32px;
	line-height: 32px;
	position: fixed;
	width: 100%;
	top:0;
	z-index: 1;
	box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-header-bar span{
	cursor: pointer;
	padding: 0 5px;
}
.layout-header-bar span.login{
	color:#f22e00
}
.menu-item span{
	display: inline-block;
	overflow: hidden;
	width: 69px;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: bottom;
	transition: width .2s ease .2s;
}
.menu-item i{
	transform: translateX(0px);
	transition: font-size .2s ease, transform .2s ease;
	vertical-align: middle;
	font-size: 16px;
}
.collapsed-menu span{
	width: 0px;
	transition: width .2s ease;
}
.collapsed-menu i{
	transform: translateX(5px);
	transition: font-size .2s ease .2s, transform .2s ease .2s;
	vertical-align: middle;
	font-size: 22px;
}
.header-icon{
	color: #f22e00;
	font-size: 14px
}
</style>
