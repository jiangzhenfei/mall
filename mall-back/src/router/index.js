import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			redirect: '/goodsClass',
			meta:{nav:'class'},
			component: resolve => require(['@/components/HelloWorld'], resolve),
			children:[
				{
					path: '/goodsClass',
					name:'goodsClass',
					meta:{nav:'class'},
					component: resolve => require(['@/components/GoodsClass'], resolve),
				},
				{
					path: '/goodsList/:id',
					name: 'goodsList',
					meta:{nav:'class'},
					component: resolve => require(['@/components/goodsList'], resolve),
				},
				{
					path: '/addGoods/:id',
					name: 'addGoods',
					meta:{nav:'class'},
					component: resolve => require(['@/components/Goods/addGoods'], resolve),
				},
				{
					path: '/userInfo',
					name: 'userInfo',
					meta:{nav:'userInfo'},
					component: resolve => require(['@/components/userInfo/userList'], resolve),
				},
				{
					path: '/order',
					name: 'order',
					meta:{nav:'order'},
					component: resolve => require(['@/components/order/orderList'], resolve),
				},
				{
					path: '/account',
					name: 'account',
					meta:{nav:'account'},
					component: resolve => require(['@/components/account/accountList'], resolve),
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/components/Login'], resolve),
		},
		{
			path: '/registry',
			name: 'registry',
			component: resolve => require(['@/components/registry'], resolve),
		}
	]
})
