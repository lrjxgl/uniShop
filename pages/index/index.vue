<template>
	<view v-if="pageLoad">
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,key) in pageData.flashlist" :key="key">
				<view class="swiper-item">
					<image :src="item.imgurl" style="width:100%" mode="widthFix"></image>
				</view>
			</swiper-item>
			 
		</swiper>
		 
		 
		<view class="uni-list">
			<view @click="goArticle(item.id)" class="uni-list-cell" v-if="index<4"  v-for="(item,index) in pageData.articlelist" :key="index">
				<view class="uni-list-cell-navigate uni-navigate-right">
					{{item.title}}
				</view>
			</view>
		</view>
		 
		
		<view class="md-abc">
	
			<view class="md-abc-bc">
				<view class="md-b"><navigator url="http://www.deitui.com/"><image mode="widthFix" class="md-abc-img" src="http://deitui-weizhan1.oss-cn-hangzhou.aliyuncs.com/attach/2018/06/13/cef0258ebad6d90fae1c66cc64298091.png"></image></navigator></view>
				<view class="md-c"><navigator url="http://www.deitui.com/"><image  mode="widthFix" class="md-abc-img" src="http://deitui-weizhan1.oss-cn-hangzhou.aliyuncs.com/attach/2018/06/13/8dcfcaee40c0ca1973ccf5e5c47ab24f.png"></image>  </navigator></view>
			</view>
			<view class="md-abc-a  md-abc-r"><navigator url="http://www.deitui.com/"><image  mode="widthFix" class="md-abc-img" src="http://deitui-weizhan1.oss-cn-hangzhou.aliyuncs.com/attach/2018/06/13/03b19384a1f52306f27f8a72826c7364.png"> </image> </navigator></view>
		</view>
		
		<view @click="goProduct(item.id)" class="flexlist-item" v-for="(item,key) in pageData.productlist" :key="key">
			 
			<image class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
			 
			<view class="flexlist-flex-1">
				<view class="flexlist-title">{{item.title}}</view>
				<view class="flexlist-row">
					价格：<text class="cor-money mgr-10"> {{item.price}}</text>
					市场价：<text class="f14 market-price"> {{item.price}}</text>
				</view>	
			</view>
		</view>
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
	import mtFooter from "../../components/footer.vue";
	export default{
		components:{
			mtFooter
		},
		data:{
			pageLoad:false, 
			pageHide:false,
			pageData:{}
		},
		
		onLoad:function(option){
			uni.showNavigationBarLoading();
			this.getPage();
		},
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}			
		},
		onHide:function(){
			this.pageHide=true;
		}, 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?ajax=1&fromapp="+app.fromapp(),
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						uni.hideNavigationBarLoading(); 
					}
				})
			},
			goProduct:function(id){
				uni.navigateTo({
					url:"/pages/product/show?id="+id
				})
			},
			goArticle:function(id){
				uni.navigateTo({
					url:"/pages/article/show?id="+id
				})
			}
		},
	}
</script>

<style>
	@import "../../common/uicompent.css";
</style>