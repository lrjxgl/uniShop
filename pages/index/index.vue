<template>
	<view>
		<view class="header flex">
			<image class="header-logo" src="https://deitui-weizhan1.oss-cn-hangzhou.aliyuncs.com/attach/2018/07/06/94385ce66afa493729176ced1540f84e.png"></image>
			<view class="header-search-box">
				<view class="header-search-icon iconfont icon-search"></view>
				<input class="header-search" type="text" v-model="searchWord" :value="searchWord" />
				<div @click="search()" form-type="submit" class="header-search-btn">搜</div>
			</view>
		</view>
		<view class="header-row flex-col"></view>
		<view class="main-body" v-if="pageLoad">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in pageData.flashlist" :key="key">
					<view class="swiper-item">
						<image :src="item.imgurl" style="width:100%" mode="widthFix"></image>
					</view>
				</swiper-item>

			</swiper>



			<view class="bg-fff pd-10">
				<view class="row-item" @click="goArticle(item.id)" v-if="index<4" v-for="(item,index) in pageData.articlelist" :key="index">
					<view class="flex-1">{{item.title}}</view>
				</view>
			</view>
			 

			<view @click="goProduct(item.id)" class="flexlist-item" v-for="(item,key) in pageData.productlist" :key="key">

				<image class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>

				<view class="flexlist-flex-1">
					<view class="flexlist-title">{{item.title}}</view>
					<view class="flexlist-row">
						价格：
						<text class="cl-money mgr-10"> {{item.price}}</text>
						市场价：
						<text class="f14 market-price"> {{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	import mtFooter from "../../components/footer.vue";
	export default {
		components: {
			mtFooter
		},
		data: function(){
			return {
				pageLoad: false,
				pageHide: false,
				pageData: {},
				searchWord:""
			}
		},

		onLoad: function (option) {
			uni.showNavigationBarLoading();
			this.getPage();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "uniShop",
			});
		},
		onShow: function () {
			if (this.pageHide) {
				this.pageHide = false;
				this.getPage();
			}
		},
		onHide: function () {
			this.pageHide = true;
		},
		methods: {
			getPage: function () {
				var that = this;
				uni.request({
					url: app.apiHost + "?ajax=1&fromapp=" + app.fromapp(),
					success: function (data) {
						that.pageLoad = true;
						that.pageData = data.data.data;
						uni.hideNavigationBarLoading();
					}
				})
			},
			goProduct: function (id) {
				uni.navigateTo({
					url: "/pages/product/show?id=" + id
				})
			},
			goArticle: function (id) {
				uni.navigateTo({
					url: "/pages/article/show?id=" + id
				})
			},
			search:function(){
				if(this.searchWord==""){
					return false;
				}
				uni.navigateTo({
					url:"/pages/search/index?searchWord="+encodeURI(this.searchWord)
				})
			}
		},
	}
</script>

<style>
	@import "../../common/uicompent.css";
</style>
