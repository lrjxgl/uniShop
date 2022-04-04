import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: true,
		loginProvider: "",
		openid: null,
		initStore:false
	},
	mutations: {
		login(state, provider) {
			state.isLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.isLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setInitStore:function(){
			state.initStore=true;
		}
	},
	actions: {
		
	}
})

export default store
