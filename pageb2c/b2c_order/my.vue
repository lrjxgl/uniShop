<template>
	<view>
		<view id="app">
			<view class="tabs-border">
				<view @click="setType('all')" v-bind:class="{'tabs-border-active':type=='all'}" class="tabs-border-item ">全部</view>
				<view @click="setType('unpay')"  v-bind:class="{'tabs-border-active':type=='unpay'}" class="tabs-border-item">待付款</view>
				<view @click="setType('unpin')"  v-bind:class="{'tabs-border-active':type=='unpin'}" class="tabs-border-item">待成团</view>
				<view @click="setType('unsend')"  v-bind:class="{'tabs-border-active':type=='unsend'}" class="tabs-border-item">待发货</view>
				<view @click="setType('unreceive')"  v-bind:class="{'tabs-border-active':type=='unreceive'}" class="tabs-border-item">待收货</view>
				<view @click="setType('unraty')"  v-bind:class="{'tabs-border-active':type=='unraty'}" class="tabs-border-item">待评价</view>
			</view>
			<view class="item row-box mgb-10" v-for="(item,index) in pageData.list" :key="index">
				<view class="flex bd-mp-5">
					<div v-if="item.ispin==1" class="mgr-5 flex"><div class="btn-mini btn-outline-primary ">拼</div></div>
					<view class="flex-1 cl2">订单号：{{item.orderno}}</view>
					<view class="cl-primary">{{item.status_name}}</view>
				</view>
				<view class="flexlist-item" v-for="(pro,proIndex) in item.prolist" :key="proIndex">
					<img class="flexlist-img" :src="pro.imgurl+'.100x100.jpg'">
					<view class="flex-1">
						<view class="flexlist-title">{{pro.title}}</view>
						<view class="flexlist-ks">{{pro.ks_title}}</view>
						<view class="flex ">
							<view class="flex-1 cl-money">￥{{pro.price}}</view>
							<view class="cl3">x {{pro.amount}}</view>
						</view>
						
					</view>
				</view>
				 
				<view class="flex mgb-10">
					 共<view class="cl-num">{{item.total_num}}</view>件商品  
					 合计：<view class="cl-money">￥{{item.money}}</view>元 
					 <view class="flex-1"></view> 
					 
				</view>
				<view v-if="item.status==0" class="flex flex-jc-end">
					
					<view v-if="item.ispay==0" @click="pay(item.orderid)" class="btn-small btn-outline-danger mgr-10">去支付</view>
					<block v-else-if="item.ispin==1">
						<view class="btn-small btn-outline-success mgr-5" @click="goPin(item.orderid)" v-if="item.pin_success==0">邀请拼团</view>
					</block>
					
					<view class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</view>
				</view>
				<view v-else-if="item.status==1" class="flex flex-jc-end">
					<view class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</view>
				</view>
				<view v-else-if="item.status==2" class="flex flex-jc-end">
					<view class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</view>
				</view>
				<view v-else-if="item.status==3" class="flex flex-jc-end">
					<view class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</view>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
 
	export default{
	 
		data:function(){
			return {
				pageData:[],
				type:"all"
			}
		},
		onLoad:function(ops){
			uni.setNavigationBarTitle({
				title:"我的订单"
			})
			if(ops.type!=undefined){
				this.type=ops.type;
			}
			this.getPage();
		},
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=my&ajax=1",
					data:{
						type:that.type,
						authcode:that.app.getAuthCode()
					},
					dataType:"json",
					success:function(rs){
						var res=rs.data;
						that.pageData=res.data;
					}
				})
			},
			goOrder:function(orderid){
				uni.navigateTo({
					url:"../b2c_order/show?orderid="+orderid
				})
			},
			goPin:function(orderid){
				uni.navigateTo({
					url:"../b2c_pintuan/invite?orderid="+orderid
				})
			},
			setType:function(t){
				this.type=t;
				this.getPage();
			},
			pay:function(orderid){
				uni.navigateTo({
					url:"../b2c_order/pay?orderid="+orderid
				})
			}
		}
	}
</script>

<style>
</style>
