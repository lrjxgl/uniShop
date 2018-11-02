<template>
	<view>
		 <form @submit="formSubmit" class="bg-a" v-if="pageLoad">
		 	<view class="row-box mgb-10">
		 		<view class="row-box-hd">收货地址
		 		<view class="flex-1"></view>
		 			<view class=" f14 cor2"  @click="goAddress()">新增地址</view>
		 		</view>
		 		<radio-group class="radio-group" @change="setAddress" >
		 			<view class="mgb-10 flex" v-for="(item,key,index) in pageData.address" :key="key">
		 				<radio name="user_address_id" :value="item.id" :checked="index==0"  /> {{index}} {{item.truename}} {{item.telephone}} {{item.pct_address}}
		 			</view>
		 		</radio-group>
		 	</view>
		 	<view class="row-box">
		 		<view class="row-box-hd">商品信息</view>
		 		<view class="flexlist">
		 			<view class="flexlist-item">
						<view class="flexlist-imgbox">
							<image class="flexlist-img" :src="pageData.data.imgurl+'.100x100.jpg'"></image>
		 				</view>
						<view class="flex-1">
		 					<view class="flexlist-title">{{pageData.data.title}}</view>
		 					
		 					<view class="flex ">
								<view v-if="pageData.data.ks_title!=''" class="f14 cl2">{{pageData.data.ks_title}}</view>
		 						 <text class="cl-money f18">￥{{pageData.data.price}}</text>
		 						<text class="cl-num"> {{pageData.data.amount}} </text>
		 					</view>
		 				</view>
		 			</view>
		 		</view>	
		 	</view>
		 	
		 	<view class="row-box">
		 		<view class="flex cart-stat mgb-10">
		 			商品：￥<text class="clmoney">{{pageData.goods_money}}</text>元 
		 				邮费：￥<text class="clmoney">{{pageData.express_fee}}</text>元  
		 				总价：￥<text class="clmoney">{{pageData.total_money}}</text>
		 		</view>
		 		<view class="cart-stat flex">
		 		
		 			账户余额：<text class="clmoney">{{pageData.user.money}}</text>元
		 		</view>
		 	</view>
		 	
		 <view class="row-box mgb-10">
		 			<view class="row-box-hd mgb-10">支付方式</view>
		 
		 			<view class="paylist">
		 				<view class="none">
		 				<input type="hidden" name="pay_type" id="pay_type" :value="pay_type">
		 				</view>
		 				<view class="paylist-item"  v-for="(item,key) in pageData.pay_type_list" v-bind:class="(key==pay_type)?'paylist-item-active':''"   :key="key">{{item}}</view>
		 			</view>
		 		</view>
		 	
		 	<view class="row-box">
		 		<view class="mgb-10"><textarea class="h60" name="comment" placeholder="请输入订单需求"></textarea></view>
		 		<button type="primary" form-type="submit" class="btn-row-submit">确认下单</button>
		 	</view>
		  
		 </form>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var object_id;
	var address_id=0;
	var comment="";
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				pay_type:"wxpay",
			}
		},
		onLoad:function(option){
			object_id=option.object_id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=order_cart&a=buy&ajax=1&object_id="+object_id,
					data:{
						authcode: app.getAuthCode()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			},
			goAddress:function(){
				uni.navigateTo({
					url:"/pages/user_address/add",
				})
			},
			setAddress:function(e){
				address_id=e.detail.value;
			},
			setPayType:function(pay_type){
				this.pay_type=pay_type;
			},
		},
	}
</script>

<style>
</style>
