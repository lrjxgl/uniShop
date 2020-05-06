<template>
	<view >
		<view v-if="pageLoad">
			<view v-if="pageTab=='submit'">
				<view class="flex flex-center mgb-20 mgt-10">
					<view class="iconfont icon-squarecheck cl-red f36 mgr-5"></view>
					<view class="">
						<view class="f18">下单成功</view>
						<view class="f14">正在支付订单..</view>
					</view>
				</view>
				<view class="flex flex-jc-center  mgb-20">
					 
					<view class="btn btn-primary" @click="goHome">返回首页</view>
				</view>
			</view>
			<form v-if="pageTab=='confirm'" id="orderForm" @submit="formSubmit">
				<view class="none">
					<input type="hidden" name="ispin" :value="ispin" />
					<input type="hidden" name="pin_orderid" :value="pin_orderid" />
				</view>
			<view class="row-box mgb-5">
				<view class="row-box-hd">
					<view class="flex-1 f16">收货地址</view>
					<navigator class="row-box-more" url="../../pages/user_address/add">新增地址</navigator>
				</view>
				<input type="text" class="none" name="user_address_id" :value="pageData.user_address_id"  />
				<radio-group @change="changeAddr"> 
				<view class="row-item-text" v-for="(item,index) in pageData.addrList" :key="index">
					<radio  :checked="item.id==pageData.user_address_id" :value="item.id"  ></radio>	 
					{{item.truename}} {{item.telephone}} <br /> {{item.pct_address}}
				</view>
				</radio-group> 
			</view>
			<view class="row-box mgb-5">
				<view class="row-box-hd">
					产品列表
				</view>
				 
				<view class="flexlist-item" v-for="(item,index) in pageData.cartList" :key="index">
					<input type="hidden" class="none" :name="'cartid['+index+']'" :value="item.id" />
					<img :src="item.imgurl+'.100x100.jpg'" class="flexlist-img" />
					<view class="flex-1">
						<view class="flexlist-title">{{item.title}}</view>
						<view class="mgb-5 cl2">{{item.ks_title}}</view>
						<view class="flex">
							<div class="flex-1 cl-money" v-if="pageData.ispin">￥{{item.pt_price}}</div>
							<div class="flex-1 cl-money" v-else="pageData.ispin">￥{{item.price}}</div>
							<view class="">* {{item.amount}}</view>
						</view>
					</view>
				</view>
				 
			</view>
			<view class="row-box mgb-5">
				<view class="flex flex-wrap flex-ai-center">
					<view>共{{pageData.total_num}}件商品，货价：￥ {{pageData.goods_money}}元 
					邮费：￥ {{pageData.express_money}} 元 </view>
					<view>总价：￥{{pageData.total_money}}</view>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view class="row-box mgb-5">
				<view class="row-box-hd mgb-10">支付方式</view>		
				<view class="paylist">
					<input type="text" class="none" name="paytype" id="paytype" :value="pageData.paytype">
					<view @click="changePaytype(index)" class="paylist-item" v-bind:class="{'paylist-item-active':index==paytype}" v-for="(item,index) in pageData.paytypeList" :key="index" >{{item}}</view>
						
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="row-box mgb-5">
				<view class="row-box-hd mgb-10">支付方式</view>		
			
				<view class="paylist flex-center">
					<view @click="changePaytype('alipay')" class="paylist-item" :class="{'paylist-item-active':paytype=='alipay'}">支付宝</view>
					<view @click="changePaytype('wxpay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='wxpay'}">微信</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<input type="text" class="none" name="paytype" id="paytype" value="wxapp_pay">
			<!-- #endif -->
			
			<view class="row-box">
				<textarea name="comment" class="textarea-flex-text h60" placeholder="请输入订单备注"></textarea>
				<button form-type="submit" class="btn-row-submit" >确认购买</button>
			</view>
			</form>
		</view>
	</view>
</template>

<script>
	import dtPay from "../../common/dtpay.js";
	export default{
		data:function(){
			return {
				pageLoad:false,
				pageData:[],
				pageTab:"confirm",
				user_address_id:0,
				cartid:0,
				pageHide:false,
				paytype:"alipay",
				ispin:0,
				pin_orderid:0
			}			
		},
		onLoad:function(ops){
			if(ops.ispin!=undefined){
				this.ispin=ops.ispin;
			}
			if(ops.orderid!=undefined){
				this.pin_orderid=ops.orderid;
			}
			this.cartid=ops.cartid;
			this.getPage();
			
		},
		onHide:function(){
			this.pageHide=true;
		},
		onShow:function(){
			if(this.pageHide && this.pageTab=='confirm'){
				this.pageHide=false;
				this.getPage();
			}
			 
		},
		methods:{
			goHome:function(){
				this.app.goHome();
			},
			changeAddr:function(e){				
				this.pageData.user_address_id=e.detail.value;
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=confirm&ajax=1",
					data:{						
						cartid:that.cartid,
						user_address_id:this.pageData.user_address_id
					},
					success:function(res){						 
						that.pageData=res.data;
					}
				}) 
			},
			changePaytype:function(paytype){
				this.paytype=paytype;
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=confirm&ajax=1",
					data:{
						ispin:that.ispin, 
						cartid:that.cartid,
						pin_orderid:that.pin_orderid
					},
					success:function(res){
						that.ispin=res.data.ispin;
						that.pin_orderid=res.data.pin_orderid;
						that.paytype=res.data.paytype;
						that.pageLoad=true;
						that.pageData=res.data;
					}
				})
			},
			formSubmit:function(e){
 				
				var that=this;
				e.detail.value.backurl=that.app.appRoot+"#/pages/b2c_order/success";
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=order&ajax=1&authcode="+that.app.getAuthCode(),
					data:e.detail.value,
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded"
					},
					success:function(rs){
						if(rs.data.error){
							uni.showToast({
								title:rs.data.message
							})
							return false;
						}
						that.pageTab="submit";
						if(rs.data.data.action=='pay'){
							dtPay.paytype=that.paytype;
							dtPay.pay({
								payurl:rs.data.data.payurl,
								orderno:rs.data.data.orderno
							});						
						}
					}	
				})
			}
		}
	}
</script>

<style>
</style>
