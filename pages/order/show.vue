<template>
	<view>
		<view class="bg-a" v-if="pageLoad">
			<div class="row-box bdb">
				<div class="cl3 f16 mgb-5">{{pageData.data.status_name}}</div>
				<div v-if="pageData.data.status==2">
					<div class="cl2 f12">物流公司：顺丰(厦门)</div>
					<div class="cl2 f12">物流单号：123123123123</div>
				</div>
			</div>
			<div class="row-box mgb-5">
					<div class="flex">
						<div class="mgl-10 mgr-10">
							<div class="iconfont icon-location_light"></div>
						</div>
						<div class="flex-1">
							<div class="cl1">{{pageData.addr.truename}} {{pageData.addr.telephone}}</div>
							<div class="cl3">{{pageData.addr.address}}</div>
						</div>
					</div>
			</div>
			<view class="row-box mgb-5">
				 
				<view class="flexlist">
					<view class="flexlist-item" v-for="($p,index) in pageData.order_product" :key="index">
						<image :src="$p.imgurl+'.100x100.jpg'" class="flexlist-img"></image>
						<view class="flex-1">
							<view class="flexlist-title">{{$p.title}}</view>
							<view class="flexlist-ks">{{$p.ks_title}}</view>
							<view class="flexlist-price pdr-10 flex">
								
								<text class="f18 cl-money mgr-10"> ￥{{$p.price}}</text>
								
								<text class="market-price">{{$p.market_price}}</text>
								<view class="flex-1"></view>
								
								<text class="f16 cl-num">x {{$p.amount}}</text>
							</view>
						</view>
					</view>

				</view>
				<div class="flex">
					<div class="flex-1 cl-money">实付金额：</div>
					<div class="cl-money">￥{{pageData.data.money}}</div>
				</div>
				
			</view>
			
	 
			
			<view class="row-box mgb-5">
    	
     
				<view class="flex-table">
					<view class="flex-table-label">下单时间</view>
					<view class="flex-table-box">{{pageData.data.createtime}}</view>
				</view>
				<view class="flex-table">
					<view class="flex-table-label">订单编号</view>
					<view class="flex-table-box">{{pageData.data.orderno}}</view>
				</view>
			 <view class="flex-table">
				<view class="flex-table-label">收货时间</view>
				<view class="flex-table-box">{{pageData.data.createtime}}</view>
			 </view>
    	
    	 
    	  
    </view>
		<div class="pd-10 flex flex-center">
			<div v-if="pageData.data.status==0" class="flex">
					<div @click="goPay" v-if="pageData.data.ispay==1" class="btn-small mgr-10">去支付</div>
					<div @click="cancelOrder" class="btn-small">取消订单</div>
			</div>
			 
			 <div @click="receiveOrder" v-if="pageData.data.status==2" class="btn-small">确认收货</div>
			 <div v-if="pageData.data.status==3">
				<div @click="goComment" v-if="pageData.data.iscomment==0" class="btn-small">评价订单</div>
			 </div> 
		</div>
		</view>
	</view>
</template>

<script>
	var order_id;
	export default {
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				
			}
		},
		onLoad: function (option) {
			order_id = option.order_id;
			this.getPage();
		},

		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: that.app.apiHost + "?m=order&a=show&ajax=1&order_id=" + order_id,
					data: {
						authcode: that.app.getAuthCode()
					},
					success: function (data) {
						that.pageLoad = true;
						that.pageData = data.data.data;

					}
				})
			},
			goPay:function(){
				
			},
			cancelOrder:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?m=order&a=cancel&ajax=1",
					data:{
						authcode: that.app.getAuthCode(),
						order_id:order_id
					},
					success:function(res){
						if(res.data.error){
							uni.showToast({
								title:res.data.message
							})
						}
					}
				})
			},
			receiveOrder:function(){
				
			},
			goComment:function(){
				
			}
		},
	}
</script>

<style>
.statusBox{
	background-color: #f17d30;
	color: #fff;
	padding: 20px;
}
.cl-e0{
	color: #e0e0e0 ;
}
</style>
