<template>
	<view>
		<form  id="login-form" @submit="formSubmit" >
    <view class="input-flex">
      	<view class="input-flex-label">手机</view>
        <input type="text" class="input-flex-text" name="telephone" placeholder="请输入手机号码">
      </view>
      <view class="input-flex"> 
      	<view class="input-flex-label">密码</view>
        <input type="password" class="input-flex-text" name="password" placeholder="请输入密码">
      </view>
      <button type="primary" formType="submit"  class="btn-row-submit">登陆</button>
       
      
     <navigator class="btn-link m20" url="/pages/register/index" >还不是会员？立即注册</navigator>
    </form>
	</view>
</template>

<script>
	var app= require("../../common/common.js");
	export default {
		data:{
			
		},
		methods:{
		
			formSubmit:function(e){
				console.log(JSON.stringify(e.detail.value));
				uni.request({
					url:app.apiHost+"?m=login&a=loginsave&ajax=1",
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
							uni.navigateBack({
								delta:1,
							});
							
						}
						 
					}
				})
				 
			}
		}
	}
</script>

<style>
	.m20{
		margin: 0px 30px;
	}
</style>
