<template>
	<view>
		<view class="main-body" id="app" >
			<view v-if="unLogin" >
				<view class="row-box mgb-10">
					<div class="emptyData">您还未登录</div>
					<div class="flex mgb-10  flex-center">
						<div @click="gourl('../../pages/login/index')" class="btn">去登录</div>
					</div>
				</view>
				<b2c-reclist></b2c-reclist>
			</view>
			<view v-if="pageLoad">
				<view v-if="pageData.cartList==null">
					<view class="emptyData">购物车，暂无商品</view>
					<b2c-reclist ptitle="猜你喜欢"></b2c-reclist>
				</view>	
				<view v-else>
					<view class="flexlist" >
						<view class="flexlist-item" v-for="(item,index) in pageData.cartList" :key="index">
							<img :src="item.imgurl+'.100x100.jpg'" class="flexlist-img" />
							<view class="flex-1">
								<view class="flexlist-title">{{item.title}}</view>
								<view class="flexlist-row">
									<view class="">{{item.ks_title}}</view>
									<view class="cl-money">
										￥{{item.price}}
									</view>
									<view class="flex-1"></view>
									<view   class="numbox">
										<view @click="minusCart(item.productid,item.amount,item.ksid)" class="numbox-minus">-</view>
										<input type="text" name="amount" :value="item.amount" class="numbox-num" />
										<view @click="plusCart(item.productid,item.amount,item.ksid)" class="numbox-plus">+</view>	
									</view>
								</view>
								
							</view>
						</view>	
					</view>
					<view class="pd-10 flex">
						<view class="flex-1">
							共{{pageData.total_num}}件，总{{pageData.total_money}}元
						</view>
						<view @click="goConfirm" class="btn">确认购买</view>
					</view>
				</view>
			</view>
		</view>
		<b2c-footer tab="cart"></b2c-footer>
	</view>
</template>

<script>
	import b2cFooter from "../../components/b2cfooter.vue";
	import b2cReclist from "../../components/b2c-reclist.vue";
	export default{
		components:{
			b2cFooter,
			b2cReclist
		}, 
		data: function() {
			return {
				pageData: {},
				pageLoad:false,
				unLogin:true
			}
		},
		created: function() {
			this.getPage();
		},
		onShow:function(){
			this.getPage();
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		},
		methods: {
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage: function() {
				var that = this;
				uni.request({
					url: that.app.apiHost+"/module.php?m=b2c_cart&ajax=1",
					data:{
						authcode:that.app.getAuthCode()
					},
					dataType: "json",
					success: function(rs) {
						var res=rs.data;
						if(res.error==1000){
								
							return false;
						}
						that.unLogin=false;
						that.pageLoad=true;
						that.pageData = res.data;
					}
				})
			},
			plusCart: function(id, amount, ksid) {
				var that = this;
				var productid = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount++;
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: productid,
						amount: amount,
						ksid: ksid,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
	
					success: function(res) {
						that.getPage();
					}
				})
			},
			minusCart: function(id, amount, ksid) {
				var that = this;
				var productid = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount--;
				var isdelete = 0;
				if (amount == 0) {
					isdelete = 1
				}
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: productid,
						amount: amount,
						ksid: ksid,
						isdelete: isdelete,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
	
					success: function(res) {
						that.getPage();
					}
				})
			},
			goConfirm:function(){
				uni.navigateTo({
					url:"../b2c_order/confirm"
				})
			}
			 
		}
	};
	
</script>

<style>
</style>
