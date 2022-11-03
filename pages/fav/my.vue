<template>
	<view v-if="pageLoad">
		<view class="tabs-border">
			<view @click="setTable('article')" class="tabs-border-item tabs-border-active">文章</view>
			<view @click="setTable('forum')" class="tabs-border-item">帖子</view>
			 
		</view>
		<view v-if="list.length==0">
			<view class="emptyData">暂无收藏</view>
		</view>
		<view v-else>
			<view v-for="(item,key) in  list" :key="key">
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
 

	export default {

		data: function() {
			return {
				pageLoad: false,
				pageData: {},
				list:[],
				tablename: "article",
				isFirst:true,
				per_page:0
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
				that.app.get({
					url: that.app.apiHost + "/fav/mylist?ajax=1",
					data: {
						tablename: that.tablename
					},
					success: function(res) {
						that.isFirst = false;
						that.list = res.data.list;
						that.pageLoad = true;
						that.per_page = res.data.per_page;
					}
				})
			},

			getList: function() {
				var that = this;
				if (!that.isFirst && that.per_page == 0) return false;
				that.app.get({
					url: that.app.apiHost + "/fav/mylist?ajax=1",
					data: {
						per_page: that.per_page,						
						tablename: that.tablename
					},
					success: function(res) {
						if(res.error){
							return false;
						}
						if(that.isFirst){
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i])
							}
						}
						that.per_page=res.data.per_page;

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
