<template>
	<view>
		<view v-if="pageLoad">
			<form @submit="formSubmit">
		 
			  
			  <view class="input-flex">
				<view class="input-flex-label">姓名</view>
				<input type="text" name="truename" class="input-flex-text" id="truename"  >
			  </view>
			  <view class="input-flex">
				<view class="input-flex-label">电话</view>
				<input type="text" name="telephone" class="input-flex-text"  >
			  </view>	
				<view class="input-flex">
					<view class="input-flex-label">省市</view>
					
					<picker-region></picker-region>
				
				</view>
			  <view class="input-flex">
				<view class="input-flex-label">详细地址</view>
				 <input type="text" class="input-flex-text" name="address" id="address" >
			  </view>
			  
			  <button form-type="submit" class="btn-row-submit">保存</button>
				
			</form>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	import pickerRegion from "../../components/pickerregion.vue";
	var id;
	export default{
		components:{
			pickerRegion
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad:function(option){
			 
			this.getPage();
		},
		 
		methods:{
		 
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=user_address&ajax=1&a=add",
					data:{
						authcode: app.getAuthCode(),
						fromapp:app.fromapp()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			},
			 		formSubmit: function (e) {
			 							
			 			uni.request({
			 				url: app.apiHost + "?m=user_address&a=save&ajax=1&fromapp=" + app.fromapp() + "&authcode=" + app.getAuthCode(),
			 				method: "POST",
			 				header: {
			 					"content-type": "application/x-www-form-urlencoded"
			 				},
			 				data: e.detail.value,
			 				success: function (res) {
			 					var data = res.data;
			 					if (res.data.error) {
			 						uni.showToast({
			 							"title": res.data.message
			 						})
			 					} else {
			 
			 						uni.navigateBack()
			 					}
			 
			 				}
			 			})
			 		}
		},
	}
</script>

<style>
</style>
