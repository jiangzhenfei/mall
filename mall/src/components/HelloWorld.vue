<template>
	<div id="app">
		<div class="layout">
			<Layout>
				<Sider class='Sider' breakpoint="md" :collapsed-width="78">
					<Menu ref="nav" theme="dark" width="auto" :class="menuitemClasses" @on-select="handleSelect" :active-name="active" v-cloak accordion>
						<MenuItem :name="item.sortID" v-for="item in goodsClass" :key="item.sortID">
							<Icon type="ios-navigate"></Icon>
							<span>{{item.sortName}}</span>
						</MenuItem>
					</Menu>
					<div slot="trigger"></div>
				</Sider>
				<Layout>
					<Header class="layout-header-bar">
						<span v-if="user">用户{{ user }}已经登入</span>
						<span v-else>用户还没登入入</span>
						<span @click="trolley">假的购物车数量{{ num }}</span>
						<span class="login" @click="login">请登入</span>
						<span class="login" @click="logout">登出</span>
						<span>免费注册</span>
					</Header>
					<div style="margin: 20px, background: #fff, padding:20px;margin-top:52px">
						<div>
							<Carousel autoplay v-model="value" loop class="auto_page" :autoplay-speed="3000">
								<CarouselItem>
									<img src="../assets/images/timg.jpeg" alt="" srcset="">
								</CarouselItem>
								<CarouselItem>
									<img src="../assets/images/timg (1).jpeg" alt="" srcset="">
								</CarouselItem>
								<CarouselItem>
									<img src="../assets/images/timg (2).jpeg" alt="" srcset="">
								</CarouselItem>
								<CarouselItem>
									<img src="../assets/images/timg (3).jpeg" alt="" srcset="">
								</CarouselItem>
							</Carousel>
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
import * as Cookie from '@/utils/local'
export default {
    name: 'HelloWorld',
    data () {
		return {
			value: 0,
			isCollapsed: false,
			active: '',
			openMenu:[],
			num:0,
			goodsClass:[
				
			],
			user:Cookie.getCookie('user')
		}
	},
	created(){
		Event.listen('addGood',this.refreshTrolley.bind(this))
		this.getClassList()
		console.log(this.$refs)
	},
	methods:{
		handleSelect(name){
			this.$router.push(`/goods/${name}`);
		},
		//刷新购物车
		refreshTrolley(){
			this.num++
		},
		//刷新用户登入状态
		refreshLoginStatus(){
			this.user = Cookie.getCookie('user')
		},
		//获取商品类别导航
        getClassList(){
            let service = ()=> Api.getClassList()
            let callback = (e) => {
				console.log(e)
				this.goodsClass = e.data.response || []
				//id可能为0
				this.active = (this.goodsClass[0] && this.goodsClass[0].sortID) === undefined ? "" : this.goodsClass[0].sortID
				this.active && this.handleSelect( this.active )
				this.$nextTick( this.updateMenu.bind(this) )
            }
            this.doService("获取商品列表",service,callback)
		},
		updateMenu(){
            this.$refs['nav'].updateActiveName();
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
		trolley(){
			if( !this.isLogin() ){
                this.showMessage('查看购物车','还未登录')
                return;
            }
			this.$router.push(`/trolley`);
		}
	},
	computed: {
		menuitemClasses: function () {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			]
		},
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
