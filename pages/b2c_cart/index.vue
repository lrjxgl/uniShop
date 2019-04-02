<template>
	<div>
		<div class="main-body" id="app" v-if="pageLoad">
			<div v-if="pageData.cartList==null" class="emptyData">购物车，暂无商品</div>
			<div v-else>
				<div class="flexlist" >
					<div class="flexlist-item" v-for="(item,index) in pageData.cartList" :key="index">
						<img :src="item.imgurl+'.100x100.jpg'" class="flexlist-img" />
						<div class="flex-1">
							<div class="flexlist-title">{{item.title}}</div>
							<div class="flexlist-row">
								<div class="">{{item.ks_title}}</div>
								<div class="cl-money">
									￥{{item.price}}
								</div>
								<div class="flex-1"></div>
								<div   class="numbox">
									<div @click="minusCart(item.productid,item.amount,item.ksid)" class="numbox-minus">-</div>
									<input type="text" name="amount" :value="item.amount" class="numbox-num" />
									<div @click="plusCart(item.productid,item.amount,item.ksid)" class="numbox-plus">+</div>	
								</div>
							</div>
							
						</div>
					</div>	
				</div>
				<div class="pd-10 flex">
					<div class="flex-1">
						共{{pageData.total_num}}件，总{{pageData.total_money}}元
					</div>
					<div @click="goConfirm" class="btn">确认购买</div>
				</div>
			</div>
		</div>
		<b2c-footer tab="cart"></b2c-footer>
	</div>
</template>

<script>
	import b2cFooter from "../../components/b2cfooter.vue"; 
	export default{
		components:{
			b2cFooter
		}, 
		data: function() {
			return {
				pageData: {},
				pageLoad:false,
			}
		},
		created: function() {
			this.getPage();
		},
		methods: {
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
							uni.showToast({
								title:"请先登录"
							})	
							return false;
						}
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
