<template>
	<view>
		<div class="tabs-border">
			<div @click="setTab('notice')" :class="tab=='notice'?'tabs-border-active':''" class="tabs-border-item">我的消息</div>
			<div @click="setTab('pm')" :class="tab=='pm'?'tabs-border-active':''" class="tabs-border-item">我的私信</div>
			<div @click="setTab('sysmsg')" :class="tab=='sysmsg'?'tabs-border-active':''" class="tabs-border-item">系统通知</div>	 
		</div>
		<div v-if="tab=='pm'">
			<page-pm></page-pm>
		</div>
		<div v-if="tab=='notice'">
			<page-notice></page-notice>
		</div>
		
		<div v-if="tab=='sysmsg'">
			 
			<page-sysmsg></page-sysmsg>
		</div>
		<mt-footer tab="notice"></mt-footer>
	</view>
</template>

<script>
	import pageNotice from "./page-notice.vue";
	import pagePm from "./page-pm.vue";
	import pageSysmsg from "./page-sysmsg.vue";
	import mtFooter from "../../components/footer.vue";
	export default{
		components:{
			pageNotice,
			pagePm,
			pageSysmsg,
			mtFooter
		},
		data:function(){
			return {
				pageLoad:false,
				 
				tab:"notice"
				
			}
		},
		onLoad:function(){
		  
		},
		methods:{
			setTab:function(t){
				this.tab=t;
				 
			}
			 
		}
	}
	
</script>

<style>
	
</style>
