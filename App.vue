<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			/*
			// 锁定屏幕方向
			setTimeout(function(){
				plus.screen.lockOrientation('portrait-primary'); //锁定
				console.log(plus.runtime.version);
				// 检测升级
				uni.request({
					url: 'https://www.fd175.com/index.php?m=app&a=checkupdate', //检查更新的服务器地址
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version,
						imei: plus.device.imei
					},
					success: (res) => {
						console.log('success', res);
						if (res.statusCode == 200 && res.data.isUpdate) {
							let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
							// 提醒用户更新
							uni.showModal({
								title: '更新提示',
								content: res.data.note ? res.data.note : '是否选择更新',
								success: (showResult) => {
									if (showResult.confirm) {
										plus.runtime.openURL(openUrl);
									}
								}
							})
						}
					}
				})
				//推送
				uni.getProvider({
				service: 'push',
				success: function (res) {
					uni.onPush({
						provider: 'igexin',
						success: function () {
							console.log('监听透传成功');
						},
						callback: function (data) {
							uni.showToast({
								title: "接收到透传数据：" + JSON.stringify(data)
							});
							 
						}
					});
				}
			});
			},300)
			*/
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		watch: {
			'$route'(to, from) {

				const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length


			}
		}
	}
</script>

<style>
	@import "./common/iconfont.css";
	@import "./common/dt-ui-uni.css";
	.fixToHome {
		position: fixed;
		top: 10px;
		left: 10px;
		background-color: #efefef;
		border-radius: 5px;
		cursor: pointer;
		padding: 5px 10px;
		color: #333;
		font-size: 14px;
		z-index: 999;
	}
	.uni-app--maxwidth {
		max-width: 640px;
		margin: 0 auto;
	}

	/*修复uniapp flex*/
	.uni-page-head {
		display: flex;
		flex-direction: row;
	}

	.uni-tabbar,
	.uni-picker-view-wrapper {
		flex-direction: row !important;
	}

	.uni-swiper-dots {
		flex-direction: row;
	}

	.uni-scroll-view>div {
		flex-direction: row;
	}

	.uni-modal__ft {
		flex-direction: row;
	}

	.input-flex-btn {
		z-index: 2;
	}

	.header,
	.header-row {
		display: none;
	}

	.m-navPic-item {
		width: 20%;
		padding: 0px;
	}

	.fixedAdd {
		position: fixed;
		bottom: 200upx;
		right: 7upx;
		width: 92upx;
		height: 92upx;
		text-align: center;
		box-sizing: border-box;
		background-color: rgba(240, 85, 75, .82);
		color: #fff;
		font-family: iconfont;
		font-size: 32upx;
		padding-top: 11upx;
		border-radius: 22upx;

	}

	.fixedAdd:before {
		content: "\e7e8";
		display: block;
		font-size: 32upx;
	}

	.back-top {
		position: fixed;
		right: 10px;
		bottom: 100px;
		background-color: #009688;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-top-icon {
		font-family: iconfont;
		line-height: 1;
	}

	.back-top-icon:after {
		content: "\e603";
		font-size: 12px;
		color: #fff;
	}

	.back-top-text {
		font-size: 12px;
		line-height: 1;
		font-weight: 300;
		color: #fff;
	}
</style>
