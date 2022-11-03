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
				that.app.get({
					url:that.app.apiHost+"/user/set?ajax=1",
					
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
						 
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
				that.app.get({
					url:that.app.apiHost+"/login/logout?ajax=1",
					success:function(res){
						uni.removeStorageSync("token");
						uni.showToast({
							title:"退出登录中..."
						})
						setTimeout(function(){
							that.app.goHome();	
						},1000)
						
					}
				})
			} 
		},
	}
</script>

<style>
</style>
