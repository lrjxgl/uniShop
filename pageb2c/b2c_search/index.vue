<template>
	<view>
		<view id="app">

			<view class="flex pd-5 bg-white mgb-5">
				<input class="input-flex-text bd-radius-10 outline-none" v-model="keyword" id="keyword" />
				<view class="input-flex-btn w60" @click="search">搜一下</view>
			</view>
			<view v-if="pageLoad">
				<view v-if="!pageData.list" class="emptyData">没找到你搜的</view>
				<view class="mtlist" v-else>
					<view class="mtlist-item"  @click="goProduct(item.shopid,item.id)" v-for="(item,index) in pageData.list" :key="index">
						<view class="mtlist-item-bd">
							<image mode="widthFix" class="mtlist-img" :src="item.imgurl+'.small.jpg'"></image>
							<view class="mtlist-item-pd">
								<view class="mtlist-item-money">
									<view class="flex flex-1 flex-ai-center">
										<view class="cl-money f12">￥</view>
										<view class="cl-money f18">{{item.price}}</view>
									</view>
									<view class="mtlist-item-money_num">月销{{item.buy_num}}件</view>
								</view>
								<view class="mtlist-title">{{item.title}}</view>

							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import skyRaty from "../../components/skyraty.vue";
	export default ({
		components: {
			skyRaty
		},
		data: function() {
			return {
				pageLoad: false,
				pageData: {},
				keyword: "",
				page: "product"
			}
		},
		onLoad: function(ops) {
			this.keyword = ops.keyword;
			this.getPage();
		},
		methods: {
			goProduct: function(shopid, id) {
				uni.navigateTo({
					url: "../b2c_product/show?id=" + id
				})

			},

			search: function() {
				this.getPage();
			},
			setPage: function(page) {
				this.page = page;
				this.pageLoad = false;
				this.pageData = {};
				this.getPage();
			},
			getPage: function() {
				this.getProduct();
			},

			getProduct: function() {
				var that = this;
				this.app.get({
					url: that.app.apiHost + "/module.php?m=b2c_search&a=product&ajax=1",
					data: {
						keyword: this.keyword
					},
					dataType: "json",
					success: function(res) {
						that.pageLoad = true;
						that.pageData = res.data;
					}
				})
			}
		}
	});
</script>

<style>
</style>
