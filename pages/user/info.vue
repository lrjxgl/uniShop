<template>
	<view>
		<view v-if="pageLoad">
			<form @submit="submit()">
				<view class="input-flex">
					<view class="input-flex-label">昵称</view>
					<input class="input-flex-text" name="nickname"  :value="pageData.data.nickname" >
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
					url:app.apiHost+"?m=user&a=info&ajax=1",
					data:{
						authcode: app.getAuthCode(),
						fromapp:app.fromapp()
					},
					success:function(res){
						if(res.data.error){
							app.goHome();
						}else{
							that.pageLoad=true;
							that.pageData=res.data.data;
						}
						
						 
					}
				})
			},
			submit:function(e){
				uni.request({
					url:app.apiHost+"?m=user&a=save&ajax=1&fromapp="+app.fromapp()+"&authcode="+app.getAuthCode(),
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
		},
	}
</script>

<style>
</style>
