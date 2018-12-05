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
		 
		<view class="main-body" v-if="pageLoad">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in pageData.flashlist" :key="key">
					<view class="swiper-item">
						<image :src="item.imgurl" style="width:100%" mode="widthFix"></image>
					</view>
				</swiper-item>

			</swiper>
			<view class="m-navPic mgt-5 mgb-5">
				<navigator v-for="(item,index) in pageData.navList" :key="index" :url="item.link_url" class="m-navPic-item">
					<img class="m-navPic-img" :src="item.logo">
					<view class="m-navPic-title">{{item.title}}</view>
				</navigator>
				 
			</view>


			<view class="bg-fff pd-10 mgb-5">
				<view class="row-item" @click="goArticle(item.id)" v-if="index<4" v-for="(item,index) in pageData.articlelist" :key="index">
					<view class="flex-1">{{item.title}}</view>
				</view>
			</view>
			
			<view class="row-box-hd pdl-10 bg-fff">
				<div class="flex-1 f16 fw-600">有品推荐</div>
				<div class="row-box-more">更多</div>
			</view> 
			<view class="mtlist">
				<view @click="goProduct(item.id)" class="mtlist-item" v-for="(item,key) in pageData.productlist" :key="key">
					<view class="mtlist-item-bd">
					<view class="mtlist-imgbox">	
					<image class="mtlist-img" mode="widthFix" :src="item.imgurl+'.small.jpg'"></image>
					</view>
					<view class="mtlist-item-pd">
						<view class="mtlist-item-money">
							<view class="mtlist-item-money-flex">￥<text class="mtlist-item-money_money">{{item.price}}</text></view>
							<view class="mtlist-item-money_num">月销{{item.month_buy_num}}件</view>
						</view>
					 
						<view class="mtlist-title">{{item.title}}</view>
						<view class="mtlist-desc">{{item.description}}</view>
					</view>
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
