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
						 
							<view class="cor-money flex">
								满 <text class="cor-money">￥{{item.lower_money}} </text>
								减 <text class="cor-money">￥{{item.money}}</text>
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
				pageHide:false,
				pageData:{},
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
	
</style>
