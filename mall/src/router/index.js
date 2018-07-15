import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			redirect: '/index',
			component: resolve => require(['@/components/HelloWorld'], resolve),
			children:[
				{
					path: '/index',
					name:'index',
					component: resolve => require(['@/components/index'], resolve),
				},
				{
					path: '/goods/:id',
					name:'goods',
					component: resolve => require(['@/components/Goods'], resolve),
				},
				{
					path: '/trolley',
					name: 'trolley',
					component: resolve => require(['@/components/trolley'], resolve),
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
		},
	]
})
