<template>
	<div>
		<div v-if="pageLoad">
			<image :src="pageData.data.imgurl" mode="widthFix" class="d-img"></image>
			<div class="row-box mgb-5">
				<div class="d-title bd-mp-10">{{pageData.data.title}}</div>

				<div v-if="pageData.data.isksid>0">
					<div id="ks1" class="kslist bd-mp-10">
						<div class="kslist-label">{{pageData.data.ks_label_name}}</div>

						<div @click="ks1(item.id)" class="kslist-item" v-bind:class="{'kslist-active':item.id==ksid1}" v-for="(item,index) in ksList" :key="index">{{item.title}}</div>


					</div>
					<div id="ks2" class="kslist bd-mp-10">
						<div class="kslist-label">{{pageData.data.ks_label_size}}</div>
						<div class="flex kslist-list">

							<div @click="ks2(item.id)" v-bind:class="{'kslist-active':item.id==ksid}" class="kslist-item" v-for="(item,index) in ksList2" :key="index">{{item.size}}</div>

						</div>
					</div>
				</div>
				<div class="flex flex-ai-center bd-mp-10">
					价格 <div class="flex-1 cl-money f22 mgl-5" id="price">￥{{price}}</div>
					<div class="numbox">
						<div @click="dMinus" class="numbox-minus">-</div>
						<input class="numbox-num" id="cart-amount" v-model="cart_amount" readonly=""  /> 
						<div @click="dPlus" class="numbox-plus">+</div>
					</div>

				</div>

			</div>
			<div class="pd-10 bg-fff">



				<div class="d-content">
					<rich-text :value="pageData.data.content"></rich-text>


				</div>
			</div>
		
		<div class="h60"></div>
		<div class="flcart">
			<navigator url="../b2c/index" class="flcart-f1">
				<div class="flcart-icon iconfont icon-home"></div>
				首页
			</navigator>
			<navigator url="../b2c_cart/index" class="flcart-f1">
				<div class="flcart-icon iconfont icon-cart"></div>
				购物车
			</navigator>
			<div class="flcart-f2" @click="addCart">加入购物车</div>
			<div @click="goBuy" class="flcart-f2 bg-f30">立即购买</div>
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				pageData: {},
				pageLoad: false,
				ksid:0,
				ksid1:0,
				ksList:[],
				ksList2:[],
				price:0,
				cart_amount:0
			}
		},
		onLoad:function(ops){
			this.getPage(ops.id);
		},
		methods: {
			getPage: function(id) {
				var that = this;
				uni.request({
					url: that.app.apiHost + "/module.php?m=b2c_product&a=show&ajax=1&id=" + id,
					data: {
						authcode: that.app.getAuthCode()
					},
					success: function(rs) {
						var res=rs.data;
						that.pageLoad = true;
						that.pageData = res.data;
						that.ksList=res.data.ksList;
						that.ksList2=res.data.ksList2;
						that.ksid=res.data.ksid;
						that.ksid1=res.data.ksid;
						that.price=res.data.data.price;
						that.cart_amount=res.data.cart_amount;
					}
				})
			},
			dMinus:function(){
				if(this.cart_amount>1){
					this.cart_amount--;
				}
				
			},
			dPlus:function(){
				this.cart_amount++;
			},
			ks1:function(id){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_product_ks&a=sizeList&ajax=1&id="+id,
					dataType:"json",
					data:{
						authcode:that.app.getAuthCode()
					},	
					success:function(rs){
						var res=rs.data;
						that.ksid1=res.data.ksid;
						that.ksid=res.data.ksid;
						that.ksproduct=res.data.product;
						that.price=res.data.ks.price;
						that.cart_amount=res.data.product.cart_amount;
						that.ksList2=res.data.ksList2;
					}
				})
			},
			ks2:function(id){
				var that=this;
				that.ksid=id;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_product_ks&a=get&ajax=1&id="+id,
					dataType:"json",
					data:{
						authcode:that.app.getAuthCode()
					},
					success:function(rs){
						var res=rs.data; 
						that.ksproduct=res.data.product;
						that.price=res.data.ks.price;
						that.cart_amount=res.data.product.cart_amount; 
					}
				 })
			},
			addCart: function() {
				var that = this; 
				var ksid=that.ksid;				 
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: that.pageData.data.id,
						amount: that.cart_amount,
						ksid: ksid,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
					success: function(rs) {
						var res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						uni.showToast({
							title:"加入成功"
						})
						 
					}
				})
			},
			goBuy:function(){
				var that = this; 
				var ksid=that.ksid;				 
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: that.pageData.data.id,
						amount: that.cart_amount,
						ksid: ksid,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
					success: function(rs) {
						var res=rs.data;
						if(res.error==1000){
							uni.navigateTo({
								url:"../login/index"
							});
							return false;
						}
						if(res.data.action=='delete'){
							return false;
						}
						uni.navigateTo({
							url:"../b2c_order/confirm?cartid="+res.data.cartid
						})
						 
					}
				})
			}
		}
	}
</script>

<style>
	.flcart {
		display: flex;
		flex-direction: row;
		position: fixed;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		font-size: 14px;
		line-height: 1.2;
		border-top: 1upx solid #eee;
		background-color: #fff;
		text-align: center;
	}

	.flcart-icon:before {
		padding-top: 10upx;
		clear: both;
		display: block;
		font-size: 14px;
		line-height: 1.2;
	}

	.flcart-f1,
	.flcart-f2 {
		height: 100upx;
	}

	.flcart-f1 {
		width: 132upx;
		display: inline-block;

		line-height: 50upx;
		font-size: 14px;
	}

	.flcart-f2 {
		flex: 1;
		line-height: 100upx;
		background-color: #f90;
		color: #fff;
		font-size: 14px;
	}

	.flcart .f3 {
		background-color: #f30;
	}

	.fcart .fbtn {}
</style>
