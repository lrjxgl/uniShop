<template>
	<view v-if="pageLoad" class="bg-ef">
		<view class="tabs-border">
			<view @click="setCat('all')" class="tabs-border-item" v-bind:class="{'tabs-border-active':status=='all'}">全部</view>
			<view @click="setCat('unpay')" class="tabs-border-item" v-bind:class="{'tabs-border-active':status=='unpay'}">待付款</view>
			<view @click="setCat('unconfirm')" class="tabs-border-item" v-bind:class="{'tabs-border-active':status=='unconfirm'}">待确认</view>
			<view @click="setCat('unreceive')" class="tabs-border-item" v-bind:class="{'tabs-border-active':status=='unreceive'}">待收货</view>
			<view @click="setCat('uncomment')" class="tabs-border-item" v-bind:class="{'tabs-border-active':status=='uncomment'}">待评价</view>
		</view>
		<view v-if="pageData.rscount==0">
			<view class="emptyData">暂无消息</view>
		</view>
		<view v-else>
			<view class="list">
				<view class="item row-box mgb-10" v-for="(item,index) in pageData.data" :key="index">

					<view class="flex bd-mp-5">
						<text class="flex-1 cl2">{{item.orderno}}</text>
						<text class="cl-primary">{{item.ispay_name}} </text>
					</view>


					 
						<view v-for="($p,pkey) in item.product" :key="pkey" class="flexlist-item">

							<image class="flexlist-img" :src="$p.imgurl+'.100x100.jpg'"></image>
							<view class="flex-1">
								<view class="flexlist-title">
									{{$p.title}}
									<view class="flexlist-ks">
										{{$p.ks_title}}
									</view>
								</view>
								<view class="flex">
									<text class="cl-money flex-1">￥{{$p.price}}</text>
									<text class="market-price ">x{{$p.amount}}</text>
								</view>
							</view>
						</view>
					 

					<view class="flex pd-10">
						共
						<text class="clmoney">{{item.total_num}}</text>件商品， 合计：￥
						<text class="clmoney">{{item.money}}</text>
					</view>

					<view class="flex flex-jc-end">
						<view class="flex-1"></view>
						<view class="btn-small btn-outline-danger mgr-10" @click="goPay(item.order_id)">去支付</view>
						<view class="btn-small  btn-outline-danger" @click="goOrder(item.order_id)">查看</view>
					</view>

				</view>
			</view>
		</view>


	</view>
</template>

<script>
	var app = require("../../common/common.js");

	var per_page = 0;
	var isfirst = true;
	var status = 'all';
	var activeClass = "list-side-item-active";
	export default {

		data: function(){
			return {
				pageLoad: false,
				pageData: {},
				winHeight: 600,
				status: 'all',
				defaultActive: "list-side-item-active",
			}
		},
		onLoad: function (option) {
			var win = uni.getSystemInfoSync();
			this.winHeight = win.windowHeight - 50;
			uni.setNavigationBarTitle({
				title: '我的订单'
			});
			this.status = status = (option.status == undefined ? 'all' : option.status)
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
					url: app.apiHost + "?m=order&a=my&ajax=1",
					data: {
						authcode: app.getAuthCode(),
						type: status
					},
					success: function (data) {
						isfirst = false;
						that.pageLoad=true;
						that.pageData = data.data.data;
						per_page = data.data.data.per_page;
					}
				})
			},
			setCat: function (cid) {
				status = cid
				isfirst = true;
				per_page = 0;
				this.status = status;
				this.getList();
			},
			getList: function () {
				var that = this;
				if (!isfirst && per_page == 0) return false;
				uni.request({
					url: app.apiHost + "?m=order&a=my&ajax=1",
					data: {
						per_page: per_page,
						type: status,
						authcode: app.getAuthCode()
					},
					success: function (res) {

						if (!res.data.error) {
							if (isfirst) {
								that.pageData.data = res.data.data.data;
								isfirst = false;
							} else {

								that.pageData.data = app.json_add(that.pageData.data, res.data.data.data);
							}
							per_page = res.data.data.per_page;

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
			goOrder: function (order_id) {
				uni.navigateTo({
					url: "/pages/order/show?order_id=" + order_id,
				})
			},
			goPay: function (order_id) {
				uni.navigateTo({
					url: "/pages/recharge/order?order_id=" + order_id,
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
