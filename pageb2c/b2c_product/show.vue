<template>
	<view class="bg-ef">
		<view v-if="pageLoad">
			<video class="video" objectFit="contain" v-if="data.videourl!=''" :src="data.videourl"></video>
			<view  v-else-if="imgsdata.length>0" >
				<swiper :style="{height:swipeHeight+'px'}"  :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item    v-for="(item,key) in imgsdata" :key="key">
						 
							<image class="wall" @click="showImg" :src="item"  mode="widthFix" ></image>
						 
					</swiper-item>
				
				</swiper>
			</view>
			
			<view v-else-if="data.imgurl">
				<image class="d-img" mode="widthFix" :src="data.imgurl+'.middle.jpg'" ></image>
			</view>
			<view class="row-box mgb-5">
				<view class="d-title bd-mp-10">{{data.title}}</view>
				<view class="flex mgb-5 flex-ai-center">
					<view class="cl-money mgr-10 f18">￥{{data.price}}</view>
					<view class="market-price f12">￥{{data.market_price}}</view>
				</view>
				<view class="flex">
					<view class="flex-1 cl3 f12">销量: {{data.buy_num}}</view>
					<view class="flex-1 cl3 f12">库存: {{data.total_num}}</view>
					<view class="flex-1 cl3 f12">人气: {{data.view_num}}</view>
				</view>
			</view>
			<view v-if="order" class="row-box mgb-5">
				<view class="mgb-10 flex flex-ai-center">
					<view class="f16 mgr-10"> {{order.nickname}}发起的团</view>
					<view class="js-timego mgr-5 f12 cl3">{{order.timestr}}</view>
					
					<view class="cl3">快来帮Ta成团</view>
				</view>
				<view class="flex flex-ai-center">
					<view class="flex-1">
						<view class="text-center cl2 mgb-5">参与</view>
						<view class="cl-num text-center"> {{order.pin_num}}</view>
					</view>
					<view class="flex-1">
						<view class="text-center cl2 mgb-5">需要</view>
						<view class="cl-num text-center"> {{data.pt_min}}</view>
					</view>
					<view class="flex-1">			 
						<view v-if="order.timego<0" class="btn-small btn-disable"   ispin="1">已结束</view>					 
						<view v-else  @click="setOrder(order.orderid)" class="btn-small ppBox-Show" ispin="1">参加拼团</view>					
					</view>
					
				</view>
			</view>	
			<view v-if="data.isksid || Object.keys(fieldsList).length>0" class="row-box mgb-5 ">
				<view @click="ppBoxShow" v-if="data.isksid" class="flex mgb-10 ppBox-Show pointer">
					<view class="mgr-5 cl3">选择</view>
					<view class="flex-1">
						<view class="cl2 mgb-5">{{data.ks_label_name}},{{data.ks_label_size}}</view>

					</view>
					<view class="iconfont icon-right f14 cl3"></view>
				</view>


				<view @click="attBoxClass='flex-col'" v-if="Object.keys(fieldsList).length>0" class="flex flex-ai-center  pointer" id="attBox-show">
					<view class="mgr-5 cl3">参数</view>
					<view class="flex-1 f12 flex " style="overflow: hidden;">
						<block v-for="(c,i) in fieldsList" :key="i">
							<view>
								{{c.title}}
							</view>
						</block>
					</view>
					<view class="iconfont icon-right f14 cl3"></view>
				</view>


			</view>
			<view v-if="pts.length>0" class="row-box mgb-10">
				<view class="flex flex-ai-center bd-mp-5">
					<view class="fwb">{{pts_num}}人在拼团，可直接参与</view>
					 
				</view>
				<view class="pdList">
			 
					<block v-for="($c,i) in pts" :key="i">
					<view class="pdList-item">
						<img :src="$c.user_head+'.100x100.jpg'" class="pdList-img" />
						<view class="pdList-nick">{{$c.nickname}}</view>
						<view class="mgr-5">
							<view class="f12 flex">还差<view class="cl-num">{{$c.need_num}}</view>人拼成</view>
							<view class="cl3 f12 js-timego">{{$c.timestr}}</view>
						</view>
						<view class="btn-small ppBox-Show" @click="setOrder($c.orderid)"  ispin="1">去拼单</view>
					</view>
					</block>
					 
				</view>
			</view>
			<b2c-proraty :productid="data.id"></b2c-proraty>



			<view v-if="data.content" class="pd-10 bg-fff">
				<view class="d-content">
					<mp-html :content="data.content" /> 
				</view>
			</view>
			<view class="row-box mgb-5">
				<view class="flex flex-center ">
					<text class="iconfont icon-like cl-red mgr-5"></text>
					<text class="cl-red">购买此商品的人还买</text> 
				</view>	
			</view>
			
			<b2c-likelist :productid="data.id"></b2c-likelist>
			<view class="h60"></view>
			<view v-if="ispin" class="flcart">
				 
				<view @click="favToggle" :class="favClass" class="flcart-f1 cl2 pointer">
					<view :class="favClass" class="flcart-icon iconfont icon-likefill cl2"></view>
					收藏
				</view>

				<view @click="ptBuy(0)" class="bt-a ppBox-Show">
					<view class="bt-a-f">￥{{data.price}}</view>
					<view class="bt-a-f">单独购买</view>
				</view>
				<view @click="ptBuy(1)" class="bt-b ppBox-Show" ispin="1">
					<view class="bt-a-f">￥{{data.pt_price}}</view>
					<view class="bt-a-f">发起拼单</view>
				</view>
			</view>
			<view v-else class="flcart">
				
				<view @click="favToggle" :class="favClass" class="flcart-f1 cl2 pointer">
					<view :class="favClass" class="flcart-icon iconfont icon-likefill cl2"></view>
					收藏
				</view>
				<navigator url="../b2c_cart/index" class="flcart-f1">
					<view class="flcart-icon iconfont icon-cart"></view>
					购物车
				</navigator>
				 
				<view class="flcart-f2" @click="ppBoxShow(false)">加入购物车</view>
				<view @click="ppBoxShow(true)" class="flcart-f2 bg-f30">立即购买</view>
			</view>
			<view id="ppBox" :class="ppBoxClass" class="modal-group ">
				<view @click="ppBoxClass=''" class="modal-mask"></view>

				<view class="ppBox ani-bottom">
					<view id="ppBox-close" @click="ppBoxClass=''" class="ppBox-close iconfont icon-close"></view>
					<view class="flex flex-jc-center mgb-10">
						<img class="wh-80 mgr-10" :src="data.imgurl+'.100x100.jpg'" />
						<view class="flex-1 flex-jc-center">
							<view class="cl-money mgb-5">￥{{price}}</view>
							<view class="f12 cl2 mgb-5">库存{{data.total_num}}件</view>

							<view v-if="data.isksid" class="f12">选择 {{data.ks_label_name}},{{data.ks_label_size}}</view>

						</view>
					</view>

					<template v-if="data.isksid>0">
						<view class="kslist-label mgb-5">{{data.ks_label_name}}</view>
						<view id="ks1" class="kslist bd-mp-10 pdl0">
							<block v-for="(item,i) in ksList" :key="i">
								<view @click="ks1(item.id)" v-bind:class="{'kslist-active':item.id==ksid1}" class="kslist-item">{{item.title}}</view>
							</block>
						</view>
						<view class="kslist-label mgb-5">{{data.ks_label_size}}</view>
						<view id="ks2" class="kslist bd-mp-10 pdl0">

							<view class="flex kslist-list ">
								<block v-for="(item,i) in ksList2" :key="i">
									<view @click="ks2(item.id)" v-bind:class="{'kslist-active':item.id==ksid}" class="kslist-item">

										{{item.size}}</view>
								</block>
							</view>
						</view>
					</template>
					<view class="flex flex-ai-center bd-mp-10">
						<view class="f14">购买数量</view>
						<view class="flex-1"></view>
						<view class="numbox">
							<view @click="dMinus" class="numbox-minus">-</view>
							<input class="numbox-num" id="cart-amount" readonly="" :value="cart_amount" />
							<view @click="dPlus" class="numbox-plus">+</view>
						</view>

					</view>
					<view class="btn-row-submit" @click="addCart" id="addCart">确定</view>
				</view>
			</view>

			<view v-if="Object.keys(fieldsList).length>0" id="attBox" :class="attBoxClass" class="modal-group">
				<view @click="attBoxClass=''" class="modal-mask"></view>
				<view class="ppBox ani-bottom">
					<view class="text-center mgb-10">产品参数</view>
					<table-fields :fieldsList="fieldsList"></table-fields>
					<view @click="attBoxClass=''" class="btn-row-submit" id="attBox-close">关闭</view>
				</view>
			</view>
		</view>




	</view>
