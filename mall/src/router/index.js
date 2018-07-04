import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: resolve => require(['@/components/HelloWorld'], resolve),
			children:[
				{
					path: '/goods/:id',
					name:'goods',
					component: resolve => require(['@/components/Goods'], resolve),
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
