<template>
	<view v-if="pageLoad">
		<view class="tabs-border">
			<view @click="setTable('article')" class="tabs-border-item tabs-border-active">文章</view>
			<view @click="setTable('forum')" class="tabs-border-item">帖子</view>
			 
		</view>
		<view v-if="pageData.list.length==0">
			<view class="emptyData">暂无收藏</view>
		</view>
		<view v-else>
			<view v-for="(item,key) in pageData.list" :key="key">
				<view v-if="tablename=='article'">
					<view @click="goArticle(item.id)" class="row-item bg-fff">
						<view class="flex-1">
						<view class="cl1 f18">{{item.title}}</view> 
						<view class="cl2">{{item.description}}</view>
						</view>
					</view>
				</view>	
				 
				<view v-else-if="tablename=='forum'">
					<view @click="goForum(item.id)" class="row-item bg-fff">
						<view class="flex-1">
						<view class="cl1 f18">{{item.title}}</view> 
						 
						</view>
					</view>
				</view> 
			</view>
		</view>

	</view>
</template>

<script>
	 
	var per_page = 0;
	var isfirst = true;

	export default {

		data: function() {
			return {
				pageLoad: false,
				pageData: {},
				tablename: "article"
			}
		},
		onLoad: function(option) {

			uni.setNavigationBarTitle({
				title: '我的收藏'
			});
			this.getPage();
		},
		onReachBottom: function() {
			this.getList();
		},
		onPullDownRefresh: function() {
			this.refresh();
		},
		methods: {
			getPage: function() {
				var that = this;
				uni.request({
					url: that.app.apiHost + "?m=fav&a=mylist&ajax=1",
					data: {
						authcode: that.app.getAuthCode(),
						fromapp: that.app.fromapp(),
						tablename: that.tablename
					},
					success: function(data) {
						isfirst = false;
						that.pageData = data.data.data;
						that.pageLoad = true;
						per_page = data.data.data.per_page;
					}
				})
			},

			getList: function() {
				var that = this;
				if (!isfirst && per_page == 0) return false;
				uni.request({
					url: that.app.apiHost + "?m=fav&a=mylist&ajax=1",
					data: {
						per_page: per_page,
						fromapp: that.app.fromapp(),
						authcode: that.app.getAuthCode(),
						tablename: that.tablename
					},
					success: function(data) {

						if (!data.data.error) {
							if (isfirst) {
								that.pageData.list = data.data.data.list;
								isfirst = false;
							} else {

								that.pageData.list = that.app.json_add(that.pageData.list, data.data.data.list);
							}
							per_page = data.data.data.per_page;

						}


					}
				})
			},
			goBook: function(id) {
				uni.navigateTo({
					url: "../mbook/show?bookid=" + id
				})
			},
			goForum: function(id) {
				uni.navigateTo({
					url: "../forum/show?id=" + id
				})
			},
			goArticle: function(id) {
				uni.navigateTo({
					url: "../article/show?id=" + id
				})
			},
			refresh: function() {
				this.getPage();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			loadMore: function() {
				this.getList();
			},
			setTable:function(tablename){
				this.tablename=tablename;
				isfirst=true;
				per_page=0;
				this.getList();
			}
		},
	}
</script>

<style>


</style>
