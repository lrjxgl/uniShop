<template>
	<view class="body">
		<view v-if="pageLoad">
			<view class="header">
				<view class="header-back"></view>
				<view class="header-title">个人中心</view>
			</view>
			<view class="header-row"></view>
			<view class="main-body">
				<view class="uhead">

					<image @click="gourl('/pages/user/user_head')" class="uhead-img" :src="pageData.data.user_head+'.100x100.jpg'"></image>

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
					<navigator url="/pages/user/set" class="flex-center btn-small btn-link iconfont icon-settings"></navigator>
				</view>
				<view class="order-box">
					<view class="order-box-hd">
						我的订单
						<view class="flex-1"></view>
						<view @click="gourl('/pages/order/my')" class="fr cor2 flex">全部订单
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="order-box-status flex">
						<view @click="gourl('/pages/order/my?status=1')" class="order-box-item">
							<text class="iconfont icon-moneybag"></text> 待付款</view>
						<view @click="gourl('/pages/order/my?status=2')" class="order-box-item">
							<text class="iconfont icon-deliver"></text> 待收货</view>
						<view @click="gourl('/pages/order/my?status=3')" class="order-box-item">
							<text class="iconfont icon-comment"></text> 待评价</view>
					</view>
				</view>

				<view class="row-box mgb-5">

					<navigator url="/pages/notice/my" class="row-item">
						<view class="row-item-icon icon-text"></view>
						<view class="flex-1">我的消息</view>
					</navigator>
					<navigator url="/pages/coupon/my" class="row-item">
						<view class="row-item-icon icon-text"></view>
						<view class="flex-1">我的优惠券</view>
					</navigator>

					<navigator url="/pages/forum/my" class="row-item">
						<view class="row-item-icon icon-text"></view>
						<view class="flex-1">我的帖子</view>
					</navigator>
					<navigator url="/pages/comment/my" class="row-item">
						<view class="row-item-icon icon-comment"></view>
						<view class="flex-1">我的评论</view>
					</navigator>
				</view>
				<view class="row-box mgb-5">
					<navigator url="/pages/fav/my" class="row-item">
						<view class="row-item-icon icon-favor"></view>
						<view class="flex-1">我的收藏</view>
					</navigator>
					<navigator url="/pages/user_address/my" class="row-item">
						<view class="row-item-icon icon-text"></view>
						<view class="flex-1">收货地址</view>
					</navigator>	
					<navigator url="/pages/pay_log/my" class="row-item">
						<view class="row-item-icon icon-text"></view>
						<view class="flex-1">消费记录</view>
					</navigator>
					<navigator url="/pages/recharge/my" class="row-item">
						<view class="row-item-icon icon-text"></view>
						<view class="flex-1">充值记录</view>
					</navigator>
				</view>

				 

			</view>
			 
		</view>

	</view>
</template>

<script>
	import app from "../../common/common.js";
	import mtFooter from "../../components/footer.vue";
	export default {
		components: {
			mtFooter
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
					url: app.apiHost + "?m=user&ajax=1",
					data: {
						authcode: app.getAuthCode()
					},
					success: function (res) {
						if (res.data.error == 1000) {
							uni.navigateTo({
								url: "/pages/login/index",
							})
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
		padding: 22px;
		background-color: #fff;
		margin-bottom: 11px;
	}

	.uhead-img {
		width: 172px;
		height: 172px;
		margin-right: 22px;
		display: block;
		border-radius: 50%;
	}

	.uhead-box {
		flex: 1;
	}

	.uhead-nick {
		margin-bottom: 10px;
		font-size: 34px;
	}

	.uhead-rnum {
		color: #999;
		margin-bottom: 32px;
		line-height: 29px;
		display: flex;
		font-size: 29px;
	}

	.order-box {
		background-color: #fff;
		padding: 22px;
		margin-bottom: 22px;
	}

	.order-box-hd {
		display: flex;
		flex-direction: row;
		line-height: 79px;
		border-bottom: 2px solid #ddd;
		margin-bottom: 22px;
	}

	.order-box-status {
		display: flex;
		flex-direction: row;
	}

	.order-box-item {
		flex: 1;
		text-align: center;
		font-size: 32px;
		color: #666;
	}

	.order-box-item .iconfont {
		display: block;
		color: #666;
		font-size: 42px;
	}

	.row-item {
		display: flex;
		flex-direction: row;
		padding: 10px 16px;
		margin-bottom: 10px;
		font-size: 35px;
		color: #555;
		border-bottom: 2px solid #eee;
	}

	.row-icon {
		position: relative;
		top: -5px;
		font-size: 40px;
		margin-right: 10px;
		color: #555;
	}
</style>
