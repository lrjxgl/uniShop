<template>
	<div>
		<div class="row-box">
			<div class="paylist flex-center">
				<div @click="setPayType('alipay')" class="paylist-item" :class="{'paylist-item-active':paytype=='alipay'}">支付宝</div>
				<div @click="setPayType('wxpay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='wxpay'}">微信</div>
			</div>
			<div @click="pay" class="btn-row-submit">确定支付</div>
		</div>
	</div>
</template>

<script>
	import dtPay from "../../common/dtpay.js";
	export default{
		data:function(){
			return {
				orderid:0,
				paytype:"alipay"
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
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=pay&ajax=1",
					data:{
						orderid:that.orderid,
						authcode:that.app.getAuthCode(),
						backurl:that.app.appRoot+"#/pages/b2c_order/success"
					},
					success:function(rs){
						dtPay.paytype=that.paytype;
						dtPay.pay({
							payurl:rs.data.data.payurl,
							orderno:rs.data.data.orderno
						});
					}
				})
				
			}
		}
	}
</script>

<style>
</style>
