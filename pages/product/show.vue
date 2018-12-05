<template>
	<view>
		<view class="main-body"  v-if="pageLoad">
			<view v-if="pageData.imglist.length>0">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(img,index) in pageData.imglist" :key="index">
						<view class="swiper-item">
							<image :src="img.imgurl"></image>
						</view>
					</swiper-item>
					 
				</swiper>
			</view>
			<view  v-else>
				<image class="d-img" :src="pageData.data.imgurl"></image>
				
			</view>
			<view class="row-box mgb-5">
				<view class="d-title">{{pageData.data.title}}</view>
				<view class="flex flex-1 mgb-10">
					<view class="flex-1 f20 cl-money">￥{{pageData.data.price}}</view>
					<view class="market-price">￥{{pageData.data.market_price}}</view>
				</view>

				
			</view>
			<view class="bg-fff pd-10 d-content">
				<rich-text type="text" :nodes="pageData.data.content"></rich-text>
			</view>
			<view class="flcart">
				 
				<view class="flcart-f1">
					<view class="iconfont flcart-icon icon-favor_fill_light"></view>
					收藏
				</view>
				
				<view @click="goCart()" class="flcart-f1" >
					<view class="iconfont flcart-icon icon-cart"></view>
					购物车</view>
				<view @click="showCart()" class="flcart-f2">
					 
					加入购物车</view> 
				<view @click="showCart()" class="flcart-f2"  >立即购买</view>
			</view>
			<div class="cBox-mask" v-bind:class="cBoxClass"></div>
			<div class="cBox" v-bind:class="cBoxClass">
				<div class="cBox-close" @click="closeCart()"></div>
				<div class="flex mgb-20">
					<image :src="pageData.data.imgurl+'.100x100.jpg'" mode="widthFix" class="wh-60" ></image>
					<div class="flex-1 mgl-10">
						<div class="cl1 mgb-5">{{pageData.data.title}}</div>
						<div class="flex">
							<div class="cl-money f14 flex-jc-end">￥</div>
							<div class="cl-money f22">{{pageData.data.price}}</div>
						</div>
					</div>
				</div>
				
				<div v-if="Object.keys(kslist).length>0">
					<div class="bd-mp-10">尺寸选择</div>
			 
					<view class="kslist bd-mp-10 " >
						<view class="kslist-label">颜色</view>
						<view class="kslist-item" v-bind:class="item.ksClass" @click="getSize(item.id)" v-for="(item,ksIndex) in kslist" :key="ksIndex">{{item.title}}</view>
						 
					</view>
				</div>	
					<view class="kslist" v-if="Object.keys(kslist2).length>0">
						<view class="kslist-label">尺寸</view>
						<view class="flex-1 flex">
							<view class="kslist-item" v-bind:class="item.ksClass" v-for="(item,ksIndex2) in kslist2" :key="ksIndex2">{{item.size}}</view>
							 
						</view>
					</view>
				 
				<div class="mgb-5">数量</div>
				<div class="flex mgb-10">
					 
					<view  class="numbox">
						<view @click="minus" class="numbox-minus">-</view>
						<input class="numbox-num" v-model="num" type="text" :value="num" />
						<view @click="plus" class="numbox-plus">+</view>
					</view>
				</div>
				<div class="flex">
					<div @click="goBuy()" class="btn-small flex-1 mgr-20">立即购买</div>
					<div @click="addCart()" class="btn-small flex-1">加入购物车</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	 
	export default {
		 
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				cBoxClass:"none",
				ksid:0,
				id:0,
				num:1,
				kslist:[],
				kslist2:[]
			}
		},
		onLoad: function (option) {
			this.id = option.id;
			this.getPage();
		},

		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?m=product&ajax=1&a=show&id=" + this.id,
					data: {
						authcode: app.getAuthCode()
					},
					success: function (res){
						that.pageLoad = true;
						that.pageData = res.data.data;
						that.num=res.data.data.data.cart_num;
						var kslist=res.data.data.kslist;
						if(Object.keys(kslist).length>0){
							kslist[0].ksClass="kslist-active";
							that.ksid=kslist[0].id;
						}
						
						that.kslist=kslist;
						var kslist2=res.data.data.kslist2;
						if(Object.keys(kslist2).length>0){
							kslist2[0].ksClass="kslist-active";
						}
						that.kslist2=kslist2;
					}
				})
			},
			addCart: function () {
				var that = this;
		 
				uni.request({
					url: that.app.apiHost + '?m=order_cart&a=add&ajax=1&object_id=' + that.id,
					data: {
						authcode: app.getAuthCode(),
						ksid: that.ksid,
						fromapp:that.app.fromapp(),
						amount:that.num
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
			
			goHome:function(){
				app.goHome();
			},
			goCart:function(){
				app.goCart();
			},
			goBuy:function(){
				var that = this;						 
				uni.request({
					url: that.app.apiHost + '?m=order_cart&a=add&ajax=1&object_id=' + that.id,
					data: {
						authcode: app.getAuthCode(),
						ksid: that.ksid,
						fromapp:that.app.fromapp(),
						amount:that.num
					},
					method: 'GET',
					success: function (res) {
						uni.showToast({
							title: res.data.message,
						})
						if (!res.data.error) {
							uni.navigateTo({
								url:"/pages/order/confirm?cart_id="+res.data.data.cart_id,
							})
						}

					}
				})
				
			},
			showCart:function(){
				this.cBoxClass="";
			},
			closeCart:function(){
				this.cBoxClass="none"
			},
			minus:function() {
				var num=this.num;
				if(num<=1){
					return false;
				}
				this.num--;
			},
			plus:function(){
				this.num++;
			},
			getSize:function(id){
				var that=this;
				var kslist=that.kslist;
				for(var i in kslist){
					if(id==kslist[i].id){
						kslist[i].ksClass="kslist-active";
					}else{
						kslist[i].ksClass="";
					}
				}
				uni.request({
					url:that.app.apiHost+"?m=product_ks&a=getSize&ajax=1&id="+id,
					data:{
						authcode: app.getAuthCode(),
					},
					success:function(res){
						 				 
						that.kslist2=res.data.data.kslist;
					}
				})
			}
		},
	}
</script>

<style>
	.kslist{
		padding-left: 0;
	}
.flcart {
    display: flex;
	flex-direction: row;
    position: fixed;
    left: 0upx;
    right: 0upx;
    bottom: 0upx;
    font-size: 29upx;
    line-height: 1.2;
    border-top: 2upx solid #eee;
    background-color: #fff;
    text-align: center;
	justify-content: center;
	align-content: center;
}
.flcart-f1 {
    width: 100upx;
    display: inline-block;
    height: 92upx;
    line-height: 40upx;
	 
	padding-bottom: 8upx;
	font-size: 29upx;
}
.flcart-f2 {
    flex: 1;
    height: 70upx;
    line-height:70upx;
    background-color: #f30;
    color: #fff;
    font-size: 29upx;
	border-radius: 20upx;
	margin-left: 20upx;
	margin-right: 20upx;
	position: relative;
	top: 16upx;
}
.flcart-icon{
	font-size: 32upx;
}
.cBox-mask{
	background-color: #333;
    opacity: 0.2;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
}
.cBox{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background-color: #fff;
	border: 1px solid #eee;
	padding: 20px;
	border-radius: 10px;
}
.cBox-close{
	position: absolute;
	right: 5px;
	top: 5px;
	font-family: iconfont;
	width: 80upx;
	height: 80upx;
	justify-content: center;
	align-content: center;
	text-align: center;
}
.cBox-close:after{
	content: "\e7e3";
	font-size: 32upx;
}

.kslist{
		display: flex;
		flex-direction: row;		
		align-items: center;
		padding-left: 10px;
	}
	.kslist-label{
		margin-right: 6px;
		color: #646464;
	}
	.kslist-item{
		border: 1px solid #eee;
		padding: 4px 8px;
		margin-right: 10px;
	}
	.kslist-active{
		color: #007AFF;
	}
</style>
