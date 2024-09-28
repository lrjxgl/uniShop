<template>
	<view class="loginBg">
		<view class="h30"></view>
		<view class="flex-center ">
			<view @click="goHome()" class="flex-center">
				<image :src="host+'/static/images/logo.png?v2'" class="wh-60"></image>
			</view>
		</view>
		<form v-if="!wxUserModal" class="loginBox" autocomplete="off" id="login-form" @submit="formSubmit">
			<view class="flexIcon">
				<view class="flexIcon-icon iconfont icon-phone_light"></view>
				<input type="text" placeholder-class="cl-white" class="flexIcon-text" name="telephone"
					autocomplete="off" v-model="telephone" placeholder="请输入手机号码" />
			</view>
			<view class="flexIcon">
				<view class="flexIcon-icon iconfont icon-password"></view>
				<input type="password" placeholder-class="cl-white" class="flexIcon-text" name="password"
					autocomplete="off" v-model="password" placeholder="请输入登录密码" />
			</view>
			<view></view>
			<button formType="submit" class="btn-row-submit bg-dark">登陆</button>
			<view class="flex mgb-20">
				<navigator class="cl1 pointer flex-1" url="../register/index">注册</navigator>
				<navigator class="cl1 pointer" url="../login/findpwd">忘记密码</navigator>
			</view>

			<!-- #ifdef MP-WEIXIN -->
			<view class="otherBox mgb-20">
				<view class="otherBox-line"></view>
				<view class="otherBox-text">其它方式登录</view>
			</view>
			<view class="flex flex-center">
				<div class="cl1 f16" @tap="checkReg()">手机号快捷登录</div>
				<!--<button @tap="checkReg()" class="btn-round bg-success icon-weixin"></button>-->
			</view>
			<!-- #endif -->

			<!-- #ifdef H5 -->
			<view class="otherBox mgb-20" v-if="isWeixin">
				<view class="otherBox-line"></view>
				<view class="otherBox-text">其它方式登录</view>
			</view>
			<view class="flex flex-center" v-if="isWeixin">

				<view @click="goWeixin()" class="btn-round bg-weixin icon-weixin"></view>
			</view>
			<!-- #endif -->


		</form>

		<form @submit="wxLogin" v-if="wxUserModal">

			<div class="loginBox">

				<div>
					<view class="flexIcon">
						<view class="flexIcon-icon iconfont icon-phone_light"></view>

						<input v-model="telephone" name="telephone" type="text" placeholder-class="cl-white"
							class="flexIcon-text" disabled="" placeholder="请输入电话" />
						<button class="input-flex-btn" type="primary" open-type="getPhoneNumber"
							@getphonenumber="getPhoneNumber">获取手机</button>
					</view>
					<div class="flexIcon">
						<view class="flexIcon-icon iconfont icon-my_light"></view>
						<input v-model="nickname" name="nickname" type="nickname" placeholder-class="cl-white"
							class="flexIcon-text" placeholder="请输入昵称" />

					</div>
					<div class="flex flex-ai-center mgb-10">
						<checkbox-group @change="setXyCheck">
							<checkbox value="1"></checkbox>
							<span>我已阅读并同意</span> 
						</checkbox-group> 
						<div @click="viewXy()" class="cl-primary">《注册协议及隐私条款》</div>
		 			</div>

					<button form-type="submit"   class="btn-row-submit bg-dark">确认登陆</button>
					<view class="flex mgb-20">
						<div class="flex-1"></div>
						<div class="cl-white pointer" @click="wxUserModal=false">账户密码登陆</div>
					</view>
				</div>
			</div>

		</form>
		<div v-if="regNoteModal">
			<div @click="regNoteModal=false" class="modal-mask"></div>
			<div class="modal">
				<div class="modal-header">
					<div class="modal-title">注册协议及隐私条款</div>
					<div @click="regNoteModal=false" class="modal-close icon-close"></div>
				</div>
				<div class="modal-body">
					<div class="d-content" v-html="regnote"></div>
				</div>
			</div>
		</div>
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
				nickname: "",
				user_head: "",
				telephone: "",
				gender: 0,
				password: "",
				host: "",
				wxUserModal: false,
				xyCheck: "0",
				regnote: "",
				regNoteModal: false
			}
		},
		onLoad: function() {
			this.host = this.app.apiHost;
			this.isWeixin = this.app.isWeixin();
		},
		methods: {
			setXyCheck(e) {
				this.xyCheck = e.detail.value;
			},
			viewXy() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/html/index?word=regnote",
					success: function(res) {
						that.regnote = res.data.data.content;
						that.regNoteModal = true;
					}
				})
			},
			goWeixin: function() {
				var backurl = "/pages/index/index";
				this.app.goH5WeiXin(backurl);

			},
			goHome: function() {
				var that = this;
				that.app.goHome();
			},
			onChooseAvatar(e) {
				var that = this;

				this.user_head = e.detail.avatarUrl;
			},
			getPhoneNumber(e) {

				var code = e.detail.code;
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/open_wxapp/getphone",
					data: {
						code: code
					},
					success: function(res) {
						that.telephone = res.data.phone_info.phoneNumber;
					}
				})

			},
			checkReg() {
				var that = this;
				console.log("发起登陆请求");
				uni.login({
					success: function(e) {
						console.log("成功获取Code");
						that.app.get({
							url: that.app.apiHost + "/index/open_wxapp/checkreg",
							data: {
								code: e.code
							},
							success: function(res) {
								console.log("检测登陆成功");
								if (res.isReg) {
									that.loginReged();
									//that.wxUserModal=true; 
								} else {
									that.wxUserModal = true;
								}
							}
						})
					}
				})
			},
			loginReged() {
				var that = this;
				console.log("正式登陆..");
				uni.login({
					success: (e) => {
						that.app.post({
							url: that.app.apiHost + "/index/open_wxapp/login",
							data: {
								code: e.code
							},
							success: function(res) {
								console.log("登陆成功", res);
								if (res.error) {
									uni.showToast({
										title: res.message,
										icon: "none"
									});
									return false;
								}
								if (res.data.action == 'login') {
									uni.showToast({
										title: "登录成功",
										icon: "none"
									})
									console.log(res.data)
									uni.setStorageSync("token", res.data.token);
									uni.setStorageSync("refresh_token", res.data.refresh_token);
									that.app.setOpenid(res.data.openid);

									that.loginBack()
								} else if (res.data.action == 'openlogin') {
									uni.navigateTo({
										url: "../openlogin/index?openToken=" + res.data.openToken
									})
								}


							}
						})
					}
				})
			},
			wxLogin(e) {
				var that = this;
				that.nickname = e.detail.value.nickname;
				that.telephone = e.detail.value.telephone;
				if (that.nickname == '') {
					that.nickname = '微信用户'
				}
				if (that.xyCheck != "1") {
					uni.showToast({
						title: "请阅读并同意注册协议及隐私条款",
						icon: "none"
					})
					return false;
				}
				uni.login({
					success: (res) => {
						var logincode = res.code;
						that.app.post({
							url: that.app.apiHost + "/index/open_wxapp/login",
							data: {
								code: logincode,
								nickname: that.nickname,
								user_head: that.user_head,
								telephone: that.telephone,
								gender: that.gender
							},
							success: function(res) {
								if (res.data.action == 'login') {
									uni.showToast({
										title: "登录成功",
										icon: "none"
									})
									console.log(res.data)
									uni.setStorageSync("token", res.data.token);
									uni.setStorageSync("refresh_token", res.data.refresh_token);
									that.app.setOpenid(res.data.openid);

									that.loginBack()
								} else if (res.data.action == 'openlogin') {
									uni.navigateTo({
										url: "../openlogin/index?openToken=" + res.data
											.openToken
									})
								}


							},
							fail: function(e) {
								console.log(e);
							}
						})
					},
				});
			},
			wxLogin2: function(e) {
				console.log(e)
				var that = this;
				let logincode = '';
				if (e.detail.value.nickname == '') {
					uni.showToast({
						title: "请填写昵称",
						icon: "none"
					})
					return false;
				}
				that.nickname = e.detail.value.nickname;
				that.telephone = e.detail.value.telephone;
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '用户登录',
					fail: function(e) {
						console.log(e)
					},
					success: function(res) {
						var user = res.userInfo;
						console.log(user);
						uni.login({
							success: (res) => {
								logincode = res.code;
								that.app.post({
									url: that.app.apiHost +"/index/open_wxapp/login",
									data: {
										code: logincode,
										nickname: that.nickname,
										user_head: user.avatarUrl,
										telephone: that.telephone,
										gender: user.gender
									},
									success: function(res) {
										if (res.data.action == 'login') {
											uni.showToast({
												title: "登录成功",
												icon: "none"
											})
											console.log(res.data)
											uni.setStorageSync("token", res.data
												.token);
											uni.setStorageSync("refresh_token", res
												.data.refresh_token);
											that.app.setOpenid(res.data.openid);
											that.loginBack()
										} else if (res.data.action ==
											'openlogin') {
											uni.navigateTo({
												url: "../openlogin/index?openToken=" +
													res.data.openToken
											})
										}


									},
									fail: function(e) {
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
					url: that.app.apiHost + "/index/login/loginsave",
					data: {
						telephone: that.telephone,
						password: that.password
					},
					success: function(res) {
						var data = res.data;
						if (res.error) {
							uni.showToast({
								title: res.message,
								icon: "none"
							})
						} else {
							uni.setStorageSync("token", res.data.token);
							uni.setStorageSync("refresh_token", res.data.refresh_token);
							uni.showToast({
								"title": res.message
							});
							setTimeout(function() {

								that.loginBack()
							}, 600)



						}

					}
				})

			},
			loginBack() {
				var pages = getCurrentPages();
				if (pages.length == 1) {
					uni.reLaunch({
						url: "../index/index"
					})
					return false;
				}
				var path = pages[pages.length - 2].route;
				if (path == 'pages/login/index' || path == 'pages/register/index') {
					uni.reLaunch({
						url: "../index/index"
					})
				} else {
					uni.navigateBack()
				}
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
		background-color: #007b47;
		top: 39.6upx;
		position: absolute;
	}

	.otherBox-text {
		background-color: #007b47;
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
		background-color: #333;
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
		font-size: 30upx;
	}

	.loginBox {
		position: absolute;
		top: 50%;
		left: 22upx;
		right: 22upx;
		margin-top: -330upx;
		padding: 40px 20px 20px 20px;
		background-color: #fff;
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

	.bg-weixin {
		background-color: #007b47;
	}
</style>