// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'iview/dist/styles/iview.css';    // 使用 CSS
import './assets/style/base.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'; 
import util from './utils/util' //绑定倒vue实例上的方法

Vue.use(iView)
Vue.use(util)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
