<template>
	<view>
		<view v-if="pageLoad">
		 <form @submit="submit()">
		 	<view class="input-flex">
		 		<view class="input-flex-label">旧密码</view>
		 		<input password="password" class="input-flex-text" name="oldpassword"   >
		 	</view>
			<view class="input-flex">
				<view class="input-flex-label">新密码</view>
				<input password="password" class="input-flex-text" name="password"   >
			</view>
			<view class="input-flex">
				<view class="input-flex-label">重复密码</view>
				<input password="password" class="input-flex-text" name="password2"   >
			</view>
		 	<button type="submit" class="btn-row-submit"></button>
		 </form>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var id;
	export default{
		data:{
			pageLoad:false, 
			pageData:{}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=user&a=password&ajax=1",
					data:{
						authcode: app.getAuthCode(),
						fromapp:app.fromapp()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			} 
		},
		submit:function(e){
			uni.request({
				url:app.apiHost+"?m=user&a=passwordsave&ajax=1&fromapp="+app.fromapp()+"&authcode="+app.getAuthCode(),
				method:"POST",
				header:{
					"content-type":"application/x-www-form-urlencoded"
				},
				data:e.detail.value,
				success:function(res){
					var data=res.data;
					if(res.data.error){
						uni.showToast({
							"title":res.data.message
						})
					}else{
						
						uni.navigateBack()
					}
					
				}
			})
		}
	}
</script>

<style>
</style>
