<template>
	<view class="loginBg">
		<view class="h30"></view>
		<view class="flex-center ">
			<view @click="goHome()" class="flex-center">
				<image :src="host+'/static/images/logo.png'" class="wh-60"></image>
			</view>
		</view>
		<form class="loginBox" autocomplete="off" id="login-form" @submit="formSubmit">
			<view class="flexIcon">
				<view class="flexIcon-icon iconfont icon-phone_light"></view>
				<input type="text" placeholder-class="cl-white" class="flexIcon-text" name="a" autocomplete="off"
					v-model="telephone" placeholder="请输入手机号码" />
			</view>
			<view class="flexIcon">
				<view class="flexIcon-icon iconfont icon-password"></view>
				<input type="password" placeholder-class="cl-white" class="flexIcon-text" name="b" autocomplete="off"
					v-model="password" placeholder="请输入登录密码" />
			</view>
			<view></view>
			<button type="primary" formType="submit" class="btn-row-submit">登陆</button>
			<view class="flex mgb-20">
				<navigator class="cl-white pointer flex-1" url="../register/index">注册</navigator>
				<navigator class="cl-white pointer" url="../login/findpwd">忘记密码</navigator>
			</view>

			<!-- #ifdef MP-WEIXIN -->
			<view class="otherBox mgb-20">
				<view class="otherBox-line"></view>
				<view class="otherBox-text">其它方式登录</view>
			</view>
			<view class="flex flex-center">
				<button @tap="wxLogin" class="btn-round bg-success icon-weixin"></button>
			</view>
			<!-- #endif -->

			<!-- #ifdef H5 -->
			<view class="otherBox mgb-20" v-if="isWeixin">
				<view class="otherBox-line"></view>
				<view class="otherBox-text">其它方式登录</view>
			</view>
			<view class="flex flex-center" v-if="isWeixin">
				<view @click="goWeixin()" class="btn-round bg-success icon-weixin"></view>
			</view>
			<!-- #endif -->
		</form>
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				pageLoad: false,
				pageData: {},
				notephone: "请输入手机号码",
				notepwd: "请输入密码",
				isWeixin: false,
				telephone: "",
				password: "",
				host: ""
			}
		},
		onLoad: function() {
			this.host = this.app.apiHost;
			this.isWeixin = this.app.isWeixin();
		},
		methods: {
			goWeixin: function() {
				var backurl = "/pages/index/index";
				this.app.goH5WeiXin(backurl);

			},
			goHome: function() {
				var that = this;
				that.app.goHome();
			},

			wxLogin: function(e) {
				var that = this;
				let logincode = '';

				wx.getUserProfile({
					lang: 'zh_CN',
					desc: '用户登录',
					fail: function(e) {
						console.log(e)
					},
					success: function(res) {
						var user = res.userInfo;
						console.log(user);
						wx.login({
							success: (res) => {
								logincode = res.code;
								that.app.get({
									url:that.app.apiHost+"/open_wxapp/Login?ajax=1",
									data:{
										code:logincode,
										nickname:user.nickName,
										user_head:user.avatarUrl,
										gender:user.gender
									},
									success:function(res){
										if(res.data.action=='login'){
											uni.showToast({
												title:"登录成功"
											})
											uni.setStorageSync("token",res.data.token);
											uni.setStorageSync("refresh_token",res.data.refresh_token);
											that.app.setOpenid(res.data.openid);
											
											uni.reLaunch({
												url:"../index/index"
											})
										}else if(res.data.action=='openlogin'){
											 uni.navigateTo({
											 	url:"../openlogin/index?openToken="+res.data.openToken
											 })
										}	
										
										 
									},
									fail:function(e){
										console.log(e);
									}
								})
							},
						});


					}
				});

			},
			formSubmit: function(e) {
				var that = this;
				that.app.post({
					url: that.app.apiHost + "/login/loginsave?ajax=1",
					data: {
						telephone: that.telephone,
						password: that.password
					},
					success: function(res) {
						var data = res.data;
						if (res.error) {
							uni.showToast({
								"title": res.message
							})
						} else {
							uni.setStorageSync("token",res.data.token);
							uni.setStorageSync("refresh_token",res.data.refresh_token);
							uni.showToast({
								"title": res.data.message
							});
							uni.reLaunch({
								url:"../index/index"
							})


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
		background: inherit;
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
		background: linear-gradient(#29cee8, #619ad6);
		background-color: ;
		position: absolute;
		top: 0upx;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
	}
</style>
