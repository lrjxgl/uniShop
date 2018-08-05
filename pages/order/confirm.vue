<template>
	<view>
		<form @submit="formSubmit" class="bg-a" v-if="pageLoad">
			<view class="row-box">
				<view class="row-box-hd">收货地址
				<view class="flex-1"></view>
					<view class=" f14 cor2">新增地址</view>
				</view>
				<radio-group class="radio-group" @change="setAddress" >
					<view class="mgb-10 flex" v-for="(item,key,index) in pageData.address" :key="key">
						<radio :value="item.id" :checked="index==0"  /> {{index}} {{item.truename}} {{item.telephone}} {{item.pct_address}}
					</view>
				</radio-group>
			</view>
			<view class="row-box">
				<view class="f16">商品列表</view>
				<view class="flexlist">
					<view class="flexlist-item" v-for="(item,index) in pageData.prolist" :key="index">
						<image class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
						<view class="flex-1">
							<view class="flexlist-title">{{item.title}}</view>
							<view v-if="item.ks_title!=''" class="f14 cor2">{{item.ks_title}}</view>
							<view class="flexlist-price">
								价格：<text class="cor-money f18 mgr-10"> {{item.price}}</text>
								x <text class="cor-num mgl-10"> {{item.amount}} </text>
							</view>
						</view>
					</view>
				</view>	
			</view>
			
			<view class="row-box">
				<view class="cart-stat mgb-10 flex">
					商品：￥<text class="cor-money">{{pageData.goods_money}}</text>元 
					  邮费：￥<text class="cor-money">{{pageData.express_fee}}</text>元  
					  总价：￥<text class="cor-money">{{pageData.total_money}}</text>
				</view>
				<view class="cart-stat flex">
			  
					账户余额：<text class="cor-money">{{pageData.user.money}}</text>元
				</view>
			</view>
			
			<view class="row-box">
				<view class="row-box-hd">支付方式</view>
				<radio-group class="radio-group" @change="setPayType">
					<view  class="mgb-10 flex" v-for="(item,key,index) in pageData.pay_type_list" :checked="index==0" :key="key">
						<radio :value="key" /> {{item}}
					</view>
				</radio-group>
			</view>
			
			<view class="row-box">
				<view class="mgb-10"><textarea name="comment" placeholder="请输入订单需求"></textarea></view>
				<button type="primary" form-type="submit" class="btn-row-submit">确认下单</button>
			</view>
		 
		</form>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var id;
	var address_id=0;
	var cart_id=[];
	var comment="";
	var pay_type="";
	export default{
		data:{
			pageLoad:false, 
			pageData:{}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=order&a=confirm&ajax=1",
					data:{
						authcode: app.getAuthCode()
					},
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data.data;
						 for(var i=0;i<res.data.data.prolist.length;i++){
						  cart_id.push(res.data.data.prolist[i].id);
						} 
					}
				})
			},
			setAddress:function(e){
				address_id=e.detail.value;
			},
			setPayType:function(e){
				pay_type=e.detail.value;
			},
			formSubmit:function(e){
				console.log("wwwwwww")
				comment=e.detail.value.comment;
				uni.request({
					url:app.apiHost+"?m=order&a=order&ajax=1&authcode="+app.getAuthCode(),
					header:{
						"content-type":"application/x-www-form-urlencoded"
					},
					data:{
						cart_id:cart_id, 
						user_address_id:address_id,
						pay_type:pay_type,
						comment:comment
					},
					method:"POST",
					success:function(res){
						uni.showToast({
							title:res.data.message,
						})
						 
						if(!res.data.error){
							if(res.data.data.ispay==2){
									uni.redirectTo({
										url:"/pages/order/success",
									})
							}else{
								wxpay(res.data.data.order_id);
							}
							
						}
					}
				})
			},
			wxpay: function (order_id) {
				var order_id=order_id;

				uni.request({
					url: app.apiHost + '?fromapp=wxapp&m=recharge_wxapp_pay&a=go',
					data: {
						order_id: order_id,
						openid: uni.getStorageSync('openid')
					},
					success: function (res) {
						 
						uni.requestPayment({
							'appId': res.data.appId,
							'timeStamp': res.data.timeStamp,
							'nonceStr': res.data.nonceStr,
							'package': res.data.package,
							'signType': 'MD5',
							'paySign': res.data.paySign,
								success: function (res) {
								uni.redirectTo({
									url: '/pages/order/show?order_id=' + res.data.data.order_id,
								});
								
							},
							fail: function (res) {
								uni.redirectTo({
									url: '/pages/order/show?order_id=' + res.data.data.order_id,
								});
							}
						});

					},
					fail: function (res) {
						console.log(res);
					}
				})
			}	
			 
		}
	}
</script>

<style>
</style>