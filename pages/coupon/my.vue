<template>
	<view  v-if="pageLoad">
		 
			<view v-if="pageData.rscount==0">
				<view class="emptyData">暂无优惠券</view>
			</view>
			<view v-else>

				<view class="flexlist">
					<view  class="flexlist-item pdb-10" v-for="(item,index) in pageData.list" :key="index">

						<image class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
						<view class="flex-1">
							<view class="flexlist-title f16">{{item.title}}</view>
							<view class="flexlist-desc cor2 f14">截止时间:{{item.end_day}}</view>
						 
							<view class="clmoney flex">
								满 <text class="clmoney">￥{{item.lower_money}} </text>
								减 <text class="clmoney">￥{{item.money}}</text>
							</view>
						</view>
						<view class="btn btn-primary" @click="goPros(item.money)">去购买</view> 

					</view>
				</view>
			</view>
		 
	</view>
</template>

<script>
	var app = require("../../common/common.js");

	var per_page = 0;
	var isfirst = true;
	var catid = 0;
 
	export default {

		data:function(){
			return {
				pageLoad:false, 
				pageData:{}
			}
		},
		onLoad: function (option) {
			uni.setNavigationBarTitle({
				title: '我的优惠券'
			});
			this.getPage();
		},
		onReachBottom: function () {
			this.getList();
		},
		onPullDownRefresh: function () {
			this.refresh();
		},
		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?m=coupon&a=my&ajax=1",
					data: {
						authcode: app.getAuthCode(),
						fromapp: app.fromapp()
					},
					success: function (data) {
						
						isfirst = false;
						that.pageData = data.data.data;
						that.pageLoad=true;
						per_page = data.data.data.per_page;
					}
				})
			},

			getList: function () {
				var that = this;
				if (!isfirst && per_page == 0) return false;
				uni.request({
					url: app.apiHost + "?m=coupon&a=my&ajax=1",
					data: {
						per_page: per_page,
						fromapp: app.fromapp(),
						authcode: app.getAuthCode()
					},
					success: function (data) {

						if (!data.data.error) {
							if (isfirst) {
								that.pageData.list = data.data.data.list;
								isfirst = false;
							} else {

								that.pageData.list = app.json_add(that.pageData.list, data.data.data.list);
							}
							per_page = data.data.data.per_page;

						}


					}
				})
			},

			refresh: function () {
				this.getPage();
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			loadMore: function () {
				this.getList();
			},
			goPros:function(money){
				uni.navigateTo({
					url:"/pages/product/index?startprice="+money,
				})
			}
		},
	}
</script>

<style>
	.flex-main {
		flex: 1;
	}

	.catlist-item {
		line-height: 40px;
		border-bottom: 1px solid #eee;
		padding-left: 5px;
		overflow: hidden;
		cursor: pointer;
	}

	.catlist-item.active {
		background-color: #eee;
	}

	.prolist-item-row-cart .numbox {
		display: none;
	}

	.prolist-item-row-cart-active .numbox {
		display: block;
	}



	.prolist-item {
		position: relative;
		padding: 5px 0;
		border-bottom: 1px solid #e4e4e4;
		display: flex;
	}

	.prolist-item-g-sd1 {
		width: 50px;
		margin-right: 5px;
	}

	.prolist-item-img {
		width: 50px;
		height: 50px;
	}

	.prolist-item-g-mn1 {
		flex: 1;
	}

	.prolist-item-title {
		height: 40px;
		line-height: 20px;
		font-size: 14px;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 3px;
	}

	.prolist-item-row-price {
		line-height: 22px;
		font-size: 16px;
		margin-bottom: 5px;
	}

	.prolist-item-price {
		color: #fa215f;
		margin-right: 5px;
		display: inline-block;
	}

	.prolist-item-sold-num {
		color: #999;
		font-size: 12px;
		display: inline-block;
	}

	.numbox {
		padding-top: 5px;
	}

	.prolist-item-buy-btn {
		display: block;
		height: 30px;
		line-height: 30px;
		text-align: center;
		width: 30px;
		background-color: #83c44e;
		color: #fff;
		border-radius: 50%;
		float: right;
		cursor: pointer;
	}

	.prolist-item-row-cart-active .prolist-item-buy-btn {
		display: none;
	}

	.prolist-item-row-sold {
		line-height: 30px;
		height: 30px;
		color: #aaa;
	}

	.prolist-item-lower_price {
		text-decoration: line-through;
		color: #999;
	}
</style>
