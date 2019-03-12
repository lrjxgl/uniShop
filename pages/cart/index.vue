<template>
	<view>
		<view v-if="pageLoad">

			<view v-if=" !pageData.list " style="padding: 10px;">
				<view class="flex pd-10">
					您的购物车是空的,赶紧
					<text style="color: #f60;">去购买</text>吧
				</view>
			</view>



			<view v-else class="mgt-10">
				<view class="cartlist">
					
					<view v-for="($c,key) in pageData.list" :key="key" class="cartlist-item js-cart-item">
						 
						<image class="cartlist-item-img" :src="$c.imgurl+'.100x100.jpg'" width="50" height="50"></image>
						 
						<view class="flex-1">

							<view class="f16 pdb-5"> {{$c.title}}</view>
							<view class="flex-1"></view>
							<view class="flex">
								<view class="f14 corb" v-if="$c.ks_title !=''">{{$c.ks_title}}</view>
								￥
								<text class="f18 cor-money"> {{$c.price}} </text>元
							</view>
							<view class="pd-5 flex">
								<view class="numbox">
									<view href="javascript:;" class="numbox-minus" @click="minusCart($c.id,$c.amount)">-</view>
									<input class=" numbox-num" :value="$c.amount" readonly />
									<view href="javascript:;" class="numbox-plus" @click="plusCart($c.id,$c.amount)">+</view>
								</view>
								<view class="flex-1"></view>
								<view class="fr f14 cor-danger" @click="deleteCart($c.id)">删除</view>
							</view>

						</view>
					</view>

				</view>
				<view class="cartlist-total pd-10 flex">
					<view class="flex-1"></view>
					<view class="cartlist-total-item">共
						<text class="num">{{pageData.total_num}}</text> 件
					</view>
					<view class="cartlist-total-item"> 总价：￥
						<text class="num">{{pageData.total_money}}</text>元
					</view>
				</view>
				<view class="cartlist-btns">
					<navigator url="/pages/order/confirm">
						<view class="cartlist-btn">确认购买</view>
					</navigator>
				</view>
				<view class="clearfix"></view>

			</view>

		</view>
	 
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	var id;
	import mtFooter from "../../components/footer.vue";
	export default {
		components:{
			mtFooter
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad: function (option) {
			uni.setNavigationBarTitle({
				title: "购物车",
			})
			this.getPage();
		},
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}			
		},
		onHide:function(){
			this.pageHide=true;
		}, 
		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?m=order_cart&formapp='+app.formapp()+'&ajax=1",
					data: {
						authcode: app.getAuthCode()
					},
					success: function (res) {
						that.pageLoad = true;
						that.pageData = res.data.data;
						
					}
				})
			},
			plusCart:function(id,amount,ksid){
					var that=this;
					var id=id;
					var amount=amount;
					var ksid=ksid==undefined?0:ksid;
					amount++;
					uni.request({
					url: app.apiHost +'/index.php?m=order_cart&a=Num_plus&formapp='+app.formapp()+'&ajax=1',
					data: {
						authcode:uni.getStorageSync("authcode"),
						id:id,
						amount:amount,
						isplus:1,
						ksid:ksid
					},
					method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					// header: {}, // 设置请求的 header
					success: function(res){
						that.pageData=res.data.data;
	
					}
					})
			},
			minusCart:function(id,amount,ksid){
					var that=this;
					var id=id;
					var amount=amount;
					var ksid=ksid==undefined?0:ksid;
					amount--;
					var isdelete=0;
					if(amount==0){
						isdelete=1
					}
					uni.request({
						url: app.apiHost +'?m=order_cart&a=num_minus&formapp='+app.formapp()+'&ajax=1',
						data: {
							authcode:uni.getStorageSync("authcode"),
							amount:amount,
							isdelete:isdelete,
							isminus:1,
							id:id,
							amount:amount,
						},
						method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
						// header: {}, // 设置请求的 header
						success: function(res){
							 
							that.pageData=res.data.data;
							
						}
					})
			},
			 deleteCart:function(id){
				 var that=this;
				 var id=id;
				 uni.showModal({
				 	 title:"删除提示",
					 content:"删除后不可恢复,请确认删除",
					 success:function(res){
						 if(res.confirm){
							uni.request({
								url: app.apiHost+'?m=order_cart&a=delete&formapp='+app.formapp()+'&ajax=1&id='+id,
								data: {
									authcode:uni.getStorageSync("authcode") 
								},
								method: 'GET',  
									
								success: function(res){
									that.pageData=res.data.data;
								}
							})
						}
					 }
				 })
				 
			  } 
		},
	}
</script>

<style>
@import "../../common/cart.css";
</style>
