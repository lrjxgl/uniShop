<template>
	<view>
		<view v-if="pageLoad">
			<view>开发中</view>
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
				pageData:{},
				order_id:0
			}
		},
		onLoad:function(option){
			this.order_id=option.order_id;
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
					url:app.apiHost+"?m=recharge&a=order&order_id="+this.order_id,
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
