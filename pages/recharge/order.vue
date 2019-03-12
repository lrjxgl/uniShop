<template>
	<view>
		<view v-if="pageLoad">
		<view class="d-title">{{pageData.data.title}}</view>
		 
		<view class="d-content">
		<rich-text type="text" :nodes="pageData.data.content"></rich-text>
		</view>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var id;
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		onReady:function(){
			uni.setNavigationBarTitle({
				title:"订单支付",
			})
		} ,
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=article",
					data:{
						authcode: app.getAuthCode()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			} 
		},
	}
</script>

<style>
</style>
