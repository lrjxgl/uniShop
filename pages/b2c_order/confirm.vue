<template>
	<div>
		<form v-if="pageLoad" id="orderForm" @submit="formSubmit">
		<div class="row-box mgb-5">
			<div class="row-box-hd">
				<div class="flex-1 f16">收货地址</div>
				<navigator class="row-box-more" url="../user_address/add">新增地址</navigator>
			</div>
			<input type="text" class="none" name="user_address_id" :value="pageData.user_address_id"  />
			<radio-group @change="changeAddr"> 
			<div class="row-item-text" v-for="(item,index) in pageData.addrList" :key="index">
				<radio  :checked="item.id==pageData.user_address_id" :value="item.id"  ></radio>	 
				{{item.truename}} {{item.telephone}} <br /> {{item.pct_address}}
			</div>
			</radio-group> 
		</div>
		<div class="row-box mgb-5">
			<div class="row-box-hd">
				产品列表
			</div>
			 
			<div class="flexlist-item" v-for="(item,index) in pageData.cartList" :key="index">
				<input type="hidden" class="none" :name="'cartid['+index+']'" :value="item.id" />
				<img :src="item.imgurl+'.100x100.jpg'" class="flexlist-img" />
				<div class="flex-1">
					<div class="flexlist-title">{{item.title}}</div>
					<div class="mgb-5 cl2">{{item.ks_title}}</div>
					<div class="flex">
						<div class="flex-1 cl-money">￥{{item.price}}</div>
						<div class="">* {{item.amount}}</div>
					</div>
				</div>
			</div>
			 
		</div>
		<div class="row-box mgb-5">
			<div class="flex flex-wrap flex-ai-center">
				<div>共{{pageData.total_num}}件商品，货价：￥ {{pageData.goods_money}}元 
				邮费：￥ {{pageData.express_money}} 元 </div>
				<div>总价：￥{{pageData.total_money}}</div>
			</div>
		</div>
		<!-- #ifdef H5 -->
		<div class="row-box mgb-5">
			<div class="row-box-hd mgb-10">支付方式</div>		
			<div class="paylist">
				<input type="text" class="none" name="paytype" id="paytype" :value="pageData.paytype">
				<div @click="changePaytype(index)" class="paylist-item" v-bind:class="{'paylist-item-active':index==paytype}" v-for="(item,index) in pageData.paytypeList" :key="index" >{{item}}</div>
				 	
			</div>
		</div>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<div class="row-box mgb-5">
			<div class="row-box-hd mgb-10">支付方式</div>		
		
			<div class="paylist flex-center">
				<div @click="changePaytype('alipay')" class="paylist-item" :class="{'paylist-item-active':paytype=='alipay'}">支付宝</div>
				<div @click="changePaytype('wxpay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='wxpay'}">微信</div>
			</div>
		</div>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<input type="text" class="none" name="paytype" id="paytype" value="wxapp_pay">
		<!-- #endif -->
		
		<div class="row-box">
			<textarea name="comment" class="textarea-flex-text h60" placeholder="请输入订单备注"></textarea>
			<button form-type="submit" class="btn-row-submit" >确认购买</button>
		</div>
		</form>
	</div>
</template>

<script>
	import dtPay from "../../common/dtpay.js";
	export default{
		data:function(){
			return {
				pageLoad:false,
				pageData:[],
				user_address_id:0,
				cartid:0,
				pageHide:false,
				paytype:"alipay"
			}			
		},
		onLoad:function(ops){
			console.log(ops);
			this.cartid=ops.cartid;
			this.getPage();
			
		},
		onHide:function(){
			this.pageHide=true;
		},
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}
			 
		},
		methods:{
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
						 
						cartid:that.cartid
					},
					success:function(res){
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
