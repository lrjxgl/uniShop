<template>
	<view>
		<view class="row-box">
			<view class="input-flex">
				<view class="input-flex-label">金额</view>
				<input v-model="money" type="text" class="input-flex-text" />
				<view>元</view>
			</view>
			<view class="paylist flex-center">
				<view @click="setPayType('alipay')" class="paylist-item" :class="{'paylist-item-active':paytype=='alipay'}">支付宝</view>
				<view @click="setPayType('wxpay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='wxpay'}">微信</view>
			</view>
			<view @click="pay" class="btn-row-submit">确定支付</view>
		</view>
		
	</view>
</template>

<script>
	import dtPay from "../../common/dtpay.js"; 
	export default{
		data:function(){
			return {
				paytype:"alipay",
				pageLoad:false, 
				pageHide:false,
				money:1
			 
			}
			
		},
		onLoad:function(option){
 
		},
		 
		methods:{
			setPayType:function(p){
				this.paytype=p;
			},
			pay:function(){
			 	var that=this;
			 	that.app.post({
			 		url:that.app.apiHost+"/recharge/pay?ajax=1",
			 		data:{
			 			money:that.money,
			 			backurl:that.app.appRoot+"#/pages/recharge/success",
						pay_type:that.paytype
			 		},
			 		success:function(res){
			 			dtPay.paytype=that.paytype;
			 			dtPay.pay({
			 				payurl:res.data.payurl,
			 				orderno:res.data.orderno
			 			});
			 		}
			 	})
			 	
			 }
		}
	}
</script>

<style>
</style>
