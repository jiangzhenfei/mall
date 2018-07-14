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
						<Row type="flex" justify="end" align="middle">
							<Col span="4" style="text-align:right;color:#fff;padding-right:10px">
								<Dropdown transfer trigger="click" @on-click="switchEvents">
									<span style="cursor:pointer">
										<span class="main-user-name">{{ user }}</span>
										<Icon type="arrow-down-b"></Icon>
									</span>
									<DropdownMenu slot="list">
										<DropdownItem name="logOut">注销</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</Col>
							<Col span="4" style="text-align:left">
								<div class="person"> <img src="../assets/images/userIcon.svg"/> </div>
							</Col>
						</Row>
					</Header>
					<div style="background: #fff;padding:20px;margin-top:60px;padding-top:0">
						<div>
							<div>
								<div class="back">
									<h2 v-if="routeTitle">{{routeTitle}}</h2>
									<h2 v-else @click="back" style="cursor:pointer"> <Icon type="ios-arrow-back"></Icon> 返回 </h2>
								</div>
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
import * as Api from "@/services/user"
import * as setter from '@/utils/local'
export default {
    name: 'HelloWorld',
    data () {
		return {
			user:setter.getCookie('osm_user'),
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
			},
			routeTitle:'',
		}
	},
	created(){
		this.upTitleAndBackInfo( this.$route )
	},
	methods:{
		handleSelect(name){
			this.$router.push({name: this.routeMap[name] });
		},
		updateMenu(){
            this.$refs.nav.updateActiveName();
		},
		//去往login界面
		logout(){
			let service = ()=> Api.logout()
			let callback = (e) => {
				this.$router.push({name:'login'});
				this.clearUserInfo()
			}
			this.doServiceAndCallback("登出",service,callback)
			
		},
		//更新导航的选中情况以及当前路由的标题
		//当前在父路由，显示路由标题，在子路由显示返回
		upTitleAndBackInfo( route ){
			this.active = route.meta.nav;
			if( route.meta && route.meta.parent ){
				this.routeTitle = route.meta.title
			}else{
				this.routeTitle = ""
			}
		},
		back(){
			this.$router.go(-1)
		},
		switchEvents(name){
            switch(name){
                case 'goUser':
                    this.goUser()
                break;
                case 'logOut':
                    this.logout()
                break;
            }
        },
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
			this.upTitleAndBackInfo( to )
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
	position: fixed;
	width: 100%;
	top:0;
	z-index: 1;
	box-shadow: 0 1px 1px rgba(0,0,0,.1);
	background: #3b55a4
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
.back h2{
	text-align: left;
	padding: 15px 0;
}
.person{
	display: inline-block
}
.person img{
	width: 30px;
	height: 30px;
	vertical-align: middle
}
</style>
