<template>
	<view  v-if="pageLoad">
		 
			<view v-if="pageData.rscount==0">
				<view class="emptyData">暂无优惠券</view>
			</view>
			<view v-else>

				<view class="flexlist">
					<view  class="flexlist-item pdb-10" v-for="(item,index) in pageData.list" :key="index">

						<image class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
						<view class="flex-1">
							<view class="flexlist-title f16">{{item.title}}</view>
							<view class="flexlist-desc cor2 f14">截止时间:{{item.end_day}}</view>
						 
							<view class="cor-money flex">
								满 <text class="cor-money">￥{{item.lower_money}} </text>
								减 <text class="cor-money">￥{{item.money}}</text>
							</view>
						</view>
						<view class="btn btn-primary" @click="goPros(item.money)">去购买</view> 

					</view>
				</view>
			</view>
		 
	</view>
</template>

<script>
 
 
 
	export default {

		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				list:[],
				rscount:0,
				per_page:0,
				isFirst:true
			}
			
		},
		onLoad: function (option) {
			uni.setNavigationBarTitle({
				title: '我的优惠券'
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
				that.app.get({
					url: that.app.apiHost + "/coupon/my?ajax=1",
					
					success: function (res) {
						
						that.isFirst = false;
						that.list = res.data.list;
						that.pageLoad=true;
						that.per_page = res.data.per_page;
					}
				})
			},

			getList: function () {
				var that = this;
				if (!that.isFirst && that.per_page == 0) return false;
				that.app.get({
					url: that.app.apiHost + "/coupon/my?ajax=1",
					data: {
						per_page: that.per_page
					},
					success: function (res) {
						if(that.isFirst){
							that.isFirst = false;
							that.list = res.data.list;
						}else{
							for(var i in res.data.lis){
								that.list.push(res.data.list[i])
							}
						}
						
						that.pageLoad=true;
						that.per_page = res.data.per_page;
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
			},
			goPros:function(money){
				uni.navigateTo({
					url:"/pages/product/index?startprice="+money,
				})
			}
		},
	}
</script>

<style>
	
</style>
