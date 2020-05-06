<template>
	<view>
		<view class="main-body" v-if="pageLoad">
			<view class="flex bg-fff pd-10 mgb-5">
				<div class="mgr-5" v-if="pageData.order.ispin"><div class="btn-mini btn-outline-primary ">拼</div></div>
				<view class="flex-1 cl2">单号：{{pageData.order.orderno}}</view>
				<view class="cl-primary">{{pageData.order.status_name}}</view>
			</view>
			<view class="flexlist">
				 
				<view v-for="(item,index) in pageData.prolist" :key="index" class="flexlist-item mgb-0">
		
					<view  class="flexlist-imgbox">
						<image :src="item.imgurl+'.100x100.jpg'" class="flexlist-img"></image>
					</view>
		
					<view class="flex-1">
						<view class="flexlist-title" >{{item.title}}</view>
						<view class="flex">
							<view class="cl2 mgr-10">{{item.ks_title}}</view>
							<view class="cl-num mgr-10">￥{{item.price}} </view>
							<view class="flex-1"></view>
							<view class="cl2">x {{item.amount}}</view>	
						</view>		
					</view>
				</view>
				 
				 
			</view>
			<view class="row-box mgb-5">
				<view class="flex mgb-5">
					共 <view class="cl-num">{{pageData.order.total_num}}</view> 件商品， 合计
					<view class="cl-num">￥{{pageData.order.money}}</view>元， 含运费
					<view class="cl-num">{{pageData.order.express_money}}</view>元
				</view>
				<view class="flex mgb-5">
					<view class="mgr-5 cl3 f12">创建时间</view>
					<view class="mgr-5 cl3 f12">{{pageData.order.createtime}}</view>
				</view>
				<view class="f14 mgb-5">备注</view>
				<view class="bg-light pd-10 cl3 bd-radius-10">
					{{pageData.order.comment}}
				</view>
			</view>
		
			<view class="row-box pdt-0 mgb-5">
				 
				<view class="flex-table">
					<view class="flex-table-label">联系人：</view>
					<view class="flex-table-box text-right">
						{{pageData.addr.truename}}
					</view>
				</view>
				<view class="flex-table">
					<view class="flex-table-label">手机：</view>
					<view class="flex-table-box text-right">
						{{pageData.addr.telephone}}
					</view>
				</view>
				<view class="flex-table">
					<view class="flex-table-label">收货地址：</view>
					<view class="flex-table-box text-right">
						{{pageData.addr.address}}
					</view>
				</view>
			</view>
			
				 
				<view class="row-box pdt-0" v-if="pageData.order.status==0">
					<view class="row-box flex flex-center">
						<view @click="goGuest()" class="btn btn-outline-primary ">联系客服</view>
						<block  v-if="pageData.order.ispin && pageData.order.ispay==1">
						<view class="btn-small btn-outline-success mgl-10" @click="goPin(pageData.order.orderid)" v-if="pageData.order.pin_success==0">邀请拼团</view> 
						</block>
						<view class="btn btn-outline-dark mgl-10" @click="cancel">取消订单</view>
						 
						<view v-if="pageData.order.ispay==0" @click="pay"  class="btn-small btn-outline-success mgl-20">去支付</view>
						
					</view>
					
				</view>
				 
				<view class="row-box pdt-0" v-if="pageData.order.status==1">
					<view class="row-box flex flex-center">
						<view class="btn btn-outline-primary ">联系客服</view>
					</view>
				</view>
				 
				<view class="row-box pdt-0" v-if="pageData.order.status==2">
					<view class="row-box flex flex-center">
						<view class="btn btn-outline-primary mgr-5">联系客服</view>
						<view class="btn btn-outline-primary mgr-5">查看物流</view>
						<view class="btn btn-outline-primary " @click="receive">确认收货</view>
					</view>
				</view>	
				 
				<view class="row-box pdt-0" v-if="pageData.order.status==3">
					<view class="row-box flex flex-center">
						<view class="btn btn-outline-primary mgr-5">联系客服</view>
						 
						<view class="btn btn-outline-primary " @click="goRaty()" v-if="pageData.order.israty==0">去评价</view>
						 
					</view>
				</view>	
				 

		</view>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				pageLoad:false,
				pageData:{},
				orderid:0,
			}
		},
		onLoad:function(ops){
			uni.setNavigationBarTitle({
				title:"订单详情"
			})
			this.orderid=ops.orderid;
			this.getPage();
		},
		methods:{
			goGuest:function(){
				uni.navigateTo({
					url:"../../pages/kefu/index"
				})
			},
			goPin:function(orderid){
				uni.navigateTo({
					url:"../b2c_pintuan/invite?orderid="+orderid
				})
			},
			getPage:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=show&ajax=1&orderid="+this.orderid,
					data:{
						authcode:that.app.getAuthCode()
					},
					success:function(res){
					 
						that.pageData=res.data.data;
						that.pageLoad=true;
					}
				})
			},
			cancel:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=cancel&ajax=1&orderid="+this.orderid,
					data:{
						authcode:that.app.getAuthCode()
					},
					success:function(rs){
						that.getPage();
					}	
				})
			},
			receive:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=receive&ajax=1&orderid="+this.orderid,
					data:{
						authcode:that.app.getAuthCode()
					},
					success:function(rs){
						that.getPage();
					}	
				})
			},
			goRaty:function(){
				uni.navigateTo({
					url:"../b2c_order/raty?orderid="+this.orderid
				})
			},
			pay:function(){
				uni.navigateTo({
					url:"../b2c_order/pay?orderid="+this.orderid
				})
			}
		}
	}
</script>

<style>
</style>