</template>

<script>
	import b2cProraty from "../../components/b2c/b2c-proraty.vue";
	import tableFields from "../../components/tablefield/tablefield-show.vue";
	import b2cLikelist from "../../components/b2c/b2c-likelist.vue";
 
	export default {
		components: {
			b2cProraty,
			tableFields,
			b2cLikelist,
			 
		},
		data: function() {
			return {
				ispin: false,
				gopin: 0,
				data: {},
				pageLoad: false,
				ksid: 0,
				ksid1: 0,
				ksList: [],
				ksList2: [],
				fieldsList:[],
				price: 0,
				cart_amount: 0,
				ppBoxClass: "",
				attBoxClass: "",
				goBuy: false,
				favClass: "",
				orderid:0,
				order:{},
				imgsdata:[],
				pts:[],
				swipeHeight:200
			}
		},
		onLoad: function(ops) {
			if(ops.orderid!=undefined){
				this.orderid=ops.orderid;
			}
			var sys = uni.getSystemInfoSync();
			this.swipeHeight = Math.min(640, sys.windowWidth) / 1.5;
			 
			this.getPage(ops.id);
		},
		methods: {
			showImg:function(){
				
			},
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			setOrder:function(orderid){
				this.orderid=orderid;
				this.gopin = 1;
				this.ppBoxShow(true);
			},
			ptBuy: function(t) {
				this.gopin = t;
				this.ppBoxShow(true);
			},
			ppBoxShow: function(goBuy) {
				if (goBuy != undefined && goBuy) {
					this.goBuy = true;
				} else {
					this.goBuy = false;
				}
				this.ppBoxClass = "flex-col";
			},
			timeLeft:function(atime){
					var html;
					var t;
					
					if(atime<=0){
						html="已结束";
					}else{
						if(atime>3600){
							var h=parseInt(atime/3600);
							var m=parseInt((atime-h*3600)/60);
							var s=atime%60;
							t=h+":"+m+":"+s;
						}else if(atime>60){
							var m=parseInt(atime/60);
							var s=atime%60;
							t="00:"+m+":"+s;
						}else{
							t=atime;
						}
						html="还剩"+t;
					}
					return html;
			},
			setTimer:function(){
				var that=this;
				setInterval(function(){
					if(that.order){
						if(that.order.timego>0){
							that.order.timego--;
							that.order.timestr=that.timeLeft(that.order.timego);	 
						} 
					}
					if(that.pts){
						for(var i in that.pts){
							that.pts[i].timego--;
							that.pts[i].timestr=that.timeLeft(that.pts[i].timego);
						}
					}
				},1000)
				
			},
			getPage: function(id) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/mm/b2c_product/show?id=" + id,
					data: {
						 
						orderid:that.orderid
					},
					success: function(res) {
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						} 
						if (res.data.data.pt_open > 0) {
							that.ispin = true;
						}
						if (res.data.isfav) {
							that.favClass = "fav-active";
						}
						that.pageLoad = true;
						res.data.data.content=that.app.html(res.data.data.content)
						that.data = res.data.data;
						that.order=res.data.order;
						that.pts=res.data.pts;
						that.fieldsList=res.data.fieldsList;
						console.log(that.fieldsList)
						that.ksList = res.data.ksList;
						that.ksList2 = res.data.ksList2;
						that.ksid = res.data.ksid;
						that.ksid1 = res.data.ksid;
						that.price = res.data.data.price;
						that.imgsdata=res.data.imgsdata;
						if(res.data.cart_amount==0){
							res.data.cart_amount=1;
						}
						that.cart_amount = res.data.cart_amount;
						that.setTimer();
					}
				})
			},
			dMinus: function() {
				if (this.cart_amount > 1) {
					this.cart_amount--;
				}

			},
			dPlus: function() {
				this.cart_amount++;
			},
			ks1: function(id) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/mm/b2c_product_ks/sizeList?id=" + id,
					dataType: "json",
					success: function(res) {
						that.ksid1 = res.data.ksid;
						that.ksid = res.data.ksid;
						that.ksproduct = res.data.product;
						that.price = res.data.ks.price;
						if(res.data.cart_amount==0){
							res.data.cart_amount=1;
						}
						that.cart_amount = res.data.product.cart_amount;
						that.ksList2 = res.data.ksList2;
					}
				})
			},
			ks2: function(id) {
				var that = this;
				that.ksid = id;
				that.app.get({
					url: that.app.apiHost + "/mm/b2c_product_ks/get?id=" + id,
					success: function(res) {
						that.ksproduct = res.data.product;
						that.price = res.data.ks.price;
						if(res.data.cart_amount==0){
							res.data.cart_amount=1;
						}
						that.cart_amount = res.data.product.cart_amount;
					}
				})
			},
			addCart: function() {
				var that = this;
				var ksid = that.ksid;
				that.app.get({
					url: that.app.apiHost + '/mm/b2c_cart/add',
					data: {
						productid: that.data.id,
						amount: that.cart_amount,
						ksid: ksid
					},
					unLogin:true,
					success: function(res) {
						if (res.error) {
							if(res.error==1000){
								that.app.showLoginBox(false)
								return false;
							}
							uni.showToast({
								title: res.message
							})
							return false;
						}
						uni.showToast({
							title: "加入成功"
						})
						if (res.data.action == 'delete') {
							return false;
						}
						if (that.goBuy) {
							uni.navigateTo({
								url: "../b2c_order/confirm?cartid=" + res.data.cartid + "&ispin=" + that.gopin+"&orderid="+that.orderid
							})
						}


					}
				})
			},
			favToggle: function(id) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/fav/toggle",
					data: {
						objectid: that.data.id,
						tablename: "mod_b2c_product"
					},
					unLogin:true,
					success: function(res) {
						if (res.error == 1000) {
							that.app.showLoginBox(false)
							return false;
						}
						if (res.data == 'delete') {
							that.favClass = "";
						} else {
							that.favClass = "fav-active";
						}

					}
				})
			}

		}
	}
