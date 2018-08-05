<template>
	<view v-if="pageLoad">
		 
			 <view  class="flexlist-item" v-for="(item,key) in pageData.list" :key="key">
			 	
			 	<image @click="goProduct(item.object_id)" class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
			 	
			 	<view class="flex-1">
			 		<view @click="goProduct(item.object_id)" class="flexlist-title">{{item.title}}</view>
			 		<view class="flex">
			 			价格：<text class="cor-money">￥{{item.price}}</text>
			 			<view class="flex-1"></view>
			 			<view class="fr cor2">{{item.buy_num}}件已售</view>
			 			
			 		</view>		
			 	</view>
			 </view>
		 
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
	var per_page=0;
	var isfirst=true;

	export default{
 
		data:{
			pageLoad:false, 
			pageData:{},
		 
		},
		onLoad:function(option){
 
			uni.setNavigationBarTitle({
				title: '我的收藏'
			});
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.refresh();
		},
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=fav&a=my&ajax=1",
					data:{
						authcode:app.getAuthCode(),
						fromapp:app.fromapp()
					},
					success:function(data){
						isfirst=false;
						that.pageData=data.data.data;
						that.pageLoad=true;
						per_page=data.data.data.per_page; 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=fav&a=my&ajax=1",
					data:{
						per_page:per_page,
						fromapp:app.fromapp(),
						authcode:app.getAuthCode()
					},
					success:function(data){
						
						if(!data.data.error){
							if(isfirst){
								that.pageData.list=data.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=app.json_add(that.pageData.list,data.data.data.list);
							}
							per_page=data.data.data.per_page;  
							
						}
						
						
					}
				})
			},
			goProduct:function(id){
				uni.navigateTo({
					url:"/pages/product/show?id="+id
				})
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			loadMore:function(){
				this.getList();
			}
		},
	}
</script>

<style>
 
 
</style>
