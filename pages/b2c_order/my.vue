<template>
	<div>
		<div id="app">
			<div class="tabs-border">
				<div @click="setType('all')" v-bind:class="{'tabs-border-active':type=='all'}" class="tabs-border-item ">全部</div>
				<div @click="setType('unpay')"  v-bind:class="{'tabs-border-active':type=='unpay'}" class="tabs-border-item">待付款</div>
				<div @click="setType('unsend')"  v-bind:class="{'tabs-border-active':type=='unsend'}" class="tabs-border-item">待发货</div>
				<div @click="setType('unreceive')"  v-bind:class="{'tabs-border-active':type=='unreceive'}" class="tabs-border-item">待收货</div>
				<div @click="setType('unraty')"  v-bind:class="{'tabs-border-active':type=='unraty'}" class="tabs-border-item">待评价</div>
			</div>
			<div class="item row-box mgb-10" v-for="(item,index) in pageData.list" :key="index">
				<div class="flex bd-mp-5">
					<div class="flex-1 cl2">订单号：{{item.orderno}}</div>
					<div class="cl-primary">{{item.status_name}}</div>
				</div>
				<div class="flexlist-item" v-for="(pro,proIndex) in item.prolist" :key="proIndex">
					<img class="flexlist-img" :src="pro.imgurl+'.100x100.jpg'">
					<div class="flex-1">
						<div class="flexlist-title">{{pro.title}}</div>
						<div class="flexlist-ks">{{pro.ks_title}}</div>
						<div class="flex ">
							<div class="flex-1 cl-money">￥{{pro.price}}</div>
							<div class="cl3">x {{pro.amount}}</div>
						</div>
						
					</div>
				</div>
				 
				<div class="flex mgb-10">
					 共<div class="cl-num">{{item.total_num}}</div>件商品  
					 合计：<div class="cl-money">￥{{item.money}}</div>元 
					 <div class="flex-1"></div> 
					 
				</div>
				<div v-if="item.status==0" class="flex flex-jc-end">
					
					<div v-if="item.ispay==0" @click="pay(item.orderid)" class="btn-small btn-outline-danger mgr-10">去支付</div>
					<div class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</div>
				</div>
				<div v-else-if="item.status==1" class="flex flex-jc-end">
					<div class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</div>
				</div>
				<div v-else-if="item.status==2" class="flex flex-jc-end">
					<div class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</div>
				</div>
				<div v-else-if="item.status==3" class="flex flex-jc-end">
					<div class="btn-small  btn-outline-danger" @click="goOrder(item.orderid)">查看详情</div>
				</div>	
			</div>
		</div>
	</div>
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
