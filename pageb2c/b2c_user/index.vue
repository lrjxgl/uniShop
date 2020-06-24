<template>
	<view class="main-body">
		<view v-if="unLogin" >
			<view class="row-box mgb-10">
				<div class="emptyData">您还未登录</div>
				<div class="flex mgb-10  flex-center">
					<div @click="gourl('../../pages/login/index')" class="btn">去登录</div>
				</div>
			</view>
			<b2c-reclist></b2c-reclist>
		</view>
		<view v-else>
			<view class="uhead">
			
				<image @click="gourl('../../pages/user/user_head')" class="uhead-img" :src="pageData.data.user_head+'.100x100.jpg'"></image>
			
				<view class="uhead-box">
					<view class="uhead-nick">{{pageData.data.nickname}}</view>
					<view class="uhead-rnum flex-ai-center flex">
						余额 ￥
						<text class="f14 cl-money mgl-5">{{pageData.data.money}} </text>
			
			
					</view>
					<view class="uhead-rnum flex-ai-center flex">
			
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
						<text class="iconfont icon-moneybag cl-u"></text> 待付款</view>
					<view @click="gourl('../b2c_order/my?type=unpin')" class="order-box-item">
						<text class="iconfont icon-group cl-u"></text> 待成团</view>	
					<view @click="gourl('../b2c_order/my?type=unreceive')" class="order-box-item">
						<text class="iconfont icon-deliver cl-u"></text> 待收货</view>
					<view @click="gourl('../b2c_order/my?type=unraty')" class="order-box-item">
						<text class="iconfont icon-comment cl-u"></text> 待评价</view>
				</view>
			</view>
			 
			<view class="row-box mgb-5">
				<view @click="gourl('../../pages/notice/my')" class="row-item">
					<view class="row-item-icon icon-notice  cl-u"></view>
					<view class="row-item-title">我的消息</view>
				</view>
			
				<view @click="gourl('../../pages/recharge/my')" class="row-item">
					<view class="row-item-icon icon-moneybag  cl-u"></view>
					<view class="row-item-title">充值记录</view>
				</view>
				<view @click="gourl('../../pages/pay_log/my')" class="row-item">
					<view class="row-item-icon icon-pay  cl-u"></view>
					<view class="row-item-title">消费记录</view>
				</view>
			
				<view @click="gourl('../../pages/user_address/my')" class="row-item">
					<view class="row-item-icon icon-addressbook  cl-u"></view>
					<view class="row-item-title">收货地址</view>
				</view>
			
				<view @click="gourl('../../pages/kefu/index')"  class="row-item">
					<view class="row-item-icon icon-service  cl-u"></view>
					<view class="row-item-title">联系客服</view>
				</view>
				<view @click="gourl('../../pages/html/aboutus')" class="row-item">
					<view class="row-item-icon icon-info  cl-u"></view>
					<view class="row-item-title">关于我们</view>
				</view>
			</view> 
			 
		</view>
		
		<b2c-footer tab="user"></b2c-footer>
	</view>
</template>

<script>
	 
	import b2cFooter from "../../components/b2cfooter.vue";
	import b2cReclist from "../../components/b2c-reclist.vue";
	export default {
		components: {
			b2cFooter,
			b2cReclist
		},
		data: function(){
			return {
				pageLoad: false,
				pageHide: false,
				pageData: {},
				unLogin:true
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
							that.unLogin=false;
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
	.row-item-icon{
		font-size: 42rpx;
	}
	.cl-u, .cl-u:before {
	    color: #ed6d53;
		
	}
</style>
