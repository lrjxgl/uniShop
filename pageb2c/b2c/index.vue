<template>
	<view>
		<view v-if="!pageLoad">
			<page-loading></page-loading>
		</view>
		<view v-else>
			<view class="pd-5">
				<view class="flex">
					<image :src="site.logo" mode="widthFix" class="wh-30 mgr-5"></image>
					<input placeholder="老白茶、2008银针" v-model="keyword" type="text" class="header-search pdl-5">
					<view @click="search" class="header-search-btn  iconfont icon-search"></view>
				</view>
			</view>
			<swiper :style="{height:swipeHeight+'px'}" :indicator-dots="true" :autoplay="true" :interval="3000"
				:duration="1000">
				<swiper-item v-for="(item,key) in  flashList" :key="key">
					<view class="swiper-item">
						<image @click="gourl(item.link1)" :src="item.imgurl" class="wall" mode="widthFix">
						</image>
					</view>
				</swiper-item>
			
			</swiper>
			<view class="m-navPic mgt-5 mgb-5">
				<navigator v-for="(item,key) in navList" :key="key" :url="item.link1" class="m-navPic-item">
					<image class="m-navPic-img" mode="widthFix" :src="item.imgurl"></image>
					<view class="m-navPic-title">{{item.title}}</view>
				</navigator>

			</view>
			<div @click="gourl('../../pageb2c/b2c_group_product/index?gkey=bimai')" class="row-box-hd  pdl-10">
				<div class="iconfont mgr-10 icon-likefill cl-f30 f22"></div>
				<div class="flex-1 ">
					<div class="f14">必买好货</div>
					<div class="cl3 f12">大家都会心动的产品</div>
				</div>
				<div class="row-box-more"></div>
			</div>
			<view class="mtlist">

				<view v-for="(item,index) in bmList" :key="index" @click="goProduct(item.id)" class="mtlist-item">
					<view class="mtlist-item-bd">
						<image mode="widthFix" class="mtlist-img " :src="item.imgurl+'.small.jpg'"></image>
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

			<div @click="gourl('../../pageb2c/b2c_product/index?type=recommend')" class="row-box-hd  pdl-10">
				<div class="iconfont mgr-10 icon-moneybag cl-f30 f20"></div>
				<div class="flex-1 ">
					<div class="f14">猜你喜欢</div>
					<div class="cl3 f12">Guess You Like It</div>
				</div>
				<div class="row-box-more"></div>
			</div>
			<view class="mtlist">

				<view v-for="(item,index) in recList" :key="index" @click="goProduct(item.id)" class="mtlist-item">
					<view class="mtlist-item-bd">
						<image mode="widthFix" class="mtlist-img " :src="item.imgurl+'.small.jpg'"></image>
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

			<div @click="gourl('../../pageb2c/b2c_product/index?type=hot')" class="row-box-hd  pdl-10 mtt10">
				<div class="iconfont mgr-10 icon-hot_light cl-f30 f20"></div>
				<div class="flex-1 ">
					<div class="f14">热销商品</div>
					<div class="cl3 f12">Hot Goods</div>
				</div>
				<div class="row-box-more"></div>
			</div>
			<view class="mtlist">

				<view v-for="(item,index) in hotList" :key="index" @click="goProduct(item.id)" class="mtlist-item">
					<view class="mtlist-item-bd">
						<image mode="widthFix" class="mtlist-img " :src="item.imgurl+'.small.jpg'"></image>
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
		<b2c-footer tab="home"></b2c-footer>
	</view>

</template>

<script>
	var cacheKey = "index_index";
	import b2cFooter from "../../components/b2cfooter.vue";
	export default {
		components: {
			b2cFooter
		},
		data() {
			return {
				flashList: [],
				navList: [],
				recList: [],
				bmList:[],
				pageLoad: false,
				keyword: "",
				swipeHeight: 320,
				site:{},
				hotList:[]
			}
		},
		onLoad: function(ops) {
			var sys = uni.getSystemInfoSync();
			this.swipeHeight = Math.min(640,sys.windowWidth) / 2;
			if (!this.getCache()) {
				uni.showNavigationBarLoading();
				this.getPage();
			}
		},
		
		onPullDownRefresh: function() {
			this.refresh();
		},
		onShareAppMessage:function(){
			
		},
		methods: {
			setCache: function() {
				var val=this.$data;
				val.expire=Date.parse(new Date()) / 1000 + 300
				uni.setStorageSync(cacheKey, JSON.stringify(val));
			},
			getCache: function() {
				var val = uni.getStorageSync(cacheKey);
				if (!val) return false;
				var time = Date.parse(new Date()) / 1000;
				if (val.expire < time) {
					return false;
				}
				var v = JSON.parse(val);
				this.flashList=v.flashList;
				this.navList=v.navList;
				this.recList=v.recList;
				this.bmList=v.bmList;
				this.pageLoad= v.pageLoad;
				this.keyword= v.keyword;
				this.site=v.site;
				this.hotList=v.hotList;

				return true;
			},
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			search: function() {
				uni.navigateTo({
					url: "../../pageb2c/b2c_search/index?keyword=" + this.keyword
				})
			},
			goProduct: function(id) {
				uni.navigateTo({
					url: "../../pageb2c/b2c_product/show?id=" + id
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: this.app.apiHost + "/b2c/index?ajax=1",
					success: function(res) {
						that.flashList = res.data.flashList;
						that.navList = res.data.navList;
						that.recList = res.data.recList;
						that.newList = res.data.newList;
						that.bmList=res.data.bmList;
						that.hotList=res.data.hotList;
						that.site=res.data.site;
						that.pageLoad = true;
						uni.hideNavigationBarLoading();
						that.setCache();
					}
				})
			},
			refresh: function() {
				this.getPage();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000)
			},
		}
	}
</script>

<style>
 
</style>
