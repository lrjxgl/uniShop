<template>
	<view>
		<view v-if="!pageLoad">
			<page-loading></page-loading>
		</view>
		<view v-else>
			<div class="main-body">
					<div>
						<swiper :style="{height:swipeHeight+'px'}" :indicator-dots="true" :autoplay="true" :interval="3000"
							:duration="1000">
							<swiper-item v-for="(item,key) in  flashList" :key="key">
								<view class="swiper-item">
									<image @click="gourl(item.link1)" :src="item.imgurl" class="wall" mode="widthFix">
									</image>
								</view>
							</swiper-item>
						
						</swiper>
					</div>
					<!--
					<div class="flex flex-ai-center bg-ef pd-10 ">
						<div class="cl1 flex-1">纯电动长悦保养套餐免单名单快来查看!</div>
						<div class="iconfont icon-right"></div>
					</div>
					-->
					<div class="bg-white pd-10">
						<div style="padding:20px 0px;font-weight:600;">限时特惠</div>
						<div class="pd-10 mgb-10">
							 
							<div class="mgb-20">限时特惠，原厂好物5折起</div>
							<div class="flex mgb-20" style="overflow:auto;">
								<div  v-for="(item,index) in tehuiList" :key="index"  class="mgr-10">
									<image @click="gourl(item.link1)" mode="widthFix" class="w150 mgb-5" :src="item.imgurl+'.100x100.jpg'"></image>
								</div>
								 
							</div>
							<!--
							<div class="flex">
								<div class="flex-1"></div>
								<div class="cl-primary fw-600">选购</div>
							</div>
							-->
						</div>
					</div>
					
					<div class="bg-white pd-10">
						<div style="padding:20px 0px;font-weight:600;">超值组合</div>
						<div class="pd-10 mgb-10">
							 
							<div class="flex mgb-10" style="overflow:auto;padding-bottom:10px;">
								<div v-for="(item,index) in czList" :key="index" class="mgr-10">
									<image @click="goProduct(item.id)"  mode="widthFix" class="w150 mgb-5" :src="item.imgurl+'.small.jpg'"></image>
									<div @click="goProduct(item.id)"  class="mgb-5">{{item.title}}</div>
									<div class="flex flex-ai-center">
										<div class="f10 ">￥ </div>
										<div>{{item.price}}</div>
									</div>
								</div>
								 
							</div>
							<!--
							<div class="flex">
								<div class="flex-1"></div>
								<div class="cl-primary fw-600">去选购</div>
							</div>
							-->
						</div>
					</div>
					
					
					<div class="bg-ef pd-10">
						<div style="padding:20px 0px;font-weight:600;">更多推荐</div>
						<div class="mgb-10">
							<scroll-view scroll-x="true">
								<div class="flex">
									<div @click="setCat(0)" :class="catid==0?'btn-dark':'btn3'"  class="btn-small w50 mgr-5 ">全部</div>
									<div v-for="(item,index) in catList" :key="index" @click="setCat(item.catid)" :class="catid==item.catid?'btn-dark':'btn3'" class="btn-small w100 mgr-5">{{item.title}}</div>
	 
								</div>
							</scroll-view>
						</div>
						<div v-if="recList.length==0" class="emptyData">暂无商品</div>
						<div class="mgb-10" v-else>
							 
							<div class="flex mgb-10">
								<div class="flex-1 bg-white mgr-10">
									<div v-for="(item,index) in recList" :key="index">
										
										<template v-if="index%2==0"  >
											<div class="bd-mp-10">
												<image @click="goProduct(item.id)"  mode="widthFix" class="wall mgb-5" :src="item.imgurl+'.small.jpg'"></image>
												<div class="pd-10">
													<div @click="goProduct(item.id)"  class="mgb-10">{{item.title}}</div>
													<div class="flex flex-ai-center">
														<div class="f12 cl-money">￥ </div>
														<div class="cl-money">{{item.price}}</div>
													</div>
												</div>
											</div>
										</template>
									</div>
									 
									
								</div>
								<div class="flex-1  bg-white ">
									<div v-for="(item,index) in recList" :key="index">
										<template v-if="index%2==1"  >
											<div class="bd-mp-10">
												<image @click="goProduct(item.id)" mode="widthFix" class="wall mgb-5" :src="item.imgurl+'.small.jpg'"></image>
												<div class="pd-10">
													<div @click="goProduct(item.id)"  class="mgb-10">{{item.title}}</div>
													<div class="flex flex-ai-center">
														<div class="f12 cl-money">￥ </div>
														<div class="cl-money">{{item.price}}</div>
													</div>
												</div>
											</div>
										</template>
									</div>
									
								</div>
								
							</div>
							<!--
							<div class="flex">
								<div class="flex-1"></div>
								<div class="cl-primary fw-600">去选购</div>
							</div>
							-->
						</div>
					</div>
					
					
				</div>
			
		</view>
		<b2c-footer tab="b2c"></b2c-footer>
	</view>

</template>

<script>
	var cacheKey = "index_index";
	import b2cFooter from "../../components/b2c/footer.vue";
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
				hotList:[],
				czList:[],
				tehuiList:[],
				site: {}, 
				pageLoad: false,
				keyword: "",
				swipeHeight: 320,
				catList:[],
				catid:0
			}
		},
		onLoad: function(ops) {
			 
			var sys = uni.getSystemInfoSync();
			this.swipeHeight = Math.min(640, sys.windowWidth) / 2;
			if (!this.getCache() && 1==2) {
				uni.showNavigationBarLoading();
				this.getPage();
			}
			this.getPage();
			this.getList();
		},
		
		onPullDownRefresh: function() {
			this.refresh();
		},
		onShareAppMessage:function(){
			
		},
		methods: {
			setCache: function() {
				var val = {
					pageLoad: this.pageLoad,
					pageData: this.pageData,
					keyword: this.keyword,
					expire: Date.parse(new Date()) / 1000 + 300
				}
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
				this.pageLoad = v.pageLoad;
				this.pageData = v.pageData;
				this.keyword = v.keyword;

				return true;
			},
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			goProduct:function(id){
				uni.navigateTo({
					url:"/pageb2c/b2c_product/show?id="+id
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
					url: this.app.apiHost + "/mm/b2c/index",
					success: function(res) {
						that.flashList = res.data.flashList;
						that.navList = res.data.navList;				 
						that.site = res.data.site;
						that.bmList=res.data.bmList;
						that.hotList=res.data.hotList;
						that.czList=res.data.czList;
						that.recList=res.data.recList;
						that.tehuiList=res.data.tehuiList;
						that.pageLoad = true;
						uni.hideNavigationBarLoading();
						that.setCache();
					}
				})
			},
			setCat(catid){
				this.catid=catid
				if(catid==0){
					this.getPage();
				}else{
					this.getList();
				}
				
			},
			getList: function() {
				var that = this;
				that.app.get({
					url: this.app.apiHost + "/mm/b2c_product/index",
					data:{
						catid:this.catid
					},
					success: function(res) {
						that.catList=res.data.catList; 
						that.recList=res.data.list;
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
	swiper {
		height: 440upx;
	}

	.mtt10 {
		margin-top: -22upx;
	}
</style>
