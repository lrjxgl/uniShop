<template>
	<view class="body">
		<view v-if="pageLoad">
			 
			<view class="main-body">
				<view class="uhead">

					<image @click="gourl('../../pages/user/user_head')" class="uhead-img" :src="pageData.data.user_head+'.100x100.jpg'"></image>

					<view class="uhead-box">
						<view class="uhead-nick">{{pageData.data.nickname}}</view>
						<view class="uhead-rnum flex">
							余额 ￥
							<text class="f14 cl-money mgl-5">{{pageData.data.money}} </text>


						</view>
						<view class="uhead-rnum flex">

							金币
							<text class="cl-money mgl-5 mgr-5">{{pageData.data.gold}}</text>

							积分
							<text class="cl-money mgl-5">{{pageData.data.grade}}</text>

						</view>

					</view>
					<navigator url="../../pages/user/set" class="flex-center btn-small btn-link iconfont icon-settings"></navigator>
				</view>
				<view class="order-box">
					<view class="order-box-hd">
						我的订单
						<view class="flex-1"></view>
						<view @click="gourl('../b2c_order/my')" class="fr cor2 flex flex-center">全部订单
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="order-box-status flex">
						<view @click="gourl('../b2c_order/my?type=unpay')" class="order-box-item">
							<text class="iconfont icon-moneybag"></text> 待付款</view>
						<view @click="gourl('../b2c_order/my?type=unreceive')" class="order-box-item">
							<text class="iconfont icon-deliver"></text> 待收货</view>
						<view @click="gourl('../b2c_order/my?type=unraty')" class="order-box-item">
							<text class="iconfont icon-comment"></text> 待评价</view>
					</view>
				</view>
				 
				<div class="m-navPic mgb-10">
					<navigator url="../../pages/notice/my" class="m-navPic-item">
						<view class="m-navPic-icon icon-notice"></view>
						<view class="m-navPic-title">我的消息</view>
					</navigator>
					<navigator url="../../pages/pay_log/my" class="m-navPic-item">
						<view class="m-navPic-icon icon-moneybag"></view>
						<view class="m-navPic-title">消费记录</view>
					</navigator>
					<navigator url="../../pages/recharge/my" class="m-navPic-item">
						<view class="m-navPic-icon icon-moneybag"></view>
						<view class="m-navPic-title">充值记录</view>
					</navigator>
					<navigator url="../../pages/fav/my" class="m-navPic-item">
						<view class="m-navPic-icon icon-favor"></view>
						<view class="m-navPic-title">我的收藏</view>
					</navigator>
					<navigator url="../../pages/comment/my" class="m-navPic-item">
						<view class="m-navPic-icon icon-comment"></view>
						<view class="m-navPic-title">我的评论</view>
					</navigator>
					<navigator url="../../pages/user_address/my" class="m-navPic-item">
						<view class="m-navPic-icon icon-addressbook"></view>
						<view class="m-navPic-title">收货地址</view>
					</navigator>
				</div>


			</view>
			 
		</view>
		<view v-else class="bg-fff pd-10">
				<div class="flex flex-center mgb-10 cl2">您还未登录,请先登录</div>
				<div class="flex flex-center">
					<navigator  class="btn-small" url="../../pages/login/index">前往登录</navigator>
				</div>
			
		</view>
		<b2c-footer tab="user"></b2c-footer>
	</view>
</template>

<script>
	 
	import b2cFooter from "../../components/b2cfooter.vue";
	export default {
		components: {
			b2cFooter
		},
		data: function(){
			return {
				pageLoad: false,
				pageHide: false,
				pageData: {}
			}
		},
		onLoad: function (option) {
			uni.setNavigationBarTitle({
				title: "个人中心",
			})
			this.getPage();
		},
		onShow: function () {
			if (this.pageHide) {
				this.pageHide = false;
				this.getPage();
			}
		},
		onHide: function () {
			this.pageHide = true;
		},
		methods: {
			gourl: function (url) {
				uni.navigateTo({
					url: url,
				})
			},
			getPage: function () {
				var that = this;
				uni.request({
					url: that.app.apiHost + "/module.php?m=b2c_user&ajax=1",
					data: {
						authcode: that.app.getAuthCode()
					},
					success: function (res) {
						if (res.data.error == 1000) {
							/*
							uni.navigateTo({
								url: "../login/index",
							})
							*/
						} else {
							that.pageLoad = true;
							that.pageData = res.data.data;
						}


					}
				})
			}
		},
	}
</script>

<style>
	.body {
		background-color: #e3e3e3;
	}

	.uhead {
		display: flex;
		flex-direction: row;
		padding: 22upx;
		background-color: #fff;
		margin-bottom: 11upx;
	}

	.uhead-img {
		width: 172upx;
		height: 172upx;
		margin-right: 22upx;
		display: block;
		border-radius: 50%;
	}

	.uhead-box {
		flex: 1;
	}

	.uhead-nick {
		margin-bottom: 10upx;
		font-size: 34upx;
	}

	.uhead-rnum {
		color: #999;
		margin-bottom: 32upx;
		line-height: 29upx;
		display: flex;
		font-size: 29upx;
	}

	.order-box {
		background-color: #fff;
		padding: 22upx;
		margin-bottom: 22upx;
	}

	.order-box-hd {
		display: flex;
		flex-direction: row;
		line-height: 79upx;
		border-bottom: 2upx solid #ddd;
		margin-bottom: 22upx;
	}

	.order-box-status {
		display: flex;
		flex-direction: row;
	}

	.order-box-item {
		flex: 1;
		text-align: center;
		font-size: 32upx;
		color: #666;
	}

	.order-box-item .iconfont {
		display: block;
		color: #666;
		font-size: 42upx;
	}

	.row-item {
		display: flex;
		flex-direction: row;
		padding: 10upx 16upx;
		margin-bottom: 10upx;
		font-size: 35upx;
		color: #555;
		border-bottom: 2upx solid #eee;
	}

	.row-icon {
		position: relative;
		top: -5upx;
		font-size: 40upx;
		margin-right: 10upx;
		color: #555;
	}
</style>