</script>

<style>
	.video{
		width:100%;
	}
	.fav-active,
	.fav-active:before {
		color: #e48681 !important;
	}

	.ppBox {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 10px;
		background-color: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		z-index: 999;
	}

	.ppBox-close {
		position: absolute;
		right: 0px;
		top: 0px;
		padding: 10px;
		cursor: pointer;
	}
	.h240{
		height: 500rpx;
	}
	.wh-80 {
		width: 80px;
		height: 80px;
	}

	.pdl0 {
		padding-left: 0;
	}

	.ani-bottom {
		animation: aniBottom 500ms;
	}

	@-webkit-keyframes aniBottom {
		from {
			bottom: -100%;
		}

		to {
			bottom: 0;
		}
	}

	.ani-top {
		animation: aniTop 500ms;
	}

	@-webkit-keyframes aniTop {
		from {
			bottom: 0;
		}

		to {
			bottom: -600px;
		}
	}

	.flcart {
		display: flex;
		flex-direction: row;
		position: fixed;
		left: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		font-size: 14px;
		line-height: 1.2;
		border-top: 1rpx solid #eee;
		background-color: #fff;
		text-align: center;
	}

	.flcart-icon:before {
		padding-top: 10rpx;
		clear: both;
		display: block;
		font-size: 14px;
		line-height: 1.2;
	}

	.flcart-f1,
	.flcart-f2 {
		height: 100rpx;
	}

	.flcart-f1 {
		width: 132rpx;
		display: inline-block;

		line-height:1.2;
		font-size: 14px;
	}

	.flcart-f2 {
		flex: 1;
		line-height: 100rpx;
		background-color: #f90;
		color: #fff;
		font-size: 12px;
	}

	.pdList-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 5px;
	}

	.pdList-img {
		width: 30px;
		height: 30px;
		margin-right: 5px;
		border-radius: 50%;
	}

	.pdList-nick {
		flex: 1;

	}

	.bt-a,
	.bt-b {
		flex: 1;
		padding: 5px;

	}

	.bt-a-f {
		color: #fff;
		font-size: 12px;
		line-height: 1.5;
	}

	.bt-a {
		background-color: #f4aba7;
	}

	.bt-b {
		background-color: #e02e24;
	}
	.d-content img{
		max-width: 100%;
		height: auto;
	}
</style>
