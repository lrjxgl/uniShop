<template>
	<view>
		<view v-if="pageLoad">
			<form  @submit="formSubmit">
			<view class="input-flex">
				<view class="input-flex-label">手机</view>
				<input class="input-flex-text" name="telephone" v-model="telephone" type="text"   placeholder="请填手机号码">
			</view>	
			
			<view class="row-sendSms">
				<view class="row-sendSms-label">验证码</view>
				<input type="text" class="row-sendSms-text" name="yzm" v-model="yzm" :value="yzm" >
				<view class="row-sendSms-send" @click="getYzm()">获取验证码</view>
			</view>
			
			<view class="input-flex">
				<view class="input-flex-label">昵称</view>
				 <input class="input-flex-text" name="nickname" type="text" placeholder="请填写用昵称（2-15位）">
			</view>
			
			<view class="input-flex">
				<view class="input-flex-label">密码</view>
				<input class="input-flex-text" name="password" type="text" password=true  placeholder="请填写密码（至少6位）">
			</view>
			
			<view class="input-flex">
				<view class="input-flex-label">重复密码</view>
				<input class="input-flex-text" name="password2" type="text" password=true  placeholder="重复密码">
			</view>
			
			<button type="primary" form-type="submit" class="btn-row-submit btn-success">立即注册</button>
		   
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
			pageData:{},
			yzm:"",
			telephone:""
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getYzm:function(){
					uni.request({
						url:app.apiHost+"?m=register&a=SendSms&ajax=1",
						data:{
							telephone:this.telephone,
							fromapp:app.fromapp()
						},
						success:function(res){
							uni.showToast({
								title:res.data.message,
							})
						}
					})
			},
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=register&a=ajax&fromapp="+app.fromapp(),
					data:{
						authcode: app.getAuthCode()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			},
			formSubmit:function(e){
				console.log(JSON.stringify(e.detail.value));
				uni.request({
					url:app.apiHost+"?m=register&a=regsave&ajax=1",
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
							app.setAuthCode(data.data.authcode);
							app.goHome();
						}
						
					}
				})
				
			}
		},
	}
</script>

<style>
</style>
