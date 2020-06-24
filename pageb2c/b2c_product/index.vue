<template>
	<view>
		<view class="tabs-border">
			<view @click="setOrder('')" :class="{'tabs-border-active':orderby==''}" class="tabs-border-item">综合</view>
			<view @click="setOrder('buy_num')" :class="{'tabs-border-active':orderby=='buy_num'}" class="flex flex-center tabs-border-item">
				<text class="mgr-5">销量</text>
				<text class="iconfont icon-godown"></text>
			</view>
			<view @click="setOrder('price')" :class="{'tabs-border-active':orderby=='price'}" class="tabs-border-item flex flex-center ">
				<text class="mgr-5">价格</text>
				<text class="iconfont icon-godown"></text>
			</view>
		</view>
		<view class="mtlist mgt-5">

			<view @click="goProduct(item.id)" v-for="(item,index) in list" :key="index" class="mtlist-item">
				<view class="mtlist-item-bd">
					<image mode="widthFix" class="mtlist-img" :src="item.imgurl+'.small.jpg'"></image>
					<view class="mtlist-item-pd">
						<view class="mtlist-item-money">
							<view class="mtlist-item-money-flex">￥
								<text class="mtlist-item-money_money">{{item.price}}</text>
							</view>
							<view class="mtlist-item-money_num">月销{{item.buy_num}}件</view>
						</view>
						<view class="mtlist-title">{{item.title}}</view>
						 
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				catid: 0,
				pageLoad: false,
				list: {},
				pageCatid: 0,
				type: "",
				isFirst: true,
				per_page: 0,
				orderby: ""
			}
		},
		onLoad: function(ops) {
			this.catid = ops.catid
			if (ops.type != undefined) {
				this.type = ops.type;
			}
			if(this.type=='hot'){
				uni.setNavigationBarTitle({
					title:"热销商品"
				})
			}else{
				uni.setNavigationBarTitle({
					title:"猜你喜欢"
				})
			}
			this.getPage();
		},
		onReachBottom: function() {
			this.getList();
		},
		methods: {
			setOrder:function(o){
				this.orderby=o;
				this.isFirst=true;
				this.per_page=0;
				this.getList();
			},
			goProduct: function(id) {
				uni.navigateTo({
					url: "../b2c_product/show?id=" + id
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=b2c_product&a=list&ajax=1&catid=" + that.catid,
					data: {
						type: that.type,
						orderby:this.orderby,
					},
					success: function(res) {
						that.per_page = res.data.per_page;
						that.list = res.data.list;
						that.pageLoad = true;
						that.isFirst = false;
					}
				})
			},
			getList: function() {
				var that = this;
				if (that.per_page == 0 && !that.isFirst) {
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/module.php?m=b2c_product&a=list&ajax=1&catid=" + that.catid,
					data: {
						type: that.type,
						orderby:this.orderby,
					},
					success: function(res) {
						that.per_page = res.data.per_page;
						if (!that.isFirst) {
							for (var i in res.data.list) {
								that.list.push(res.data.list[i]);
							}

						} else {
							that.list = res.data.list;
						}
					}
				})
			},
		}
	}
</script>

<style>
</style>
