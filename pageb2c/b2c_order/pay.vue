<template>
	<view>
		<view class="row-box">
			<view class="paylist flex-center">
			<!-- #ifdef MP-WEIXIN -->
				<view @click="setPayType('wxpay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='wxpay'}">微信</view>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
				<view @click="setPayType('alipay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='alipay'}">微信</view>
			<!-- #endif -->
			 <!-- #ifdef H5 || APP -->
			 
			 	<view @click="setPayType('alipay')" class="paylist-item" :class="{'paylist-item-active':paytype=='alipay'}">支付宝</view>
			 	<view @click="setPayType('wxpay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='wxpay'}">微信</view>
			 
			 <!-- #endif -->
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
				orderid:0,
				paytype:"wxpay"
			}
		},
		onLoad:function(ops){
			this.orderid=ops.orderid;
			 
		},
		methods:{
			setPayType:function(p){
				this.paytype=p;
				console.log(this.paytype)
			},
			pay:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/mm/b2c_order/pay",
					data:{
						orderid:that.orderid,
						backurl:that.app.appRoot+"#/pages/b2c_order/success"
					},
					success:function(rs){
						dtPay.paytype=that.paytype;
						dtPay.pay({
							payurl:rs.data.payurl,
							orderno:rs.data.orderno
						});
					}
				})
				
			}
		}
	}
</script>

<style>
</style>
