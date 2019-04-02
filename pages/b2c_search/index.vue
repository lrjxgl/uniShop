<template>
	<div>
		<div id="app">


			<div v-if="pageLoad">
				<div class="mtlist">
					<div class="mtlist-item" v-for="(item,index) in pageData.list" :key="index">
						<div class="mtlist-item-bd">
							<div class="mtlist-imgbox" @click="goProduct(item.shopid,item.id)">
								<image mode="widthFix" class="mtlist-img" :src="item.imgurl+'.small.jpg'"></image>
							</div>
							<div class="mtlist-item-pd">
								<div class="mtlist-item-money">
									<div class="flex flex-1 flex-ai-center">
										<div class="cl-money f12">￥</div>
										<div class="cl-money f22">{{item.price}}</div>
									</div>
									<div class="mtlist-item-money_num">月销{{item.buy_num}}件</div>
								</div>
								<div class="mtlist-title">{{item.title}}</div>

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
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
