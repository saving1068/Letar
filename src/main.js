// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import App from './App'
import router from './router'

import 'iview/dist/styles/iview.css';

import Api from '@/Api/Api'
import store from './store/store'
import cityData from '@/plugin/Citys'
import newCity from '@/plugin/newCitys'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()



import MyLHeader from '@/components/LHeader/LHeader.vue';
Vue.component('LHeader',MyLHeader)

//Vue.use(LHeader);
import MyLFooter from '@/components/LFooter/LFooter.vue';
Vue.component('LFooter',MyLFooter)
import PayDialog from '@/components/PayDialog'
Vue.use(PayDialog)
import myLDialog from '@/components/Dialog/Dialog.vue'
Vue.component('LDialog',myLDialog)

import myLinkage from '@/components/Linkage/Linkage.vue'
Vue.component('Linkage',myLinkage)

Vue.config.productionTip = false

Vue.config.productionTip = false
Vue.prototype.$Api = Api;
Vue.prototype.$cityData = cityData
Vue.prototype.$newCity=newCity
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	store,
	template: '<App/>'
})