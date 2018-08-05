<template>
	<view>
		<view v-if="pageLoad">
			<view v-if="pageData.imgsdata.length>0">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(img,index) in pageData.imgsdata" :key="index">
						<view class="swiper-item">
							<image :src="img.imgurl"></image>
						</view>
					</swiper-item>
					 
				</swiper>
			</view>
			<view  v-else>
				<image class="d-img" :src="pageData.data.imgurl"></image>
				
			</view>
			<view class="d-title">{{pageData.data.title}}</view>
			<view class="d-row-border flex">
				<view class="flex flex-1">
					<view class="f18 cor-money">￥{{pageData.data.price}}</view>
					<view class="market-price">￥{{pageData.data.market_price}}</view>
				</view>

				<view v-if="pageData.data.cart_num>0" class="numbox">
					<view @click="minusCart(pageData.data.id,pageData.data.cart_num)" class="numbox-minus">-</view>
					<input class="numbox-num" type="text" :value="pageData.data.cart_num" />
					<view @click="plusCart(pageData.data.id,pageData.data.cart_num)" class="numbox-plus">+</view>
				</view>
				<view @click="addCart(pageData.data.id)" v-if="pageData.data.cart_num==0" class="buy-btn">买</view>

			</view>

			<view class="d-content">
				<rich-text type="text" :nodes="pageData.data.content"></rich-text>
			</view>
			<view class="flcart">
				<view @click="goHome()" class="flcart-f1" >
					<view class="iconfont icon-home"></view>
					首页</view>
				<view @click="goCart()" class="flcart-f1" href="/index.php?m=order_cart">
					<view class="iconfont icon-cart"></view>
					购物车</view>
				 
				<view @click="goBuy()" class="flcart-f2"  >立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	var id;
	export default {
		data: {
			pageLoad: false,
			pageData: {}
		},
		onLoad: function (option) {
			id = option.id;
			this.getPage();
		},

		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?m=product&ajax=1&a=show&id=" + id,
					data: {
						authcode: app.getAuthCode()
					},
					success: function (data) {
						that.pageLoad = true;
						that.pageData = data.data.data;

					}
				})
			},
			addCart: function (id, ksid) {
				var that = this;
				var id = id;
				var ksid = ksid == undefined ? 0 : ksid;
				uni.request({
					url: app.apiHost + '?m=order_cart&a=add&fromapp=wxapp&ajax=1&object_id=' + id,
					data: {
						authcode: app.getAuthCode(),
						ksid: ksid
					},
					method: 'GET',
					success: function (res) {
						uni.showToast({
							title: res.data.message,
						})
						if (!res.data.error) {
							that.pageData.data.cart_num = 1;
						}

					}
				})
			},
			plusCart: function (id, amount, ksid) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount++;
				uni.request({
					url: app.apiHost + '/index.php?m=order_cart&a=add&fromapp=wxapp&ajax=1',
					data: {
						authcode: app.getAuthCode(),
						object_id: id,
						amount: amount,
						isplus: 1,
						ksid: ksid
					},
					method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					// header: {}, // 设置请求的 header
					success: function (res) {
						uni.showToast({
							title: res.data.message,
						})
						if (!res.data.error) {
							that.pageData.data.cart_num = amount;
						}

					}
				})
			},
			minusCart: function (id, amount, ksid) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount--;
				var isdelete = 0;
				if (amount == 0) {
					isdelete = 1
				}
				uni.request({
					url: app.apiHost + '?m=order_cart&a=add&fromapp=wxapp&ajax=1',
					data: {
						authcode: app.getAuthCode(),
						amount: amount,
						isdelete: isdelete,
						isminus: 1,
						object_id: id,
						amount: amount,
					},
					method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					// header: {}, // 设置请求的 header
					success: function (res) {
						uni.showToast({
							title: res.data.message,
						})
						if (!res.data.error) {
							that.pageData.data.cart_num = amount;
						}

					}
				})
			},
			goHome:function(){
				uni.redirectTo({
					url:"/pages/index/index",
				})
			},
			goCart:function(){
				uni.navigateTo({
					url:"/pages/cart/index",
				})
			},
			goBuy:function(){
				uni.navigateTo({
					url:"/pages/cart/buy?object_id="+id,
				})
			}
		},
	}
</script>

<style>
.flcart {
    display: flex;
	flex-direction: row;
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    font-size: 29px;
    line-height: 1.2;
    border-top: 2px solid #eee;
    background-color: #fff;
    text-align: center;
}
.flcart-f1 {
    width: 160px;
    display: inline-block;
    height: 92px;
    line-height: 40px;
	padding-top: 8px;
	font-size: 29px;
}
.flcart-f2 {
    flex: 1;
    height: 92px;
    line-height:92px;
    background-color: #f30;
    color: #fff;
    font-size: 29px;
}
</style>
