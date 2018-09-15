import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//https://vuex.vuejs.org/zh/api/
const store=new Vuex.Store({
	state:{
		isLogin:false,
		openid:null,
	},
	mutations:{
		login(state,openid){
			state.isLogin=true;
			state.openid=openid;
		},
		logout(state){
			state.isLogin=false;
		}
		setOpenid(state,openid){
			state.openid=openid;
		}
	},
	actions:{
		login:async function({
			commit,state
		}){
			const openid="123";
			commit("login",openid);
		}
	},
})
