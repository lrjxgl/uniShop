<template>
	<view v-if="pageLoad" class="bg-a">

		<view v-if="!pageData.rscount">
			<view class="emptyData">暂无消息</view>
		</view>
		<view v-else>
			<view class="row-box pdb-5 mgb-5" v-for="(item,index) in pageData.data" :key="index">
				<view class="flex pdb-5 mgb-5 border-bottom">
					<view class="btn-small btn-outline-success">{{item.status_name}}</view>
					<view class="flex-1"></view>
					<view class="time cora pdr-10">{{item.timeago}}</view>
				</view>

				<view class=" cor2">
					<rich-text :nodes="item.content"></rich-text>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	var app = require("../../common/common.js");
 
	var per_page = 0;
	var isfirst = true;
	var catid = 0;
	 
	export default {
	 
		data: {
			pageLoad: false,
			pageData: {},
			 
		},
		onLoad: function (option) {
		 
			uni.setNavigationBarTitle({
				title: '我的消息'
			});
			this.getPage();
		},
		onReachBottom: function () {
			this.getList();
		},
		onPullDownRefresh: function () {
			this.refresh();
		},
		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?m=notice&a=my&ajax=1",
					data: {
						authcode: app.getAuthCode()
					},
					success: function (data) {
						if (data.error == 1000) {
							uni.navigateTo({
								url: "/pages/login/index",
							})
						} else {
							isfirst = false;
							that.pageLoad=true;
							that.pageData = data.data.data;
							per_page = data.data.data.per_page;
						}

					}
				})
			},

			getList: function () {
				var that = this;
				if (!isfirst && per_page == 0) return false;
				uni.request({
					url: app.apiHost + "?m=notice&a=my&ajax=1",
					data: {
						per_page: per_page,
						catid: catid,
						authcode: app.getAuthCode()
					},
					success: function (data) {

						if (!data.data.error) {
							if (isfirst) {
								that.pageData.list = data.data.data.list;
								isfirst = false;
							} else {

								that.pageData.list = app.json_add(that.pageData.list, data.data.data.list);
							}
							per_page = data.data.data.per_page;

						}


					}
				})
			},

			refresh: function () {
				this.getPage();
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			loadMore: function () {
				this.getList();
			}
		},
	}
</script>

<style>

</style>
