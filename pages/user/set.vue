<template>
	<view>
		<view v-if="pageLoad">
			<view class="row-box">
				 
				<view class="row-item-text"  @click="gourl('/pages/user/info')">
					<view class="flex-1"> {{pageData.data.nickname}}</view>
					 
				</view>
				
				<view class="row-item-text" @click="gourl('/pages/user/password')" >
					<view class="flex-1">修改密码</view>
				</view>
				 
			</view>
			 
			 <view class="btn-row-submit bg-danger" @click="loginOut()">注销</view>
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
				pageData:{}
			}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=user&a=set&ajax=1",
					data:{
						authcode: app.getAuthCode(),
						fromapp:app.fromapp()
					},
					success:function(data){
						if(data.data.error){
							app.goHome();
						}else{
							that.pageLoad=true;
							that.pageData=data.data.data;
						}
						
						 
					}
				})
			},
			gourl:function(url){
				uni.navigateTo({
					url:url,
				})
			},
			loginOut:function(){
				 
				uni.request({
					url:app.apiHost+"?m=login&a=logout&ajax=1",
					data:{
						"authcode":app.getAuthCode(),
						"fromapp":app.fromapp()
					},
					success:function(res){
						app.setAuthCode("");
						app.goHome();	
					}
				})
			}
		},
	}
</script>

<style>
</style>
