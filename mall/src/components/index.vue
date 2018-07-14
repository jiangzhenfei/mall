<template>
    <div  style="margin-top:152px">
        <Row type="flex">
            <Sider class='Sider' breakpoint="md" :collapsed-width="78">
                <Menu ref="nav" theme="dark" width="auto" @on-select="handleSelect" v-cloak accordion>
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
                        <img src="../assets/images/demo1.jpg" alt="" srcset="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="../assets/images/demo2.jpg" alt="" srcset="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="../assets/images/demo3.jpg" alt="" srcset="">
                    </CarouselItem>
                    <CarouselItem>
                        <img src="../assets/images/demo4.jpg" alt="" srcset="">
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
		//TODO
		//1.图片也是后端获取
		//1.图片也是可以点击

	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auto_page{
	width: 1000px;
	height: 460px;
	margin: auto;
	background:#fff
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
