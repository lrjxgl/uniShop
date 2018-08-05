<template>
	<view>
		<view class="bg-a" v-if="pageLoad">
			<view class="row-box">
				<view class="row-box-hd">商品详情</view>
				<view class="flexlist">
					<view class="flexlist-item" v-for="($p,index) in pageData.order_product" :key="index">
						<image :src="$p.imgurl+'.100x100.jpg'" class="flexlist-img"></image>
						<view class="flex-1">
							<view class="flexlist-title">{{$p.title}}</view>
							<view class="flexlist-price pdr-10 flex">
								￥
								<text class="f18 cor-money mgr-10"> {{$p.price}}</text>
								
								<text class="market-price">{{$p.market_price}}</text>
								<view class="flex-1"></view>
								*
								<text class="f16 cor-num">{{$p.amount}}</text>
							</view>
						</view>
					</view>

				</view>
			</view>

			<view class="row-box">
				<view class="flex-table">
					<view class="flex-table-label">收货信息</view>
					<view class="flex-table-box">
						<view> 联系人：{{pageData.addr.truename}} </view>
						<view> 手机：{{pageData.addr.telephone}} </view>
						<view> 地址:{{pageData.addr.pct_address}} </view> 
					</view>
				</view>
				<view class="flex-table">
					<view class="flex-table-label">收货状态</view>
					<view class="flex-table-box">
						{{pageData.data.isreceived_name}}
					</view>
				</view>
				<view class="flex-table">
					<view class="flex-table-label">订单评价</view>
					<view class="flex-table-box">
						<view >未评价 </view>
					</view>
				</view>

			</view>
			
			<view class="row-box">
    	<view class="flex-table">
    		<view class="flex-table-label">支付情况</view>
    		<view class="flex-table-box">
    			<text>{{pageData.data.ispay_name}}</text> 
				<text>{{pageData.data.pay_type_name}}</text>							
			</view>
    	</view>
    	<view class="flex-table">
    		<view class="flex-table-label">订单状态</view>
    		<view class="flex-table-box">{{pageData.data.status_name}}</view>
    	</view>
    	<view class="flex-table">
    		<view class="flex-table-label">订单编号</view>
    		<view class="flex-table-box">{{pageData.data.orderno}}</view>
    	</view>
    	<view class="flex-table">
    		<view class="flex-table-label">订单价格</view>
    		<view class="flex-table-box">{{pageData.data.money}}</view>
    	</view>
    	<view class="flex-table">
    		<view class="flex-table-label">下单时间</view>
    		<view class="flex-table-box">{{pageData.data.createtime}}</view>
    	</view>
    	 
    	  
    </view>
		</view>
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	var order_id;
	export default {
		data: {
			pageLoad: false,
			pageData: {}
		},
		onLoad: function (option) {
			order_id = option.order_id;
			this.getPage();
		},

		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?m=order&a=show&ajax=1&order_id=" + order_id,
					data: {
						authcode: app.getAuthCode()
					},
					success: function (data) {
						that.pageLoad = true;
						that.pageData = data.data.data;

					}
				})
			}
		},
	}
</script>

<style>

</style>
