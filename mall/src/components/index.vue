<template>
    <div  style="background: #fff;width:1226px;height:460px;margin-top:152px;margin:152px auto">
        <Row type="flex">
            <Sider class='Sider' breakpoint="md" :collapsed-width="78">
                <Menu ref="nav" theme="dark" width="auto" :class="menuitemClasses" @on-select="handleSelect" v-cloak accordion>
                    <MenuItem :name="item.sortID" v-for="item in goodsClass" :key="item.sortID">
                        <Icon type="ios-navigate"></Icon>
                        <span>{{item.sortName}}</span>
                    </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Carousel autoplay v-model="value" loop class="auto_page" :autoplay-speed="5000">
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
            </Layout>
        </Row>
    </div>
</template>

<script>
import * as Api from "@/services/goods"
import * as Cookie from '@/utils/local'
export default {
    name: 'HelloWorld',
    data () {
		return {
			value: 0,
			openMenu:[],
			goodsClass:[
			],
		}
	},
	created(){
		this.getClassList()
	},
	methods:{
		handleSelect(name){
			this.$router.push(`/goods/${name}`);
		},
		//获取商品类别导航
        getClassList(){
            let service = ()=> Api.getClassList()
            let callback = (e) => {
				console.log(e)
				this.goodsClass = e.data.response || []
            }
            this.doService("获取商品列表",service,callback)
		},
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
