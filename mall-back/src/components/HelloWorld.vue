<template>
	<div id="app">
		<div class="layout">
			<Layout>
				<Sider class='Sider' breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
					<Menu ref="nav" theme="dark" width="auto" :class="menuitemClasses" @on-select="handleSelect" :active-name="active" v-cloak accordion>
						<MenuItem name="class" >
							<Icon type="ios-navigate"></Icon>
							<span>商品类别</span>
						</MenuItem>
						<MenuItem name="userInfo" >
							<Icon type="ios-navigate"></Icon>
							<span>用户信息</span>
						</MenuItem>
						<MenuItem name="order" >
							<Icon type="ios-navigate"></Icon>
							<span>订单详情</span>
						</MenuItem>
						<MenuItem name="account" >
							<Icon type="ios-navigate"></Icon>
							<span>流水查询</span>
						</MenuItem>
					</Menu>
					<div slot="trigger"></div>
				</Sider>
				<Layout>
					<Header class="layout-header-bar">
						<span class="login" @click="login">请登入</span>
					</Header>
					<div style="margin: 20px, background: #fff, padding:20px;margin-top:52px">
						<div>
							<div>
								<router-view/>
							</div>
						</div>
					</div>
				</Layout>
			</Layout>
		</div>
	</div>
</template>

<script>
import Event from '../utils/subscrible'
import * as Api from "@/services/goods"
export default {
    name: 'HelloWorld',
    data () {
		return {
			value: 0,
			isCollapsed: false,
			active: '',
			openMenu:[],
			num:0,
			goodsClass:[],
			//名称和路由对应表
			routeMap:{
				class:'goodsClass',
				userInfo:'userInfo',
				order:'order',
				account:'account'
			}
		}
	},
	created(){
		this.active = this.$route.meta.nav
	},
	methods:{
		handleSelect(name){
			this.$router.push({name: this.routeMap[name] });
		},
		updateMenu(){
            this.$refs.nav.updateActiveName();
		},
		//去往login界面
		login(){
			this.$router.push({name:'login'});
		}
	},
	computed: {
		menuitemClasses: function () {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			]
		},
	},
	watch: {
        '$route' (to, from) {
			console.log(to)
			this.active = to.meta.nav;
			this.$nextTick(()=>{
				this.updateMenu()
			})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto_page{
	width: 800px;
	height: 300px;
	margin: auto;
	background:#f5f7f9
}
img{
	width: 800px;
	height: 300px;
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
	height: 100%;
}
.layout-header-bar{
	background: #fff;
	position: fixed;
	width: 100%;
	top:0;
	z-index: 1;
	box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-header-bar span{
	cursor: pointer;
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
</style>
