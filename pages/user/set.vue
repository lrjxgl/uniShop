<template>
	<view>
		<view v-if="pageLoad">
			<view class="row-box">
				 
				<view class="row-item"  @click="gourl('../user/info')">
					<view class="row-item-icon icon-people"></view>
					<view class="flex-1"> {{pageData.data.nickname}}</view>
					 
				</view>
				
				<view class="row-item" @click="gourl('../user/password')" >
					<view class="row-item-icon icon-password"></view>
					<view class="flex-1">登录密码</view>
				</view>
				<view class="row-item" @click="gourl('../user/paypwd')" >
					<view class="row-item-icon icon-password"></view>
					<view class="flex-1">支付密码</view>
				</view> 
			</view>
			 
			 <view class="btn-row-submit bg-danger" @click="loginOut()">注销</view>
		</view>
	</view>
</template>

<script>
	 
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageData:{}
			}
		},
		onLoad:function(option){
		 
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?m=user&a=set&ajax=1",
					data:{
						authcode: that.app.getAuthCode(),
						fromapp:that.app.fromapp()
					},
					success:function(data){
						if(data.data.error){
							that.app.goHome();
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
				var that=this; 
				uni.request({
					url:that.app.apiHost+"?m=login&a=logout&ajax=1",
					data:{
						"authcode":that.app.getAuthCode(),
						"fromapp":that.app.fromapp()
					},
					success:function(res){
						that.app.setAuthCode("");
						that.app.setAuthCodeLong("");
						that.app.goHome();	
					}
				})
			} 
		},
	}
</script>

<style>
</style>
