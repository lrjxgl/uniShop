<template>
	<view class="body">
		<view v-if="pageLoad">

			<view v-if="!unLogin" class="main-body">
				<view class="uhead">

					<image @click="gourl('../user/user_head')" class="uhead-img"
						:src="user.user_head+'.100x100.jpg'"></image>

					<view class="uhead-box">
						<view class="uhead-nick">{{user.nickname}}</view>
						<view class="uhead-rnum flex flex-ai-center">
							余额 ￥
							<text class="f14 cl-money mgl-5">{{user.money}} </text>


						</view>
						<view class="uhead-rnum flex flex-ai-center">

							金币
							<text class="cl-money mgl-5 mgr-5">{{user.gold}}</text>

							积分
							<text class="cl-money mgl-5">{{user.grade}}</text>

						</view>

					</view>
					<navigator url="../user/set" class="flex-center btn-small btn-link iconfont icon-settings">
					</navigator>
				</view>


				<div class="row-box mgb-5">


					<div @click="gourl('../../pages/notice/my')" class="row-item">
						<div class="row-item-icon icon-notice  cl-u"></div>
						<div class="row-item-title">我的消息</div>
					</div>
					<div @click="gourl('../../pages/coupon_user/index')" class="row-item">
						<div class="row-item-icon icon-ticket  cl-u"></div>
						<div class="row-item-title">我的优惠券</div>
					</div>
					<div @click="gourl('../../pages/comment/my?tablename=article')"  class="row-item">
						<div class="row-item-icon icon-comment"></div>
						<div class="row-item-title">我的评论</div>
					</div>
					
					<div @click="gourl('../../pages/user_address/my')"  class="row-item">
						<div class="row-item-icon icon-addressbook"></div>
						<div class="row-item-title">收货地址</div>
					</div>
					
				</div>

				<div class="row-box mgb-5">
					
					<div @click="gourl('../../pages/gold_log/my')" class="row-item">
						<div class="row-item-icon icon-choiceness  cl-u"></div>
						<div class="row-item-title">金币日志</div>
					</div>
					<div @click="gourl('../../pages/pay_log/my')"   class="row-item">
						<div class="row-item-icon icon-moneybag"></div>
						<div class="row-item-title">消费记录</div>
					</div>
					<div  @click="gourl('../../pages/recharge/my')"  class="row-item">
						<div class="row-item-icon icon-moneybag"></div>
						<div class="row-item-title">充值记录</div>
					</div>
					
				</div>
				
				<div class="row-box mgb-5">	
					<div @click="gourl('../../pages/kefu/index')" class="row-item">
						<div class="row-item-icon icon-service  cl-u"></div>
						<div class="row-item-title">联系客服</div>
					</div> 
					<div @click="gourl('../../pages/html/aboutus')" class="row-item">
						<div class="row-item-icon icon-info  cl-u"></div>
						<div class="row-item-title">关于我们</div>
					</div>
				</div>

			</view>
			<view v-else class="unLoginBox">
				<div class="row-box">
					<view class="flex flex-center mgb-20 cl2">您还未登录,请先登录</view>
					<view class="flex flex-center">
						<navigator class="btn-small" url="../login/index">前往登录</navigator>
					</view>
				</div>
				
			
			</view>
		</view>
		
		<mt-footer tab="user"></mt-footer>
	</view>
</template>

<script>
	import mtFooter from "../../components/footer.vue";
	export default {
		components: {
			mtFooter
		},
		data: function() {
			return {
				pageLoad: false,
				pageHide: false,
				user: {},
				unLogin:false 
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: "个人中心",
			})
			 
			this.getPage();
			 
			

		},
		onShow: function() {
			if(this.pageLoad){
				this.getPage();
			}
			
		},
		 
	
		onPullDownRefresh: function(n, o) {
			this.getPage();
			uni.stopPullDownRefresh();
		},
		methods: {

			gourl: function(url) {
				uni.navigateTo({
					url: url,
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/user/index?",
					unLogin:true,
					success: function(res) {
						
						if (res.error == 1000) {
							
							that.unLogin=true;

						} else {
							that.unLogin=false;
							console.log(that.unLogin)
							that.user = res.data.data;
						}
						that.pageLoad=true;

					}
				})
			}
		},
	}
</script>

<style>
	 
	.uhead {
		display: flex;
		flex-direction: row;
		padding: 22rpx;
		background-color: #fff;
		margin-bottom: 11rpx;
	}

	.uhead-img {
		width: 172rpx;
		height: 172rpx;
		margin-right: 22rpx;
		display: block;
		border-radius: 50%;
	}

	.uhead-box {
		flex: 1;
	}

	.uhead-nick {
		margin-bottom: 10rpx;
		font-size: 34rpx;
	}

	.uhead-rnum {
		color: #999;
		margin-bottom: 32rpx;
		line-height: 29rpx;
		display: flex;
		font-size: 29rpx;
	}

	.order-box {
		background-color: #fff;
		padding: 22rpx;
		margin-bottom: 22rpx;
	}

	.order-box-hd {
		display: flex;
		flex-direction: row;
		line-height: 79rpx;
		border-bottom: 2rpx solid #ddd;
		margin-bottom: 22rpx;
	}

	.order-box-status {
		display: flex;
		flex-direction: row;
	}

	.order-box-item {
		flex: 1;
		text-align: center;
		font-size: 32rpx;
		color: #666;
	}

	.order-box-item .iconfont {
		display: block;
		color: #666;
		font-size: 42rpx;
	}

	.row-item {
		display: flex;
		flex-direction: row;
		padding: 10rpx 16rpx;
		margin-bottom: 10rpx;
		font-size: 35rpx;
		color: #555;
		border-bottom: 2rpx solid #eee;
	}
	 
	
</style>
