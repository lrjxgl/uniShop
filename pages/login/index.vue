<template>
	<view class="loginBg">
		<div class="h30"></div>
		<div class="flex-center ">
			<div @click="goHome()" class="flex-center">
				<image src="../../static/logo.png" class="wh-60"></image>
			</div>
		</div>
		<form class="loginBox"  id="login-form" @submit="formSubmit" >
			<view class="flexIcon">
      	<view class="flexIcon-icon iconfont icon-phone_light"></view>
        <input type="text" class="flexIcon-text" @click="tel()" @blur="tel()" v-model="notephone" name="telephone" :value="notephone" />
      </view>
      <view class="flexIcon"> 
      	<view class="flexIcon-icon iconfont icon-password"></view>
        <input type="password" class="flexIcon-text"  @click="pass()" @blur="pass()" v-model="notepwd" name="password" :value="notepwd" />
      </view>
			<div></div>
      <button type="primary" formType="submit"  class="btn-row-submit">登陆</button>
			<div class="flex mgb-20">
					<navigator class="cl-white pointer flex-1" url="/pages/register/index" >注册</navigator>
					<navigator class="cl-white pointer" url="/pages/login/findpwd" >忘记密码</navigator>
			</div>
			<div class="otherBox mgb-20">
				<div class="otherBox-line"></div>
				<div class="otherBox-text">其它方式登录</div>
			</div>
			<!-- #ifdef MP-WEIXIN -->
			<div class="flex flex-center">
				<button open-type="getUserInfo" @getuserinfo="wxLogin" class="btn-round bg-success icon-weixin"></button>
			</div>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<div class="flex flex-center">
				<div class="btn-round bg-success icon-weixin mgr-10"></div>
				<div class="btn-round bg-primary icon-qq"></div>
			</div>
			<!-- #endif -->
    </form>
	</view>
</template>

<script>
	var app= require("../../common/common.js");
	export default {
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				notephone:"请输入手机号码",
				notepwd:"请输入密码"
			}
		},
		methods:{
			goHome:function(){
				app.goHome();
			},
			tel:function(){
				if(this.notephone=='请输入手机号码'){
					this.notephone="";
				}else if(this.notephone==''){
					this.notephone='请输入手机号码'
				}
			},
			pass:function(){
				console.log(this.notepwd);
				if(this.notepwd=='请输入密码'){
					this.notepwd="";
				}else if(this.notepwd==''){
					this.notepwd='请输入密码'
				}
			},
			wxLogin: function(e) {
				var user=e.detail.userInfo;
				uni.login({
					provider: 'weixin',
					success: function (res) {
						var logincode =res.code;
						console.log(logincode);
						uni.request({
							url:app.apiHost+"/?m=open_wxapp&a=Login&ajax=1",
							data:{
								code:logincode,
								nickname:user.nickName,
								user_head:user.avatarUrl,
								gender:user.gender
							},
							success:function(res){
								uni.showToast({
									title:"登录成功"
								})
								app.setAuthCode(res.data.data.authcode);
								app.setAuthCodeLong(res.data.data.authcodeLong);
								app.setOpenid(res.data.data.openid);
								setTimeout(function(){
									uni.navigateBack();
								},300);
								
								 
							},
							fail:function(e){
								console.log(e);
							}
						})
						
					} 
				});
			
			},
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
							app.setAuthCodeLong(data.data.authcodeLong);
							uni.showToast({
								"title":res.data.message
							});
							setTimeout(function(){
								uni.navigateBack({
									delta:1,
								});
							},300)
						
							
						}
						 
					}
				})
				 
			}
		}
	}
</script>

<style>
	.otherBox {
	position: relative;
	height: 79.2upx;
}

.otherBox-line {
	width: 100%;
	height: 2.2upx;
	background-color: #d0d0d0;
	top: 39.6upx;
	position: absolute;
}

.otherBox-text {
	background-color: #50a8db;
	text-align: center;
	padding: 0upx 22upx;
	line-height: 79.2upx;
	position: absolute;
	width: 264upx;
	left: 50%;
	margin-left: -132upx;
	color: #fff;

}

.flexIcon {
	flex-direction: row;
	background-color: #2e85d8;
	margin-bottom: 44upx;
	border-radius: 44upx;
	padding: 22upx 22upx;
	align-items: center;
}

.flexIcon-icon {
	margin-right: 13.2upx;
	font-size: 39.6upx;
	color: #fff;
}

.flexIcon-text {
	color: #fff;
	border: 0;
	flex: 1;
	background:inherit;
	outline: 0;
	font-size: 35.2upx;
}
 
.loginBox {
	position: absolute;
	top: 50%;
	left: 22upx;
	right: 22upx;
	margin-top: -330upx;
	padding: 33upx 22upx;

	border-radius: 44upx;
}

.loginBg {
	background: linear-gradient( #29cee8,#619ad6);
	background-color: ;
	position: absolute;
	top: 0upx;
	bottom: 0upx;
	left: 0upx;
	right: 0upx;
}



</style>
