<template>
	<div>
		<div class="main-body" v-if="pageLoad">
			<div class="flex bg-fff pd-10 mgb-5">
				<div class="flex-1 cl2">单号：{{pageData.order.orderno}}</div>
				<div class="cl-primary">{{pageData.order.status_name}}</div>
			</div>
			<div class="flexlist">
				 
				<div v-for="(item,index) in pageData.prolist" :key="index" class="flexlist-item mgb-0">
		
					<div  class="flexlist-imgbox">
						<image :src="item.imgurl+'.100x100.jpg'" class="flexlist-img"></image>
					</div>
		
					<div class="flex-1">
						<div class="flexlist-title" >{{item.title}}</div>
						<div class="flex">
							<div class="cl2 mgr-10">{{item.ks_title}}</div>
							<div class="cl-num mgr-10">￥{{item.price}} </div>
							<div class="flex-1"></div>
							<div class="cl2">x {{item.amount}}</div>	
						</div>		
					</div>
				</div>
				 
				 
			</div>
			<div class="row-box mgb-5">
				<div class="flex mgb-5">
					共 <div class="cl-num">{{pageData.order.total_num}}</div> 件商品， 合计
					<div class="cl-num">￥{{pageData.order.money}}</div>元， 含运费
					<div class="cl-num">{{pageData.order.express_money}}</div>元
				</div>
				<div class="f14 mgb-5">备注</div>
				<div class="bg-light pd-10 cl3 bd-radius-10">
					{{pageData.order.comment}}
				</div>
			</div>
		
			<div class="row-box pdt-0 mgb-5">
				 
				<div class="flex-table">
					<div class="flex-table-label">联系人：</div>
					<div class="flex-table-box text-right">
						{{pageData.addr.truename}}
					</div>
				</div>
				<div class="flex-table">
					<div class="flex-table-label">手机：</div>
					<div class="flex-table-box text-right">
						{{pageData.addr.telephone}}
					</div>
				</div>
				<div class="flex-table">
					<div class="flex-table-label">收货地址：</div>
					<div class="flex-table-box text-right">
						{{pageData.addr.address}}
					</div>
				</div>
			</div>
			
				 
				<div class="row-box pdt-0" v-if="pageData.order.status==0">
					<div class="row-box flex flex-center">
						<div class="btn btn-outline-primary ">联系客服</div>
						<div class="btn btn-outline-dark mgl-20" @click="cancel">取消订单</div>
						 
						<div v-if="pageData.order.ispay==0" @click="pay"  class="btn-small btn-outline-success mgl-20">去支付</div>
						 
					</div>
				</div>
				 
				<div class="row-box pdt-0" v-if="pageData.order.status==1">
					<div class="row-box flex flex-center">
						<div class="btn btn-outline-primary ">联系客服</div>
					</div>
				</div>
				 
				<div class="row-box pdt-0" v-if="pageData.order.status==2">
					<div class="row-box flex flex-center">
						<div class="btn btn-outline-primary mgr-5">联系客服</div>
						<div class="btn btn-outline-primary mgr-5">查看物流</div>
						<div class="btn btn-outline-primary " @click="receive">确认收货</div>
					</div>
				</div>	
				 
				<div class="row-box pdt-0" v-if="pageData.order.status==3">
					<div class="row-box flex flex-center">
						<div class="btn btn-outline-primary mgr-5">联系客服</div>
						 
						<div class="btn btn-outline-primary " @click="goRaty()" v-if="pageData.order.israty==0">去评价</div>
						 
					</div>
				</div>	
				 

		</div>
	</div>
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
