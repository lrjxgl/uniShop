<template>
	<view class="bg-ef pd-10">
		<div>
			<div v-if="unLogin">
				<div class="row-box mgb-10">
					<div class="mgb-10"></div>
					<view class="flex flex-ai-center mgb-10">
						<image mode="widthFix" class="w60 mgr-10" :src="app.apiHost+'/static/logo.png'">
						</image>
		
						<navigator class="btn-small" style="background-color:#007b47;" url="../login/index">前往登录
						</navigator>
					</view>
					<view class="flex  mgb-20 cl2">您还未登录,请先登录</view>
		
				</div>
			</div>
			<div v-else class="h" style="padding:10px;background-color:#007b47;">
				<!--
					<div class="flex mgb-10">
						 
						<div class="flex-1"></div>
						<div class="iconfont icon-scan my-h-cl f18 mgr-10"></div>
						<div @click="gourl('./set')" class="iconfont icon-settings my-h-cl f18"></div>
					</div>
					-->
				<div class="flex flex-ai-center mgb-20">
					<image @click="gourl('user_head')" mode="widthFix" class="w60 mgr-10 bd-radius-50"
						:src="user.user_head+'.100x100.jpg'"></image>
					<div class="flex-1">
						<div class="flex flex-ai-center mgb-5">
							<div class="my-h-cl mgr-10">{{user.nickname}}</div>
							<image mode="widthFix" class="rankLogo" :src="rank.logo"></image>
						</div>
		
		
					</div>
					<div @click="gourl('./set')" class="iconfont icon-right my-h-cl"></div>
				</div>
		
				<div class="flex">
					<div @click="gourl('../../pages/allmsg/index')" class="flex-1 flex-center">
						<div class="iconfont icon-message_light mgb-5 my-h-cl"></div>
						<div class="my-h-cl">我的消息</div>
					</div>
					<div @click="gourl('../../pages/coupon/my')" class="flex-1 flex-center">
						<div class="iconfont icon-present my-h-cl mgb-5"></div>
						<div class="my-h-cl">我的礼券</div>
					</div>
					<div @click="gourl('../../pageb2c/b2c_order/my')" class="flex-1 flex-center">
						<div class="iconfont icon-order my-h-cl mgb-5"></div>
						<div class="my-h-cl">乐购订单</div>
					</div>
				</div>
		
			</div>
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
			<div class="row-box">
		
				
					 
		
				<div>
					<div class="f16 mgb-20 fw-600">更多</div>
					<div>
						 
							<div @click="gourl('../html/index?word=help')" class="flex pointer">
								<div class="iconfont icon-message_light mgr-5"></div>
								<div class="flex-1 bd-mp-10">
									<div class="flex">
										<div class="flex-1">帮助与反馈</div>
										<div class="iconfont icon-right cl3"></div>
									</div>
									<div class="cl3">反馈使用问题</div>
								</div>
							</div>
							
							 
							
							<div @click="gourl('../html/index?word=question')"  class="flex">
								<div class="iconfont icon-question mgr-5"></div>
								<div class="flex-1 bd-mp-10">
									<div class="flex">
										<div class="flex-1">常见问题</div>
										<div class="iconfont icon-right cl3"></div>
									</div>
									<div class="cl3">常见问题解答</div>
								</div>
							</div>
							 
						<div @click="gourl('../kefu/index')" class="flex">
							<div class="iconfont icon-service_light mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">在线客服</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">在线实时服务助手</div>
							</div>
						</div>
						<div @click="gourl('../html/index?word=contact')" class="flex">
							<div class="iconfont icon-phone mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">联系我们</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">如您需获得关于问题的直接协助</div>
							</div>
						</div>
		
						<div @click="gourl('../html/index?word=aboutus')" class="flex">
							<div class="iconfont icon-info mgr-5"></div>
							<div class="flex-1 bd-mp-10">
								<div class="flex">
									<div class="flex-1">关于我们</div>
									<div class="iconfont icon-right cl3"></div>
								</div>
								<div class="cl3">版本，证照，新功能</div>
							</div>
						</div>
		
		
					</div>
				</div>
		
			</div>
		
		
		
		</div>
					

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
				rank: {},
				unLogin: true,
				 
			}
		},
		onLoad: function(option) {
			 
			uni.setNavigationBarTitle({
				title: "个人中心",
			})

			this.getPage();



		},
		onShow: function() {
			this.getPage();

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
					url: that.app.apiHost + "/index/user/index",
					unLogin: true,
					success: function(res) {

						if (res.error == 1000) {

							that.unLogin = true;
							//that.app.showLoginBox(true)

							return false;
						} else {
							that.unLogin = false;

							that.user = res.data.data;
							that.rank = res.data.rank;
						}
						that.pageLoad = true;

					}
				})
			},
			checkedPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/user/index",
					unLogin: true,
					success: function(res) {

						if (res.error == 1000) {

							that.unLogin = true;


							return false;
						} else {
							that.unLogin = false;

							that.user = res.data.data;
							that.rank = res.data.rank;
						}
						that.pageLoad = true;

					}
				})
			}
		},
	}
</script>

<style>
	.myNavItem {
		width: 25%;
		align-items: center;
		margin-bottom: 10px;
	}

	.myNavItem-icon {
		background-color: #eee;

		font-size: 40px;
		text-align: center;
		margin-bottom: 5px;
		width: 60px;
		height: 60px;
		line-height: 60px;
	}

	.myNavItem-title {
		text-align: center;
		height: 40px;
		width: 60px;
	}
</style>